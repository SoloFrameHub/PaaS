/**
 * Currency configuration for dual-currency display.
 *
 * Per research (C2): Corrected exchange rate: $1 USD = COP 3,649 (April 3, 2026).
 * Argentina: USD only due to high volatility.
 * Rates from env vars with hardcoded fallbacks. Date-stamped with refresh reminder.
 */

export interface CurrencyConfig {
  code: string;
  symbol: string;
  /** Exchange rate: 1 USD = X local currency. null = USD only. */
  rate: number | null;
  /** Locale for number formatting */
  locale: string;
  /** Thousands separator character */
  thousandsSeparator: string;
  /** Decimal separator character */
  decimalSeparator: string;
  /** Number of decimal places to show (0 for whole numbers) */
  decimals: number;
  /** Disclaimer text */
  disclaimer?: string;
}

const ENV_RATES: Record<string, string | undefined> = {
  COP: process.env.NEXT_PUBLIC_RATE_COP,
  MXN: process.env.NEXT_PUBLIC_RATE_MXN,
  CLP: process.env.NEXT_PUBLIC_RATE_CLP,
};

/**
 * Fallback rates as of April 3, 2026.
 * Per research C2: "Verifica la tasa actual en Bancolombia o XE.com antes de cotizar."
 */
const FALLBACK_RATES: Record<string, number> = {
  COP: 3649,
  MXN: 19.8,
  CLP: 970,
};

export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  CO: {
    code: "COP",
    symbol: "$",
    rate: Number(ENV_RATES.COP) || FALLBACK_RATES.COP,
    locale: "es-CO",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    decimals: 0,
    disclaimer:
      "Tipo de cambio de referencia: 1 USD ≈ COP 3.649 (abril 2026). Verifica la tasa actual en Bancolombia o XE.com antes de cotizar.",
  },
  MX: {
    code: "MXN",
    symbol: "$",
    rate: Number(ENV_RATES.MXN) || FALLBACK_RATES.MXN,
    locale: "es-MX",
    thousandsSeparator: ",",
    decimalSeparator: ".",
    decimals: 0,
  },
  CL: {
    code: "CLP",
    symbol: "$",
    rate: Number(ENV_RATES.CLP) || FALLBACK_RATES.CLP,
    locale: "es-CL",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    decimals: 0,
  },
  AR: {
    code: "ARS",
    symbol: "$",
    rate: null, // USD only
    locale: "es-AR",
    thousandsSeparator: ".",
    decimalSeparator: ",",
    decimals: 2,
    disclaimer:
      "Para Argentina: precios en USD. El peso argentino tiene alta volatilidad — los precios en dólares son estándar para servicios digitales.",
  },
};

/** Map country code to currency config. Returns null for US/unknown. */
export function getCurrencyConfig(
  countryCode: string,
): CurrencyConfig | null {
  return CURRENCY_CONFIGS[countryCode] || null;
}

/**
 * Convert USD cents to local currency display string.
 * Returns null if no local equivalent (US, unknown country, or ARS).
 */
export function formatLocalEquivalent(
  usdCents: number,
  countryCode: string,
): string | null {
  const config = getCurrencyConfig(countryCode);
  if (!config || !config.rate) return null;

  const usd = usdCents / 100;
  const localAmount = Math.round(usd * config.rate);

  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(localAmount);
}

/** Format USD amount for display */
export function formatUSD(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(dollars);
}

/** Reference rate date stamp */
export const RATE_DATE = "abril 2026";

/** Tax disclaimer per C2 */
export const TAX_DISCLAIMER =
  "Este contenido es de carácter educativo y general. Las reglas fiscales varían por país, tipo de empresa, y régimen tributario. Antes de tomar decisiones de precios o facturación, consulta a un contador o asesor fiscal certificado en tu país.";
