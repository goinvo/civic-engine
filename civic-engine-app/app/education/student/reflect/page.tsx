'use client';

import { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Download, Share2 } from 'lucide-react';
import { useDemoAuth } from '@/lib/auth/demo-auth-context';
import { demoDiscussions, demoReflections, demoPolicySet } from '@/lib/demo-data';
import { Button } from '@/components/education/ui/Button';
import { Card } from '@/components/education/ui/Card';
import { CivicProfileShareCardVideo } from '@/components/education/student';
import { StudentProgressHeader } from '@/components/education/student';
import { getPolicyById } from '@/data/policies';
import { cn } from '@/lib/utils';

export default function StudentReflectPage() {
  const { isAuthenticated, userType, user, loginAsStudent } = useDemoAuth();
  const [profileMode, setProfileMode] = useState<'static' | 'animated'>('animated');
  const [animT, setAnimT] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-login as student when visiting this page
  useEffect(() => {
    if (!isAuthenticated || userType !== 'student') {
      loginAsStudent(0);
    }
  }, [isAuthenticated, userType, loginAsStudent]);

  // Get policies from the demo policy set
  const policies = demoPolicySet.policies.map(p => getPolicyById(p.policyId)).filter(Boolean);

  // Animation playback effect
  useEffect(() => {
    if (!isPlaying || profileMode !== 'animated') return;
    const duration = 5000; // 5 seconds total animation
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
  }, [isPlaying, animT, profileMode]);

  // Autoplay when switching to animated mode
  useEffect(() => {
    if (profileMode === 'animated') {
      setAnimT(0);
      setIsPlaying(true);
    }
  }, [profileMode]);

  if (!isAuthenticated || userType !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg font-bold">Loading...</div>
      </div>
    );
  }

  const profileData = {
    studentName: user?.displayName || 'Alex',
    topPriorities: [
      { id: 'medicare-drug-negotiation', title: 'Medicare Drug Negotiation' },
      { id: 'raise-minimum-wage', title: 'Raise Minimum Wage' },
      { id: 'congress-stock-ban', title: 'Ban Congress Stock Trading' },
    ],
    quote: demoReflections[0]?.learningReflection || 'I learned that many issues I thought were "partisan" actually have broad support across parties.',
    stats: {
      policiesExplored: policies.length,
      discussionsJoined: demoDiscussions.filter(d => d.authorId === user?.id).length || 6,
      positionsRevised: 2,
    },
  };

  const handleDownload = () => {
    alert('In a real app, this would render the card to a PNG/MP4 and download it.');
  };

  const handleShare = (platform: string) => {
    alert(`In a real app, this would share to ${platform}.`);
  };

  return (
    <div className="min-h-screen bg-neutral-light dark:bg-gray-950">
      {/* Header with progress */}
      <StudentProgressHeader currentStep={4} />

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="font-display text-2xl font-black text-neutral-dark dark:text-white mb-2 text-center">
          Your Civic Profile
        </h1>
        <p className="text-center text-neutral dark:text-gray-400 mb-6">
          You&apos;ve completed the deliberation! Here&apos;s your shareable summary.
        </p>

        {/* Mode toggle */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-sm font-bold">View:</span>
          <button
            type="button"
            onClick={() => setProfileMode('static')}
            className={cn(
              'text-sm font-bold px-4 py-2 border-2 border-black transition-all',
              profileMode === 'static'
                ? 'bg-[#2F3BBD] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white hover:bg-gray-100'
            )}
          >
            Static
          </button>
          <button
            type="button"
            onClick={() => setProfileMode('animated')}
            className={cn(
              'text-sm font-bold px-4 py-2 border-2 border-black flex items-center gap-1 transition-all',
              profileMode === 'animated'
                ? 'bg-[#2F3BBD] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white hover:bg-gray-100'
            )}
          >
            <Sparkles className="w-4 h-4" />
            Animated
          </button>
        </div>

        {/* Profile display */}
        {profileMode === 'static' ? (
          <div
            className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white"
            style={{ aspectRatio: '1/1' }}
          >
            <div className="w-full h-full flex flex-col p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                <div className="w-10 h-10 bg-green-100 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-xs font-bold opacity-60 tracking-wide">DELIBERATION COMPLETE</span>
              </div>

              {/* Title */}
              <div className="mb-4 flex-shrink-0">
                <h2 className="font-display text-3xl font-black text-neutral-dark leading-tight">
                  {profileData.studentName}&apos;s
                </h2>
                <p className="text-xl font-black text-[#2F3BBD]">CIVIC PROFILE</p>
              </div>

              {/* Top Priorities */}
              <div className="py-4 flex-shrink-0">
                <p className="text-xs font-bold text-neutral mb-2 uppercase tracking-wide">
                  Top Priorities
                </p>
                <div className="space-y-2">
                  {profileData.topPriorities.slice(0, 3).map((priority, index) => (
                    <div
                      key={priority.id}
                      className="flex items-center gap-2 p-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="w-7 h-7 bg-[#2F3BBD] flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="font-bold text-neutral-dark text-sm">
                        {priority.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              {profileData.quote && (
                <div className="p-3 bg-neutral-light border-2 border-black italic text-neutral text-sm flex-shrink-0">
                  &ldquo;{profileData.quote.length > 120 ? profileData.quote.substring(0, 120) + '...' : profileData.quote}&rdquo;
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 py-4 flex-shrink-0">
                <div className="text-center p-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-xl font-black text-[#2F3BBD]">{profileData.stats.policiesExplored}</p>
                  <p className="text-[10px] font-bold text-neutral uppercase">Policies</p>
                </div>
                <div className="text-center p-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-xl font-black text-[#2F3BBD]">{profileData.stats.discussionsJoined}</p>
                  <p className="text-[10px] font-bold text-neutral uppercase">Discussions</p>
                </div>
                <div className="text-center p-2 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-xl font-black text-[#2F3BBD]">{profileData.stats.positionsRevised}</p>
                  <p className="text-[10px] font-bold text-neutral uppercase">Revised</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto pt-3 border-t-2 border-black flex justify-between items-center flex-shrink-0">
                <p className="text-xs font-black text-neutral-dark">civic-engine.app</p>
                <p className="text-xs font-bold opacity-60">{new Date().getFullYear()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            {/* Animated card container */}
            <div
              className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white"
              style={{ aspectRatio: '1/1' }}
            >
              <CivicProfileShareCardVideo
                {...profileData}
                t={animT}
                urlText="civic-engine.app"
              />
            </div>

            {/* Playback controls */}
            <Card variant="default" padding="md" className="mt-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (animT >= 1) setAnimT(0);
                    setIsPlaying(!isPlaying);
                  }}
                  className="p-2 bg-[#2F3BBD] text-white border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setAnimT(0);
                    setTimeout(() => setIsPlaying(true), 50);
                  }}
                  className="p-2 bg-white border-2 border-black hover:bg-gray-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <div className="flex-1 h-4 bg-gray-200 border-2 border-black relative">
                  <div
                    className="absolute inset-y-0 left-0 bg-[#2F3BBD]"
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
                <span className="text-sm font-mono font-black text-neutral-dark w-12 text-right">
                  {(animT * 5).toFixed(1)}s
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* Share Actions */}
        <div className="flex flex-wrap gap-3 justify-center mt-6">
          <Button
            variant="primary"
            onClick={handleDownload}
            leftIcon={<Download className="w-4 h-4" />}
          >
            {profileMode === 'animated' ? 'Export Video' : 'Download Image'}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare('Instagram')}
            leftIcon={<Share2 className="w-4 h-4" />}
          >
            Share to Instagram
          </Button>
          <Button
            variant="outline"
            onClick={() => handleShare('X')}
          >
            Share to X
          </Button>
        </div>

        {/* Export info */}
        {profileMode === 'animated' && (
          <p className="text-center text-sm text-neutral dark:text-gray-500 mt-4">
            Video export powered by Remotion. Creates a 5-second MP4 perfect for social media.
          </p>
        )}
      </div>
    </div>
  );
}
