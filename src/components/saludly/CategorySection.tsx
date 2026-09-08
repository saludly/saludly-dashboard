import { useState } from "react";
import type { Biomarker } from "../../data/biomarkers";
import { BiomarkerCard } from "./BiomarkerCard";

export function CategorySection({
  category,
  items,
  onSelect,
}: {
  category: string;
  items: Biomarker[];
  onSelect: (b: Biomarker) => void;
}) {
  const [open, setOpen] = useState(false);
  const flagged = items.filter((i) => i.status !== "optimal").length;
  const sectionId = category.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <section className="mt-6 scroll-mt-24" id={sectionId}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${sectionId}-panel`}
        className="flex w-full items-baseline justify-between gap-4 border-b border-rule pb-3 text-left transition-colors duration-300 hover:border-ink/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="flex items-center gap-3">
          <span
            aria-hidden
            className={`inline-block text-ink-faint transition-transform duration-300 ${open ? "rotate-90" : ""}`}
          >
            ›
          </span>
          <h3 className="text-lg font-normal tracking-tight text-ink">{category}</h3>
        </span>
        <span className="font-mono text-[11px] tabular-nums text-ink-faint">
          {items.length} markers
          {flagged > 0 && <span className="text-attention"> · {flagged} flagged</span>}
        </span>
      </button>

      <div
        id={`${sectionId}-panel`}
        className={`grid transition-all duration-500 ease-out ${
          open ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((b) => (
              <BiomarkerCard key={b.id} biomarker={b} onSelect={onSelect} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
