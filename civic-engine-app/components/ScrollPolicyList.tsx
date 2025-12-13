'use client';

import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Policy } from '@/types/policy';

type SortOptionGroup = {
  label: string;
  options: { value: string; label: string }[];
};

interface ScrollPolicyListProps {
  policies: Policy[];
  sortBy?: string;
  setSortBy?: (value: string) => void;
  sortOptionGroups?: SortOptionGroup[];
}

export default function ScrollPolicyList({
  policies,
  sortBy,
  setSortBy,
  sortOptionGroups,
}: ScrollPolicyListProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [transitionProgress, setTransitionProgress] = useState<number>(0);
  const [maxWindowHeight, setMaxWindowHeight] = useState<string>('calc(100vh - 8rem)');
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [entryDirectionState, setEntryDirectionState] = useState<'UP' | 'DOWN'>('DOWN');

  const containerRef = useRef<HTMLDivElement>(null);
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const policyWindowRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const desktopButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const desktopHeaderRef = useRef<HTMLHeadingElement>(null);
  const [buttonPositions, setButtonPositions] = useState<{ top: number; height: number }[]>([]);
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const lastScrollYRef = useRef<number>(0);
  const scrollDirectionRef = useRef<'UP' | 'DOWN'>('DOWN');
  const isProgrammaticScrollRef = useRef<boolean>(false);
  const isObserverLockedRef = useRef<boolean>(false);

  useEffect(() => {
    const calculateHeight = () => {
      const viewportHeight = window.innerHeight;
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      const reservedSpace = mobile ? 272 : 216;
      const calculatedHeight = viewportHeight - reservedSpace;
      setMaxWindowHeight(`${calculatedHeight}px`);
    };
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, []);

  useEffect(() => {
    const measurePositions = () => {
      if (desktopHeaderRef.current) {
        const headerRect = desktopHeaderRef.current.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(desktopHeaderRef.current);
        const marginBottom = parseFloat(computedStyle.marginBottom);
        setHeaderHeight(headerRect.height + marginBottom);
      }
      const positions = desktopButtonRefs.current.map((button) => {
        if (!button) return { top: 0, height: 0 };
        const rect = button.getBoundingClientRect();
        const top = button.offsetTop;
        const height = rect.height;
        return { top, height };
      });
      setButtonPositions(positions);
    };
    const timer = setTimeout(measurePositions, 100);
    window.addEventListener('resize', measurePositions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measurePositions);
    };
  }, [policies]);

  useEffect(() => {
    const observers = scrollSectionRefs.current.map((ref, index) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (isObserverLockedRef.current) return;
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        { threshold: 0, rootMargin: isMobile ? '-10% 0px -80% 0px' : '-45% 0px -45% 0px' }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((observer) => observer?.disconnect());
  }, [policies, isMobile]);

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleContentScroll = () => {
      const maxScroll = contentElement.scrollHeight - contentElement.clientHeight;
      const atBottom = contentElement.scrollTop >= maxScroll - 5;
      const atTop = contentElement.scrollTop <= 5;
      setIsAtBottom(atBottom);
      setIsAtTop(atTop);
    };

    contentElement.addEventListener('scroll', handleContentScroll, { passive: true });
    return () => contentElement.removeEventListener('scroll', handleContentScroll);
  }, [activeIndex]);

  useEffect(() => {
    let animationFrameId: number;
    let scrollEndTimeout: NodeJS.Timeout;

    const handlePageScroll = () => {
      if (isProgrammaticScrollRef.current) return;

      const currentSection = scrollSectionRefs.current[activeIndex];
      const policyWindow = policyWindowRef.current;

      const scrollY = window.scrollY;
      const scrollDirection = scrollY > lastScrollYRef.current ? 'DOWN' :
        scrollY < lastScrollYRef.current ? 'UP' :
          scrollDirectionRef.current;

      if (scrollY !== lastScrollYRef.current) {
        scrollDirectionRef.current = scrollDirection;
      }
      lastScrollYRef.current = scrollY;

      if (!currentSection || !contentRef.current || !policyWindow) return;

      const sectionRect = currentSection.getBoundingClientRect();
      const windowRect = policyWindow.getBoundingClientRect();
      const sectionHeight = currentSection.offsetHeight;
      const windowTop = windowRect.top;

      const relativeScroll = windowTop - sectionRect.top;
      const rawProgress = sectionHeight > 0 ? relativeScroll / sectionHeight : 0;
      const progress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(progress);

      if (!isTransitioning) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          if (!contentRef.current) return;

          const maxScroll = contentRef.current.scrollHeight - contentRef.current.clientHeight;
          const speedRatio = isMobile ? 0.90 : 0.65;
          const adjustedProgress = Math.min(1, progress / speedRatio);
          const targetScroll = adjustedProgress * maxScroll;

          contentRef.current.scrollTop = targetScroll;

          const atBottom = targetScroll >= maxScroll - 5;
          const atTop = targetScroll <= 5;
          setIsAtBottom(atBottom);
          setIsAtTop(atTop);
        });
      }

      const isMobileView = window.innerWidth < 1024;
      if (isAtBottom && activeIndex < policies.length - 1) {
        const pullStart = isMobileView ? 0.85 : 0.90;
        const pullLength = isMobileView ? 0.15 : 0.10;

        const deadZoneProgress = Math.max(0, Math.min(1, (progress - pullStart) / pullLength));
        setTransitionProgress(deadZoneProgress);

        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => setTransitionProgress(0), 150);
      } else {
        setTransitionProgress(0);
      }
    };

    const handleScrollEnd = () => {
      if (isProgrammaticScrollRef.current) return;

      clearTimeout(scrollEndTimeout);
      scrollEndTimeout = setTimeout(() => {
        const isMobileView = window.innerWidth < 1024;
        const threshold = isMobileView ? 0.3 : 0.5;
        if (transitionProgress > threshold && activeIndex < policies.length - 1) {
          scrollToPolicy(activeIndex + 1);
        }
      }, 100);
    };

    window.addEventListener('scroll', handlePageScroll, { passive: true });
    window.addEventListener('scroll', handleScrollEnd, { passive: true });
    window.addEventListener('touchend', handleScrollEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', handlePageScroll);
      window.removeEventListener('scroll', handleScrollEnd);
      window.removeEventListener('touchend', handleScrollEnd);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollEndTimeout);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeIndex, policies.length, isAtBottom, isTransitioning, isMobile, transitionProgress]);

  const scrollToPolicy = (index: number) => {
    const targetRef = scrollSectionRefs.current[index];
    if (!targetRef) return;

    isProgrammaticScrollRef.current = true;
    isObserverLockedRef.current = true;

    const yOffset = -20;
    const y = targetRef.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveIndex(index);

    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      isObserverLockedRef.current = false;
    }, 800);
  };

  return (
    <div ref={mainContainerRef} className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Nav */}
      <div className="lg:hidden sticky top-20 z-50 mb-4 pointer-events-auto">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] flex items-center justify-between overflow-hidden relative pointer-events-auto"
        >
          <div className="flex items-center space-x-2 relative flex-1 min-w-0 pr-4">
            {policies.map((policy, index) => {
              if (index !== activeIndex && index !== activeIndex + 1) return null;
              const isCurrent = index === activeIndex;
              const isNext = index === activeIndex + 1;
              const yOffset = isCurrent ? -transitionProgress * 100 : isNext ? (1 - transitionProgress) * 100 : 0;
              return (
                <motion.span
                  key={policy.id}
                  className="font-display font-black text-sm text-black dark:text-white absolute left-0 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
                  animate={{
                    y: `${yOffset}%`,
                    opacity: isCurrent ? 1 - transitionProgress : transitionProgress,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {index + 1}. {policy.title}
                </motion.span>
              );
            })}
          </div>
          <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <svg className="w-5 h-5 text-black dark:text-white" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-white dark:bg-gray-800 border-4 border-t-0 border-black dark:border-gray-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] -mt-1 pointer-events-auto"
            >
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                {sortBy && setSortBy && sortOptionGroups && (
                  <div className="mb-3 px-1">
                    <label htmlFor="mobile-sort-select" className="block font-display font-bold text-xs text-gray-600 dark:text-gray-400 mb-1">
                      Sort by
                    </label>
                    <select
                      id="mobile-sort-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full font-display font-bold text-sm text-black dark:text-white bg-gray-50 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 px-3 py-2 rounded outline-none cursor-pointer"
                    >
                      {sortOptionGroups.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  {policies.map((policy, index) => (
                    <button
                      key={policy.id}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        scrollToPolicy(index);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-display font-bold transition-colors border-2 border-black dark:border-gray-600 pointer-events-auto ${activeIndex === index ? 'bg-[#C91A2B] text-white' : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white'}`}
                    >
                      {index + 1}. {policy.title}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24 self-start z-20">
        <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)] relative overflow-hidden">
          <h3 ref={desktopHeaderRef} className="font-display font-black text-sm mb-4 text-black dark:text-white">Policies</h3>
          {(() => {
            const shouldRender = buttonPositions.length > 0 && buttonPositions[activeIndex];
            const rectTop = shouldRender ? headerHeight + buttonPositions[activeIndex].top + 18 : 0;
            const rectHeightRaw = shouldRender && transitionProgress > 0 && activeIndex < policies.length - 1 && buttonPositions[activeIndex + 1]
              ? buttonPositions[activeIndex].height + transitionProgress * (buttonPositions[activeIndex + 1].top - buttonPositions[activeIndex].top)
              : shouldRender ? buttonPositions[activeIndex].height : 0;
            const rectHeight = Math.max(0, rectHeightRaw - 2);

            return shouldRender ? (
              <motion.div
                className="absolute left-4 right-4 bg-[#C91A2B] pointer-events-none z-0"
                initial={false}
                animate={{ top: rectTop, height: rectHeight }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            ) : null;
          })()}
          <div className="space-y-2 relative z-10">
            {policies.map((policy, index) => (
              <button
                key={policy.id}
                ref={(el) => { desktopButtonRefs.current[index] = el; }}
                onClick={() => scrollToPolicy(index)}
                className={`w-full text-left px-3 py-2 text-xs font-display font-bold transition-colors border-2 border-black dark:border-gray-600 ${activeIndex === index ? 'text-white' : 'text-black dark:text-white'}`}
              >
                {index + 1}. {policy.title}
              </button>
            ))}
          </div>
        </div>

        {sortBy && setSortBy && sortOptionGroups && (
          <div className="mt-4">
            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
              <label htmlFor="desktop-sort-select" className="block font-display font-black text-xs text-gray-600 dark:text-gray-400 mb-2">
                SORT BY
              </label>
              <select
                id="desktop-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full font-display font-bold text-sm text-black dark:text-white bg-transparent border-2 border-black dark:border-gray-600 px-3 py-2 outline-none cursor-pointer"
              >
                {sortOptionGroups.map((group) => (
                  <optgroup key={group.label} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Scroll Container */}
      <div className="relative pb-48 lg:pb-32 flex-1" ref={containerRef} style={{ minWidth: 0 }}>
        <div ref={policyWindowRef} className="sticky top-[180px] lg:top-24 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onAnimationStart={() => {
                setIsTransitioning(true);
                setEntryDirectionState(scrollDirectionRef.current);
              }}
              onAnimationComplete={() => setIsTransitioning(false)}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <PolicyWindow
                policy={policies[activeIndex]}
                isAtBottom={isAtBottom}
                hasNext={activeIndex < policies.length - 1}
                maxHeight={maxWindowHeight}
                entryDirection={entryDirectionState}
                onContentRefChange={(el) => { contentRef.current = el; }}
                displayRank={activeIndex + 1}
              />

              <AnimatePresence>
                {transitionProgress > 0 && activeIndex < policies.length - 1 && (
                  <motion.div
                    className="absolute top-full left-0 right-0 lg:hidden mt-4"
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 40 - transitionProgress * 60, opacity: transitionProgress }}
                    exit={{ y: 40, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] p-6">
                      <h2 className="font-display font-black text-2xl text-black dark:text-white mb-2">
                        {activeIndex + 2}. {policies[activeIndex + 1].title}
                      </h2>
                      <p className="font-body text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {policies[activeIndex + 1].averageSupport}% bipartisan support
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Invisible Scroll Sections */}
        <div className="relative lg:-mt-[80vh]">
          {policies.map((_, index) => (
            <div
              key={index}
              ref={(el) => { scrollSectionRefs.current[index] = el; }}
              className="h-[220vh] lg:h-[180vh]"
              style={{ pointerEvents: 'none' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PolicyWindow({
  policy,
  isAtBottom,
  hasNext,
  maxHeight,
  entryDirection,
  onContentRefChange,
  displayRank,
}: {
  policy: Policy;
  isAtBottom: boolean;
  hasNext: boolean;
  maxHeight: string;
  entryDirection: 'UP' | 'DOWN';
  onContentRefChange: (el: HTMLDivElement | null) => void;
  displayRank: number;
}) {
  const localRef = useRef<HTMLDivElement | null>(null);

  const setRefs = (element: HTMLDivElement | null) => {
    localRef.current = element;
    onContentRefChange(element);
  };

  useLayoutEffect(() => {
    const el = localRef.current;
    if (!el) return;
    if (entryDirection === 'UP') {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTop = 0;
    }
  }, [policy.id, entryDirection]);

  return (
    <div className="relative">
      <div
        ref={setRefs}
        className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)] overflow-hidden overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        id="content-container"
        aria-label={`Policy ${displayRank}: ${policy.title}`}
        style={{ maxHeight: maxHeight }}
      >
        <div className="px-6 pt-12 pb-6">
          <div className="mb-6">
            <h2 className="font-display font-black text-3xl text-black dark:text-white mb-2">
              {displayRank}. {policy.title}
            </h2>
          </div>

          <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium mb-6">
            {policy.description}
          </p>

          {/* Support stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-600 p-3">
              <div className="text-3xl font-display font-black text-black dark:text-white">{policy.averageSupport}%</div>
              <div className="text-xs font-body text-black dark:text-gray-300 font-bold">Avg Support</div>
            </div>
            {policy.partySupport && (
              <>
                <div className="bg-[#2F3BBD] border-2 border-black dark:border-gray-600 p-3">
                  <div className="text-2xl font-display font-black text-white">{policy.partySupport.democrats}%</div>
                  <div className="text-xs font-body text-white font-bold">Democrats</div>
                </div>
                <div className="bg-[#C91A2B] border-2 border-black dark:border-gray-600 p-3">
                  <div className="text-2xl font-display font-black text-white">{policy.partySupport.republicans}%</div>
                  <div className="text-xs font-body text-white font-bold">Republicans</div>
                </div>
                <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-2 border-black dark:border-gray-600 p-3">
                  <div className="text-2xl font-display font-black text-white">{policy.partySupport.independents}%</div>
                  <div className="text-xs font-body text-white/90 font-bold">Independents</div>
                </div>
              </>
            )}
          </div>

          {/* Key Details */}
          {policy.details && policy.details.length > 0 && (
            <div className="mb-6">
              <h3 className="font-display text-xl font-black text-black dark:text-white mb-3">Key Details</h3>
              <ul className="space-y-3">
                {policy.details.map((detail, index) => (
                  <li key={index}>
                    <h4 className="font-display font-black text-black dark:text-white mb-1">{detail.title}</h4>
                    <p className="font-body text-gray-700 dark:text-gray-300 font-medium">{detail.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Data Sources */}
          <div className="mb-4">
            <h3 className="font-display text-xl font-black text-black dark:text-white mb-3">Data Sources</h3>
            <ul className="space-y-2">
              {policy.sources.map((source, index) => (
                <li key={index}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-medium group text-sm"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="group-hover:underline">
                      {source.organization} ({source.year})
                      {source.supportPercentage && ` - ${source.supportPercentage}% support`}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-400 mb-6">
            Last updated: {new Date(policy.lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>

          {/* View Full Details Link */}
          <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-600">
            <Link
              href={`/policies/${policy.id}`}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2F3BBD] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all font-bold"
            >
              <span>View Full Details</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <AnimatePresence>
        {isAtBottom && hasNext && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[calc(100%+20px)] left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center px-4"
            >
              <span className="font-display font-bold text-sm text-center text-gray-600 dark:text-gray-400 mb-2 whitespace-nowrap">
                Continue scrolling for next policy
              </span>
              <div className="w-10 h-10 border-2 border-black dark:border-gray-600 bg-[#C91A2B] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(75,85,99,1)]">
                <svg className="w-5 h-5 text-white" fill="none" strokeWidth="3" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
