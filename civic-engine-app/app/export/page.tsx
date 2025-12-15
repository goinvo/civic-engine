'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Copy, Download, Share2, Sparkles } from 'lucide-react';
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

function useElementWidth(ref: React.RefObject<HTMLElement | null>): number {
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, [ref]);
  return w;
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
  const [renderJobId, setRenderJobId] = useState<string | null>(null);
  const [renderStage, setRenderStage] = useState<string>('idle');
  const [renderProgress, setRenderProgress] = useState<number>(0);
  const previewOuterRef = useRef<HTMLDivElement | null>(null);
  const previewOuterWidth = useElementWidth(previewOuterRef);
  const exportStaticRef = useRef<HTMLDivElement | null>(null);
  const exportAnimRef = useRef<HTMLDivElement | null>(null);
  const origin = useCurrentUrl();

  useEffect(() => {
    const p = loadWrappedProfile();
    setFirstName(p?.firstName);
    setSelectedIds(p?.selectedPolicyIds ?? []);
  }, []);

  const selectedPolicies: Policy[] = useMemo(() => {
    const map = new Map(allPolicies.map((p) => [p.id, p]));
    return selectedIds.map((id) => map.get(id)).filter(Boolean) as Policy[];
  }, [allPolicies, selectedIds]);

  const stats = useMemo(() => deriveWrappedStats(selectedPolicies), [selectedPolicies]);
  const displayName = getDisplayName(firstName);
  const previewScale = previewOuterWidth > 0 ? Math.min(1, previewOuterWidth / EXPORT_SIZE) : 0.25;

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
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/profile"
          className="text-sm font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          ← Back to profile
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white font-bold border-4 border-black dark:border-gray-600"
            type="button"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
      </div>

      <section className="mb-10">
        <h1 className="font-display text-5xl sm:text-6xl font-black text-black dark:text-white mb-3 leading-tight">
          Export your Policy Profile
        </h1>
        <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium max-w-3xl">
          Preview is rendered from an exact 1080×1080 source and scaled to fit your screen, so what you see matches what you export.
        </p>
      </section>

      {/* Preview (front + center) */}
      <div className="w-full max-w-md mx-auto">
        <div
          ref={previewOuterRef}
          className="relative border-4 border-black dark:border-gray-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(75,85,99,1)] overflow-hidden w-full aspect-square bg-black/5 dark:bg-white/5"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              style={{
                width: EXPORT_SIZE,
                height: EXPORT_SIZE,
                transform: `scale(${previewScale})`,
                transformOrigin: 'center',
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
          </div>
        </div>
        <div className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
          Export size: {EXPORT_SIZE}×{EXPORT_SIZE}
        </div>
      </div>

      {/* Options below preview */}
      <div className="mt-10 max-w-3xl mx-auto bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-6">
        <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
          Export options
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setExportKind('static')}
            className={`border-2 border-black dark:border-gray-600 p-4 text-left ${
              exportKind === 'static' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="font-black text-black dark:text-white">Static image</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Export a PNG for Instagram/TikTok upload.
            </div>
          </button>
          <button
            type="button"
            onClick={() => setExportKind('animated')}
            className={`border-2 border-black dark:border-gray-600 p-4 text-left ${
              exportKind === 'animated' ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-black dark:text-white">
              <Sparkles className="w-4 h-4" />
              Animated video (HQ)
            </div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Remotion exports crisp MP4 (H.264) via FFmpeg.
            </div>
          </button>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          {exportKind === 'animated' ? (
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={exportHqMp4OneClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                type="button"
                disabled={exporting}
                title={RENDERER_URL ? 'Render and download an MP4' : 'Set NEXT_PUBLIC_RENDERER_URL to enable one-click render'}
              >
                <Download className="w-4 h-4" />
                {exporting ? 'Rendering…' : 'Export HQ MP4'}
              </button>
              <button
                onClick={downloadRemotionPayload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-black dark:text-white font-bold border-4 border-black dark:border-gray-600 flex-1"
                type="button"
                disabled={exporting}
                title="Download JSON payload for manual Remotion rendering"
              >
                <Download className="w-4 h-4" />
                {exporting ? 'Preparing…' : 'Download payload'}
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={sharePng}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2F3BBD] text-white font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={exporting}
              >
                <Share2 className="w-4 h-4" />
                {exporting ? 'Preparing…' : 'Share image'}
              </button>
              <button
                onClick={downloadPng}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 text-black dark:text-white font-bold border-4 border-black dark:border-gray-600"
                type="button"
                disabled={exporting}
              >
                <Download className="w-4 h-4" />
                {exporting ? 'Exporting…' : 'Export PNG'}
              </button>
            </>
          )}
        </div>

        {error && (
          <p className="mt-4 text-sm font-bold text-[#C91A2B]">
            {error}
          </p>
        )}

        {exportKind === 'animated' && exporting && (
          <div className="mt-5">
            <div className="flex items-center justify-between text-sm font-bold text-gray-700 dark:text-gray-300">
              <span>
                {renderStage === 'queueing' && 'Queueing…'}
                {renderStage === 'queued' && 'Queued…'}
                {renderStage === 'bundling' && 'Bundling…'}
                {renderStage === 'rendering' && 'Rendering…'}
                {renderStage === 'finalizing' && 'Finalizing…'}
                {renderStage === 'downloading' && 'Downloading…'}
                {renderStage === 'done' && 'Done'}
                {['idle', 'error'].includes(renderStage) && 'Working…'}
              </span>
              <span>{Math.round(renderProgress * 100)}%</span>
            </div>
            <div className="mt-2 h-3 bg-gray-200 dark:bg-gray-700 border-2 border-black dark:border-gray-600">
              <div
                className="h-full bg-[#C91A2B] transition-[width] duration-300"
                style={{ width: `${Math.round(renderProgress * 100)}%` }}
              />
            </div>
            {renderJobId && (
              <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                Job: {renderJobId}
              </div>
            )}
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


