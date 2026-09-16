import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { formatPrice, products, type ProductCategory } from "../data/products";

const TITLE = "Marketplace Saludly — Bienestar personalizado";
const DESCRIPTION =
  "Compra suplementos y reserva terapias intravenosas, masajes y paneles de laboratorio seleccionados por Saludly.";

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

const CATEGORIES: ("Todo" | ProductCategory)[] = ["Todo", "Suplementos", "Terapias IV", "Masajes", "Laboratorio"];

function Productos() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Todo");
  const [cart, setCart] = useState<Record<string, number>>({});
  const filtered = category === "Todo" ? products : products.filter((product) => product.category === category);
  const cartItems = useMemo(() => products.filter((product) => (cart[product.id] ?? 0) > 0), [cart]);
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = cartItems.reduce((sum, product) => sum + product.price * (cart[product.id] ?? 0), 0);
  const changeQuantity = (id: string, amount: number) => setCart((current) => {
    const next = Math.max(0, (current[id] ?? 0) + amount);
    const updated = { ...current, [id]: next };
    if (next === 0) delete updated[id];
    return updated;
  });

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-10 sm:py-16">
        <header className="flex flex-wrap items-end justify-between gap-5 border-b border-rule pb-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Bienestar seleccionado</p>
            <h1 className="mt-2 text-4xl font-light tracking-tight text-ink">Marketplace Saludly</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">Suplementos y experiencias alineados con tus biomarcadores y tu protocolo personal.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-rule px-4 py-2 text-sm text-ink">
            <ShoppingBag className="h-4 w-4 text-primary" />
            <span>{count} {count === 1 ? "selección" : "selecciones"}</span>
          </div>
        </header>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((item) => (
            <Button key={item} type="button" size="sm" variant={category === item ? "default" : "outline"} onClick={() => setCategory(item)} className="shrink-0 rounded-full shadow-none">
              {item}
            </Button>
          ))}
        </div>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_320px]">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Catálogo de productos y servicios">
            {filtered.map((product) => (
              <article id={product.id} key={product.id} className="scroll-mt-28 overflow-hidden rounded-2xl border border-rule bg-background transition-all hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-[0_16px_40px_-28px_rgba(20,30,60,0.45)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <img src={product.image} alt={product.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover" />
                  {product.featured && <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-[9px] uppercase tracking-[0.14em] text-primary backdrop-blur">Recomendado</span>}
                </div>
                <div className="p-5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">{product.category}</span>
                  <h2 className="mt-2 text-lg font-normal tracking-tight text-ink">{product.name}</h2>
                  <p className="mt-2 min-h-12 text-xs leading-relaxed text-ink-muted">{product.description}</p>
                  <p className="mt-3 text-[11px] text-ink-faint">{product.detail}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <strong className="font-mono text-base font-medium text-ink">{formatPrice(product.price)}</strong>
                    <Button type="button" size="sm" onClick={() => changeQuantity(product.id, 1)}>{product.action === "Reservar" ? "Reservar" : "Agregar"}<Plus /></Button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <aside className="sticky top-24 rounded-2xl border border-rule bg-surface p-5" aria-label="Tu selección">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-normal text-ink">Tu selección</h2>
              {cartItems.length > 0 && <Button type="button" size="icon" variant="ghost" aria-label="Vaciar selección" onClick={() => setCart({})}><Trash2 /></Button>}
            </div>
            {cartItems.length === 0 ? (
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">Agrega un suplemento o reserva un servicio para verlo aquí.</p>
            ) : (
              <div className="mt-5 space-y-4">
                {cartItems.map((product) => (
                  <div key={product.id} className="border-b border-rule pb-4">
                    <p className="text-sm text-ink">{product.name}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button type="button" size="icon" variant="outline" aria-label={`Quitar una unidad de ${product.name}`} onClick={() => changeQuantity(product.id, -1)} className="h-7 w-7"><Minus /></Button>
                        <span className="w-7 text-center font-mono text-xs">{cart[product.id]}</span>
                        <Button type="button" size="icon" variant="outline" aria-label={`Agregar una unidad de ${product.name}`} onClick={() => changeQuantity(product.id, 1)} className="h-7 w-7"><Plus /></Button>
                      </div>
                      <span className="font-mono text-xs text-ink-muted">{formatPrice(product.price * (cart[product.id] ?? 0))}</span>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-1"><span className="text-sm text-ink-muted">Subtotal</span><strong className="font-mono text-lg font-medium text-ink">{formatPrice(subtotal)}</strong></div>
                <Button type="button" className="w-full">Continuar</Button>
                <p className="text-center text-[10px] leading-relaxed text-ink-faint">Demostración visual. La compra y la reserva aún no procesan pagos.</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
