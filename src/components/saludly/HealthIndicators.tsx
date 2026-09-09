import { healthIndicators, overallHealthScore } from "../../data/biomarkers";
import { softClass, textClass } from "./status";

const bioAge = healthIndicators.find((i) => i.label === "Biological age");

/** Semicircular gauge, value mapped across [min,max]. */
function Gauge({ value, min, max }: { value: number; min: number; max: number }) {
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const r = 62;
  const len = Math.PI * r;
  return (
    <svg viewBox="0 0 160 92" className="w-full max-w-[220px]">
      <path
        d="M 18 80 A 62 62 0 0 1 142 80"
        fill="none"
        stroke="currentColor"
        className="text-rule"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M 18 80 A 62 62 0 0 1 142 80"
        fill="none"
        stroke="currentColor"
        className="text-attention"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${len * pct} ${len}`}
      />
    </svg>
  );
}

export function HealthIndicators() {
  return (
    <section className="mt-16">
      <div className="flex items-baseline justify-between border-b border-rule pb-4">
        <h2 className="text-2xl font-light tracking-tight text-ink">General health indicators</h2>
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          Derived scores
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:max-w-2xl">
        <div className="flex aspect-[5/4] flex-col justify-between rounded-2xl bg-optimal p-6 text-primary-foreground sm:aspect-square">
          <span className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/70">
            Saludly score
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-mono text-6xl tabular-nums leading-none">
              {overallHealthScore}
            </span>
            <span className="font-mono text-xl text-primary-foreground/60">/100</span>
          </div>
        </div>

        {bioAge && (
          <div className="relative flex aspect-[5/4] flex-col justify-between overflow-hidden rounded-2xl border border-rule bg-background p-6 sm:aspect-square">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-attention-soft blur-2xl"
            />
            <span className="relative text-[11px] uppercase tracking-[0.2em] text-ink-faint">
              Biological age
            </span>
            <div className="relative flex flex-col items-center">
              <Gauge value={Number.parseFloat(bioAge.value)} min={25} max={60} />
              <div className="-mt-10 flex items-baseline gap-1">
                <span className="font-mono text-5xl tabular-nums leading-none text-ink">
                  {bioAge.value}
                </span>
                <span className="text-xs text-ink-faint">yrs</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {healthIndicators
          .filter((i) => i.label !== "Biological age")
          .map((i) => (
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
