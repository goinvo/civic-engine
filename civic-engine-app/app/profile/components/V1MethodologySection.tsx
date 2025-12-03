import { Calculator, Scale } from 'lucide-react';

export function V1MethodologySection() {
  return (
    <div className="mb-12">
      <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
        Our Methodology
      </h2>

      <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-6">
        Our 7-Factor Policy Impact Score (PIS) framework mirrors how think tanks and non-partisan bodies like the CBO evaluate policy.
        Each factor uses concrete anchors—not subjective feelings—to ensure consistent, defensible scoring.
      </p>

      <div className="space-y-6">
        {/* Factor 1: Population Impact */}
        <FactorCard
          number={1}
          title="Population Impact (Scope)"
          description="Who is effectively touched by this?"
          rows={[
            { score: '0.0', label: 'Niche', description: '<0.1% of population (specific professional licensing)' },
            { score: '0.2', label: 'Community', description: 'Specific town, small industry, or rare demographic (1-5%)' },
            { score: '0.5', label: 'Demographic Slice', description: 'Major subgroup (parents of K-12 kids, seniors over 75)' },
            { score: '0.8', label: 'Broad Base', description: 'Majority of workforce or households (income tax, gas prices)' },
            { score: '1.0', label: 'Universal', description: '>90% of residents (Social Security, currency/inflation)' },
          ]}
        />

        {/* Factor 2: Economic Magnitude */}
        <FactorCard
          number={2}
          title="Economic Magnitude (Volume)"
          description="Relative to US GDP (~$28T) or Federal Budget (~$6T). Uses logarithmic brackets to prevent massive programs from drowning out everything else."
          rows={[
            { score: '0.0', label: 'Nominal', description: '<$100 Million (administrative tweaks)' },
            { score: '0.2', label: 'Minor', description: '$100M – $10 Billion (specific program funding)' },
            { score: '0.5', label: 'Major', description: '$10B – $200 Billion (major agency budgets, corporate subsidies)' },
            { score: '0.8', label: 'Systemic', description: '$200B – $1 Trillion (Medicare/Medicaid scale)' },
            { score: '1.0', label: 'Macro-Structural', description: '>$1 Trillion (tax code overhauls, banking regulations)' },
          ]}
        />

        {/* Factor 3: Intensity of Impact */}
        <FactorCard
          number={3}
          title="Intensity of Impact (Depth)"
          description="For the person affected, how much does their life change?"
          rows={[
            { score: '0.0', label: 'Procedural', description: 'Change in paperwork, mild reporting requirements' },
            { score: '0.3', label: 'Financial (Manageable)', description: 'Noticeable cost/savings (<5% of income), convenience changes' },
            { score: '0.6', label: 'Lifestyle', description: 'Changes daily habits, commute, significant income (>10%), employment eligibility' },
            { score: '0.9', label: 'Existential', description: 'Life/death, incarceration, deportation, housing stability, fundamental civil rights' },
          ]}
        />

        {/* Factor 4: Duration */}
        <FactorCard
          number={4}
          title="Duration (Time Horizon)"
          description="How long does the change last?"
          rows={[
            { score: '0.1', label: 'One-Off', description: 'Single stimulus check or one-time grant' },
            { score: '0.4', label: 'Term-Limited', description: 'Pilot program or policy with 1-5 year sunset clause' },
            { score: '0.7', label: 'Indefinite', description: 'Standard legislation (law of the land until repealed)' },
            { score: '1.0', label: 'Intergenerational', description: 'Constitutional amendments, major infrastructure, ecological preservation' },
          ]}
        />

        {/* Factor 5: Distributional Weight */}
        <FactorCard
          number={5}
          title="Distributional Weight (Equity)"
          description="Does this impact vulnerable populations where $1 matters more?"
          rows={[
            { score: '0.0', label: 'Regressive', description: 'Primarily benefits the wealthy or high-leverage corporations' },
            { score: '0.2', label: 'Neutral', description: 'Impacts everyone equally regardless of status' },
            { score: '0.5', label: 'Mixed', description: 'Impacts a mix of classes, or specific middle-income bracket' },
            { score: '0.8', label: 'Progressive', description: 'Specifically targets low-income, disabled, or marginalized groups' },
            { score: '1.0', label: 'Critical Safety Net', description: 'Impacts populations with zero leverage (foster children, homeless veterans)' },
          ]}
        />

        {/* Factor 6: Externalities */}
        <FactorCard
          number={6}
          title="Externalities (Spillover)"
          description="How many other systems break or change because of this?"
          rows={[
            { score: '0.1', label: 'Siloed', description: 'Effects contained within specific department (park signage rules)' },
            { score: '0.5', label: 'Adjacent', description: 'Affects 1-2 related sectors (EV mandates → auto + grid)' },
            { score: '1.0', label: 'Cascading', description: 'Affects >3 unrelated sectors (immigration → labor, housing, schools, tax revenue)' },
          ]}
        />

        {/* Factor 7: Implementation Complexity */}
        <FactorCard
          number={7}
          title="Implementation Complexity (Friction)"
          description="How hard is the machine working to do this? Higher = bigger undertaking."
          rows={[
            { score: '0.1', label: '"Stroke of a Pen"', description: 'Executive order or simple rule change, no new infrastructure' },
            { score: '0.5', label: 'Bureaucratic', description: 'New staff, IT systems, or coordination between 2-3 agencies' },
            { score: '1.0', label: 'Herculean', description: 'Coordination of 50 states, new federal agency, or inevitable Supreme Court challenges' },
          ]}
        />

        {/* The Calculation */}
        <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-[#C91A2B] border-2 border-black flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="font-display text-xl font-black text-black dark:text-white">
              The Calculation
            </h3>
          </div>
          <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
            Your personalized score is a weighted sum of each factor. We use a weighting that favors Intensity and Equity, as those drive "real world" impact:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 mb-4 font-mono text-sm text-black dark:text-white">
            <div>Score = 100 × (</div>
            <div className="ml-4">0.20 × Intensity +</div>
            <div className="ml-4">0.20 × Equity +</div>
            <div className="ml-4">0.16 × Duration +</div>
            <div className="ml-4">0.12 × Population +</div>
            <div className="ml-4">0.12 × Economic +</div>
            <div className="ml-4">0.10 × Externalities +</div>
            <div className="ml-4">0.10 × Implementation</div>
            <div>)</div>
          </div>
        </div>

        {/* Example Calculation */}
        <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-6">
          <h3 className="font-display text-xl font-black text-white mb-4">
            Example: Universal Pre-K
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <ScoreBox score="0.4" label="Population" />
            <ScoreBox score="0.5" label="Economic" />
            <ScoreBox score="0.8" label="Intensity" />
            <ScoreBox score="0.7" label="Duration" />
            <ScoreBox score="0.8" label="Equity" />
            <ScoreBox score="0.8" label="Externalities" />
            <ScoreBox score="0.8" label="Implementation" />
            <div className="bg-white p-3 border-2 border-black">
              <div className="font-display font-black text-black text-lg">70</div>
              <div className="font-body text-xs text-gray-600">Final Score</div>
            </div>
          </div>
          <p className="font-body text-sm text-white/90">
            This feels right: a major, society-altering policy, but not as totalizing as a constitutional amendment or currency replacement.
          </p>
        </div>

        {/* Default Weights Philosophy */}
        <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-black dark:bg-white border-2 border-black dark:border-gray-600 flex items-center justify-center">
              <Scale className="w-5 h-5 text-white dark:text-black" strokeWidth={2.5} />
            </div>
            <h3 className="font-display text-xl font-black text-black dark:text-white">
              Why These Weights?
            </h3>
          </div>
          <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
            Our default weighting emphasizes life-changing individual impact and fairness over raw scale or political feasibility—reflecting
            that most people care more about whether a policy genuinely helps those who need it than whether it's easy to pass.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <WeightBox weight="20%" label="Intensity" variant="red" />
            <WeightBox weight="20%" label="Equity" variant="red" />
            <WeightBox weight="16%" label="Duration" variant="blue" />
            <WeightBox weight="12%" label="Population" variant="gray" />
            <WeightBox weight="12%" label="Economic" variant="gray" />
            <WeightBox weight="10%" label="Externalities" variant="gray" />
            <WeightBox weight="10%" label="Implementation" variant="gray" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components

interface FactorCardProps {
  number: number;
  title: string;
  description: string;
  rows: { score: string; label: string; description: string }[];
}

function FactorCard({ number, title, description, rows }: FactorCardProps) {
  return (
    <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
      <h3 className="font-display text-xl font-black text-black dark:text-white mb-2">
        {number}. {title}
      </h3>
      <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 italic">
        {description}
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <tbody className="divide-y-2 divide-black dark:divide-gray-600">
            {rows.map((row) => (
              <tr key={row.score}>
                <td className="py-2 pr-4 font-display font-black text-black dark:text-white w-16">
                  {row.score}
                </td>
                <td className="py-2 font-body text-gray-700 dark:text-gray-300">
                  <strong>{row.label}:</strong> {row.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ScoreBox({ score, label }: { score: string; label: string }) {
  return (
    <div className="bg-white/20 p-3 border-2 border-white/30">
      <div className="font-display font-black text-white text-lg">{score}</div>
      <div className="font-body text-xs text-white/80">{label}</div>
    </div>
  );
}

function WeightBox({ weight, label, variant }: { weight: string; label: string; variant: 'red' | 'blue' | 'gray' }) {
  const bgClasses = {
    red: 'bg-[#C91A2B] border-black',
    blue: 'bg-[#2F3BBD] border-black',
    gray: 'bg-gray-100 dark:bg-gray-700 border-black dark:border-gray-600',
  };
  const textClasses = {
    red: 'text-white',
    blue: 'text-white',
    gray: 'text-black dark:text-white',
  };
  const labelClasses = {
    red: 'text-white/90',
    blue: 'text-white/90',
    gray: 'text-gray-600 dark:text-gray-400',
  };

  return (
    <div className={`text-center p-3 border-2 ${bgClasses[variant]}`}>
      <div className={`font-display font-black text-lg ${textClasses[variant]}`}>{weight}</div>
      <div className={`font-body text-xs ${labelClasses[variant]}`}>{label}</div>
    </div>
  );
}
