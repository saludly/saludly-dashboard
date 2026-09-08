import { healthIndicators, overallHealthScore } from "../../data/biomarkers";
import { softClass, textClass } from "./status";

export function HealthIndicators() {
  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between border-b border-rule pb-4">
        <h2 className="text-2xl font-light tracking-tight text-ink">General health indicators</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          Derived scores
        </span>
      </div>

      <div className="mt-6 rounded-2xl bg-optimal p-6 text-primary-foreground sm:p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/70">
              Saludly score
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-mono text-6xl tabular-nums leading-none sm:text-7xl">
                {overallHealthScore}
              </span>
              <span className="text-sm text-primary-foreground/70">%</span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/80">
              A weighted blend of your cardiovascular, metabolic, immune, nutrient and hormonal
              scores.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {healthIndicators
              .filter((i) => i.weight > 0)
              .map((i) => (
                <div key={i.label} className="flex items-baseline gap-1.5">
                  <span className="font-mono text-sm tabular-nums">{i.value}</span>
                  <span className="text-[10px] uppercase tracking-[0.1em] text-primary-foreground/60">
                    {i.label.replace(" score", "")} · {Math.round(i.weight * 100)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
            {i.weight > 0 && (
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                Weight {Math.round(i.weight * 100)}% of health score
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
