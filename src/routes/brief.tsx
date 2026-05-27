import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Nav, SplitShell, PrimaryButton } from "@/components/SplitShell";
import { useState } from "react";

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [
      { title: "Composition Brief — Frequence" },
      { name: "description", content: "Your taste, translated into a music direction document." },
    ],
  }),
  component: BriefPage,
});

const ROWS: [string, string][] = [
  ["Tempo", "112 BPM"],
  ["Key", "D Minor"],
  ["Mood", "Intimate · Nocturnal"],
  ["Genre", "Ambient Jazz / Electro-acoustic"],
  ["Duration", "03:48"],
  ["Instrumentation", "Felt Piano · Upright Bass · Soft Synths"],
  ["Dynamics", "pp → mf"],
  ["Texture", "Grained · Close-mic"],
];

function BriefPage() {
  const navigate = useNavigate();
  const [composing, setComposing] = useState(false);
  const compose = () => {
    setComposing(true);
    setTimeout(() => navigate({ to: "/player" }), 1800);
  };

  return (
    <>
      <Nav />
      <SplitShell>
        <div className="min-h-screen pt-32 pb-24 px-8">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-24 animate-slow-fade">
              <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-6">Chapter III · Composition Brief</p>
              <h2 className="font-display font-light text-5xl md:text-7xl leading-[0.95] mix-blend-difference text-[var(--ivory)]">
                A reading of you.
              </h2>
            </header>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-20">
              <article className="text-[var(--ink)]">
                <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-8">In Prose</p>
                <div className="font-display font-light text-2xl leading-relaxed space-y-5 max-w-md">
                  <p>You favor the long approach. Tracks unfurl slowly, build by inches — you stay for the bridge, often twice.</p>
                  <p>There is warmth without sentiment; a love of texture without ornament. Wood, felt, a single held note.</p>
                  <p className="italic text-[var(--cobalt)]">The room you listen in is small, lit by one lamp, and the door is closed.</p>
                </div>
              </article>

              <aside className="text-[var(--ivory)]">
                <div className="flex items-baseline justify-between mb-8">
                  <p className="font-mono text-[10px] caps text-[var(--taupe)]">Direction Document · 0142</p>
                  <p className="font-mono text-[10px] caps text-[var(--cobalt)]">
                    {composing ? "● Composing" : "○ Ready"}
                  </p>
                </div>
                <dl className="space-y-4">
                  {ROWS.map(([k, v], i) => (
                    <div
                      key={k}
                      className="grid grid-cols-[140px_1fr] gap-6 items-baseline border-b border-[var(--ivory)]/10 pb-3"
                      style={{ animation: `slow-fade-up .8s ease-out both`, animationDelay: `${0.1 + i * 0.05}s` }}
                    >
                      <dt className="font-mono text-[10px] caps text-[var(--ivory)]/60">{k}</dt>
                      <dd className="font-mono text-sm">{v}</dd>
                    </div>
                  ))}
                </dl>

                {composing && (
                  <div className="mt-10">
                    <div className="h-px bg-[var(--ivory)]/15 overflow-hidden">
                      <div className="h-full bg-[var(--cobalt)] origin-left" style={{ animation: "player-progress 1.8s linear forwards" }} />
                    </div>
                    <p className="font-mono text-[10px] caps text-[var(--ivory)]/60 mt-3">Rendering · Stems · Master</p>
                  </div>
                )}
              </aside>
            </div>

            <div className="flex justify-center mt-24 animate-slow-fade">
              <PrimaryButton onClick={compose} kicker={composing ? "Please wait" : "Final step"}>
                {composing ? "Composing…" : "Compose Song"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </SplitShell>
    </>
  );
}
