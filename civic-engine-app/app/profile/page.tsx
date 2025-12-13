'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { Copy, Download, ExternalLink, Share2, Trash2 } from 'lucide-react';
import { toBlob } from 'html-to-image';
import { getAllPoliciesSorted } from '@/data/policies';
import type { Policy } from '@/types/policy';
import {
  clearWrappedProfile,
  deriveWrappedStats,
  getDisplayName,
  loadWrappedProfile,
} from '@/lib/policyWrappedProfile';

function useCurrentUrl(): string {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setUrl(window.location.href);
  }, []);
  return url;
}

export default function ProfilePage() {
  const allPolicies = useMemo(() => getAllPoliciesSorted(), []);
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const shareCardRef = useRef<HTMLDivElement | null>(null);
  const currentUrl = useCurrentUrl();

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

  const getShareCardBlob = async (): Promise<Blob | null> => {
    if (!shareCardRef.current) return null;
    setExportError(null);

    // html-to-image will inline styles and render the DOM node to a canvas.
    // We avoid external images and keep gradients/fonts local to reduce tainting risk.
    return await toBlob(shareCardRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });
  };

  const downloadShareCard = async (): Promise<boolean> => {
    if (typeof window === 'undefined') return false;
    try {
      setExporting(true);
      const blob = await getShareCardBlob();
      if (!blob) return false;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'policy-wrapped.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return true;
    } catch {
      setExportError('Could not export image on this browser. Try “Copy link” or take a screenshot.');
      return false;
    } finally {
      setExporting(false);
    }
  };

  const onCopyLink = async () => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  };

  const onShare = async () => {
    if (typeof window === 'undefined') return;
    const text = `${displayName} — ${stats.label}`;
    const shareData = { title: 'Policy Wrapped', text, url: window.location.href };

    // Web Share API (mobile). If supported, prefer sharing the generated image file so
    // Instagram/TikTok show up as targets in the native share sheet.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const navAny = navigator as any;
    if (navAny.share) {
      try {
        const blob = await getShareCardBlob();
        if (blob) {
          const file = new File([blob], 'policy-wrapped.png', { type: 'image/png' });
          if (!navAny.canShare || navAny.canShare({ files: [file] })) {
            await navAny.share({ ...shareData, files: [file] });
            return;
          }
        }
        await navAny.share(shareData);
        return;
      } catch {
        // fall back to download/copy
      }
    }

    // Desktop fallback: download image + copy link
    const didDownload = await downloadShareCard();
    if (!didDownload) await onCopyLink();
  };

  const onClear = () => {
    clearWrappedProfile();
    setSelectedIds([]);
    setFirstName(undefined);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <Link
          href="/wrapped"
          className="text-sm font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
        >
          ← Back to picker
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={onShare}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2F3BBD] text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            type="button"
            disabled={exporting}
          >
            <Share2 className="w-4 h-4" />
            {exporting ? 'Preparing…' : 'Share'}
          </button>
          <button
            onClick={downloadShareCard}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white font-bold border-4 border-black dark:border-gray-600"
            type="button"
            disabled={exporting}
            title="Download a story-sized PNG for Instagram/TikTok"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exporting…' : 'Download image'}
          </button>
          <button
            onClick={onCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-black dark:text-white font-bold border-4 border-black dark:border-gray-600"
            type="button"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied' : 'Copy link'}
          </button>
          <button
            onClick={onClear}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 text-black dark:text-white font-bold border-2 border-black dark:border-gray-600"
            type="button"
            title="Clear selections"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {selectedPolicies.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-8 text-center">
          <h1 className="font-display text-4xl font-black text-black dark:text-white mb-3">
            No picks yet
          </h1>
          <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-6">
            Build your Policy Profile by choosing the issues you care about.
          </p>
          <Link
            href="/wrapped"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            Start Policy Wrapped
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Share card preview */}
          <div>
            <div
              ref={shareCardRef}
              className="border-4 border-black dark:border-gray-600 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[10px_10px_0px_0px_rgba(75,85,99,1)] bg-gradient-to-b from-[#121212] to-[#0b1a3a] text-white p-6 aspect-[9/16] w-full max-w-md mx-auto"
            >
              <div className="flex items-center justify-between">
                <div className="font-display font-black text-sm tracking-wide opacity-90">
                  Policy Wrapped
                </div>
                <div className="text-xs font-bold opacity-80">
                  {new Date().getFullYear()}
                </div>
              </div>

              <div className="mt-6">
                <h1 className="font-display font-black text-3xl leading-tight">
                  {displayName}
                </h1>
                <p className="mt-2 font-body font-bold text-white/85">
                  Label: <span className="text-white">{stats.label}</span>
                </p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-white/10 border border-white/20 p-3">
                  <div className="text-2xl font-black">{selectedPolicies.length}</div>
                  <div className="text-xs font-bold text-white/80">Key issues</div>
                </div>
                <div className="bg-white/10 border border-white/20 p-3">
                  <div className="text-2xl font-black">{stats.avgConsensusSupport}%</div>
                  <div className="text-xs font-bold text-white/80">Avg consensus support</div>
                </div>
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold text-white/70 mb-2">
                  Top priorities
                </div>
                <ol className="space-y-2">
                  {selectedPolicies.slice(0, 5).map((p, idx) => (
                    <li key={p.id} className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm">
                          {idx + 1}. {p.title}
                        </div>
                        <div className="text-xs text-white/70 font-medium">
                          {p.category.replace('-', ' ')}
                        </div>
                      </div>
                      <div className="text-sm font-black">{p.averageSupport}%</div>
                    </li>
                  ))}
                </ol>
                {selectedPolicies.length > 5 && (
                  <div className="mt-3 text-xs font-bold text-white/75">
                    +{selectedPolicies.length - 5} more
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6">
                <div className="text-xs font-bold text-white/70">
                  Build yours at
                </div>
                <div className="text-sm font-black break-all">
                  {currentUrl || '…'}
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
              
            </p>
            {exportError && (
              <p className="mt-3 text-sm font-bold text-[#C91A2B] text-center">
                {exportError}
              </p>
            )}
          </div>

          {/* Details + comparisons */}
          <div>
            <h2 className="font-display text-5xl font-black text-black dark:text-white mb-3 leading-tight">
              {displayName}
            </h2>
            <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium mb-6">
              Your profile is a simple “voting list” of what you want tackled first.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-black border-4 border-black p-5">
                <div className="text-4xl font-display font-black text-white">{selectedPolicies.length}</div>
                <div className="text-xs font-body text-white/80 font-bold">Priorities picked</div>
              </div>
              <div className="bg-white border-4 border-black p-5">
                <div className="text-4xl font-display font-black text-black">{stats.avgConsensusSupport}%</div>
                <div className="text-xs font-body text-gray-600 font-bold">Avg consensus support</div>
              </div>
              <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-4 border-black p-5">
                <div className="text-xl font-display font-black text-white leading-tight">{stats.label}</div>
                <div className="text-xs font-body text-white/80 font-bold">Your label</div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-6 mb-8">
              <h3 className="font-display text-2xl font-black text-black dark:text-white mb-4">
                Your key issues
              </h3>
              <ol className="space-y-3">
                {selectedPolicies.map((p, idx) => (
                  <li key={p.id} className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="font-bold text-black dark:text-white">
                        {idx + 1}. {p.title}
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {p.category.replace('-', ' ')} • {p.averageSupport}% bipartisan support
                      </div>
                    </div>
                    <Link
                      href={`/policies/${p.id}`}
                      className="inline-flex items-center gap-1 text-sm font-bold underline text-black dark:text-white"
                    >
                      Details <ExternalLink className="w-4 h-4" />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            
          </div>
        </div>
      )}
    </div>
  );
}


