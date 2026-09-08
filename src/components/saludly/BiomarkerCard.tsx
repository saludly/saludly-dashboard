import type { Biomarker } from "../../data/biomarkers";
import { dotClass, rangePosition, rangeWindow, textClass } from "./status";

export function BiomarkerCard({
  biomarker,
  onSelect,
}: {
  biomarker: Biomarker;
  onSelect: (b: Biomarker) => void;
}) {
  const pos = rangePosition(biomarker.value, biomarker.low, biomarker.high);
  const win = rangeWindow(biomarker.low, biomarker.high);

  return (
    <button
      type="button"
      onClick={() => onSelect(biomarker)}
      aria-label={`${biomarker.name}: ${biomarker.value} ${biomarker.unit}, ${biomarker.status}`}
      className="group rounded-2xl border border-rule bg-background px-4 py-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_12px_32px_-20px_rgba(20,30,60,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-[13px] leading-snug text-ink">{biomarker.name}</span>
        <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${dotClass[biomarker.status]}`} />
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span className={`font-mono text-xl tabular-nums ${textClass[biomarker.status]}`}>
          {biomarker.value}
        </span>
        <span className="text-[11px] text-ink-faint">{biomarker.unit}</span>
      </div>

      <div className="relative mt-3 h-1 w-full rounded-full bg-rule">
        <div
          className="absolute inset-y-0 rounded-full bg-optimal-soft"
          style={{ left: `${win.start}%`, width: `${win.width}%` }}
        />
        <div
          className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-background transition-all duration-500 ${dotClass[biomarker.status]}`}
          style={{ left: `${pos}%` }}
        />
      </div>
    </button>
  );
}
