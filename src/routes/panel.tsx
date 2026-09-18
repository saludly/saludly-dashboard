import { useMemo, useState, type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BodyHero } from "../components/saludly/BodyHero";
import { CategorySection } from "../components/saludly/CategorySection";
import { BiomarkerDetail } from "../components/saludly/BiomarkerDetail";
import { HealthIndicators } from "../components/saludly/HealthIndicators";
import { biomarkers, categories, type Biomarker, type BiomarkerStatus } from "../data/biomarkers";

const TITLE = "Saludly — Panel integral de biomarcadores";
const DESCRIPTION =
  "Panel integral de salud con modelo corporal, más de 100 biomarcadores e indicadores generales personalizados.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Filter = "all" | BiomarkerStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "optimal", label: "Óptimo" },
  { key: "attention", label: "Atención" },
  { key: "critical", label: "Atención crítica" },
];

function Index() {
  const [selected, setSelected] = useState<Biomarker | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const grouped = useMemo(() => {
    const list = filter === "all" ? biomarkers : biomarkers.filter((b) => b.status === filter);
    return categories
      .map((c) => ({ category: c, items: list.filter((b) => b.category === c) }))
      .filter((g) => g.items.length > 0);
  }, [filter]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-optimal">
              <span className="h-2 w-2 rounded-full bg-background" />
            </span>
            <span className="text-lg tracking-tight text-ink">Saludly</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            Panel · marzo de 2026
          </span>
        </header>

        <BodyHero />

        <HealthIndicators />

        <section
          id="biomarcadores"
          className="rise mt-16 scroll-mt-24"
          style={{ "--rise-delay": "0.3s" } as CSSProperties}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
            <h2 className="text-2xl font-light tracking-tight text-ink">Biomarcadores</h2>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] transition-colors duration-300 ${
                    filter === f.key
                      ? "border-optimal bg-optimal text-primary-foreground"
                      : "border-rule text-ink-muted hover:border-ink/20 hover:text-ink"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {grouped.map((g) => (
            <CategorySection
              key={g.category}
              category={g.category}
              items={g.items}
              onSelect={setSelected}
            />
          ))}
        </section>
        <footer className="mt-20 border-t border-rule py-8 text-xs text-ink-faint">
          Datos de ejemplo únicamente para demostración. Saludly no ofrece consejo médico.
        </footer>
      </div>

      <BiomarkerDetail biomarker={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
