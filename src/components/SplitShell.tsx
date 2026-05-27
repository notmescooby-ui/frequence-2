import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";

interface SplitShellProps {
  left: ReactNode;
  right: ReactNode;
  /** Element rendered absolutely centered, straddling the divide. */
  center?: ReactNode;
  minHeight?: string;
}

export function SplitShell({ left, right, center, minHeight = "100vh" }: SplitShellProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight }}>
      <div className="grid grid-cols-2 w-full" style={{ minHeight }}>
        <section className="relative bg-[var(--ivory)] text-[var(--ink)] grain overflow-hidden">
          {left}
        </section>
        <section className="relative bg-[var(--charcoal)] text-[var(--ivory)] grain overflow-hidden">
          {right}
        </section>
      </div>

      {/* Razor divider */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px bg-[var(--taupe)]/70 animate-divider-pulse"
      >
        <div className="absolute inset-0 animate-divider-breathe bg-[var(--taupe)]/70" />
      </div>

      {center && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-20">
          <div className="pointer-events-auto">{center}</div>
        </div>
      )}
    </div>
  );
}

export function Nav() {
  const { location } = useRouterState();
  const items = [
    { to: "/", label: "01 — Landing" },
    { to: "/taste", label: "02 — Profile" },
    { to: "/brief", label: "03 — Brief" },
    { to: "/player", label: "04 — Player" },
  ];
  return (
    <nav className="fixed top-0 inset-x-0 z-30 pointer-events-none">
      <div className="grid grid-cols-2">
        <div className="flex items-center justify-between px-8 py-6 text-[var(--ink)]">
          <Link to="/" className="font-display text-xl tracking-tight pointer-events-auto">
            FREQUE<span className="text-[var(--cobalt)]">·</span>
          </Link>
          <div className="hidden md:flex gap-6 text-[10px] caps font-mono pointer-events-auto">
            {items.slice(0, 2).map((i) => (
              <Link key={i.to} to={i.to} className={location.pathname === i.to ? "text-[var(--cobalt)]" : "opacity-70 hover:opacity-100"}>
                {i.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between px-8 py-6 text-[var(--ivory)]">
          <div className="hidden md:flex gap-6 text-[10px] caps font-mono pointer-events-auto">
            {items.slice(2).map((i) => (
              <Link key={i.to} to={i.to} className={location.pathname === i.to ? "text-[var(--cobalt)]" : "opacity-70 hover:opacity-100"}>
                {i.label}
              </Link>
            ))}
          </div>
          <span className="font-mono text-[10px] caps opacity-70">NCE / v0.1</span>
        </div>
      </div>
    </nav>
  );
}
