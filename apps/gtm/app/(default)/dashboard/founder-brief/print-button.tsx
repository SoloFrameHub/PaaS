"use client";

export function PrintButton({ label }: { label: string }) {
  return (
    <button
      onClick={() => window.print()}
      className="btn bg-primary-500 text-white hover:bg-primary-600 px-6 py-2 rounded-xl font-bold text-sm"
    >
      {label}
    </button>
  );
}
