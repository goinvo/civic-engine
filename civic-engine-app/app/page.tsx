'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import ExpandablePolicyCard from '@/components/ExpandablePolicyCard';
import ParticleWave from '@/components/ParticleWave';
import { getTopPolicies, getPoliciesCount } from '@/data/policies';

export default function Home() {
  const topPolicies = getTopPolicies(10);
  const totalPolicies = getPoliciesCount();
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      setNavbarHeight(navbar.offsetHeight);
    }
  }, []);

  const scrollToPolicies = () => {
    const policiesSection = document.getElementById('policies-section');
    policiesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggle = (policyId: string) => {
    setExpandedId(expandedId === policyId ? null : policyId);
  };

  return (
    <>
      {/* Full-Height Hero Section */}
      <section
        className="flex items-center justify-center relative px-6"
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          paddingBottom: '80px'
        }}
      >
        {/* Particle Wave Background */}
        <ParticleWave />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-black text-black dark:text-white mb-8 leading-tight">
            What Most of Us<br />Agree On
          </h1>
          <p className="font-body text-xl sm:text-2xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto mb-12">
            Discover the policies that unite Americans across party lines. Every policy shown has majority support from Democrats, Republicans, and Independents.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-black border-4 border-black p-6 sm:p-8">
              <div className="text-5xl sm:text-6xl font-display font-black text-white">{totalPolicies}</div>
              <div className="text-sm sm:text-base font-body text-white/80 font-bold">Consensus Policies</div>
            </div>
            <div className="bg-white border-4 border-black p-6 sm:p-8">
              <div className="text-5xl sm:text-6xl font-display font-black text-black">70%+</div>
              <div className="text-sm sm:text-base font-body text-gray-600 font-bold">Average Support</div>
            </div>
            <div className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-4 border-black p-6 sm:p-8">
              <div className="text-5xl sm:text-6xl font-display font-black text-white">2025</div>
              <div className="text-sm sm:text-base font-body text-white/80 font-bold">Latest Data</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/wrapped"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#C91A2B] text-white font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 text-lg"
              >
                <span>Build Your Policy Profile</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <button
                onClick={scrollToPolicies}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#2F3BBD] text-white font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 text-lg"
              >
                <span>See the Top 10</span>
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToPolicies}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-display font-bold text-sm text-gray-600 dark:text-gray-400 mb-2 group-hover:text-black dark:group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <div className="w-12 h-12 border-4 border-black bg-[#C91A2B] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:opacity-90 transition-opacity">
            <ChevronDown className="w-6 h-6 text-white" strokeWidth={3} />
          </div>
        </motion.button>
      </section>

      {/* Policies Section */}
      <section id="policies-section" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-5xl font-black text-black dark:text-white mb-4">
            Top 10 Policies
          </h2>
          <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium max-w-2xl mx-auto">
            These are the policies with the highest bipartisan support. Click any policy to learn more.
          </p>
        </div>

        {/* Expandable Policy Cards - 2x5 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          {topPolicies.map((policy, index) => (
            <ExpandablePolicyCard
              key={policy.id}
              policy={policy}
              rank={index + 1}
              isExpanded={expandedId === policy.id}
              onToggle={() => handleToggle(policy.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/top20"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#C91A2B] text-white font-bold border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all duration-150 text-lg"
          >
            <span>See All {totalPolicies} Policies</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-black text-black dark:text-white mb-6">
          Data You Can Trust
        </h2>
        <p className="font-body text-lg text-gray-700 dark:text-gray-300 font-medium max-w-3xl mx-auto mb-6">
          All policy data comes from reputable, non-partisan polling organizations including YouGov, Pew Research Center, and the Associated Press-NORC. Each policy shown has documented support of at least 55% from Democrats, Republicans, and Independents.
        </p>
        <a
          href="https://americans-agree.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold underline text-lg"
        >
          <span>Explore the Data Source</span>
          <ArrowRight className="w-5 h-5" />
        </a>
      </section>
    </>
  );
}
