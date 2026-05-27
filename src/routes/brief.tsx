import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Nav, SplitShell } from "@/components/SplitShell";
import { SplitButton } from "@/components/SplitButton";
import { useState } from "react";

export const Route = createFileRoute("/brief")({
  head: () => ({
    meta: [
      { title: "Composition Brief — FREQUENCE" },
      { name: "description", content: "Your taste, translated into a music direction document. Editorial prose on one side, technical brief on the other." },
    ],
  }),
  component: BriefPage,
});

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
      <SplitShell
        left={<LeftProse />}
        right={<RightDoc composing={composing} />}
        center={
          <div className="translate-y-[42vh]">
            <SplitButton onClick={compose} kicker={composing ? "Mixing…" : "Side A→B"}>
              {composing ? "Composing" : "Compose"}
            </SplitButton>
          </div>
        }
      />
    </>
  );
}

function LeftProse() {
  return (
    <div className="h-screen flex flex-col justify-center px-[6vw] py-32 animate-slow-fade">
      <p className="font-mono text-[10px] caps text-[var(--ink)]/60 mb-4">CHAPTER · III / SIDE A</p>
      <h2 className="font-display text-5xl md:text-6xl font-light leading-[0.95] mb-10 max-w-md">
        A reading of <em>you</em>, in prose.
      </h2>
      <div className="font-display text-xl md:text-2xl font-light leading-relaxed max-w-md space-y-5 text-[var(--ink)]/85">
        <p>
          You favor the long approach. Tracks unfurl slowly, build by inches —
          you stay for the bridge, often twice.
        </p>
        <p>
          There is a warmth to your selections, but never sentiment; a love of
          texture without ornament. Wood, felt, a single held note.
        </p>
        <p className="text-[var(--cobalt)] italic">
          The room you listen in is small, lit by one lamp, and the door is closed.
        </p>
      </div>
    </div>
  );
}

function RightDoc({ composing }: { composing: boolean }) {
  const rows = [
    ["TEMPO", "112 BPM"],
    ["KEY", "D MINOR"],
    ["MOOD", "INTIMATE · NOCTURNAL"],
    ["GENRE", "AMBIENT JAZZ / ELECTRO-ACOUSTIC"],
    ["DURATION", "03 : 48"],
    ["INSTRUMENTATION", "FELT PIANO · UPRIGHT BASS · SOFT SYNTHS"],
    ["DYNAMICS", "PP → MF"],
    ["TEXTURE", "GRAINED · CLOSE-MIC"],
  ];
  return (
    <div className="h-screen flex flex-col justify-center px-[6vw] py-32 animate-slow-fade">
      <div className="flex justify-between mb-8">
        <p className="font-mono text-[10px] caps text-[var(--ivory)]/60">CHAPTER · III / SIDE B</p>
        <p className="font-mono text-[10px] caps text-[var(--cobalt)]">
          {composing ? "● COMPOSING" : "○ READY"}
        </p>
      </div>
      <p className="font-mono text-[10px] caps text-[var(--ivory)]/60 mb-2">DIRECTION DOCUMENT · NO. 0142</p>
      <div className="h-px bg-[var(--ivory)]/20 mb-6" />
      <dl className="space-y-3 max-w-md">
        {rows.map(([k, v], i) => (
          <div
            key={k}
            className="grid grid-cols-[140px_1fr] gap-6 items-baseline"
            style={{ animation: `slow-fade-up .8s ease-out both`, animationDelay: `${0.1 + i * 0.05}s` }}
          >
            <dt className="font-mono text-[10px] caps opacity-60">{k}</dt>
            <dd className="font-mono text-sm text-[var(--ivory)] tracking-wide">
              {v}
            </dd>
          </div>
        ))}
      </dl>

      {composing && (
        <div className="mt-10 max-w-md">
          <div className="h-px bg-[var(--ivory)]/10 overflow-hidden">
            <div className="h-full bg-[var(--cobalt)] origin-left" style={{ animation: "player-progress 1.8s linear forwards" }} />
          </div>
          <p className="font-mono text-[10px] caps opacity-60 mt-3">RENDERING · STEMS · MASTER</p>
        </div>
      )}
    </div>
  );
}
