import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { healthIndicators, overallHealthScore } from "../data/biomarkers";

const TITLE = "Saludly — Comienza tu perfil de salud";
const DESCRIPTION =
  "Responde unas preguntas, conoce tu edad biológica, lo que está óptimo, lo que requiere atención y tu protocolo de 3 pasos.";

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
  component: Onboarding,
});

const GOALS = [
  { id: "peso", label: "Bajar de peso", note: "Composición corporal y metabolismo" },
  { id: "energia", label: "Sentirme más saludable", note: "Energía diaria y descanso" },
  { id: "maraton", label: "Correr una maratón", note: "Resistencia y recuperación" },
  { id: "fuerza", label: "Ganar fuerza y músculo", note: "Hormonas y proteína" },
  { id: "longevidad", label: "Vivir más años sanos", note: "Edad biológica e inflamación" },
  { id: "estres", label: "Manejar el estrés", note: "Cortisol y calidad del sueño" },
  { id: "corazon", label: "Cuidar mi corazón", note: "Lípidos y presión arterial" },
  { id: "glucosa", label: "Controlar la glucosa", note: "Insulina y HbA1c" },
];

const HABITS = [
  { id: "sedentario", label: "Casi no me muevo" },
  { id: "1-2", label: "Entreno 1 o 2 veces por semana" },
  { id: "3-4", label: "Entreno 3 o 4 veces por semana" },
  { id: "5+", label: "Entreno 5 veces o más" },
];

const SLEEP = [
  { id: "menos-6", label: "Menos de 6 horas" },
  { id: "6-7", label: "Entre 6 y 7 horas" },
  { id: "7-8", label: "Entre 7 y 8 horas" },
  { id: "mas-8", label: "Más de 8 horas" },
];

const bioAge = healthIndicators.find((i) => i.label === "Edad biológica");
const optimals = healthIndicators.filter((i) => i.status === "optimal").slice(0, 3);
const alerts = healthIndicators
  .filter((i) => i.status !== "optimal" && i.label !== "Edad biológica")
  .slice(0, 3);

const PROTOCOL = [
  { n: "01", title: "Bebe 2.5 L de agua", text: "La hidratación sostiene tu energía, tu digestión y la calidad de tus análisis." },
  { n: "02", title: "Nutrición semanal", text: "Un plan día por día, ajustado a los marcadores que necesitas mejorar primero." },
  { n: "03", title: "Vitaminas y estilo de vida", text: "Suplementos concretos, sueño, sol y movimiento, con los productos listos para pedir." },
];

const STEP_LABELS = [
  "Tus objetivos",
  "Tu actividad",
  "Tu descanso",
  "Qué encontrarás",
  "Edad biológica",
  "Lo que está óptimo",
  "Lo que requiere atención",
  "Tu protocolo",
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState<string[]>([]);
  const [habit, setHabit] = useState("");
  const [sleep, setSleep] = useState("");

  const toggleGoal = (id: string) =>
    setGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : prev.length >= 3 ? prev : [...prev, id],
    );

  const canContinue = useMemo(() => {
    if (step === 0) return goals.length === 3;
    if (step === 1) return habit !== "";
    if (step === 2) return sleep !== "";
    return true;
  }, [step, goals, habit, sleep]);

  const last = step === STEP_LABELS.length - 1;

  const next = () => {
    if (!canContinue) return;
    if (last) {
      navigate({ to: "/panel" });
      return;
    }
    setStep((s) => s + 1);
  };

  const choiceClass = (active: boolean) =>
    `rounded-2xl border p-4 text-left transition-all duration-300 ${
      active ? "border-optimal bg-optimal-soft" : "border-rule hover:border-ink/20"
    }`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 pb-32 pt-8 sm:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-optimal">
              <span className="h-2 w-2 rounded-full bg-background" />
            </span>
            <span className="text-lg tracking-tight text-ink">Saludly</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            Paso {step + 1} / {STEP_LABELS.length}
          </span>
        </header>

        <nav aria-label="Progreso" className="mt-8">
          <div className="flex gap-1.5">
            {STEP_LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                aria-current={i === step}
                disabled={i > step}
                onClick={() => setStep(i)}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i <= step ? "bg-optimal" : "bg-rule"
                } ${i > step ? "cursor-default" : "cursor-pointer"}`}
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
            {STEP_LABELS[step]}
          </p>
        </nav>

        <section key={step} className="rise mt-10 flex-1">
          {step === 0 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Elige tus 3 objetivos principales.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Tus objetivos definen qué marcadores priorizamos y qué recomendaciones aparecen
                primero en tu protocolo.
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                {goals.length} de 3 seleccionados
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {GOALS.map((g) => {
                  const active = goals.includes(g.id);
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => toggleGoal(g.id)}
                      aria-pressed={active}
                      className={choiceClass(active)}
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm text-ink">{g.label}</span>
                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                            active
                              ? "border-optimal bg-optimal text-primary-foreground"
                              : "border-rule text-transparent"
                          }`}
                        >
                          ✓
                        </span>
                      </span>
                      <span className="mt-1 block text-xs text-ink-muted">{g.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                ¿Cuánto te mueves hoy?
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                El movimiento cambia tu glucosa, tus lípidos y tu inflamación más rápido que
                cualquier suplemento.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {HABITS.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    aria-pressed={habit === h.id}
                    onClick={() => setHabit(h.id)}
                    className={choiceClass(habit === h.id)}
                  >
                    <span className="text-sm text-ink">{h.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                ¿Cuánto duermes en promedio?
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                El sueño es el marcador que más influye en tu cortisol, tu apetito y tu recuperación.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {SLEEP.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={sleep === s.id}
                    onClick={() => setSleep(s.id)}
                    className={choiceClass(sleep === s.id)}
                  >
                    <span className="text-sm text-ink">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Esto es lo que encontrarás.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Tu panel reúne más de 100 biomarcadores en una sola lectura. Así se organiza y por
                qué importa cada parte.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  {
                    t: "Un mapa de tu cuerpo",
                    d: "La figura corporal resume, sistema por sistema, dónde estás bien y dónde no.",
                    w: "Ver el conjunto evita tratar un resultado aislado y perder el contexto.",
                  },
                  {
                    t: "Puntaje Saludly e indicadores",
                    d: "Ocho indicadores ponderados resumen tus resultados en un solo número.",
                    w: "Te permite medir avances reales entre un examen y el siguiente.",
                  },
                  {
                    t: "Biomarcadores por categoría",
                    d: "Hematología, hormonas, metabolismo, lípidos, vitaminas y más, con su explicación.",
                    w: "Cada marcador indica qué cambiar en tu alimentación, descanso o suplementación.",
                  },
                  {
                    t: "Protocolo y productos",
                    d: "Recomendaciones semanales con los suplementos y servicios que las hacen posibles.",
                    w: "Sin acción concreta, los datos no mejoran tu salud.",
                  },
                ].map((c) => (
                  <article key={c.t} className="rounded-2xl border border-rule p-5">
                    <h2 className="text-base text-ink">{c.t}</h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.d}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                      Por qué importa: {c.w}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Tu edad biológica.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                No es la edad de tu cédula: es la edad que reflejan tus marcadores de inflamación,
                metabolismo y función cardiovascular.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="flex flex-col justify-between rounded-2xl border border-rule p-6">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                    Edad biológica estimada
                  </span>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-mono text-6xl tabular-nums leading-none text-attention">
                      {bioAge?.value ?? "41.2"}
                    </span>
                    <span className="text-xs text-ink-faint">años</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                    {bioAge?.note ?? "Por encima de la edad cronológica"}
                  </p>
                </div>
                <div className="flex flex-col justify-between rounded-2xl bg-optimal p-6 text-primary-foreground">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/70">
                    Puntaje Saludly
                  </span>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="font-mono text-6xl tabular-nums leading-none">
                      {overallHealthScore}
                    </span>
                    <span className="font-mono text-xl text-primary-foreground/60">/100</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-primary-foreground/80">
                    Resumen ponderado de tus sistemas cardiovascular, metabólico, inmune,
                    nutricional y hormonal.
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                La buena noticia: la edad biológica se mueve. Sueño, actividad, nutrición y corregir
                déficits puntuales pueden bajarla en pocos meses.
              </p>
            </div>
          )}

          {step === 5 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Lo que ya está óptimo.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Estos resultados son tu base. Mantenerlos cuesta mucho menos esfuerzo que
                recuperarlos.
              </p>
              <div className="mt-8 space-y-3">
                {optimals.map((i) => (
                  <article key={i.label} className="rounded-2xl border border-rule bg-optimal-soft p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-base text-ink">{i.label}</h2>
                      <span className="font-mono text-2xl tabular-nums text-optimal">{i.value}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{i.note}</p>
                  </article>
                ))}
              </div>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-faint">
                Por qué importa: sostener lo óptimo protege tu puntaje mientras corriges lo demás.
              </p>
            </div>
          )}

          {step === 6 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Lo que requiere atención.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Son los marcadores que más pesan hoy en tu puntaje y en tu edad biológica.
              </p>
              <div className="mt-8 space-y-3">
                {alerts.map((i) => (
                  <article
                    key={i.label}
                    className={`rounded-2xl border border-rule p-5 ${
                      i.status === "critical" ? "bg-critical-soft" : "bg-attention-soft"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-base text-ink">{i.label}</h2>
                      <span
                        className={`font-mono text-2xl tabular-nums ${
                          i.status === "critical" ? "text-critical" : "text-attention"
                        }`}
                      >
                        {i.value}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{i.note}</p>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Seguir las recomendaciones importa porque estos marcadores se corrigen en semanas
                cuando se atienden a tiempo, y se vuelven condiciones crónicas cuando se ignoran.
              </p>
            </div>
          )}

          {step === 7 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Tu protocolo de 3 pasos.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Simple a propósito: tres decisiones diarias que mueven la mayoría de tus marcadores.
              </p>
              <div className="mt-8 space-y-3">
                {PROTOCOL.map((p) => (
                  <article key={p.n} className="flex gap-4 rounded-2xl border border-rule p-5">
                    <span className="font-mono text-sm text-ink-faint">{p.n}</span>
                    <div>
                      <h2 className="text-base text-ink">{p.title}</h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.text}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                Puedes ver el{" "}
                <Link to="/protocolo" className="text-optimal underline-offset-4 hover:underline">
                  protocolo completo
                </Link>{" "}
                cuando entres a tu panel.
              </p>
            </div>
          )}

          {step === 8 && (
            <div>
              <h1 className="text-3xl font-light tracking-tight text-ink sm:text-4xl">
                Creamos tu cuenta.
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
                Déjanos tu correo y te enviamos una contraseña para entrar a tu panel cuando quieras.
              </p>
              <label className="mt-8 block max-w-md">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  Correo electrónico
                </span>
                <input
                  value={email}
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="mt-2 w-full rounded-xl border border-rule bg-background px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-optimal"
                />
              </label>
              <p className="mt-3 text-xs leading-relaxed text-ink-muted">
                En esta demostración no se envía ningún correo ni se guarda tu información.
              </p>
            </div>
          )}
        </section>

        <p className="mt-10 text-xs text-ink-faint">
          Datos de ejemplo únicamente para demostración. Saludly no ofrece consejo médico.
        </p>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-rule bg-background/95 px-6 py-4 backdrop-blur sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="rounded-full border border-rule px-5 py-4 text-sm text-ink-muted transition-colors hover:border-ink/20 hover:text-ink"
            >
              Atrás
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={!canContinue}
            className="flex-1 rounded-full bg-optimal px-6 py-4 text-base text-primary-foreground transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {last ? "Crear mi cuenta y entrar" : "Continuar"}
          </button>
        </div>
      </div>
    </main>
  );
}
