import { TrendingUp, Sparkles } from 'lucide-react';

export function HowScoresWork() {
  return (
    <div className="mb-12">
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-8">
        <h2 className="font-display text-3xl font-black text-white mb-4">
          How This Affects Your Scores
        </h2>
        <p className="font-body text-lg text-white/90 font-medium mb-6">
          Every policy on this site has been scored across all seven of these factors. Your personalized
          scores are calculated by weighing each policy's strengths against what matters most to you.
        </p>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 bg-white/10 p-4 border-2 border-white/20">
            <TrendingUp className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="font-body text-sm text-white font-medium">
              Policies that score high on your top factors will show higher personalized scores
            </p>
          </div>
          <div className="flex items-start space-x-3 bg-white/10 p-4 border-2 border-white/20">
            <Sparkles className="w-5 h-5 text-white flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            <p className="font-body text-sm text-white font-medium">
              You'll see insights explaining why certain policies rank higher or lower for you specifically
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
