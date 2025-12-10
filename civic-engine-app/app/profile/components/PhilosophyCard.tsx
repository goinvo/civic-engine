import { BookOpen } from 'lucide-react';

interface PhilosophyCardProps {
  title: string;
  philosophyName: string;
  philosopher: string;
  philosophyDescription: string;
  thinkerBio?: string;
}

export function PhilosophyCard({
  title,
  philosophyName,
  philosopher,
  philosophyDescription,
  thinkerBio,
}: PhilosophyCardProps) {
  return (
    <div className="mb-12">
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(75,85,99,1)]">
        <h2 className="font-display text-2xl font-black text-white mb-3">
          {title}
        </h2>
        <div className="mb-4">
          <div className="font-display text-xl font-black text-white/90 mb-1">
            {philosophyName}
          </div>
          <div className="font-body text-sm text-white/70 font-medium">
            Aligned with {philosopher}
          </div>
        </div>
        <p className="font-body text-base text-white font-medium leading-relaxed">
          {philosophyDescription}
        </p>
      </div>

      {/* Thinker Bio Section */}
      {thinkerBio && (
        <div className="border-4 border-t-0 border-black dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 border-4 border-black dark:border-gray-600 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[#2F3BBD]" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-display text-lg font-black text-black dark:text-white mb-2">
                About {philosopher}
              </h3>
              <p className="font-body text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {thinkerBio}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
