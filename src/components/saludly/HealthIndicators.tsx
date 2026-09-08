import { healthIndicators } from "../../data/biomarkers";
import { softClass, textClass } from "./status";

export function HealthIndicators() {
  return (
    <section className="mt-20">
      <div className="flex items-baseline justify-between border-b border-rule pb-4">
        <h2 className="text-2xl font-light tracking-tight text-ink">General health indicators</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          Derived scores
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {healthIndicators.map((i) => (
          <div
            key={i.label}
            className="rounded-2xl border border-rule bg-background p-5 transition-colors duration-300 hover:border-ink/15"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                {i.label}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.12em] ${softClass[i.status]}`}
              >
                {i.status === "critical" ? "critical" : i.status}
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className={`font-mono text-3xl tabular-nums ${textClass[i.status]}`}>
                {i.value}
              </span>
              <span className="text-[11px] text-ink-faint">{i.unit}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">{i.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
