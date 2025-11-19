import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import PolicyListItem from '@/components/PolicyListItem';
import { getTopPolicies } from '@/data/policies';

export default function Top20Page() {
  const allPolicies = getTopPolicies(20);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-black hover:text-gray-600 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Top 10</span>
        </Link>
      </div>

      {/* Header - Left Aligned */}
      <section className="mb-16">
        <h1 className="font-display text-6xl sm:text-7xl font-black text-black mb-6 leading-tight">
          All {allPolicies.length} Policies
        </h1>
        <p className="font-body text-xl text-gray-700 font-medium max-w-3xl mb-10">
          Every policy shown has majority support from Democrats, Republicans, and Independents. These are the issues that unite Americans across party lines.
        </p>

        {/* Stats - Neobrutalist Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#C91A2B] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl font-display font-black text-white">{allPolicies.length}</div>
            <div className="text-sm font-body text-white font-bold">Total Policies</div>
          </div>
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl font-display font-black text-black">76%</div>
            <div className="text-sm font-body text-black font-bold">Avg Support</div>
          </div>
          <div className="bg-[#2F3BBD] border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl font-display font-black text-white">55%+</div>
            <div className="text-sm font-body text-white font-bold">Min Bipartisan</div>
          </div>
          <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl font-display font-black text-black">2025</div>
            <div className="text-sm font-body text-black font-bold">Latest Data</div>
          </div>
        </div>
      </section>

      {/* All Policies List */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black mb-4">Complete List</h2>
        <p className="font-body text-gray-700 font-medium mb-8">
          Ranked by average bipartisan support across recent polling data.
        </p>
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {allPolicies.map((policy) => (
            <PolicyListItem key={policy.id} policy={policy} />
          ))}
        </div>
      </section>

      {/* Compare CTA - Neobrutalist Card */}
      <section className="mb-16">
        <div className="bg-gray-100 border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="font-display text-3xl sm:text-4xl font-black text-black mb-4">
            Want to Compare Policies?
          </h2>
          <p className="font-body text-black font-medium mb-6 max-w-2xl">
            Use our comparison tool to see how different policies stack up against each other and understand the nuances between them.
          </p>
          <Link
            href="/compare"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#C91A2B] text-white hover:opacity-90 transition-opacity font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <span>Compare Policies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Data Source Info */}
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
