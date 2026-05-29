import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/SplitShell";
import {
  Play, Pause, SkipBack, SkipForward, Search, Share2, Volume2, Plus,
} from "lucide-react";

export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "The Lab — FREQUENCE" },
      { name: "description", content: "Your composition studio." },
    ],
  }),
  component: Lab,
});

/* =========================================================
 *  DATA
 * ========================================================= */
const PLAYLISTS = [
  { name: "Late Practice Room", count: 42 },
  { name: "Sunday, Slow", count: 18 },
  { name: "Drive · East", count: 27 },
  { name: "Vinyl Pulls 2024", count: 64 },
  { name: "Studio Worship", count: 31 },
  { name: "Friday, Loud", count: 22 },
  { name: "Bedroom Pop", count: 47 },
  { name: "Coffee + Carbon", count: 14 },
];
const TOP_ARTISTS = ["Frank Ocean", "Sade", "Phoebe Bridgers", "Tyler", "Aphex Twin"];
const TOP_TRACKS = [
  { n: "01", t: "Pink + White", a: "Frank Ocean", d: "3:04" },
  { n: "02", t: "By Your Side", a: "Sade", d: "4:35" },
  { n: "03", t: "Motion Sickness", a: "Phoebe Bridgers", d: "4:01" },
  { n: "04", t: "See You Again", a: "Tyler, The Creator", d: "3:00" },
  { n: "05", t: "Avril 14th", a: "Aphex Twin", d: "2:05" },
  { n: "06", t: "Self Control", a: "Frank Ocean", d: "4:09" },
  { n: "07", t: "No Ordinary Love", a: "Sade", d: "7:21" },
];
const COMPOSITIONS = [
  { t: "Side Letter, no. III", time: "2:48" },
  { t: "Evening, in Rose", time: "3:14" },
  { t: "An Untitled Devotion", time: "4:02" },
];

const STEP_TITLES = [
  "How should it hit?",
  "How should it feel?",
  "What's the energy?",
  "What's the structure?",
];

const REFERENCE_CARDS = [
  [
    { song: "Pink + White", artist: "Frank Ocean", tag: "Breezy · Mid-tempo", tone: "#3A2E2A" },
    { song: "Sweet Life", artist: "Frank Ocean", tag: "Sun-bleached · Float", tone: "#6B4A4A" },
    { song: "By Your Side", artist: "Sade", tag: "Velvet · Slow", tone: "#1A1A1A" },
    { song: "Self Control", artist: "Frank Ocean", tag: "Aching · Soft", tone: "#9B4D5E" },
  ],
  [
    { song: "Motion Sickness", artist: "Phoebe Bridgers", tag: "Second-person · Hurt", tone: "#1A1A1A" },
    { song: "Liability", artist: "Lorde", tag: "Confessional · Quiet", tone: "#6B4A4A" },
    { song: "Lost in the Light", artist: "Bahamas", tag: "Yearning · Slow burn", tone: "#3A2E2A" },
    { song: "Vincent", artist: "Don McLean", tag: "Storytelling · Tender", tone: "#9B4D5E" },
  ],
  [
    { song: "See You Again", artist: "Tyler, The Creator", tag: "Builds · 6 / 10", tone: "#9B4D5E" },
    { song: "Pyramids", artist: "Frank Ocean", tag: "Climbs · 8 / 10", tone: "#1A1A1A" },
    { song: "Redbone", artist: "Childish Gambino", tag: "Pulse · 5 / 10", tone: "#6B4A4A" },
    { song: "Avril 14th", artist: "Aphex Twin", tag: "Still · 2 / 10", tone: "#3A2E2A" },
  ],
];
const STRUCTURE_TILES = ["Verse-heavy", "Chorus anthem", "Bridge-forward", "Loop-based"];

/* =========================================================
 *  PAGE
 * ========================================================= */
function Lab() {
  const [mode, setMode] = useState<"listen" | "create">("listen");
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<(string | null)[]>([null, null, null, null]);

  function reset() {
    setMode("listen");
    setStep(0);
    setSelections([null, null, null, null]);
  }

  function pick(value: string) {
    const next = [...selections];
    next[step] = value;
    setSelections(next);
    if (step < 3) setTimeout(() => setStep(step + 1), 350);
  }

  return (
    <>
      <Nav />
      <div className="pt-16 pb-20 min-h-screen bg-[var(--ivory)]">
        <div className="grid grid-cols-[280px_1fr_280px] gap-px bg-[var(--ink)]/10 min-h-[calc(100vh-64px-80px)]">
          <LeftSidebar />
          <CenterStage
            mode={mode}
            onCreate={() => { setMode("create"); setStep(0); }}
            onCancel={reset}
            step={step}
            setStep={setStep}
            selections={selections}
            pick={pick}
          />
          <RightPanel mode={mode} step={step} selections={selections} onCompose={reset} />
        </div>
      </div>
      <BottomPlayer />
    </>
  );
}

/* =========================================================
 *  LEFT SIDEBAR
 * ========================================================= */
function LeftSidebar() {
  return (
    <aside className="bg-[var(--ivory)] p-6 flex flex-col gap-8 overflow-y-auto">
      <div className="flex items-center gap-3">
        <Avatar initials="OM" tone="#9B4D5E" size={44} />
        <div>
          <p className="font-display text-base leading-tight">Olive Marchetti</p>
          <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/50">Spotify · Premium</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--ink)]/40" />
        <input
          placeholder="Search library"
          className="w-full bg-transparent border-0 border-b border-[var(--ink)]/20 focus:border-[var(--ink)] outline-none py-2 pl-6 font-display italic text-sm placeholder:text-[var(--ink)]/40 transition-colors"
        />
      </div>

      <div>
        <h3 className="font-mono text-[9px] caps-wide text-[var(--wine)] mb-4">Playlists</h3>
        <ul className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
          {PLAYLISTS.map((p) => (
            <li key={p.name} className="flex items-baseline justify-between gap-3 group cursor-pointer">
              <span className="font-display text-sm group-hover:text-[var(--wine)] transition-colors truncate">{p.name}</span>
              <span className="font-mono text-[10px] text-[var(--ink)]/40 tabular shrink-0">{p.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-[9px] caps-wide text-[var(--wine)] mb-4">Top 5 artists</h3>
        <div className="space-y-3">
          {TOP_ARTISTS.map((a, i) => (
            <div key={a} className="flex items-center gap-3">
              <Avatar initials={a.split(" ").map((w) => w[0]).slice(0,2).join("")} tone={["#1A1A1A","#9B4D5E","#3A2E2A","#6B4A4A","#1A1A1A"][i]} size={30} />
              <span className="font-display text-sm">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

/* =========================================================
 *  CENTER STAGE
 * ========================================================= */
function CenterStage({
  mode, onCreate, onCancel, step, setStep, selections, pick,
}: {
  mode: "listen" | "create";
  onCreate: () => void;
  onCancel: () => void;
  step: number;
  setStep: (n: number) => void;
  selections: (string | null)[];
  pick: (v: string) => void;
}) {
  return (
    <main className="bg-[var(--ivory)] px-12 py-12 overflow-y-auto">
      {mode === "listen" ? (
        <ListenerMode onCreate={onCreate} />
      ) : (
        <CreateWizard step={step} setStep={setStep} selections={selections} pick={pick} onCancel={onCancel} />
      )}
    </main>
  );
}

function ListenerMode({ onCreate }: { onCreate: () => void }) {
  const [playing, setPlaying] = useState(true);
  return (
    <div>
      <div className="flex items-start justify-between mb-12">
        <p className="font-mono text-[10px] caps-wide text-[var(--wine)]">Now playing</p>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 font-mono text-[11px] caps-wide border border-[var(--ink)] px-5 py-2 hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors duration-500"
        >
          <Plus className="w-3.5 h-3.5" /> Create
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end mb-16">
        <AlbumArt />
        <div className="flex-1">
          <h1 className="font-display italic font-medium text-5xl md:text-6xl tracking-[-0.03em] leading-[1] mb-4">
            Side Letter, no. III
          </h1>
          <p className="font-mono text-[11px] caps-wide text-[var(--ink)]/60 mb-10">
            Frequence · Original Composition
          </p>

          {/* progress */}
          <div className="relative w-full h-px bg-[var(--ink)]/20 mb-3">
            <div className="absolute inset-y-0 left-0 bg-[var(--wine)]" style={{ width: "42%" }} />
          </div>
          <div className="flex justify-between font-mono text-[10px] text-[var(--ink)]/50 tabular mb-8">
            <span>1:09</span><span>2:48</span>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-[var(--ink)] hover:text-[var(--wine)] transition-colors"><SkipBack className="w-5 h-5" /></button>
            <button
              onClick={() => setPlaying((v) => !v)}
              className="w-14 h-14 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center hover:bg-[var(--wine)] transition-colors"
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button className="text-[var(--ink)] hover:text-[var(--wine)] transition-colors"><SkipForward className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Top tracks */}
      <div className="mt-20">
        <p className="font-mono text-[10px] caps-wide text-[var(--wine)] mb-8">Your top tracks this month</p>
        <div className="border-t border-[var(--ink)]/15">
          {TOP_TRACKS.map((t) => (
            <div key={t.n} className="grid grid-cols-[40px_1fr_1fr_60px] items-baseline gap-6 py-5 border-b border-[var(--ink)]/10 hover:bg-[var(--ink)]/[0.02] transition-colors group cursor-pointer">
              <span className="font-mono text-[10px] text-[var(--ink)]/40 tabular">{t.n}</span>
              <span className="font-display text-lg group-hover:italic transition-all">{t.t}</span>
              <span className="font-mono text-[10px] caps-wide text-[var(--ink)]/60">{t.a}</span>
              <span className="font-mono text-[10px] text-[var(--ink)]/50 tabular text-right">{t.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlbumArt() {
  return (
    <svg viewBox="0 0 200 200" className="w-56 h-56 shrink-0">
      {[80, 65, 50, 35, 20].map((r, i) => (
        <circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none"
          stroke={i === 0 ? "#9B4D5E" : "#6B6358"}
          strokeWidth="0.8"
          strokeDasharray={i === 2 ? "2 4" : undefined}
          opacity={1 - i * 0.15}
        />
      ))}
      <circle cx="100" cy="100" r="3" fill="#1A1A1A" />
    </svg>
  );
}

/* =========================================================
 *  CREATE WIZARD
 * ========================================================= */
function CreateWizard({
  step, setStep, selections, pick, onCancel,
}: {
  step: number;
  setStep: (n: number) => void;
  selections: (string | null)[];
  pick: (v: string) => void;
  onCancel: () => void;
}) {
  return (
    <div className="animate-slow-fade">
      {/* dots */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}`}
              className="h-1.5 transition-all duration-500"
              style={{
                width: i === step ? "32px" : "16px",
                background: selections[i] ? "#9B4D5E" : i === step ? "#1A1A1A" : "rgba(26,26,26,0.2)",
              }}
            />
          ))}
        </div>
        <button onClick={onCancel} className="font-mono text-[10px] caps-wide text-[var(--ink)]/50 hover:text-[var(--ink)] transition-colors">
          Cancel
        </button>
      </div>

      <p className="font-mono text-[10px] caps-wide text-[var(--wine)] mb-4">Step {String(step + 1).padStart(2, "0")} of 04</p>
      <h2 className="font-display italic font-medium text-5xl tracking-[-0.03em] leading-[1] mb-12">
        {STEP_TITLES[step]}
      </h2>

      {step < 3 ? (
        <div className="grid grid-cols-2 gap-6">
          {REFERENCE_CARDS[step].map((c) => {
            const active = selections[step] === c.song;
            return (
              <button
                key={c.song}
                onClick={() => pick(c.song)}
                className={`group relative h-56 overflow-hidden text-left transition-all duration-500 ${active ? "ring-1 ring-[var(--wine)] -translate-y-1" : "hover:-translate-y-1"}`}
                style={{ background: c.tone }}
              >
                <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-[var(--ivory)]">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] caps-wide bg-[var(--ivory)]/15 backdrop-blur px-2 py-1">{c.tag}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 rounded-full bg-[var(--ivory)] text-[var(--ink)] flex items-center justify-center">
                      <Play className="w-4 h-4 ml-0.5" />
                    </span>
                  </div>
                  <div>
                    <p className="font-display italic text-3xl tracking-[-0.02em] leading-tight">{c.song}</p>
                    <p className="font-mono text-[10px] caps-wide mt-2 opacity-70">{c.artist}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {STRUCTURE_TILES.map((t) => {
            const active = selections[3] === t;
            return (
              <button
                key={t}
                onClick={() => pick(t)}
                className={`h-44 border text-left p-6 transition-all duration-500 ${
                  active
                    ? "border-[var(--wine)] bg-[var(--wine)]/5 -translate-y-1"
                    : "border-[var(--ink)]/20 hover:border-[var(--ink)] hover:-translate-y-1"
                }`}
              >
                <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/50">Form</p>
                <p className="font-display font-medium text-3xl mt-3 tracking-[-0.02em] caps-wide">{t}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================
 *  RIGHT PANEL
 * ========================================================= */
function RightPanel({
  mode, step, selections, onCompose,
}: {
  mode: "listen" | "create";
  step: number;
  selections: (string | null)[];
  onCompose: () => void;
}) {
  return (
    <aside className="bg-[var(--ivory)] p-6 flex flex-col gap-8 overflow-y-auto">
      <ArtistCard />
      {mode === "listen" ? <CompositionsList /> : <CompositionBrief selections={selections} step={step} onCompose={onCompose} />}
    </aside>
  );
}

function ArtistCard() {
  return (
    <div className="flex flex-col items-center text-center border border-[var(--ink)]/15 p-5">
      <Avatar initials="OM" tone="#9B4D5E" size={60} />
      <p className="font-display text-lg mt-3 leading-tight">Olive Marchetti</p>
      <p className="font-mono text-[9px] caps-wide text-[var(--wine)] mt-1">Artist</p>
    </div>
  );
}

function CompositionsList() {
  return (
    <div>
      <h3 className="font-mono text-[9px] caps-wide text-[var(--ink)]/60 mb-5">Your compositions</h3>
      <ul className="space-y-5">
        {COMPOSITIONS.map((c) => (
          <li key={c.t} className="border-b border-[var(--ink)]/10 pb-5">
            <p className="font-display italic text-base leading-tight mb-3">{c.t}</p>
            <MiniWave />
            <div className="flex items-center justify-between mt-3">
              <span className="font-mono text-[10px] text-[var(--ink)]/40 tabular">{c.time}</span>
              <div className="flex gap-3">
                <button className="text-[var(--ink)]/60 hover:text-[var(--wine)] transition-colors"><Play className="w-3.5 h-3.5" /></button>
                <button className="text-[var(--ink)]/60 hover:text-[var(--wine)] transition-colors"><Share2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MiniWave() {
  const bars = Array.from({ length: 32 }, (_, i) => 4 + Math.abs(Math.sin(i * 0.6)) * 14);
  return (
    <div className="flex items-center gap-[2px] h-5">
      {bars.map((h, i) => (
        <span key={i} className="w-[2px] bg-[var(--ink)]/40" style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}

function CompositionBrief({ selections, step, onCompose }: { selections: (string | null)[]; step: number; onCompose: () => void }) {
  const lines = [
    { label: "Beat", value: selections[0] ? `breezy · ${selections[0]?.toLowerCase()}` : null },
    { label: "Lyrics", value: selections[1] ? `slow burn · second-person` : null },
    { label: "Energy", value: selections[2] ? `6 / 10 · builds` : null },
    { label: "Structure", value: selections[3] ? `${selections[3]?.toLowerCase()}` : null },
  ];
  const ready = selections.every(Boolean);

  return (
    <div>
      <h3 className="font-mono text-[9px] caps-wide text-[var(--wine)] mb-5">Live brief</h3>
      <div className="border border-[var(--ink)]/15 p-5 space-y-5">
        {lines.map((l, i) => {
          const visible = !!l.value;
          return (
            <div key={l.label} className={`transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-25"}`}>
              <div
                className="h-px bg-[var(--wine)] mb-2 transition-all duration-700 origin-left"
                style={{ transform: `scaleX(${visible ? 1 : 0})` }}
              />
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[9px] caps-wide text-[var(--ink)]/60">{l.label}</span>
                <span className="font-display italic text-sm text-right truncate">
                  {l.value ? <Typewriter text={l.value} key={l.value} /> : "—"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {ready && (
        <button
          onClick={onCompose}
          className="mt-6 w-full bg-[var(--wine)] text-[var(--ivory)] font-mono text-[11px] caps-wide py-4 hover:opacity-85 transition-opacity animate-slow-fade"
        >
          Compose
        </button>
      )}
    </div>
  );
}

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) { clearInterval(id); return v; }
        return v + 1;
      });
    }, 25);
    return () => clearInterval(id);
  }, [text]);
  return <span>{text.slice(0, n)}</span>;
}

/* =========================================================
 *  BOTTOM PLAYER
 * ========================================================= */
function BottomPlayer() {
  const [playing, setPlaying] = useState(true);
  return (
    <div className="fixed bottom-0 inset-x-0 h-20 bg-[var(--ivory)] border-t border-[var(--ink)]/20 px-8 flex items-center gap-8 z-30">
      <div className="flex items-center gap-3 w-[260px]">
        <div className="w-11 h-11 rounded-full bg-[var(--ink)] flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--wine)]" />
        </div>
        <div className="min-w-0">
          <p className="font-display italic text-sm leading-tight truncate">Side Letter, no. III</p>
          <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/50 truncate">Frequence</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button className="text-[var(--ink)]/70 hover:text-[var(--ink)]"><SkipBack className="w-4 h-4" /></button>
          <button
            onClick={() => setPlaying((v) => !v)}
            className="w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center hover:bg-[var(--wine)] transition-colors"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button className="text-[var(--ink)]/70 hover:text-[var(--ink)]"><SkipForward className="w-4 h-4" /></button>
        </div>
        <div className="w-full max-w-xl flex items-center gap-3">
          <span className="font-mono text-[9px] text-[var(--ink)]/50 tabular">1:09</span>
          <div className="relative flex-1 h-px bg-[var(--ink)]/20">
            <div className="absolute inset-y-0 left-0 bg-[var(--wine)]" style={{ width: "42%" }} />
            <div className="absolute -top-[3px] w-[7px] h-[7px] rounded-full bg-[var(--wine)]" style={{ left: "calc(42% - 3.5px)" }} />
          </div>
          <span className="font-mono text-[9px] text-[var(--ink)]/50 tabular">2:48</span>
        </div>
      </div>

      <div className="flex items-center gap-3 w-[220px] justify-end">
        <Volume2 className="w-4 h-4 text-[var(--ink)]/60" />
        <div className="relative w-32 h-px bg-[var(--ink)]/20">
          <div className="absolute inset-y-0 left-0 bg-[var(--ink)]" style={{ width: "70%" }} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
 *  Avatar
 * ========================================================= */
function Avatar({ initials, tone, size }: { initials: string; tone: string; size: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-display italic text-[var(--ivory)] shrink-0"
      style={{ background: tone, width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}
