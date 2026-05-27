import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitShell } from "@/components/SplitShell";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/player")({
  head: () => ({
    meta: [
      { title: "Player — A Song Written For You · FREQUENCE" },
      { name: "description", content: "A song composed from your listening history. Side A: metadata and album form. Side B: live waveform in cobalt." },
    ],
  }),
  component: PlayerPage,
});

function PlayerPage() {
  return (
    <>
      <Nav />
      <SplitShell left={<LeftMeta />} right={<RightWave />} />
      <ProgressBar />
    </>
  );
}

function LeftMeta() {
  return (
    <div className="h-screen flex flex-col justify-center px-[6vw] py-32 animate-slow-fade">
      <p className="font-mono text-[10px] caps text-[var(--ink)]/60 mb-4">CHAPTER · IV / SIDE A</p>

      <AbstractCover />

      <p className="font-mono text-[10px] caps text-[var(--ink)]/60 mt-10 mb-2">TITLE</p>
      <h2 className="font-display text-4xl md:text-5xl font-light leading-tight max-w-md">
        A Room Lit By One Lamp
      </h2>
      <p className="font-display italic text-lg text-[var(--ink)]/70 mt-2">
        composed for <span className="text-[var(--cobalt)] not-italic font-mono text-sm caps">anonymous · 0142</span>
      </p>

      <dl className="grid grid-cols-3 gap-6 mt-10 max-w-md">
        {[
          ["LENGTH", "03:48"],
          ["KEY", "D MIN"],
          ["BPM", "112"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="font-mono text-[10px] caps opacity-60">{k}</dt>
            <dd className="font-mono text-base tabular mt-1">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function AbstractCover() {
  return (
    <svg viewBox="0 0 200 200" className="w-48 h-48">
      <rect width="200" height="200" fill="var(--taupe)" opacity="0.35" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="var(--ink)" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="34" fill="var(--cobalt)" />
      <circle cx="100" cy="100" r="6" fill="var(--ivory)" />
      <line x1="0" y1="100" x2="200" y2="100" stroke="var(--ink)" strokeWidth="0.3" opacity="0.5" />
    </svg>
  );
}

function RightWave() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const tick = () => { setT((v) => v + 0.04); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const bars = 64;
  return (
    <div className="h-screen flex flex-col justify-center px-[6vw] py-32 animate-slow-fade">
      <div className="flex justify-between mb-8">
        <p className="font-mono text-[10px] caps text-[var(--ivory)]/60">CHAPTER · IV / SIDE B</p>
        <p className="font-mono text-[10px] caps text-[var(--cobalt)]">● NOW PLAYING</p>
      </div>

      <div className="flex items-end gap-[3px] h-48 max-w-lg">
        {Array.from({ length: bars }).map((_, i) => {
          const h = 8 + Math.abs(Math.sin(i * 0.35 + t)) * 78 + Math.abs(Math.sin(i * 0.11 + t * 0.6)) * 30;
          return (
            <div
              key={i}
              className="flex-1 bg-[var(--cobalt)]"
              style={{ height: `${h}%`, opacity: 0.55 + Math.sin(i + t) * 0.3 }}
            />
          );
        })}
      </div>

      <div className="flex gap-3 mt-12">
        <button className="font-mono text-[10px] caps border border-[var(--ivory)]/30 px-5 py-3 hover:border-[var(--cobalt)] hover:text-[var(--cobalt)] transition-colors">
          ◇ Share
        </button>
        <button className="font-mono text-[10px] caps border border-[var(--ivory)]/30 px-5 py-3 hover:border-[var(--cobalt)] hover:text-[var(--cobalt)] transition-colors">
          ↓ Download
        </button>
        <button className="font-mono text-[10px] caps border border-[var(--ivory)]/30 px-5 py-3 hover:border-[var(--cobalt)] hover:text-[var(--cobalt)] transition-colors">
          ↺ Recompose
        </button>
      </div>

      <p className="font-mono text-[10px] caps text-[var(--ivory)]/40 mt-12 max-w-md leading-relaxed">
        Mastered at -14 LUFS · Stems available · Yours to keep
      </p>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none">
      <div className="grid grid-cols-2 px-8 pb-3 font-mono text-[10px] caps">
        <span className="text-[var(--ink)]/60">01:24</span>
        <span className="text-[var(--ivory)]/60 text-right">03:48</span>
      </div>
      <div className="h-px bg-[var(--taupe)]/30 relative">
        <div className="absolute inset-y-0 left-0 bg-[var(--cobalt)]" style={{ width: "38%" }} />
      </div>
    </div>
  );
}
