import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import PolicyListItem from '@/components/PolicyListItem';
import { getTopPolicies } from '@/data/policies';

export default function Home() {
  const topTenPolicies = getTopPolicies(10);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section - Left Aligned */}
      <section className="mb-16">
        <h1 className="font-display text-6xl sm:text-7xl font-black text-black mb-6 leading-tight">
          What Most of Us Agree On
        </h1>
        <p className="font-body text-xl text-gray-700 font-medium max-w-3xl mb-10">
          Discover the policies that unite Americans across party lines. Every policy shown has majority support from Democrats, Republicans, and Independents.
        </p>

        {/* Stats - Neobrutalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-yellow-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-5xl font-display font-black text-black">20</div>
            <div className="text-sm font-body text-black font-bold">Consensus Policies</div>
          </div>
          <div className="bg-blue-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-5xl font-display font-black text-black">70%+</div>
            <div className="text-sm font-body text-black font-bold">Average Support</div>
          </div>
          <div className="bg-pink-300 border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-5xl font-display font-black text-black">2025</div>
            <div className="text-sm font-body text-black font-bold">Latest Data</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <Link
            href="/top20"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold"
          >
            <span>View All 20 Policies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/compare"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-black text-black rounded-lg hover:bg-gray-100 transition-colors font-bold"
          >
            <span>Compare Policies</span>
          </Link>
        </div>
      </section>

      {/* Top 10 Policies - Simple List */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black mb-4">Top 10 Policies</h2>
        <p className="font-body text-gray-700 font-medium mb-8">
          These are the most widely supported policy proposals across America, based on recent polling data.
        </p>
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {topTenPolicies.map((policy) => (
            <PolicyListItem key={policy.id} policy={policy} />
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/top20"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-bold"
          >
            <span>See All 20 Policies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Info Section - Left Aligned */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black mb-6">
          Data You Can Trust
        </h2>
        <p className="font-body text-gray-700 font-medium max-w-3xl mb-6">
          All policy data comes from reputable, non-partisan polling organizations including YouGov, Pew Research Center, and the Associated Press-NORC. Each policy shown has documented support of at least 55% from Democrats, Republicans, and Independents.
        </p>
        <a
          href="https://americans-agree.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-black hover:text-gray-600 transition-colors font-bold underline"
        >
          <span>Explore the Data Source</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
