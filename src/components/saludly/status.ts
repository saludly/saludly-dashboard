import type { BiomarkerStatus } from "../../data/biomarkers";

export const dotClass: Record<BiomarkerStatus, string> = {
  optimal: "bg-optimal",
  attention: "bg-attention",
  critical: "bg-critical",
};

export const textClass: Record<BiomarkerStatus, string> = {
  optimal: "text-optimal",
  attention: "text-attention",
  critical: "text-critical",
};

export const softClass: Record<BiomarkerStatus, string> = {
  optimal: "bg-optimal-soft text-optimal",
  attention: "bg-attention-soft text-attention",
  critical: "bg-critical-soft text-critical",
};

/** Position of a value inside its reference range, clamped to 4–96%. */
export function rangePosition(value: number, low: number, high: number) {
  const span = high - low || 1;
  const pad = span * 0.35;
  const lo = low - pad;
  const hi = high + pad;
  const pct = ((value - lo) / (hi - lo)) * 100;
  return Math.max(4, Math.min(96, pct));
}

export function rangeWindow(low: number, high: number) {
  const span = high - low || 1;
  const pad = span * 0.35;
  const lo = low - pad;
  const hi = high + pad;
  const start = ((low - lo) / (hi - lo)) * 100;
  const width = ((high - low) / (hi - lo)) * 100;
  return { start, width };
}
