import { Link, useRouterState } from "@tanstack/react-router";
import { ReactNode } from "react";

interface SplitShellProps {
  left?: ReactNode;
  right?: ReactNode;
  children?: ReactNode;
  minHeight?: string;
}

/** Split background (ivory / charcoal) with a hairline cobalt-tinted divider.
 *  Content is rendered as a single overlay so headings, buttons, and prose
 *  are never broken across the seam. */
export function SplitShell({ left, right, children, minHeight = "100vh" }: SplitShellProps) {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight }}>
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="bg-[var(--ivory)] grain relative">{left}</div>
        <div className="bg-[var(--charcoal)] grain relative">{right}</div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px bg-[var(--taupe)]/60 animate-divider-pulse"
      >
        <div className="absolute inset-0 animate-divider-breathe bg-[var(--taupe)]/60" />
      </div>
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export function Nav() {
  const { location } = useRouterState();
  const items = [
    { to: "/", n: "I" },
    { to: "/taste", n: "II" },
    { to: "/brief", n: "III" },
    { to: "/player", n: "IV" },
  ];
  return (
    <nav className="fixed top-0 inset-x-0 z-40 px-8 py-6 flex items-center justify-between mix-blend-difference text-[var(--ivory)]">
      <Link to="/" className="font-display text-lg tracking-tight">
        Frequence
      </Link>
      <div className="flex gap-8 font-mono text-[10px] caps">
        {items.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            className={location.pathname === i.to ? "opacity-100" : "opacity-50 hover:opacity-100 transition-opacity"}
          >
            {i.n}
          </Link>
        ))}
      </div>
    </nav>
  );
}

/** A clean, single button (not split). Cobalt outline, inverts on hover. */
export function PrimaryButton({
  to, onClick, children, kicker,
}: { to?: string; onClick?: () => void; children: ReactNode; kicker?: string }) {
  const inner = (
    <span className="group inline-flex flex-col items-center gap-3">
      {kicker && <span className="font-mono text-[10px] caps text-[var(--taupe)]">{kicker}</span>}
      <span className="relative inline-flex items-center justify-center px-10 py-4 border border-[var(--cobalt)] bg-[var(--cobalt)] text-[var(--ivory)] font-mono text-[11px] caps transition-all duration-500 hover:bg-transparent hover:text-[var(--cobalt)]">
        {children}
      </span>
    </span>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return <button onClick={onClick} type="button">{inner}</button>;
}

/** A word rendered twice with clip-path, so each half inverts against the
 *  light/dark backdrop behind it. Produces a single, perfectly readable
 *  wordmark that respects the split. */
export function SplitWord({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-block leading-none ${className}`}>
      <span className="text-[var(--ink)]" style={{ clipPath: "inset(0 50% 0 0)" }}>{children}</span>
      <span
        className="absolute inset-0 text-[var(--ivory)]"
        style={{ clipPath: "inset(0 0 0 50%)" }}
        aria-hidden
      >
        {children}
      </span>
    </span>
  );
}
