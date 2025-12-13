'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  Scale,
  Leaf,
  GraduationCap,
  Gavel,
  Building2,
  Shield,
  Hammer,
  DollarSign,
  Cpu,
  Lock,
  Users,
  Grid3x3
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type CategoryType =
  | 'all'
  | 'healthcare'
  | 'economy'
  | 'environment'
  | 'education'
  | 'justice'
  | 'governance'
  | 'civil-rights'
  | 'defense'
  | 'infrastructure'
  | 'technology'
  | 'security'
  | 'society'
  | 'other';

interface CategoryFilterProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
  policyCounts?: Record<string, number>;
}

const categories: Array<{
  id: CategoryType;
  label: string;
  icon: LucideIcon;
  color: string;
}> = [
  { id: 'all', label: 'All', icon: Grid3x3, color: 'bg-gray-100 text-gray-700 border-gray-300' },
  { id: 'healthcare', label: 'Healthcare', icon: Heart, color: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'governance', label: 'Governance', icon: Building2, color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'environment', label: 'Environment', icon: Leaf, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'justice', label: 'Justice', icon: Gavel, color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'education', label: 'Education', icon: GraduationCap, color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'economy', label: 'Economy', icon: DollarSign, color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'infrastructure', label: 'Infrastructure', icon: Hammer, color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'civil-rights', label: 'Civil Rights', icon: Scale, color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { id: 'defense', label: 'Defense', icon: Shield, color: 'bg-gray-50 text-gray-700 border-gray-200' },
  { id: 'technology', label: 'Technology', icon: Cpu, color: 'bg-slate-50 text-slate-700 border-slate-200' },
  { id: 'security', label: 'Security', icon: Lock, color: 'bg-yellow-50 text-yellow-800 border-yellow-200' },
  { id: 'society', label: 'Society', icon: Users, color: 'bg-teal-50 text-teal-800 border-teal-200' },
];

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  policyCounts = {}
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h3 className="text-sm font-semibold text-neutral-dark mb-3">Filter by Category</h3>

      {/* Desktop: Horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          const count = policyCounts[category.id] || 0;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all
                whitespace-nowrap flex-shrink-0 font-medium text-sm
                ${isSelected
                  ? 'ring-2 ring-primary ring-offset-2 shadow-md ' + category.color
                  : 'hover:shadow-md ' + category.color
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{category.label}</span>
              {count > 0 && category.id !== 'all' && (
                <span className="ml-1 px-1.5 py-0.5 bg-white/70 rounded text-xs font-bold">
                  {count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
