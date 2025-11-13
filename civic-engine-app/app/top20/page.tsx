import Link from 'next/link';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import PolicyList from '@/components/PolicyList';
import { getTopPolicies } from '@/data/policies';

export const metadata = {
  title: 'Top 20 Policies - Most of Us',
  description: 'View all 20 policies with the highest bipartisan support across America.',
};

export default function Top20Page() {
  const allPolicies = getTopPolicies(20);

  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-blue-100 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0 w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                Top 20 Consensus Policies
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 max-w-3xl">
                All 20 policies with the highest bipartisan support in America.
                Each has been validated by major polling organizations and has
                majority support across party lines.
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">20</div>
              <div className="text-sm text-blue-100">Total Policies</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">76%</div>
              <div className="text-sm text-blue-100">Avg Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">55%+</div>
              <div className="text-sm text-blue-100">Min Bipartisan</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold">2025</div>
              <div className="text-sm text-blue-100">Latest Data</div>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="bg-neutral-light py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PolicyList
            policies={allPolicies}
            subtitle="Ranked by average bipartisan support across recent polling data"
          />

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-white rounded-xl shadow-md p-8 sm:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-dark mb-4">
              Want to Compare Policies?
            </h2>
            <p className="text-neutral mb-6 max-w-2xl mx-auto">
              Use our comparison tool to see how different policies stack up
              against each other and understand the nuances between them.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <span>Compare Policies</span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Overview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-neutral-dark mb-8 text-center">
            Policy Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Healthcare', count: 3, color: 'bg-red-100 text-red-700' },
              { name: 'Governance', count: 5, color: 'bg-indigo-100 text-indigo-700' },
              { name: 'Environment', count: 4, color: 'bg-emerald-100 text-emerald-700' },
              { name: 'Justice', count: 2, color: 'bg-purple-100 text-purple-700' },
              { name: 'Education', count: 2, color: 'bg-blue-100 text-blue-700' },
              { name: 'Economy', count: 1, color: 'bg-green-100 text-green-700' },
              { name: 'Infrastructure', count: 2, color: 'bg-orange-100 text-orange-700' },
            ].map((category) => (
              <div
                key={category.name}
                className={`${category.color} rounded-lg p-4 text-center`}
              >
                <div className="text-2xl font-bold">{category.count}</div>
                <div className="text-sm font-medium">{category.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
