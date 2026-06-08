import { Link } from "@tanstack/react-router";
import { ReactNode, useState } from "react";

/* ============================================================
 *  NAV — deep charcoal bar with hamburger popup
 * ============================================================ */
export function Nav() {
  const [open, setOpen] = useState(false);
  const items = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/connect", label: "Connect" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/login", label: "Login" },
    { to: "/lab", label: "The Lab" },
  ] as const;

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 bg-[var(--charcoal)] text-[var(--ivory)] h-16 px-8 flex items-center justify-between">
        <Link to="/" className="font-display text-xl tracking-tight">
          FREQUENCE
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="font-mono text-sm caps-wide opacity-90 hover:opacity-100 transition-opacity"
        >
          {open ? "Close" : "Menu"} <span className="ml-2">{open ? "×" : "≡"}</span>
        </button>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-[var(--charcoal)] text-[var(--ivory)] animate-menu-in flex flex-col"
          onClick={() => setOpen(false)}
        >
          <div className="h-16" />
          <div className="flex-1 flex flex-col items-center justify-center gap-10 px-8">
            {items.map((i) => (
              <Link
                key={i.to}
                to={i.to}
                onClick={() => setOpen(false)}
                className="font-display italic font-light text-5xl md:text-7xl text-[var(--ivory)] hover:text-[var(--rose)] transition-colors"
              >
                {i.label}
              </Link>
            ))}
          </div>
          <p className="font-mono text-[10px] caps-wide text-[var(--ivory)]/40 text-center pb-10">
            FREQUENCE
          </p>
        </div>
      )}
    </>
  );
}

/* ============================================================
 *  SPLIT HERO — only used at the top of each page
 *  Left half cream, right half charcoal, word straddles the seam.
 * ============================================================ */
interface SplitHeroProps {
  /** word shown in big display type — first half lands on cream, second half on charcoal */
  word: string;
  /** italic tagline below the word */
  tagline: string;
  /** small kicker above */
  kicker?: string;
  /** optional CTA rendered centered below */
  cta?: ReactNode;
  /** extra height multiplier */
  tall?: boolean;
}

export function SplitHero({ word, tagline, kicker, cta, tall = false }: SplitHeroProps) {
  return (
    <header
      className={`relative w-full overflow-hidden ${tall ? "h-[100vh]" : "h-[70vh] min-h-[520px]"}`}
    >
      {/* two backgrounds */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="bg-[var(--ivory)]" />
        <div className="bg-[var(--charcoal)]" />
      </div>

      {/* Huge background watermark logo */}
      <div className="absolute inset-0 select-none pointer-events-none overflow-hidden flex items-center justify-center">
        <span className="font-display font-bold uppercase tracking-[-0.05em] leading-none absolute whitespace-nowrap text-[var(--charcoal)] opacity-[0.035] blur-[0.5px]" style={{ fontSize: "clamp(150px, 20vw, 600px)", clipPath: "inset(0 50% 0 0)" }}>
          FREQUENCE
        </span>
        <span aria-hidden className="font-display font-bold uppercase tracking-[-0.05em] leading-none absolute whitespace-nowrap text-[var(--ivory)] opacity-[0.035] blur-[0.5px]" style={{ fontSize: "clamp(150px, 20vw, 600px)", clipPath: "inset(0 0 0 50%)" }}>
          FREQUENCE
        </span>
      </div>

      {/* hairline wine divider, pulsing */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 animate-divider-wine"
        style={{ width: "0.5px", background: "var(--wine)" }}
      />

      {/* content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        {kicker && (
          <p className="font-mono text-[10px] caps-wide text-[var(--wine)] mb-8 animate-slow-fade">
            {kicker}
          </p>
        )}

        <h1
          className="font-display font-medium tracking-[-0.04em] leading-[0.9] animate-slow-fade"
          style={{ fontSize: "clamp(56px, 13vw, 200px)", animationDelay: "0.15s" }}
        >
          <SplitWord>{word}</SplitWord>
        </h1>

        <p
          className="mt-10 max-w-xl font-display italic font-normal text-xl md:text-2xl animate-slow-fade"
          style={{ animationDelay: "0.4s" }}
        >
          <SplitText>{tagline}</SplitText>
        </p>

        {cta && (
          <div className="mt-12 animate-slow-fade" style={{ animationDelay: "0.6s" }}>
            {cta}
          </div>
        )}
      </div>

      {/* hairline curtain — closes the split, opens the cream */}
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-px bg-[#1A1A1A]" />
    </header>
  );
}

/* A word that inverts color across the central seam */
export function SplitWord({ children }: { children: string }) {
  return (
    <span className="relative inline-block leading-none">
      <span className="text-[var(--ink)]" style={{ clipPath: "inset(0 50% 0 0)" }}>
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-[var(--ivory)]"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        {children}
      </span>
    </span>
  );
}

/* Tagline that also inverts across the seam */
export function SplitText({ children }: { children: string }) {
  return (
    <span className="relative inline-block">
      <span className="text-[var(--ink)]" style={{ clipPath: "inset(0 50% 0 0)" }}>
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-[var(--ivory)]"
        style={{ clipPath: "inset(0 0 0 50%)" }}
      >
        {children}
      </span>
    </span>
  );
}

/* ============================================================
 *  BUTTONS
 * ============================================================ */
export function OutlineButton({
  to, onClick, children, dark = false,
}: { to?: string; onClick?: () => void; children: ReactNode; dark?: boolean }) {
  const cls = dark
    ? "border-[var(--ivory)] text-[var(--ivory)] hover:bg-[var(--ivory)] hover:text-[var(--ink)]"
    : "border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-[var(--ivory)]";
  const inner = (
    <span className={`inline-flex items-center justify-center px-10 py-4 border ${cls} font-mono text-[11px] caps-wide transition-colors duration-500`}>
      {children}
    </span>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return <button type="button" onClick={onClick}>{inner}</button>;
}

export function WineButton({
  to, onClick, type = "button", children, full = false,
}: { to?: string; onClick?: () => void; type?: "button" | "submit"; children: ReactNode; full?: boolean }) {
  const inner = (
    <span className={`inline-flex items-center justify-center px-10 py-4 bg-[var(--wine)] text-[var(--ivory)] font-mono text-[11px] caps-wide transition-opacity duration-300 hover:opacity-85 ${full ? "w-full" : ""}`}>
      {children}
    </span>
  );
  if (to) return <Link to={to} className={full ? "block w-full" : ""}>{inner}</Link>;
  return <button type={type} onClick={onClick} className={full ? "w-full" : ""}>{inner}</button>;
}

/* ============================================================
 *  Section helpers
 * ============================================================ */
export function CreamSection({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`bg-[var(--ivory)] text-[var(--ink)] py-32 px-8 ${className}`}>
      {children}
    </section>
  );
}

export function HairlineRule() {
  return <hr className="border-0 border-t border-[var(--ink)]/15 my-12" />;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] caps-wide text-[var(--wine)] mb-12">{children}</p>;
}
