'use client';

import { useRef } from 'react';
import {
  Download,
  Share2,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

interface CivicProfileProps {
  studentName: string;
  topPriorities: Array<{
    id: string;
    title: string;
  }>;
  quote: string;
  stats: {
    policiesExplored: number;
    discussionsJoined: number;
    positionsRevised: number;
  };
  onDownloadImage?: () => void;
  onShare?: (platform: 'instagram' | 'twitter') => void;
  className?: string;
}

export function CivicProfile({
  studentName,
  topPriorities,
  quote,
  stats,
  onDownloadImage,
  onShare,
  className,
}: CivicProfileProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2">
          Your Civic Profile
        </h1>
        <p className="text-neutral dark:text-gray-400">
          You&apos;ve completed the deliberation! Here&apos;s your summary.
        </p>
      </div>

      {/* Share Card */}
      <div ref={cardRef} className="mb-6">
        <CivicProfileCard
          studentName={studentName}
          topPriorities={topPriorities}
          quote={quote}
          stats={stats}
        />
      </div>

      {/* Share Actions */}
      <div className="flex gap-3 justify-center">
        <Button
          variant="outline"
          onClick={onDownloadImage}
          leftIcon={<Download className="w-4 h-4" />}
        >
          Download Image
        </Button>
        <Button
          variant="outline"
          onClick={() => onShare?.('instagram')}
          leftIcon={<Share2 className="w-4 h-4" />}
        >
          Share to Instagram
        </Button>
        <Button
          variant="outline"
          onClick={() => onShare?.('twitter')}
          leftIcon={<ExternalLink className="w-4 h-4" />}
        >
          Share to X
        </Button>
      </div>
    </div>
  );
}

// The shareable card component
interface CivicProfileCardProps {
  studentName: string;
  topPriorities: Array<{ id: string; title: string }>;
  quote: string;
  stats: {
    policiesExplored: number;
    discussionsJoined: number;
    positionsRevised: number;
  };
  className?: string;
}

export function CivicProfileCard({
  studentName,
  topPriorities,
  quote,
  stats,
  className,
}: CivicProfileCardProps) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6',
        className
      )}
    >
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b-2 border-black dark:border-gray-700">
        <h2 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-1">
          {studentName}&apos;s
        </h2>
        <p className="text-lg font-black text-[#2F3BBD]">CIVIC PROFILE</p>
      </div>

      {/* Top Priorities */}
      <div className="mb-6">
        <p className="text-sm font-bold text-neutral dark:text-gray-400 mb-3 uppercase tracking-wide">
          Top Priorities
        </p>
        <div className="space-y-3">
          {topPriorities.map((priority, index) => (
            <div
              key={priority.id}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="w-10 h-10 bg-[#2F3BBD] flex items-center justify-center text-white font-black text-lg">
                {index + 1}
              </div>
              <span className="font-bold text-neutral-dark dark:text-white">
                {priority.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      {quote && (
        <div className="mb-6 p-4 bg-neutral-light dark:bg-gray-800 border-2 border-black dark:border-gray-600 italic text-neutral dark:text-gray-400">
          &ldquo;{quote.length > 100 ? quote.substring(0, 100) + '...' : quote}&rdquo;
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatBox label="Policies" value={stats.policiesExplored} />
        <StatBox label="Discussions" value={stats.discussionsJoined} />
        <StatBox label="Revised" value={stats.positionsRevised} />
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t-2 border-black dark:border-gray-700">
        <p className="text-sm font-bold text-neutral dark:text-gray-500">
          civic-engine.app
        </p>
      </div>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center p-3 bg-white dark:bg-gray-800 border-2 border-black dark:border-gray-600 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
      <p className="text-2xl font-black text-[#2F3BBD]">{value}</p>
      <p className="text-xs font-bold text-neutral dark:text-gray-400 uppercase">{label}</p>
    </div>
  );
}
