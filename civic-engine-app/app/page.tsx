import Link from 'next/link';
import { ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import PolicyList from '@/components/PolicyList';
import { getTopPolicies } from '@/data/policies';

export default function Home() {
  const topTenPolicies = getTopPolicies(10);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-dark to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">
                Policies with 55%+ Bipartisan Support
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              What <span className="text-accent-light">Most of Us</span> Agree On
            </h1>

            {/* Hero Subtitle */}
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover the policies that unite Americans across party lines.
              Every policy shown has majority support from Democrats,
              Republicans, and Independents.
            </p>

            {/* Hero Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-8">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-accent-light" />
                <div className="text-left">
                  <div className="text-2xl font-bold">20</div>
                  <div className="text-sm text-blue-200">Consensus Policies</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-accent-light" />
                <div className="text-left">
                  <div className="text-2xl font-bold">70%+</div>
                  <div className="text-sm text-blue-200">Average Support</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-6 h-6 text-accent-light" />
                <div className="text-left">
                  <div className="text-2xl font-bold">2025</div>
                  <div className="text-sm text-blue-200">Latest Data</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/top20"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary font-bold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <span>View All 20 Policies</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/compare"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Compare Policies
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="relative">
          <svg
            className="w-full h-12 sm:h-16 fill-current text-neutral-light"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C300,60 900,60 1200,0 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Top 10 Policies Section */}
      <section className="bg-neutral-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PolicyList
            policies={topTenPolicies}
            title="Top 10 Policies"
            subtitle="These are the most widely supported policy proposals across America, based on recent polling data."
          />

          {/* View More Link */}
          <div className="mt-12 text-center">
            <Link
              href="/top20"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <span>See All 20 Policies</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-neutral-dark mb-6">
            Data You Can Trust
          </h2>
          <p className="text-neutral text-lg leading-relaxed mb-8">
            All policy data comes from reputable, non-partisan polling organizations
            including YouGov, Pew Research Center, and the Associated Press-NORC.
            Each policy shown has documented support of at least 55% from Democrats,
            Republicans, and Independents.
          </p>
          <a
            href="https://americans-agree.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary-dark font-medium"
          >
            <span>Explore the Data Source</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
}
