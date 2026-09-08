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
  const flagged = items.filter((i) => i.status !== "optimal").length;

  return (
    <section className="mt-12 scroll-mt-24" id={category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
      <div className="flex items-baseline justify-between border-b border-rule pb-3">
        <h3 className="text-lg font-normal tracking-tight text-ink">{category}</h3>
        <span className="font-mono text-[11px] tabular-nums text-ink-faint">
          {items.length} markers
          {flagged > 0 && <span className="text-attention"> · {flagged} flagged</span>}
        </span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((b) => (
          <BiomarkerCard key={b.id} biomarker={b} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}
