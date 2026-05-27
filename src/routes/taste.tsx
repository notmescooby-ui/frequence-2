import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitShell } from "@/components/SplitShell";
import { SplitButton } from "@/components/SplitButton";

export const Route = createFileRoute("/taste")({
  head: () => ({
    meta: [
      { title: "Taste Profile — FREQUENCE" },
      { name: "description", content: "Your listening signature, read in two textures: an editorial list of artists on one side, an audio DNA blueprint on the other." },
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
  { n: "06", name: "Sade", plays: 233 },
  { n: "07", name: "Arthur Russell", plays: 198 },
];

function TastePage() {
  return (
    <>
      <Nav />
      <SplitShell
        left={<LeftList />}
        right={<RightDNA />}
        center={
          <div className="translate-y-[40vh]">
            <SplitButton to="/brief" kicker="Side A complete">Compose Brief</SplitButton>
          </div>
        }
      />
    </>
  );
}

function LeftList() {
  return (
    <div className="h-screen flex flex-col justify-center px-[6vw] py-32 animate-slow-fade">
      <p className="font-mono text-[10px] caps text-[var(--ink)]/60 mb-4">CHAPTER · II / SIDE A</p>
      <h2 className="font-display text-5xl md:text-6xl font-light leading-[0.95] mb-12 max-w-md">
        Your most frequent companions.
      </h2>
      <ol className="space-y-4 max-w-md">
        {ARTISTS.map((a, i) => (
          <li
            key={a.n}
            className="group flex items-baseline justify-between border-b border-[var(--ink)]/15 pb-3 transition-colors hover:border-[var(--cobalt)]"
            style={{ animation: `slow-fade-up .9s ease-out both`, animationDelay: `${0.1 + i * 0.08}s` }}
          >
            <span className="font-mono text-[10px] caps opacity-60 tabular w-8">{a.n}</span>
            <span className="font-display text-2xl md:text-3xl flex-1 px-4 group-hover:italic transition-all">
              {a.name}
            </span>
            <span className="font-mono text-xs tabular opacity-60">{a.plays} plays</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function RightDNA() {
  return (
    <div className="h-screen flex flex-col justify-center px-[6vw] py-32 animate-slow-fade">
      <div className="flex justify-between mb-8">
        <p className="font-mono text-[10px] caps text-[var(--ivory)]/60">CHAPTER · II / SIDE B</p>
        <p className="font-mono text-[10px] caps text-[var(--ivory)]/60">AUDIO · DNA</p>
      </div>

      <Blueprint />

      <dl className="grid grid-cols-2 gap-x-8 gap-y-4 mt-12 max-w-md">
        {[
          ["ENERGY", "0.62"],
          ["VALENCE", "0.48"],
          ["DANCEABILITY", "0.71"],
          ["ACOUSTICNESS", "0.34"],
          ["TEMPO · AVG", "118 BPM"],
          ["KEY · DOM", "D MINOR"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-b border-[var(--ivory)]/15 pb-2">
            <dt className="font-mono text-[10px] caps opacity-60">{k}</dt>
            <dd className="font-mono text-xs tabular text-[var(--cobalt)]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Blueprint() {
  // Radiating soundwave blueprint
  const lines = Array.from({ length: 36 });
  return (
    <svg viewBox="0 0 400 240" className="w-full max-w-lg">
      <g stroke="var(--cobalt)" strokeWidth="0.6" fill="none" opacity="0.9">
        {lines.map((_, i) => {
          const angle = (i / lines.length) * Math.PI;
          const r = 110 + Math.sin(i * 0.7) * 14 + (i % 5) * 4;
          const x1 = 200;
          const y1 = 200;
          const x2 = 200 + Math.cos(Math.PI + angle) * r;
          const y2 = 200 + Math.sin(Math.PI + angle) * r;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              strokeDasharray="1200"
              style={{ animation: `wave-stroke 2.4s ease-out both`, animationDelay: `${i * 0.04}s` }}
            />
          );
        })}
        <path d="M 30 200 Q 200 60 370 200" stroke="var(--taupe)" strokeWidth="0.5" opacity="0.4" />
      </g>
    </svg>
  );
}
