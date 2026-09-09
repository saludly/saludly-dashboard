import { createFileRoute } from "@tanstack/react-router";

const TITLE = "Protocolo Saludly — Plan personalizado de salud";
const DESCRIPTION =
  "El protocolo Saludly: fases de intervención en nutrición, suplementación, entrenamiento y descanso basadas en tus biomarcadores.";

export const Route = createFileRoute("/protocolo")({
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
  component: Protocolo,
});

const PHASES = [
  {
    step: "01",
    title: "Reequilibrio metabólico",
    weeks: "Semanas 1–6",
    note: "Reducir la resistencia a la insulina con carga glucémica baja y caminatas post-comida.",
  },
  {
    step: "02",
    title: "Perfil lipídico",
    weeks: "Semanas 4–12",
    note: "Bajar ApoB y partículas LDL con fibra soluble, omega-3 y trabajo aeróbico zona 2.",
  },
  {
    step: "03",
    title: "Repleción de nutrientes",
    weeks: "Semanas 1–10",
    note: "Corregir vitamina D, magnesio y omega-3 hasta rangos óptimos.",
  },
  {
    step: "04",
    title: "Eje hormonal y estrés",
    weeks: "Semanas 6–16",
    note: "Regular cortisol matutino y testosterona libre con sueño, fuerza y recuperación.",
  },
];

function Protocolo() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-light tracking-tight text-ink">Protocolo Saludly</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
          Un plan por fases derivado de tus biomarcadores. Contenido de ejemplo, no es consejo
          médico.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {PHASES.map((p) => (
            <article
              key={p.step}
              className="rounded-2xl border border-rule bg-background p-6 transition-colors duration-300 hover:border-ink/15"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-3xl tabular-nums text-optimal">{p.step}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {p.weeks}
                </span>
              </div>
              <h2 className="mt-4 text-lg font-light tracking-tight text-ink">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.note}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
