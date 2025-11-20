import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import PolicyListItem from '@/components/PolicyListItem';
import { getAllPoliciesSorted } from '@/data/policies';

export default function Top20Page() {
  const allPolicies = getAllPoliciesSorted();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Top 10</span>
        </Link>
      </div>

      {/* Header - Left Aligned */}
      <section className="mb-16">
        <h1 className="font-display text-6xl sm:text-7xl font-black text-black dark:text-white mb-6 leading-tight">
          All {allPolicies.length} Policies
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 font-medium max-w-3xl mb-10">
          Every policy shown has majority support from Democrats, Republicans, and Independents. These are the issues that unite Americans across party lines.
        </p>

        {/* Stats - Neobrutalist Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#C91A2B] border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-white">{allPolicies.length}</div>
            <div className="text-sm font-body text-white font-bold">Total Policies</div>
          </div>
          <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-black dark:text-white">76%</div>
            <div className="text-sm font-body text-black dark:text-gray-300 font-bold">Avg Support</div>
          </div>
          <div className="bg-[#2F3BBD] border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-white">55%+</div>
            <div className="text-sm font-body text-white font-bold">Min Bipartisan</div>
          </div>
          <div className="bg-white dark:bg-gray-700 border-4 border-black dark:border-gray-600 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
            <div className="text-4xl font-display font-black text-black dark:text-white">2025</div>
            <div className="text-sm font-body text-black dark:text-gray-300 font-bold">Latest Data</div>
          </div>
        </div>
      </section>

      {/* All Policies List */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black dark:text-white mb-4">Complete List</h2>
        <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-8">
          Ranked by average bipartisan support across recent polling data.
        </p>
        <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(75,85,99,1)]">
          {allPolicies.map((policy, index) => (
            <PolicyListItem key={policy.id} policy={policy} displayRank={index + 1} />
          ))}
        </div>
      </section>

      {/* Compare CTA removed */}

      {/* Data Source Info */}
      <section className="mb-16">
        <h2 className="font-display text-4xl font-black text-black dark:text-white mb-6">
          Data You Can Trust
        </h2>
        <p className="font-body text-gray-700 dark:text-gray-300 font-medium max-w-3xl mb-6">
          All policy data comes from reputable, non-partisan polling organizations including YouGov, Pew Research Center, and the Associated Press-NORC. Each policy shown has documented support of at least 55% from Democrats, Republicans, and Independents.
        </p>
        <a
          href="https://americans-agree.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors font-bold underline"
        >
          <span>Explore the Data Source</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </section>
    </div>
  );
}
