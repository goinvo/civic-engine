'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, GraduationCap, Users, MessageSquare, Award, Compass } from 'lucide-react';
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
      {/* Hero Section */}
      <section
        className="flex items-center justify-center relative px-6"
        style={{
          minHeight: `calc(100vh - ${navbarHeight}px)`,
          paddingBottom: '80px'
        }}
      >
        <ParticleWave />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="relative px-6 py-10">
            {/* Background blur for legibility */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-white/85 dark:bg-black/40 blur-2xl [mask-image:radial-gradient(closest-side,rgba(0,0,0,1),rgba(0,0,0,0))]" />
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-neutral-dark dark:text-white mb-6 leading-tight">
              What Most of Us<br />Agree On
            </h1>

            <p className="text-lg text-neutral dark:text-gray-300 max-w-2xl mx-auto mb-10">
              Discover the policies that unite Americans across party lines. Every policy shown has majority support from Democrats, Republicans, and Independents.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-10">
              <motion.div
                className="bg-black border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -2 }}
              >
                <div className="text-3xl font-black text-white">{totalPolicies}</div>
                <div className="text-xs text-white/70">Policies</div>
              </motion.div>
              <motion.div
                className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -2 }}
              >
                <div className="text-3xl font-black text-neutral-dark">70%+</div>
                <div className="text-xs text-neutral">Avg Support</div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                whileHover={{ y: -2 }}
              >
                <div className="text-3xl font-black text-white">2025</div>
                <div className="text-xs text-white/70">Data</div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Compass className="w-4 h-4" />
                  Explore Problem Areas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
                <button
                  onClick={scrollToPolicies}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2F3BBD] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  See the Top 10
                  <ChevronDown className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToPolicies}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm text-neutral dark:text-gray-400 mb-2 group-hover:text-neutral-dark dark:group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <div className="w-10 h-10 border-2 border-black bg-[#C91A2B] flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <ChevronDown className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
        </motion.button>
      </section>

      {/* Policies Section */}
      <section id="policies-section" className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-dark dark:text-white mb-3">
            Top 10 Policies
          </h2>
          <p className="text-neutral dark:text-gray-400 max-w-xl mx-auto">
            The policies with the highest bipartisan support. Click any policy to learn more.
          </p>
        </div>

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

        <div className="mt-10 text-center">
          <motion.div className="inline-block" whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
            <Link
              href="/top20"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              See All {totalPolicies} Policies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-gray-100 dark:bg-gray-900 border-y-2 border-black dark:border-gray-600 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-neutral-dark dark:text-white mb-4">
            Data You Can Trust
          </h2>
          <p className="text-neutral dark:text-gray-400 mb-4">
            All policy data comes from reputable, non-partisan polling organizations including YouGov, Pew Research Center, and Associated Press-NORC. Each policy has 55%+ support from Democrats, Republicans, and Independents.
          </p>
          <motion.a
            href="https://americans-agree.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-neutral-dark dark:text-white font-bold border-b-2 border-current hover:text-[#C91A2B] transition-colors"
            whileHover={{ y: -1 }}
          >
            Explore the Data Source
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </section>

      {/* Education Section */}
      <section className="bg-[#2F3BBD] py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4">
              <GraduationCap className="w-7 h-7 text-[#2F3BBD]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              For Educators
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Bring civic engagement to your classroom. Help students form evidence-based opinions and engage in respectful discourse.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { icon: Users, title: 'Class Cohorts', desc: 'Private spaces with simple join codes' },
              { icon: MessageSquare, title: 'Guided Discussion', desc: 'Structured debates with evidence' },
              { icon: Award, title: 'Anonymous Grading', desc: 'Grade reasoning, not positions' },
              { icon: GraduationCap, title: 'Civic Profiles', desc: 'Shareable engagement records' },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
              >
                <div className="w-10 h-10 bg-[#E8EEFF] border-2 border-black flex items-center justify-center mb-3">
                  <feature.icon className="w-5 h-5 text-[#2F3BBD]" />
                </div>
                <h3 className="font-bold text-neutral-dark mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
              <Link
                href="/education/teacher"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2F3BBD] font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Teacher Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ y: 1 }}>
              <Link
                href="/education/student/onboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#C91A2B] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Student Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>

          <p className="text-center text-white/60 text-sm mt-4">
            Try the demo — no account required
          </p>
        </div>
      </section>
    </>
  );
}
