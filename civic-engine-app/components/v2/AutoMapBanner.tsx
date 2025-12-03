'use client';

import { useValues } from '@/contexts/ValuesContext';
import Link from 'next/link';

interface AutoMapBannerProps {
  className?: string;
}

export function AutoMapBanner({ className = '' }: AutoMapBannerProps) {
  const { showAutoMapBanner, dismissAutoMapBanner } = useValues();

  if (!showAutoMapBanner) return null;

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-red-50 border-2 border-black p-4 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="font-semibold text-gray-900">
            Your V2 profile was auto-mapped from your V1 preferences
          </p>
          <p className="text-sm text-gray-600 mt-1">
            For more accurate results with the new 13-factor political economy model,
            consider retaking the questionnaire.
          </p>
          <Link
            href="/profile/questionnaire-v2"
            className="inline-block mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 underline"
          >
            Take V2 Questionnaire
          </Link>
        </div>
        <button
          onClick={dismissAutoMapBanner}
          className="text-gray-400 hover:text-gray-600 p-1"
          aria-label="Dismiss banner"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
