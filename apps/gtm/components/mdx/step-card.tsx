'use client';

interface StepCardProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

export default function StepCard({ number, title, children }: StepCardProps) {
  return (
    <div className="not-prose my-4 group">
      <div className="flex items-start gap-4 p-5 rounded-xl bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
        <span className="shrink-0 w-9 h-9 rounded-lg bg-primary-500 text-white flex items-center justify-center text-sm font-bold">
          {number}
        </span>
        <div>
          <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-1">{title}</h4>
          <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
