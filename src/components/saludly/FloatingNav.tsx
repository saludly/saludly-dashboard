import { Link, useRouterState } from "@tanstack/react-router";

const ITEMS = [
  { label: "INICIO", to: "/", hash: undefined },
  { label: "PROTOCOLO", to: "/protocolo", hash: undefined },
  { label: "BIOMARCADORES", to: "/", hash: "biomarcadores" },
  { label: "PRODUCTOS", to: "/productos", hash: undefined },
] as const;

export function FloatingNav() {
  const { pathname, hash } = useRouterState({ select: (s) => s.location });

  const activeIndex = ITEMS.findIndex((i) =>
    i.hash ? pathname === "/" && hash === i.hash : i.to === pathname && !hash,
  );

  return (
    <div className="pointer-events-none sticky top-4 z-40 flex justify-center px-4">
      <nav className="pointer-events-auto flex items-center gap-1 rounded-full bg-ink/95 p-1.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur">
        {ITEMS.map((item, idx) => (
          <Link
            key={item.label}
            to={item.to}
            hash={item.hash}
            className={`rounded-full px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${
              idx === activeIndex
                ? "bg-background text-ink"
                : "text-background/60 hover:bg-background/10 hover:text-background"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
