import { useState } from "react";
import bodyImg from "../../assets/body.png";
import bodyFemaleImg from "../../assets/body-female.png";
import { biomarkers, countBy } from "../../data/biomarkers";

interface Marker {
  label: string;
  top: string;
  left: string;
  status: "optimal" | "attention" | "critical";
  align?: "left" | "right";
}

const MARKERS: Marker[] = [
  { label: "Thyroid", top: "19%", left: "50%", status: "attention", align: "right" },
  { label: "Cardiovascular", top: "31%", left: "44%", status: "critical", align: "left" },
  { label: "Liver", top: "43%", left: "56%", status: "attention", align: "right" },
  { label: "Metabolic", top: "50%", left: "47%", status: "attention", align: "left" },
  { label: "Immunity", top: "62%", left: "53%", status: "optimal", align: "right" },
];

export function BodyHero() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const optimal = countBy("optimal");
  const attention = countBy("attention");
  const critical = countBy("critical");
  const total = biomarkers.length;
  const pct = (n: number) => (n / total) * 100;


  return (
    <section className="relative overflow-hidden pb-8 pt-6">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
        <div className="rise order-2 lg:order-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-optimal">
            Full body panel · complete
          </p>
          <h1 className="mt-3 text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Your whole body,
            <br />
            measured.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {biomarkers.length} biomarkers analysed across nine health systems. Every result is
            mapped to its optimal range, not just the lab&apos;s normal range.
          </p>
          <dl className="mt-8 grid max-w-sm grid-cols-3 gap-px overflow-hidden rounded-2xl border border-rule bg-rule">
            {[
              { n: optimal, l: "Optimal", c: "text-optimal" },
              { n: attention, l: "Attention", c: "text-attention" },
              { n: critical, l: "Critical", c: "text-critical" },
            ].map((s) => (
              <div key={s.l} className="bg-background px-4 py-4">
                <dd className={`font-mono text-2xl tabular-nums ${s.c}`}>{s.n}</dd>
                <dt className="mt-1 text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                  {s.l}
                </dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="rise order-1 lg:order-2" style={{ ["--rise-delay" as string]: "0.1s" }}>
          <div className="relative mx-auto w-[240px] sm:w-[300px]">
            <div className="breathe absolute inset-x-6 top-[12%] bottom-[8%] rounded-full bg-optimal-soft blur-3xl" />
            <img
              src={bodyImg}
              alt="Three-dimensional model of a human body showing analysed health systems"
              width={768}
              height={1280}
              className="relative w-full select-none"
              draggable={false}
            />
            {MARKERS.map((m) => (
              <div
                key={m.label}
                className="absolute flex items-center gap-2"
                style={{
                  top: m.top,
                  left: m.left,
                  transform: m.align === "left" ? "translate(-100%, -50%)" : "translateY(-50%)",
                  flexDirection: m.align === "left" ? "row-reverse" : "row",
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
                      m.status === "optimal"
                        ? "bg-optimal"
                        : m.status === "attention"
                          ? "bg-attention"
                          : "bg-critical"
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      m.status === "optimal"
                        ? "bg-optimal"
                        : m.status === "attention"
                          ? "bg-attention"
                          : "bg-critical"
                    }`}
                  />
                </span>
                <span className="whitespace-nowrap text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="rise order-3 hidden lg:block"
          style={{ ["--rise-delay" as string]: "0.2s" }}
        >
          <div className="ml-auto max-w-[240px] space-y-6 text-right">
            {[
              { k: "Overall health index", v: "74 / 100" },
              { k: "Systems in range", v: "6 of 9" },
              { k: "Last panel", v: "12 days ago" },
              { k: "Next recommended", v: "in 3 months" },
            ].map((r) => (
              <div key={r.k}>
                <div className="text-[11px] uppercase tracking-[0.16em] text-ink-faint">{r.k}</div>
                <div className="mt-1 font-mono text-lg tabular-nums text-ink">{r.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
