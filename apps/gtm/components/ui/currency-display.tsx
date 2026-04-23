"use client";

import {
  formatLocalEquivalent,
  getCurrencyConfig,
} from "@/lib/data/currency-config";

interface CurrencyDisplayProps {
  /** Amount in USD cents */
  amountCents: number;
  /** Country code (CO, MX, CL, AR) */
  countryCode?: string;
  /** Show the local equivalent below the USD price */
  showLocal?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Dual-currency display component.
 * Shows USD price with optional local equivalent below.
 * Per research C2: USD as anchor with local equivalents below.
 */
export function CurrencyDisplay({
  amountCents,
  countryCode,
  showLocal = true,
  className = "",
}: CurrencyDisplayProps) {
  const dollars = amountCents / 100;
  const wholePart = Math.floor(dollars);
  const centsPart = Math.round((dollars - wholePart) * 100);

  const localAmount =
    showLocal && countryCode
      ? formatLocalEquivalent(amountCents, countryCode)
      : null;

  const config = countryCode ? getCurrencyConfig(countryCode) : null;

  return (
    <div className={className}>
      <div className="text-gray-800 dark:text-gray-100 font-bold">
        <span className="text-2xl">$</span>
        <span className="text-3xl">{wholePart.toLocaleString("en-US")}</span>
        {centsPart > 0 && (
          <span className="text-xl">
            .{centsPart.toString().padStart(2, "0")}
          </span>
        )}
        <span className="text-gray-500 font-medium text-sm ml-1">USD</span>
      </div>

      {localAmount && (
        <div className="text-sm text-gray-400 dark:text-gray-500 mt-0.5">
          ≈ {localAmount}
        </div>
      )}

      {config?.disclaimer && (
        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-tight">
          {config.disclaimer}
        </p>
      )}
    </div>
  );
}
