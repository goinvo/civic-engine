'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Copy, Download, Pause, Play, RotateCcw, Share2, Sparkles } from 'lucide-react';
import { toBlob } from 'html-to-image';
import { getAllPoliciesSorted } from '@/data/policies';
import type { Policy } from '@/types/policy';
import {
  deriveWrappedStats,
  getDisplayName,
  loadWrappedProfile,
} from '@/lib/policyWrappedProfile';
import PolicyWrappedShareCard from '@/components/PolicyWrappedShareCard';
import PolicyWrappedShareCardVideo from '@/components/PolicyWrappedShareCardVideo';

type ExportKind = 'static' | 'animated';

const EXPORT_SIZE = 1080; // requested: always export 1080x1080

const RENDERER_URL =
  // In a static export, this must point to a separate server.
  // Example: http://localhost:8787
  process.env.NEXT_PUBLIC_RENDERER_URL;

function useCurrentUrl(): string {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setUrl(window.location.origin);
  }, []);
  return url;
}

function useAvailableSize(ref: React.RefObject<HTMLElement | null>): { width: number; height: number } {
  const [size, setSize] = useState({ width: 600, height: 600 });
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      // Get available width from parent container
      const parentWidth = el?.clientWidth || window.innerWidth - 48; // account for px-6 padding
      // Get available height: viewport minus header, title section, export options, and padding
      const headerHeight = 70; // nav height
      const titleHeight = 100; // title + description + margins
      const exportOptionsHeight = 80; // compact toolbar + margin
      const padding = 100; // margins, shadow, and breathing room
      const availableHeight = window.innerHeight - headerHeight - titleHeight - exportOptionsHeight - padding;

      // Use the smaller of width or height to maintain square aspect
      const maxSize = Math.min(parentWidth, availableHeight, 900); // cap at 900px
      if (maxSize > 0) setSize({ width: maxSize, height: maxSize });
    };

    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);

    measure();
    window.addEventListener('resize', measure);
    const timer = setTimeout(measure, 100);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, [ref]);
  return size;
}

export default function ExportPage() {
  const allPolicies = useMemo(() => getAllPoliciesSorted(), []);
  const [exportKind, setExportKind] = useState<ExportKind>('static');
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [animT, setAnimT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [renderJobId, setRenderJobId] = useState<string | null>(null);
  const [renderStage, setRenderStage] = useState<string>('idle');
  const [renderProgress, setRenderProgress] = useState<number>(0);
  const previewOuterRef = useRef<HTMLDivElement | null>(null);
  const availableSize = useAvailableSize(previewOuterRef);
  const exportStaticRef = useRef<HTMLDivElement | null>(null);
  const exportAnimRef = useRef<HTMLDivElement | null>(null);
  const origin = useCurrentUrl();

  useEffect(() => {
    const p = loadWrappedProfile();
    setFirstName(p?.firstName);
    setSelectedIds(p?.selectedPolicyIds ?? []);
  }, []);

  // Animation playback effect
  useEffect(() => {
    if (!isPlaying) return;
    const duration = 4000; // 4 seconds total animation
    const startTime = Date.now() - animT * duration;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setAnimT(progress);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsPlaying(false);
      }
    };

    const frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, animT]);

  const selectedPolicies: Policy[] = useMemo(() => {
    const map = new Map(allPolicies.map((p) => [p.id, p]));
    return selectedIds.map((id) => map.get(id)).filter(Boolean) as Policy[];
  }, [allPolicies, selectedIds]);

  const stats = useMemo(() => deriveWrappedStats(selectedPolicies), [selectedPolicies]);
  const displayName = getDisplayName(firstName);
  const previewScale = availableSize.width / EXPORT_SIZE;

  const getStaticBlob = async (): Promise<Blob | null> => {
    if (!exportStaticRef.current) return null;
    setError(null);
    return await toBlob(exportStaticRef.current, {
      cacheBust: true,
      pixelRatio: 1,
    });
  };

  const downloadPng = async () => {
    if (typeof window === 'undefined') return;
    try {
      setExporting(true);
      const blob = await getStaticBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'policy-wrapped.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError('Could not export image on this browser. Try taking a screenshot instead.');
    } finally {
      setExporting(false);
    }
  };

  const sharePng = async () => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navAny = navigator as any;
    if (!navAny.share) {
      await downloadPng();
      return;
    }

    try {
      setExporting(true);
      const blob = await getStaticBlob();
      if (blob) {
        const file = new File([blob], 'policy-wrapped.png', { type: 'image/png' });
        if (!navAny.canShare || navAny.canShare({ files: [file] })) {
          await navAny.share({
            title: 'Policy Wrapped',
            text: `${displayName} — ${stats.label}`,
            files: [file],
          });
          return;
        }
      }

      await navAny.share({
        title: 'Policy Wrapped',
        text: `${displayName} — ${stats.label}`,
        url: window.location.href,
      });
    } catch {
      // fallback
      await downloadPng();
    } finally {
      setExporting(false);
    }
  };

  const downloadRemotionPayload = async (): Promise<void> => {
    if (typeof window === 'undefined') return;
    try {
      setError(null);
      setExporting(true);
      setAnimT(1);

      const payload = {
        displayName,
        label: stats.label,
        avgConsensusSupport: stats.avgConsensusSupport,
        policies: selectedPolicies.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          averageSupport: p.averageSupport,
        })),
        urlText: origin ? `${origin}/wrapped` : undefined,
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'policy-wrapped.remotion.json';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError('Could not generate the Remotion payload. Try again.');
    } finally {
      setExporting(false);
    }
  };

  const exportHqMp4OneClick = async (): Promise<void> => {
    if (typeof window === 'undefined') return;

    if (!RENDERER_URL) {
      setError('HQ video rendering needs a render server. Set NEXT_PUBLIC_RENDERER_URL and try again.');
      return;
    }

    try {
      setExporting(true);
      setError(null);
      setAnimT(1);

      // Reset progress UI
      setRenderProgress(0);
      setRenderStage('queueing');

      const payload = {
        displayName,
        label: stats.label,
        avgConsensusSupport: stats.avgConsensusSupport,
        policies: selectedPolicies.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          averageSupport: p.averageSupport,
        })),
        urlText: origin ? `${origin}/wrapped` : undefined,
      };

      // Use job endpoint so we can show progress while rendering.
      const base = RENDERER_URL.replace(/\/$/, '');
      const startRes = await fetch(`${base}/jobs/policy-wrapped-square`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!startRes.ok) {
        const json = (await startRes.json().catch(() => null)) as { error?: string } | null;
        throw new Error(json?.error || `Render failed (${startRes.status})`);
      }

      const { jobId } = (await startRes.json()) as { jobId: string };
      setRenderStage('bundling');
      setRenderJobId(jobId);

      // Listen for progress via SSE
      const es = new EventSource(`${base}/jobs/${encodeURIComponent(jobId)}/events`);
      await new Promise<void>((resolve, reject) => {
        const handle = (evt: Event) => {
          try {
            const raw = (evt as MessageEvent).data;
            if (typeof raw !== 'string') return;
            const data = JSON.parse(raw) as { status: string; stage: string; progress: number; error?: string | null };
            setRenderProgress(Math.max(0, Math.min(1, data.progress ?? 0)));
            setRenderStage(data.stage || 'rendering');

            if (data.status === 'done') {
              es.close();
              resolve();
            }
            if (data.status === 'error') {
              es.close();
              reject(new Error(data.error || 'Render failed'));
            }
          } catch {
            // ignore parse errors
          }
        };

        // Prefer explicit event name, but also handle default "message" just in case.
        es.addEventListener('progress', handle);
        es.addEventListener('message', handle);

        es.onerror = () => {
          // If SSE fails, fall back to polling.
          es.close();
          resolve();
        };
      });

      // Polling fallback (or SSE unavailable): keep checking status until done.
      if (renderStage !== 'done') {
        for (;;) {
          const statusRes = await fetch(`${base}/jobs/${encodeURIComponent(jobId)}`);
          if (!statusRes.ok) break;
          const data = (await statusRes.json()) as { status: string; stage: string; progress: number; error?: string | null };
          setRenderProgress(Math.max(0, Math.min(1, data.progress ?? 0)));
          setRenderStage(data.stage || 'rendering');
          if (data.status === 'done') break;
          if (data.status === 'error') throw new Error(data.error || 'Render failed');
          await new Promise((r) => setTimeout(r, 1000));
        }
      }

      // Download rendered file
      setRenderStage('downloading');
      const fileRes = await fetch(`${base}/jobs/${encodeURIComponent(jobId)}/file`);
      if (!fileRes.ok) {
        const json = (await fileRes.json().catch(() => null)) as { error?: string } | null;
        throw new Error(json?.error || `Download failed (${fileRes.status})`);
      }

      const blob = await fileRes.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'policy-wrapped.mp4';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setRenderStage('done');
      setRenderProgress(1);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Unknown error';
      setError(msg);
    } finally {
      setExporting(false);
      setTimeout(() => {
        setRenderJobId(null);
      }, 1500);
    }
  };

  const onCopyLink = async () => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href.replace('/export', '/profile'));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  if (selectedPolicies.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-6">
          <Link href="/profile" className="text-sm font-bold text-black dark:text-white underline">
            ← Back to profile
          </Link>
        </div>
        <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-8 text-center">
          <h1 className="font-display text-4xl font-black text-black dark:text-white mb-3">
            Nothing to export yet
          </h1>
          <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-6">
            Build your Policy Profile first, then come back here to export.
          </p>
          <Link
            href="/wrapped"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Pick priorities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <Link
          href="/profile"
          className="text-sm font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          ← Back to profile
        </Link>

        <button
          onClick={onCopyLink}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 text-black dark:text-white text-sm font-bold border-2 border-black dark:border-gray-600"
          type="button"
        >
          <Copy className="w-3 h-3" />
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>

      <section className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-black text-black dark:text-white mb-1">
          Export your Policy Profile
        </h1>
        <p className="font-body text-sm text-gray-600 dark:text-gray-400">
          Preview scaled to fit · Exports at {EXPORT_SIZE}×{EXPORT_SIZE}
        </p>
      </section>

      {/* Preview (front + center) */}
      <div ref={previewOuterRef} className="w-full max-w-4xl mx-auto flex justify-center">
        <div
          className="relative border-4 border-black dark:border-gray-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(75,85,99,1)] overflow-hidden"
          style={{ width: EXPORT_SIZE * previewScale, height: EXPORT_SIZE * previewScale }}
        >
          <div
            style={{
              width: EXPORT_SIZE,
              height: EXPORT_SIZE,
              transform: `scale(${previewScale})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {exportKind === 'animated' ? (
              <PolicyWrappedShareCardVideo
                displayName={displayName}
                label={stats.label}
                avgConsensusSupport={stats.avgConsensusSupport}
                policies={selectedPolicies}
                urlText={origin ? `${origin}/wrapped` : undefined}
                format="square"
                t={animT}
              />
            ) : (
              <PolicyWrappedShareCard
                displayName={displayName}
                label={stats.label}
                avgConsensusSupport={stats.avgConsensusSupport}
                policies={selectedPolicies}
                urlText={origin ? `${origin}/wrapped` : undefined}
                format="square"
              />
            )}
          </div>

          {/* Video controls overlay - appears on hover */}
          {exportKind === 'animated' && (
            <div className="absolute inset-0 flex items-end justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <div className="m-3 p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (animT >= 1) setAnimT(0);
                      setIsPlaying(!isPlaying);
                    }}
                    className="p-1.5 bg-[#C91A2B] text-white border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setAnimT(0);
                    }}
                    className="p-1.5 bg-white border-2 border-black hover:bg-gray-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                    title="Reset"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <div className="flex-1 h-3 bg-gray-200 border-2 border-black relative mx-1 min-w-[100px]">
                    <div
                      className="absolute inset-y-0 left-0 bg-[#C91A2B]"
                      style={{ width: `${animT * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={animT}
                      onChange={(e) => {
                        setIsPlaying(false);
                        setAnimT(parseFloat(e.target.value));
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs font-mono font-black text-black w-10 text-right">
                    {(animT * 4).toFixed(1)}s
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Options below preview */}
      <div className="mt-4 max-w-4xl mx-auto bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-black dark:text-white mr-2">Export:</span>
          <button
            type="button"
            onClick={() => setExportKind('static')}
            className={`text-sm font-bold px-3 py-1 border border-black dark:border-gray-600 ${
              exportKind === 'static' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
            }`}
          >
            PNG
          </button>
          <button
            type="button"
            onClick={() => setExportKind('animated')}
            className={`text-sm font-bold px-3 py-1 border border-black dark:border-gray-600 flex items-center gap-1 ${
              exportKind === 'animated' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            MP4
          </button>

          <div className="flex-1" />

          {exportKind === 'animated' ? (
            <button
              onClick={exportHqMp4OneClick}
              className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#C91A2B] text-white text-sm font-bold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
              type="button"
              disabled={exporting}
            >
              <Download className="w-3 h-3" />
              {exporting ? 'Rendering…' : 'Export MP4'}
            </button>
          ) : (
            <>
              <button
                onClick={sharePng}
                className="inline-flex items-center gap-1 px-4 py-1.5 bg-[#2F3BBD] text-white text-sm font-bold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                type="button"
                disabled={exporting}
              >
                <Share2 className="w-3 h-3" />
                {exporting ? 'Preparing…' : 'Share'}
              </button>
              <button
                onClick={downloadPng}
                className="inline-flex items-center gap-1 px-4 py-1.5 text-sm font-bold border-2 border-black dark:border-gray-600"
                type="button"
                disabled={exporting}
              >
                <Download className="w-3 h-3" />
                {exporting ? 'Exporting…' : 'Download'}
              </button>
            </>
          )}
        </div>

        {error && (
          <p className="mt-2 text-xs font-bold text-[#C91A2B]">{error}</p>
        )}

        {exportKind === 'animated' && exporting && (
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">
              {renderStage === 'queueing' && 'Queueing…'}
              {renderStage === 'queued' && 'Queued…'}
              {renderStage === 'bundling' && 'Bundling…'}
              {renderStage === 'rendering' && 'Rendering…'}
              {renderStage === 'finalizing' && 'Finalizing…'}
              {renderStage === 'downloading' && 'Downloading…'}
              {renderStage === 'done' && 'Done'}
              {['idle', 'error'].includes(renderStage) && 'Working…'}
            </span>
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 border border-black dark:border-gray-600">
              <div className="h-full bg-[#C91A2B] transition-[width]" style={{ width: `${Math.round(renderProgress * 100)}%` }} />
            </div>
            <span className="text-xs font-bold">{Math.round(renderProgress * 100)}%</span>
          </div>
        )}

      </div>

      {/* Offscreen exact-size export nodes (always 1080x1080) */}
      <div style={{ position: 'fixed', left: -10000, top: 0, width: EXPORT_SIZE, height: EXPORT_SIZE, zIndex: -1 }}>
        <div ref={exportStaticRef} style={{ width: EXPORT_SIZE, height: EXPORT_SIZE }}>
          <PolicyWrappedShareCard
            displayName={displayName}
            label={stats.label}
            avgConsensusSupport={stats.avgConsensusSupport}
            policies={selectedPolicies}
            urlText={origin ? `${origin}/wrapped` : undefined}
            format="square"
          />
        </div>
        <div ref={exportAnimRef} style={{ width: EXPORT_SIZE, height: EXPORT_SIZE }}>
          <PolicyWrappedShareCardVideo
            displayName={displayName}
            label={stats.label}
            avgConsensusSupport={stats.avgConsensusSupport}
            policies={selectedPolicies}
            urlText={origin ? `${origin}/wrapped` : undefined}
            format="square"
            t={animT}
          />
        </div>
      </div>
    </div>
  );
}


