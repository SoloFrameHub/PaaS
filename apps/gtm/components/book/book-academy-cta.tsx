import Link from "next/link";

export default function BookAcademyCta() {
  return (
    <div className="mt-16 rounded-2xl border border-primary-100 dark:border-primary-500/20 bg-primary-50/50 dark:bg-primary-500/5 p-8 text-center">
      <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-3">
        Put this chapter into practice
      </h3>
      <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto mb-6">
        The OS pairs every concept with hands-on AI roleplay, real-world
        exercises, and artifact builders so you walk away with assets — not just
        knowledge.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/subscribe"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-500 text-white font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/20"
        >
          Try the OS — Free During Beta
        </Link>
        <Link
          href="/book"
          className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors"
        >
          Back to Table of Contents
        </Link>
      </div>
    </div>
  );
}
