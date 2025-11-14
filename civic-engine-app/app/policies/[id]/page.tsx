import { notFound } from 'next/navigation';
import { policies } from '@/data/policies';
import { ArrowUpRight } from 'lucide-react';
import PolicyPageClient from './PolicyPageClient';

export function generateStaticParams() {
  return policies.map((policy) => ({
    id: policy.id,
  }));
}

export default async function PolicyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const policy = policies.find(p => p.id === id);

  if (!policy) {
    notFound();
  }

  return <PolicyPageClient policy={policy} />;
}

function PolicyContent({ policy }: { policy: typeof policies[0] }) {
  return (
    <>
      {/* Policy Header */}
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl font-black text-black mb-4 leading-tight">
          {policy.rank}. {policy.title}
        </h1>
        <p className="font-body text-xl text-gray-700 font-medium mb-6">
          {policy.description}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-300 border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-4xl font-display font-black text-black">{policy.averageSupport}%</div>
            <div className="text-xs font-body text-black font-bold">Avg Support</div>
          </div>
          {policy.partySupport && (
            <>
              <div className="bg-blue-300 border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-3xl font-display font-black text-black">{policy.partySupport.democrats}%</div>
                <div className="text-xs font-body text-black font-bold">Democrats</div>
              </div>
              <div className="bg-red-300 border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-3xl font-display font-black text-black">{policy.partySupport.republicans}%</div>
                <div className="text-xs font-body text-black font-bold">Republicans</div>
              </div>
              <div className="bg-green-300 border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-3xl font-display font-black text-black">{policy.partySupport.independents}%</div>
                <div className="text-xs font-body text-black font-bold">Independents</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Key Details */}
      <section className="mb-8 pb-8 border-b-4 border-black">
        <h2 className="font-display text-2xl font-black text-black mb-4">Key Details</h2>
        <ul className="space-y-4">
          {policy.details.map((detail, index) => (
            <li key={index}>
              <h3 className="font-display font-black text-black mb-1">{detail.title}</h3>
              <p className="font-body text-gray-700 font-medium">{detail.description}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* How It Works */}
      {policy.resourceFlow && (
        <section className="mb-8 pb-8 border-b-4 border-black">
          <h2 className="font-display text-2xl font-black text-black mb-4">How It Works</h2>
          <div className="bg-blue-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-xs font-display font-black text-black uppercase mb-2">From</div>
                <div className="font-body font-bold text-black">{policy.resourceFlow.from}</div>
              </div>
              <div>
                <div className="text-xs font-display font-black text-black uppercase mb-2">To</div>
                <div className="font-body font-bold text-black">{policy.resourceFlow.to}</div>
              </div>
              <div>
                <div className="text-xs font-display font-black text-black uppercase mb-2">How</div>
                <div className="font-body font-bold text-black">{policy.resourceFlow.channel}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* In Practice */}
      {policy.ifThen && policy.ifThen.length > 0 && (
        <section className="mb-8 pb-8 border-b-4 border-black">
          <h2 className="font-display text-2xl font-black text-black mb-4">In Practice</h2>
          <ul className="space-y-2">
            {policy.ifThen.map((statement, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="font-display text-black font-bold mt-0.5">→</span>
                <p className="font-body font-medium text-gray-700">{statement}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Policy Goal */}
      {policy.causalChain && (
        <section className="mb-8 pb-8 border-b-4 border-black">
          <h2 className="font-display text-2xl font-black text-black mb-4">Policy Goal</h2>
          <div className="bg-green-200 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="space-y-4">
              <div>
                <div className="text-xs font-display font-black text-black uppercase mb-2">Immediate Action</div>
                <p className="font-body font-bold text-black">{policy.causalChain.immediate}</p>
              </div>
              <div>
                <div className="text-xs font-display font-black text-black uppercase mb-2">Intended Outcome</div>
                <p className="font-body font-bold text-black">{policy.causalChain.outcome}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Common Questions */}
      {policy.commonQuestions && policy.commonQuestions.length > 0 && (
        <section className="mb-8 pb-8 border-b-4 border-black">
          <h2 className="font-display text-2xl font-black text-black mb-4">Common Questions</h2>
          <div className="space-y-6">
            {policy.commonQuestions.map((qa, index) => (
              <div key={index}>
                <h3 className="font-display font-black text-black mb-2">{qa.question}</h3>
                <p className="font-body font-medium text-gray-700">{qa.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Data Sources */}
      <section className="mb-8">
        <h2 className="font-display text-2xl font-black text-black mb-4">Data Sources</h2>
        <ul className="space-y-2">
          {policy.sources.map((source, index) => (
            <li key={index}>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors font-medium group"
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
      </section>

      {/* Last Updated */}
      <div className="text-sm text-gray-600">
        Last updated: {new Date(policy.lastUpdated).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </>
  );
}

export { PolicyContent };
