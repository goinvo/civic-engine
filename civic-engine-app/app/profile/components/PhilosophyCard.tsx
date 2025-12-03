interface PhilosophyCardProps {
  title: string;
  philosophyName: string;
  philosopher: string;
  philosophyDescription: string;
}

export function PhilosophyCard({
  title,
  philosophyName,
  philosopher,
  philosophyDescription,
}: PhilosophyCardProps) {
  return (
    <div className="mb-12">
      <div className="border-4 border-black dark:border-gray-600 bg-gradient-to-br from-[#2F3BBD] to-[#C91A2B] p-8">
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
    </div>
  );
}
