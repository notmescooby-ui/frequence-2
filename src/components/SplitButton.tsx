import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

interface Props {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
  kicker?: string;
}

/** A button that visually straddles the center divide — half light, half dark. */
export function SplitButton({ to, onClick, children, kicker }: Props) {
  const inner = (
    <div className="group relative inline-flex h-16 min-w-[320px] items-stretch border border-[var(--taupe)]/50 transition-all duration-700 hover:border-[var(--cobalt)]">
      <div className="flex-1 flex items-center justify-end pr-5 bg-[var(--ivory)] text-[var(--ink)] transition-colors duration-700 group-hover:bg-[var(--charcoal)] group-hover:text-[var(--ivory)]">
        <span className="font-mono text-[10px] caps opacity-60">{kicker ?? "Begin"}</span>
      </div>
      <div className="w-px bg-[var(--cobalt)]" />
      <div className="flex-1 flex items-center justify-start pl-5 bg-[var(--charcoal)] text-[var(--ivory)] transition-colors duration-700 group-hover:bg-[var(--ivory)] group-hover:text-[var(--ink)]">
        <span className="font-display text-lg tracking-wide">{children}</span>
      </div>
    </div>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return <button onClick={onClick} type="button">{inner}</button>;
}
