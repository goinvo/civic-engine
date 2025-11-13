'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shuffle } from 'lucide-react';
import CompareWidget from '@/components/CompareWidget';
import { policies } from '@/data/policies';
import { Policy } from '@/types/policy';

export default function ComparePage() {
  const [policyA, setPolicyA] = useState<Policy>(policies[0]);
  const [policyB, setPolicyB] = useState<Policy>(policies[1]);

  // Randomize policies
  const randomizePolicies = () => {
    const shuffled = [...policies].sort(() => Math.random() - 0.5);
    setPolicyA(shuffled[0]);
    setPolicyB(shuffled[1]);
  };

  const handleSelect = (winner: 'A' | 'B') => {
    // In the full version, this would record the preference
    console.log(`User selected: ${winner === 'A' ? policyA.title : policyB.title}`);
  };

  return (
    <div className="w-full min-h-screen bg-neutral-light">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-primary via-accent to-primary-light text-white">
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

          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Compare Policies
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl">
            Help us understand which policies matter most to you. Choose between
            two options to indicate your preference.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Randomize Button */}
          <div className="mb-8 text-center">
            <button
              onClick={randomizePolicies}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-primary rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-md hover:shadow-lg border border-gray-200"
            >
              <Shuffle className="w-5 h-5" />
              <span>Randomize Policies</span>
            </button>
          </div>

          {/* Compare Widget */}
          <CompareWidget
            policyA={policyA}
            policyB={policyB}
            onSelect={handleSelect}
          />

          {/* How it Works */}
          <div className="mt-16 bg-white rounded-xl shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-neutral-dark mb-4">
              How Policy Comparison Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="font-bold text-neutral-dark mb-2">
                  Review Both Options
                </h3>
                <p className="text-neutral text-sm">
                  Read the descriptions and support percentages for each policy
                  to understand what they propose.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="font-bold text-neutral-dark mb-2">
                  Make Your Choice
                </h3>
                <p className="text-neutral text-sm">
                  Select the policy you would prioritize if you could only choose
                  one to implement first.
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="font-bold text-neutral-dark mb-2">
                  Compare More (Full Version)
                </h3>
                <p className="text-neutral text-sm">
                  In the full platform, your comparisons help us rank policies
                  based on real voter preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Future Feature Notice */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="font-bold text-primary mb-2 flex items-center space-x-2">
              <span>🔮</span>
              <span>Coming Soon: Verified Voting</span>
            </h3>
            <p className="text-neutral-dark text-sm">
              The full version will include verified voter accounts, allowing you
              to participate in monthly policy rankings. Your comparisons will be
              recorded securely and contribute to understanding what policies
              Americans truly prioritize.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
