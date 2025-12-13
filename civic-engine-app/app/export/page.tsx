'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Copy, Download, Share2 } from 'lucide-react';
import { toBlob } from 'html-to-image';
import { getAllPoliciesSorted } from '@/data/policies';
import type { Policy } from '@/types/policy';
import {
  deriveWrappedStats,
  getDisplayName,
  loadWrappedProfile,
} from '@/lib/policyWrappedProfile';
import PolicyWrappedShareCard, { type PolicyWrappedShareCardFormat } from '@/components/PolicyWrappedShareCard';

type ExportFormat = PolicyWrappedShareCardFormat;

const EXPORT_FORMATS: Array<{
  id: ExportFormat;
  label: string;
  description: string;
  width: number;
  height: number;
  previewAspectClass: string;
}> = [
  { id: 'story', label: 'Story (9:16)', description: 'Best for Instagram Stories, TikTok, Reels', width: 1080, height: 1920, previewAspectClass: 'aspect-[9/16]' },
  { id: 'portrait', label: 'Portrait (4:5)', description: 'Best for Instagram feed portrait', width: 1080, height: 1350, previewAspectClass: 'aspect-[4/5]' },
  { id: 'square', label: 'Square (1:1)', description: 'Best for Instagram feed square', width: 1080, height: 1080, previewAspectClass: 'aspect-square' },
];

function useCurrentUrl(): string {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setUrl(window.location.origin);
  }, []);
  return url;
}

export default function ExportPage() {
  const allPolicies = useMemo(() => getAllPoliciesSorted(), []);
  const [format, setFormat] = useState<ExportFormat>('story');
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [exporting, setExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const exportNodeRef = useRef<HTMLDivElement | null>(null);
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
  const activeFormat = EXPORT_FORMATS.find((f) => f.id === format) ?? EXPORT_FORMATS[0];

  const getExportBlob = async (): Promise<Blob | null> => {
    if (!exportNodeRef.current) return null;
    setError(null);
    return await toBlob(exportNodeRef.current, {
      cacheBust: true,
      pixelRatio: 1,
    });
  };

  const download = async () => {
    if (typeof window === 'undefined') return;
    try {
      setExporting(true);
      const blob = await getExportBlob();
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `policy-wrapped-${format}.png`;
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

  const share = async () => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navAny = navigator as any;
    if (!navAny.share) {
      await download();
      return;
    }

    try {
      setExporting(true);
      const blob = await getExportBlob();
      if (blob) {
        const file = new File([blob], `policy-wrapped-${format}.png`, { type: 'image/png' });
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
      await download();
    } finally {
      setExporting(false);
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
            onClick={share}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F3BBD] text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            type="button"
            disabled={exporting}
            title="Share image via the native share sheet (mobile)"
          >
            <Share2 className="w-4 h-4" />
            {exporting ? 'Preparing…' : 'Share'}
          </button>
          <button
            onClick={download}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white font-bold border-4 border-black dark:border-gray-600"
            type="button"
            disabled={exporting}
            title="Download PNG"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exporting…' : 'Export PNG'}
          </button>
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
          Choose a format, preview it, then export. On mobile, “Share” opens the share sheet (Instagram/TikTok usually appear if installed).
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Format picker */}
        <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-6">
          <h2 className="font-display text-2xl font-black text-black dark:text-white mb-4">
            Export format
          </h2>
          <div className="space-y-3">
            {EXPORT_FORMATS.map((f) => (
              <label
                key={f.id}
                className={`block border-2 border-black dark:border-gray-600 p-4 cursor-pointer ${
                  format === f.id ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="format"
                    checked={format === f.id}
                    onChange={() => setFormat(f.id)}
                    className="mt-1"
                  />
                  <div className="min-w-0">
                    <div className="font-black text-black dark:text-white">{f.label}</div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {f.description} • {f.width}×{f.height}
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>

          {error && (
            <p className="mt-4 text-sm font-bold text-[#C91A2B]">
              {error}
            </p>
          )}
        </div>

        {/* Preview */}
        <div>
          <div className={`border-4 border-black dark:border-gray-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(75,85,99,1)] overflow-hidden w-full max-w-md mx-auto ${activeFormat.previewAspectClass}`}>
            <PolicyWrappedShareCard
              displayName={displayName}
              label={stats.label}
              avgConsensusSupport={stats.avgConsensusSupport}
              policies={selectedPolicies}
              urlText={origin ? `${origin}/wrapped` : undefined}
              format={format}
            />
          </div>
          <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
            Preview only. Export is generated at exact pixel size: {activeFormat.width}×{activeFormat.height}.
          </p>
        </div>
      </div>

      {/* Offscreen exact-size export node */}
      <div
        style={{
          position: 'fixed',
          left: -10000,
          top: 0,
          width: activeFormat.width,
          height: activeFormat.height,
          background: 'transparent',
          zIndex: -1,
        }}
      >
        <div
          ref={exportNodeRef}
          style={{
            width: activeFormat.width,
            height: activeFormat.height,
            border: '0px',
          }}
        >
          <PolicyWrappedShareCard
            displayName={displayName}
            label={stats.label}
            avgConsensusSupport={stats.avgConsensusSupport}
            policies={selectedPolicies}
            urlText={origin ? `${origin}/wrapped` : undefined}
            format={format}
          />
        </div>
      </div>
    </div>
  );
}


