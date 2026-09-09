import { createFileRoute } from "@tanstack/react-router";

const TITLE = "Productos Saludly — Suplementos y paneles";
const DESCRIPTION =
  "Productos Saludly recomendados a partir de tus biomarcadores: paneles de laboratorio y suplementación dirigida.";

export const Route = createFileRoute("/productos")({
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
  component: Productos,
});

const PRODUCTS = [
  { name: "Vitamina D3 + K2", tag: "Nutrientes", note: "4000 UI diarias para subir 25-OH a rango óptimo." },
  { name: "Omega-3 concentrado", tag: "Cardiovascular", note: "2 g EPA/DHA para elevar el índice omega-3." },
  { name: "Magnesio glicinato", tag: "Minerales", note: "Apoya magnesio intracelular y calidad del sueño." },
  { name: "Fibra soluble", tag: "Lípidos", note: "Ayuda a reducir ApoB y colesterol LDL." },
  { name: "Panel completo 112 marcadores", tag: "Laboratorio", note: "Repetición del panel a los 3 meses." },
  { name: "Seguimiento metabólico", tag: "Laboratorio", note: "Glucosa, insulina y HbA1c cada 8 semanas." },
];

function Productos() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
        <h1 className="text-3xl font-light tracking-tight text-ink">Productos</h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-muted">
          Selección de ejemplo basada en tus resultados. No constituye consejo médico.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={p.name}
              className="rounded-2xl border border-rule bg-background p-6 transition-colors duration-300 hover:border-ink/15"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                {p.tag}
              </span>
              <h2 className="mt-3 text-lg font-light tracking-tight text-ink">{p.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{p.note}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
