'use client';

import { useState } from 'react';
import { Calculator, Scale, Layers, TrendingUp, Users, Heart, Sparkles, BookOpen } from 'lucide-react';
import { V4_LENS_DEFINITIONS, V4Lens } from '@/data/v4Methodology';
import { NEED_CATEGORY_DEFINITIONS, DIMENSION_DEFINITIONS } from '@/data/v3Methodology';
import { NEED_CATEGORY_ORDER, V3_NEED_INFO } from '@/data/archetypesV3';
import { FACTOR_DEFINITIONS } from '@/data/v2Methodology';
import { V2_FACTOR_INFO } from '@/data/archetypesV2';

type MethodologyTab = 'combined' | 'impact' | 'economics' | 'needs';

export function V4MethodologySection() {
  const [activeTab, setActiveTab] = useState<MethodologyTab>('combined');

  const tabs: { id: MethodologyTab; label: string; color: string }[] = [
    { id: 'combined', label: 'Combined', color: 'bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B]' },
    { id: 'impact', label: 'Impact', color: 'bg-[#2F3BBD]' },
    { id: 'economics', label: 'Economics', color: 'bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B]' },
    { id: 'needs', label: 'Needs', color: 'bg-[#7B2D8E]' },
  ];

  return (
    <div className="mb-12">
      <h2 className="font-display text-3xl font-black text-black dark:text-white mb-6">
        Combined Lens Methodology
      </h2>

      {/* Tab Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-display font-bold text-sm border-4 transition-all ${
              activeTab === tab.id
                ? `${tab.color} text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
                : 'bg-white dark:bg-gray-800 text-black dark:text-white border-black dark:border-gray-600 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            {tab.label} Lens
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'combined' && <CombinedMethodology />}
      {activeTab === 'impact' && <ImpactMethodology />}
      {activeTab === 'economics' && <EconomicsMethodology />}
      {activeTab === 'needs' && <NeedsMethodology />}
    </div>
  );
}

function CombinedMethodology() {
  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-r from-[#2F3BBD] via-[#7B2D8E] to-[#C91A2B] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0">
            <Layers className="w-7 h-7 text-[#7B2D8E]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-white mb-2">
              Three-Lens Framework
            </h3>
            <p className="font-body text-white/90 font-medium">
              The Combined Lens evaluates policies through three complementary perspectives,
              each capturing different aspects of policy impact and quality.
            </p>
          </div>
        </div>
      </div>

      {/* The Three Lenses */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['impact', 'economics', 'needs'] as V4Lens[]).map((lens) => {
          const info = V4_LENS_DEFINITIONS[lens];
          return (
            <div
              key={lens}
              className={`border-4 border-black dark:border-gray-600 bg-gradient-to-r ${info.gradient} p-5`}
            >
              <h4 className="font-display text-lg font-black text-white mb-2">
                {info.name}
              </h4>
              <p className="font-body text-sm text-white/90 font-medium">
                {info.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* How Scores Are Combined */}
      <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-black dark:bg-white border-2 border-black flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white dark:text-black" strokeWidth={2.5} />
          </div>
          <h3 className="font-display text-xl font-black text-black dark:text-white">
            How Scores Are Combined
          </h3>
        </div>
        <div className="space-y-4">
          <p className="font-body text-gray-700 dark:text-gray-300 font-medium">
            Each lens produces a score from 0-100. Your final score is a weighted combination
            based on your lens preferences from the questionnaire:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 font-mono text-sm text-black dark:text-white">
            <div>Final Score = (</div>
            <div className="ml-4">Impact Score × Impact Weight +</div>
            <div className="ml-4">Economics Score × Economics Weight +</div>
            <div className="ml-4">Needs Score × Needs Weight</div>
            <div>)</div>
          </div>
          <p className="font-body text-sm text-gray-600 dark:text-gray-400">
            Your weights are determined by your questionnaire responses. For example, if you prioritize
            human wellbeing (Humanist profile), the Needs Lens might be weighted at 50% while Impact
            and Economics each get 25%.
          </p>
        </div>
      </div>

      {/* Example */}
      <div className="border-4 border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-800 p-6">
        <h3 className="font-display text-xl font-black text-black dark:text-white mb-4">
          Example: Universal Pre-K
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="border-2 border-[#2F3BBD] bg-[#2F3BBD]/10 p-4">
            <div className="font-display font-black text-[#2F3BBD] text-2xl">70</div>
            <div className="font-body text-sm text-gray-600 dark:text-gray-400">Impact Score</div>
          </div>
          <div className="border-2 border-[#C91A2B] bg-[#C91A2B]/10 p-4">
            <div className="font-display font-black text-[#C91A2B] text-2xl">65</div>
            <div className="font-body text-sm text-gray-600 dark:text-gray-400">Economics Score</div>
          </div>
          <div className="border-2 border-[#7B2D8E] bg-[#7B2D8E]/10 p-4">
            <div className="font-display font-black text-[#7B2D8E] text-2xl">85</div>
            <div className="font-body text-sm text-gray-600 dark:text-gray-400">Needs Score</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-700 border-2 border-black dark:border-gray-600 p-4">
          <p className="font-body text-sm text-gray-700 dark:text-gray-300 mb-2">
            <strong>Balanced Profile (33/33/34):</strong> 70×0.33 + 65×0.33 + 85×0.34 = <strong>73.4</strong>
          </p>
          <p className="font-body text-sm text-gray-700 dark:text-gray-300">
            <strong>Humanist Profile (25/25/50):</strong> 70×0.25 + 65×0.25 + 85×0.50 = <strong>76.3</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

function ImpactMethodology() {
  return (
    <div className="space-y-6">
      {/* Header Card with Icon */}
      <div className="border-4 border-black dark:border-gray-600 bg-[#2F3BBD] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-7 h-7 text-[#2F3BBD]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-white mb-2">
              7-Factor Policy Impact Score
            </h3>
            <p className="font-body text-white/90 font-medium">
              The Impact Lens uses concrete, measurable factors to evaluate policy magnitude and feasibility.
            </p>
          </div>
        </div>
      </div>

      {/* Factor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'Population Impact', desc: 'How many people are affected (0.1% to 90%+)' },
          { name: 'Economic Magnitude', desc: 'Resource volume ($100M to $1T+)' },
          { name: 'Intensity', desc: 'How deeply lives change (procedural to existential)' },
          { name: 'Duration', desc: 'How long effects last (one-off to intergenerational)' },
          { name: 'Equity', desc: 'Distribution fairness (regressive to critical safety net)' },
          { name: 'Externalities', desc: 'Spillover effects (siloed to cascading)' },
          { name: 'Implementation', desc: 'Execution complexity (simple to herculean)' },
        ].map((factor, idx) => (
          <div key={idx} className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-5">
            <h4 className="font-display font-black text-black dark:text-white mb-1">
              {idx + 1}. {factor.name}
            </h4>
            <p className="font-body text-sm text-gray-600 dark:text-gray-400">{factor.desc}</p>
          </div>
        ))}
      </div>

      {/* Formula Card */}
      <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#C91A2B] border-2 border-black flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="font-display text-xl font-black text-black dark:text-white">
            Score Formula
          </h3>
        </div>
        <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
          Your personalized score is a weighted sum of each factor, with default weights emphasizing
          Intensity (20%) and Equity (20%) as these drive real-world impact on people&apos;s lives:
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 font-mono text-sm text-black dark:text-white">
          <div>Score = 100 × (</div>
          <div className="ml-4">0.20 × Intensity + 0.20 × Equity +</div>
          <div className="ml-4">0.16 × Duration + 0.12 × Population +</div>
          <div className="ml-4">0.12 × Economic + 0.10 × Externalities +</div>
          <div className="ml-4">0.10 × Implementation</div>
          <div>)</div>
        </div>
      </div>
    </div>
  );
}

function EconomicsMethodology() {
  const factorGroups = {
    'Mechanics & Structure': ['hayek', 'ostrom', 'downs', 'olson', 'keynes'],
    'Rights & Dynamics': ['pettit', 'hirschman', 'buchanan', 'polanyi'],
    'Justice & Distribution': ['rawls', 'george', 'acemoglu', 'walzer'],
  };

  return (
    <div className="space-y-6">
      {/* Header Card with Icon */}
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-r from-[#2F3BBD] to-[#C91A2B] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0">
            <Scale className="w-7 h-7 text-[#C91A2B]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-white mb-2">
              13-Factor Political Economy Framework
            </h3>
            <p className="font-body text-white/90 font-medium">
              The Economics Lens evaluates policies through the insights of major political economists,
              organized into three groups.
            </p>
          </div>
        </div>
      </div>

      {/* Factor Groups */}
      {Object.entries(factorGroups).map(([groupName, factors]) => (
        <div key={groupName}>
          <h4 className="font-display text-lg font-black text-black dark:text-white mb-3">
            {groupName}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {factors.map((factorId) => {
              const def = FACTOR_DEFINITIONS[factorId as keyof typeof FACTOR_DEFINITIONS];
              const info = V2_FACTOR_INFO[factorId as keyof typeof V2_FACTOR_INFO];
              if (!def) return null;
              return (
                <div key={factorId} className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-display font-black text-black dark:text-white">
                      {def.name}
                    </span>
                    <span className="font-body text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 border-2 border-black dark:border-gray-600">
                      {def.thinker}
                    </span>
                  </div>
                  <p className="font-body text-sm text-gray-600 dark:text-gray-400">
                    {info?.description?.slice(0, 120)}...
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Formula Card */}
      <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#2F3BBD] border-2 border-black flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="font-display text-xl font-black text-black dark:text-white">
            Score Formula
          </h3>
        </div>
        <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
          Each factor is scored 0-1 based on how well the policy aligns with that thinker&apos;s principles.
          Your weights determine how much each factor contributes to the final score:
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 font-mono text-sm text-black dark:text-white">
          Score = 100 × (Factor₁ × Weight₁ + Factor₂ × Weight₂ + ... + Factor₁₃ × Weight₁₃)
        </div>
      </div>
    </div>
  );
}

function NeedsMethodology() {
  return (
    <div className="space-y-6">
      {/* Header Card with Icon */}
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-r from-[#501159] to-[#7B2D8E] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 bg-white border-4 border-black flex items-center justify-center flex-shrink-0">
            <Heart className="w-7 h-7 text-[#7B2D8E]" strokeWidth={2.5} />
          </div>
          <div>
            <h3 className="font-display text-xl font-black text-white mb-2">
              Maslow-Inspired Needs Framework
            </h3>
            <p className="font-body text-white/90 font-medium">
              The Needs Lens evaluates how policies affect human wellbeing across five fundamental need categories.
            </p>
          </div>
        </div>

        {/* Scale Callout */}
        <div className="bg-black/20 border-4 border-white/20 p-4 mt-4">
          <p className="font-display text-sm font-black text-white mb-2">
            SCALE: 0-10 where 5 = neutral
          </p>
          <div className="flex gap-4 font-body font-medium text-sm">
            <span className="text-red-300">0-4: Harmful</span>
            <span className="text-white/70">5: Neutral</span>
            <span className="text-green-300">6-10: Beneficial</span>
          </div>
        </div>
      </div>

      {/* Need Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {NEED_CATEGORY_ORDER.map((category, index) => {
          const def = NEED_CATEGORY_DEFINITIONS[category];
          const info = V3_NEED_INFO[category];
          const isFirst = index === 0;
          return (
            <div
              key={category}
              className={`border-4 border-black dark:border-gray-600 p-5 ${
                isFirst
                  ? 'bg-[#501159] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white dark:bg-gray-800'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{info.icon}</span>
                <h4 className={`font-display text-lg font-black ${isFirst ? 'text-white' : 'text-black dark:text-white'}`}>
                  {def.name}
                </h4>
                <span className={`ml-auto font-display text-lg font-black ${isFirst ? 'text-white/80' : 'text-[#501159] dark:text-[#B87FB3]'}`}>
                  {Math.round(def.defaultWeight * 100)}%
                </span>
              </div>
              <p className={`font-body text-sm font-medium mb-3 ${isFirst ? 'text-white/90' : 'text-gray-600 dark:text-gray-400'}`}>
                {def.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {def.examples.slice(0, 2).map((ex, idx) => (
                  <span
                    key={idx}
                    className={`font-body text-xs font-medium px-2 py-1 border-2 ${
                      isFirst
                        ? 'border-white/30 bg-white/10 text-white'
                        : 'border-black dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Formula Card */}
      <div className="border-4 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#7B2D8E] border-2 border-black flex items-center justify-center">
            <Calculator className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <h3 className="font-display text-xl font-black text-black dark:text-white">
            Score Formula
          </h3>
        </div>
        <p className="font-body text-gray-700 dark:text-gray-300 font-medium mb-4">
          Each need category is scored 0-10 based on how the policy affects that need.
          Your weights determine how much each category contributes to the final score:
        </p>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 border-2 border-black dark:border-gray-600 font-mono text-sm text-black dark:text-white">
          Score = (Need₁ × Weight₁ + Need₂ × Weight₂ + ... + Need₅ × Weight₅) × 10
        </div>
      </div>
    </div>
  );
}
