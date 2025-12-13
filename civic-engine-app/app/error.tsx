'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-display text-6xl font-black text-black dark:text-white mb-4">
          Oops!
        </h1>
        <p className="font-body text-xl text-gray-700 dark:text-gray-300 mb-8">
          Something went wrong.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#2F3BBD] text-white font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
