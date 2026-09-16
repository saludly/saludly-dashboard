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
  { label: "Tiroides", top: "19%", left: "50%", status: "attention", align: "right" },
  { label: "Cardiovascular", top: "31%", left: "44%", status: "critical", align: "left" },
  { label: "Hígado", top: "43%", left: "56%", status: "attention", align: "right" },
  { label: "Metabolismo", top: "50%", left: "47%", status: "attention", align: "left" },
  { label: "Inmunidad", top: "62%", left: "53%", status: "optimal", align: "right" },
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
            Panel corporal completo · finalizado
          </p>
          <h1 className="mt-3 text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl">
            Todo tu cuerpo,
            <br />
            medido.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {biomarkers.length} biomarcadores analizados en nueve sistemas de salud. Cada resultado
            se compara con su rango óptimo, no solo con el rango normal del laboratorio.
          </p>
          <div className="mt-8 max-w-sm rounded-3xl border border-rule bg-background px-6 py-5 shadow-[0_16px_40px_-32px_rgba(20,30,60,0.55)]">
            <dl className="flex flex-wrap items-start gap-x-8 gap-y-4">
              {[
                { n: total, l: "Total", c: "text-ink" },
                { n: optimal, l: "Óptimo", c: "text-optimal" },
                { n: attention, l: "Atención", c: "text-attention" },
                { n: critical, l: "Crítico", c: "text-critical" },
              ].map((s) => (
                <div key={s.l}>
                  <dd className={`font-mono text-2xl tabular-nums ${s.c}`}>{s.n}</dd>
                  <dt className="mt-1 text-[12px] text-ink-faint">{s.l}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-1.5">
              <span
                className="h-1.5 rounded-full bg-optimal"
                style={{ width: `${pct(optimal)}%` }}
              />
              <span
                className="h-1.5 rounded-full bg-attention"
                style={{ width: `${pct(attention)}%` }}
              />
              <span
                className="h-1.5 rounded-full bg-critical"
                style={{ width: `${pct(critical)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="rise order-1 lg:order-2" style={{ ["--rise-delay" as string]: "0.1s" }}>
          <div className="mx-auto mb-4 flex w-fit gap-1 rounded-full border border-rule p-1">
            {(["male", "female"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSex(s)}
                aria-pressed={sex === s}
                className={`rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  sex === s
                    ? "bg-optimal text-primary-foreground"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {s === "male" ? "Hombre" : "Mujer"}
              </button>
            ))}
          </div>
          <div className="relative mx-auto w-[240px] sm:w-[300px]">
            <div className="breathe absolute inset-x-6 top-[12%] bottom-[8%] rounded-full bg-optimal-soft blur-3xl" />
            <img
              src={sex === "male" ? bodyImg : bodyFemaleImg}
              alt={`Modelo tridimensional de un cuerpo ${sex === "male" ? "masculino" : "femenino"} con los sistemas de salud analizados`}
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
              { k: "Índice general de salud", v: "74 / 100" },
              { k: "Sistemas en rango", v: "6 de 9" },
              { k: "Último panel", v: "hace 12 días" },
              { k: "Próximo recomendado", v: "en 3 meses" },
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
