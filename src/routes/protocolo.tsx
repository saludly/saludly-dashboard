import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Salad, Pill, Moon, Dumbbell, Sun } from "lucide-react";

const TITLE = "Protocolo Saludly — Plan personalizado de salud";
const DESCRIPTION =
  "El protocolo Saludly en 3 pasos: hidratación diaria, recomendaciones dietéticas semanales, vitaminas y estilo de vida basados en tus biomarcadores.";

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

const STEPS = [
  {
    id: "hidratacion",
    step: "01",
    tab: "Bebe 2.5 L de agua",
    title: "Hidratación diaria",
    icon: Droplets,
    intro:
      "Tu peso y nivel de actividad sugieren un objetivo de 2.5 litros de agua al día, repartidos de forma constante.",
    items: [
      { label: "Al despertar", detail: "500 ml en ayunas para reactivar el metabolismo." },
      { label: "Antes de cada comida", detail: "300 ml, 20 minutos antes de comer." },
      { label: "Durante el ejercicio", detail: "150 ml cada 15 minutos de actividad." },
      { label: "Antes de dormir", detail: "200 ml, al menos 1 hora antes de acostarte." },
    ],
  },
  {
    id: "nutricion",
    step: "02",
    tab: "Nutrición semanal",
    title: "Recomendaciones dietéticas semanales",
    icon: Salad,
    intro:
      "Plan de ejemplo para mejorar tu perfil glucémico y lipídico. Ajusta porciones según tu objetivo calórico.",
    items: [
      { label: "Lunes – Miércoles – Viernes", detail: "Énfasis en proteína magra, vegetales verdes y carbohidratos de baja carga glucémica." },
      { label: "Martes – Jueves", detail: "Pescado graso (salmón, sardina) y fibra soluble: avena, legumbres, semillas de chía." },
      { label: "Sábado", detail: "Día flexible: comida libre planificada, manteniendo hidratación y caminata post-comida." },
      { label: "Domingo", detail: "Preparación de comidas de la semana y cena ligera antes de las 20:00." },
    ],
  },
  {
    id: "estilo",
    step: "03",
    tab: "Vitaminas y estilo de vida",
    title: "Vitaminas y estilo de vida",
    icon: Pill,
    intro:
      "Suplementación sugerida según tus niveles actuales (vitamina D y magnesio por debajo de rango óptimo) y hábitos clave.",
    items: [
      { label: "Vitamina D3", detail: "2000 UI con el desayuno, hasta alcanzar rango óptimo." },
      { label: "Magnesio glicinato", detail: "300 mg por la noche, favorece sueño y recuperación." },
      { label: "Omega-3 (EPA/DHA)", detail: "1 g diario con comida, apoyo al perfil lipídico." },
      { label: "Sueño y movimiento", detail: "7–8 h de sueño, 8 000 pasos diarios y 2 sesiones de fuerza por semana." },
    ],
  },
];

const LIFESTYLE = [
  { icon: Sun, label: "Luz solar matutina", detail: "10 min al despertar" },
  { icon: Dumbbell, label: "Fuerza", detail: "2–3 sesiones / semana" },
  { icon: Moon, label: "Sueño", detail: "7–8 horas" },
];

function Protocolo() {
  const [active, setActive] = useState(0);
  const step = STEPS[active];
  const Icon = step.icon;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-10 sm:py-16">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
          Tu plan en 3 pasos
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-ink">Protocolo Saludly</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
          Recomendaciones semanales derivadas de tus biomarcadores. Contenido de ejemplo, no es
          consejo médico.
        </p>

        {/* Step tabs */}
        <div className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {STEPS.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(idx)}
              className={`rounded-2xl border p-4 text-left transition-all duration-300 ${
                idx === active
                  ? "border-ink/20 bg-ink text-background shadow-[0_16px_36px_-18px_rgba(0,0,0,0.45)]"
                  : "border-rule bg-background hover:border-ink/15"
              }`}
            >
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                  idx === active ? "text-background/60" : "text-ink-faint"
                }`}
              >
                Paso {s.step}
              </span>
              <span
                className={`mt-1 block text-sm font-light tracking-tight ${
                  idx === active ? "text-background" : "text-ink"
                }`}
              >
                {s.tab}
              </span>
            </button>
          ))}
        </div>

        {/* Active step panel */}
        <section className="mt-6 rounded-3xl border border-rule bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-score/10 text-score">
              <Icon className="h-5 w-5" strokeWidth={1.6} />
            </span>
            <h2 className="min-w-0 truncate text-xl font-light tracking-tight text-ink">
              {step.title}
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-muted">{step.intro}</p>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {step.items.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-rule bg-background p-5 transition-colors duration-300 hover:border-ink/15"
              >
                <p className="text-sm font-normal text-ink">{item.label}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Lifestyle highlights */}
        <section className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {LIFESTYLE.map((l) => (
            <div
              key={l.label}
              className="flex items-center gap-3 rounded-2xl border border-rule bg-background p-5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-optimal/10 text-optimal">
                <l.icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-normal text-ink">{l.label}</p>
                <p className="truncate text-xs text-ink-muted">{l.detail}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
