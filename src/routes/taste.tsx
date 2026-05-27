import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitShell, PrimaryButton } from "@/components/SplitShell";

export const Route = createFileRoute("/taste")({
  head: () => ({
    meta: [
      { title: "Taste Profile — Frequence" },
      { name: "description", content: "Your listening signature: artists you return to and the shape of your sound." },
    ],
  }),
  component: TastePage,
});

const ARTISTS = [
  { n: "01", name: "Nils Frahm", plays: 412 },
  { n: "02", name: "Khruangbin", plays: 388 },
  { n: "03", name: "Mount Kimbie", plays: 301 },
  { n: "04", name: "Caribou", plays: 274 },
  { n: "05", name: "Floating Points", plays: 259 },
];

const STATS: [string, string][] = [
  ["Energy", "0.62"],
  ["Valence", "0.48"],
  ["Danceability", "0.71"],
  ["Acousticness", "0.34"],
  ["Avg Tempo", "118"],
  ["Dom Key", "D min"],
];

function TastePage() {
  return (
    <>
      <Nav />
      <SplitShell>
        <div className="min-h-screen pt-32 pb-24 px-8">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-24 animate-slow-fade">
              <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-6">Chapter II · Taste Profile</p>
              <h2 className="font-display font-light text-5xl md:text-7xl leading-[0.95] mix-blend-difference text-[var(--ivory)]">
                What you return to.
              </h2>
            </header>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-24">
              {/* LEFT — Artists list, lives on the ivory side */}
              <div className="text-[var(--ink)]">
                <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-8">Most Played Artists</p>
                <ol className="space-y-5">
                  {ARTISTS.map((a, i) => (
                    <li
                      key={a.n}
                      className="flex items-baseline justify-between border-b border-[var(--ink)]/15 pb-4 hover:border-[var(--cobalt)] transition-colors"
                      style={{ animation: `slow-fade-up .9s ease-out both`, animationDelay: `${0.1 + i * 0.08}s` }}
                    >
                      <span className="font-mono text-[10px] caps text-[var(--taupe)] w-8 tabular">{a.n}</span>
                      <span className="font-display text-3xl flex-1 px-4">{a.name}</span>
                      <span className="font-mono text-xs tabular text-[var(--ink)]/60">{a.plays} plays</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* RIGHT — Audio DNA, lives on the charcoal side */}
              <div className="text-[var(--ivory)]">
                <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-8">Audio DNA</p>
                <Blueprint />
                <dl className="grid grid-cols-2 gap-x-8 gap-y-4 mt-10">
                  {STATS.map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-[var(--ivory)]/15 pb-2">
                      <dt className="font-mono text-[10px] caps text-[var(--ivory)]/60">{k}</dt>
                      <dd className="font-mono text-xs tabular text-[var(--cobalt)]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="flex justify-center mt-24 animate-slow-fade">
              <PrimaryButton to="/brief" kicker="Continue">Compose Brief</PrimaryButton>
            </div>
          </div>
        </div>
      </SplitShell>
    </>
  );
}

function Blueprint() {
  const lines = Array.from({ length: 32 });
  return (
    <svg viewBox="0 0 400 220" className="w-full">
      <g stroke="var(--cobalt)" strokeWidth="0.6" fill="none">
        {lines.map((_, i) => {
          const angle = (i / lines.length) * Math.PI;
          const r = 100 + Math.sin(i * 0.7) * 14 + (i % 5) * 4;
          const x2 = 200 + Math.cos(Math.PI + angle) * r;
          const y2 = 200 + Math.sin(Math.PI + angle) * r;
          return (
            <line
              key={i}
              x1={200} y1={200} x2={x2} y2={y2}
              strokeDasharray="1200"
              style={{ animation: `wave-stroke 2.4s ease-out both`, animationDelay: `${i * 0.05}s` }}
            />
          );
        })}
        <path d="M 30 200 Q 200 80 370 200" stroke="var(--taupe)" strokeWidth="0.5" opacity="0.4" />
      </g>
    </svg>
  );
}
