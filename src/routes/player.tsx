import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitShell } from "@/components/SplitShell";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/player")({
  head: () => ({
    meta: [
      { title: "A Room Lit By One Lamp — Frequence" },
      { name: "description", content: "A song composed from your listening history." },
    ],
  }),
  component: PlayerPage,
});

function PlayerPage() {
  return (
    <>
      <Nav />
      <SplitShell minHeight="calc(100vh - 60px)">
        <div className="min-h-screen pt-32 pb-32 px-8">
          <div className="max-w-6xl mx-auto">
            <header className="text-center mb-20 animate-slow-fade">
              <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-6">Chapter IV · Composed for You</p>
              <h2 className="font-display font-light italic text-5xl md:text-6xl leading-[1] mix-blend-difference text-[var(--ivory)]">
                A Room Lit By One Lamp
              </h2>
            </header>

            <div className="grid md:grid-cols-2 gap-x-16 gap-y-16 items-center">
              <div className="text-[var(--ink)] flex flex-col items-center md:items-start">
                <AbstractCover />
                <dl className="grid grid-cols-3 gap-8 mt-10 w-full max-w-sm">
                  {[["Length", "03:48"], ["Key", "D min"], ["BPM", "112"]].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[10px] caps text-[var(--taupe)]">{k}</dt>
                      <dd className="font-mono text-base tabular mt-1">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="text-[var(--ivory)]">
                <div className="flex justify-between mb-6">
                  <p className="font-mono text-[10px] caps text-[var(--taupe)]">Live Waveform</p>
                  <p className="font-mono text-[10px] caps text-[var(--cobalt)]">● Now Playing</p>
                </div>
                <Visualizer />
                <div className="flex gap-3 mt-10">
                  {["Share", "Download", "Recompose"].map((l) => (
                    <button
                      key={l}
                      className="font-mono text-[10px] caps border border-[var(--ivory)]/30 px-5 py-3 hover:border-[var(--cobalt)] hover:text-[var(--cobalt)] transition-colors"
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SplitShell>
      <ProgressBar />
    </>
  );
}

function AbstractCover() {
  return (
    <svg viewBox="0 0 200 200" className="w-56 h-56">
      <rect width="200" height="200" fill="var(--taupe)" opacity="0.35" />
      <circle cx="100" cy="100" r="58" fill="none" stroke="var(--ink)" strokeWidth="0.6" />
      <circle cx="100" cy="100" r="34" fill="var(--cobalt)" />
      <circle cx="100" cy="100" r="6" fill="var(--ivory)" />
      <line x1="0" y1="100" x2="200" y2="100" stroke="var(--ink)" strokeWidth="0.3" opacity="0.5" />
    </svg>
  );
}

function Visualizer() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf: number;
    const tick = () => { setT((v) => v + 0.04); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const bars = 56;
  return (
    <div className="flex items-end gap-[3px] h-44">
      {Array.from({ length: bars }).map((_, i) => {
        const h = 8 + Math.abs(Math.sin(i * 0.35 + t)) * 70 + Math.abs(Math.sin(i * 0.11 + t * 0.6)) * 28;
        return (
          <div
            key={i}
            className="flex-1 bg-[var(--cobalt)]"
            style={{ height: `${h}%`, opacity: 0.5 + Math.sin(i + t) * 0.3 }}
          />
        );
      })}
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pointer-events-none">
      <div className="px-8 pb-3 flex justify-between font-mono text-[10px] caps text-[var(--ivory)] mix-blend-difference">
        <span>01:24</span><span>03:48</span>
      </div>
      <div className="h-px bg-[var(--taupe)]/30 relative">
        <div className="absolute inset-y-0 left-0 bg-[var(--cobalt)]" style={{ width: "38%" }} />
      </div>
    </div>
  );
}
