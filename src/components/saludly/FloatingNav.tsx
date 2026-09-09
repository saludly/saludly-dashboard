import { Link, useRouterState } from "@tanstack/react-router";

const ITEMS: { label: string; to: "/" | "/protocolo" | "/productos"; hash?: string }[] = [
  { label: "INICIO", to: "/" },
  { label: "PROTOCOLO", to: "/protocolo" },
  { label: "BIOMARCADORES", to: "/", hash: "biomarcadores" },
  { label: "PRODUCTOS", to: "/productos" },
];

export function FloatingNav() {
  const { pathname, hash } = useRouterState({ select: (s) => s.location });

  const activeIndex = ITEMS.findIndex((i) =>
    i.hash ? pathname === "/" && hash === i.hash : i.to === pathname && !hash,
  );

  return (
    <div className="pointer-events-none sticky top-3 z-40 flex justify-center px-3 sm:top-4 sm:px-4">
      <nav className="pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full bg-ink/95 p-1 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)] backdrop-blur sm:gap-1 sm:p-1.5">
        {ITEMS.map((item, idx) => (
          <Link
            key={item.label}
            to={item.to}
            {...(item.hash ? { hash: item.hash } : {})}
            className={`shrink-0 rounded-full px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] whitespace-nowrap transition-all duration-300 sm:px-4 sm:text-[10px] sm:tracking-[0.16em] ${
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
