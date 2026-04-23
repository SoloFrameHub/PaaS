'use client';

interface InsightCardProps {
  icon?: string;
  title: string;
  children: React.ReactNode;
}

export default function InsightCard({ icon = '💡', title, children }: InsightCardProps) {
  return (
    <div className="not-prose my-8 group">
      <div className="flex items-start gap-4 p-6 rounded-2xl bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
        <div>
          <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{title}</h4>
          <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
