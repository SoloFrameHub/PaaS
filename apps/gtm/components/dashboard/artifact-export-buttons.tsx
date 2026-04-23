"use client";

import { useState } from "react";
import { useLocale } from 'next-intl';
import type { ExportableArtifact, ExportFormat } from "@/types/execute";

interface ArtifactExportButtonsProps {
  artifactType: ExportableArtifact;
}

const FORMATS: { format: ExportFormat; label: string }[] = [
  { format: "markdown", label: "MD" },
  { format: "csv", label: "CSV" },
  { format: "html", label: "PDF" },
];

export default function ArtifactExportButtons({
  artifactType,
}: ArtifactExportButtonsProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [loading, setLoading] = useState<ExportFormat | null>(null);

  async function handleExport(format: ExportFormat) {
    setLoading(format);
    try {
      const response = await fetch(
        `/api/profile/export?artifactType=${artifactType}&format=${format}`,
      );
      if (!response.ok) return;

      const blob = await response.blob();
      const disposition = response.headers.get("Content-Disposition");
      const filename =
        disposition?.match(/filename="(.+?)"/)?.[1] ||
        `${artifactType}.${format === "html" ? "html" : format}`;

      if (format === "html") {
        // Open in new tab for print-to-PDF
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        // Download file
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch {
      // Silent failure
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center gap-1">
      {FORMATS.map(({ format, label }) => (
        <button
          key={format}
          onClick={() => handleExport(format)}
          disabled={loading !== null}
          className="text-[10px] font-medium text-gray-400 hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-400 px-1 py-0.5 rounded transition-colors disabled:opacity-50"
          title={isEs ? `Exportar como ${label}` : `Export as ${label}`}
        >
          {loading === format ? "..." : label}
        </button>
      ))}
    </div>
  );
}
