'use client';

import { useState } from 'react';
import { PolicyModifier, ModifierCategory } from '@/types/consensus';
import { POLICY_MODIFIERS } from '@/data/archetypesV2';

interface PolicyModifierTogglesProps {
  activeModifiers: string[];
  onToggle: (modifierId: string) => void;
  className?: string;
}

const CATEGORY_LABELS: Record<ModifierCategory, string> = {
  funding: 'Funding Source',
  implementation: 'Implementation',
  enforcement: 'Enforcement',
  timeline: 'Timeline',
};

const CATEGORY_ORDER: ModifierCategory[] = ['funding', 'implementation', 'enforcement', 'timeline'];

export function PolicyModifierToggles({
  activeModifiers,
  onToggle,
  className = '',
}: PolicyModifierTogglesProps) {
  const [expandedCategory, setExpandedCategory] = useState<ModifierCategory | null>(null);

  // Group modifiers by category
  const modifiersByCategory = CATEGORY_ORDER.reduce((acc, category) => {
    acc[category] = POLICY_MODIFIERS.filter((m) => m.category === category);
    return acc;
  }, {} as Record<ModifierCategory, PolicyModifier[]>);

  return (
    <div className={`space-y-3 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-700">Policy Modifiers</h4>
      <p className="text-xs text-gray-500">
        See how different implementation choices affect the score
      </p>

      <div className="space-y-2">
        {CATEGORY_ORDER.map((category) => {
          const modifiers = modifiersByCategory[category];
          const isExpanded = expandedCategory === category;
          const activeInCategory = modifiers.filter((m) =>
            activeModifiers.includes(m.id)
          );

          return (
            <div key={category} className="border-2 border-black">
              {/* Category header */}
              <button
                onClick={() =>
                  setExpandedCategory(isExpanded ? null : category)
                }
                className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium">
                  {CATEGORY_LABELS[category]}
                  {activeInCategory.length > 0 && (
                    <span className="ml-2 text-xs text-blue-600">
                      ({activeInCategory.length} active)
                    </span>
                  )}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Modifier options */}
              {isExpanded && (
                <div className="p-2 space-y-2 border-t-2 border-black">
                  {modifiers.map((modifier) => {
                    const isActive = activeModifiers.includes(modifier.id);
                    return (
                      <label
                        key={modifier.id}
                        className="flex items-start gap-2 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => onToggle(modifier.id)}
                          className="mt-0.5 h-4 w-4 text-blue-600 border-2 border-black focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <span
                            className={`text-sm font-medium ${
                              isActive ? 'text-blue-600' : 'text-gray-900'
                            }`}
                          >
                            {modifier.name}
                          </span>
                          <p className="text-xs text-gray-500 group-hover:text-gray-700">
                            {modifier.description}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activeModifiers.length > 0 && (
        <button
          onClick={() => activeModifiers.forEach((id) => onToggle(id))}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Clear all modifiers
        </button>
      )}
    </div>
  );
}
