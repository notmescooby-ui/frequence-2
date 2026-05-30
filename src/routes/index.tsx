import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Nav, SplitHero, OutlineButton, CreamSection, SectionLabel, WineButton,
} from "@/components/SplitShell";
import { useEffect, useRef, useState, useCallback } from "react";
import spotifyimg from "@/assets/spotify.png";
import appleimg from "@/assets/apple-music-logo.png";
import amazonimg from "@/assets/amazon-music-logo.png";
import theWeekndImg from "@/assets/the-weekend-img.png";
import taylorSwiftImg from "@/assets/taylor-swift-img.png";
import oneDirectionImg from "@/assets/one-direction-img.png";
import harryStylesImg from "@/assets/harry-styles-img.png";
import billieEilishImg from "@/assets/billie-eilish-img.png";
import badBunnyImg from "@/assets/bad-bunny-img.png";
import arcticMonkeysImg from "@/assets/artic-moneky-img.png";
import arianaGrandeImg from "@/assets/ariana-grande-img.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FREQUENCE — Your listening history, composed into sound" },
      { name: "description", content: "An AI music composer that turns your listening history into an original song." },
      { property: "og:title", content: "FREQUENCE" },
      { property: "og:description", content: "Your listening history, composed into sound." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      <Nav />
      <div className="pt-16">
        <SplitHero
          kicker="Chapter I · An Introduction"
          word="FREQUENCE"
          tagline="your listening history, composed into sound"
          tall
          cta={<OutlineButton to="/connect">Begin the Composition</OutlineButton>}
        />
        <Platforms />
        <BubbleGallery />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
}

const ARTISTS = [
  {
    name: "Harry Styles",
    img: harryStylesImg,
    song: "Sunflower Vol. 6",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/fd/1c/47/fd1c4794-fc22-0c5b-5633-5e982607a9f0/mzaf_1898092671939920039.plus.aac.p.m4a",
  },
  {
    name: "Taylor Swift",
    img: taylorSwiftImg,
    song: "Look What You Made Me Do",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3b/26/64/3b26645a-2c49-f0c7-fa6d-be6ad83b0ae9/mzaf_4194244291813253017.plus.aac.p.m4a",
  },
  {
    name: "Bad Bunny",
    img: badBunnyImg,
    song: "DTMF",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/28/ad/eb/28adeb53-5969-35a0-e136-28767f0d6144/mzaf_15250745364174301370.plus.aac.p.m4a",
  },
  {
    name: "One Direction",
    img: oneDirectionImg,
    song: "Ready to Run",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/1b/c2/27/1bc227d3-b62c-abac-a619-696cd61f7c03/mzaf_3279216438664612903.plus.aac.p.m4a",
  },
  {
    name: "Arctic Monkeys",
    img: arcticMonkeysImg,
    song: "Do I Wanna Know?",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b2/df/5c/b2df5c8f-af5d-646a-663c-c15eede6b48e/mzaf_4729988752193461592.plus.aac.p.m4a",
  },
  {
    name: "Billie Eilish",
    img: billieEilishImg,
    song: "Happier Than Ever",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8c/6b/20/8c6b203a-cadc-25b3-1c91-2a8e77210e31/mzaf_9684961884876177661.plus.aac.p.m4a",
  },
  {
    name: "The Weeknd",
    img: theWeekndImg,
    song: "The Hills",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/0b/70/c8/0b70c898-ec23-3131-5d17-aa7417045013/mzaf_3059117378996578649.plus.aac.p.m4a",
  },
  {
    name: "Ariana Grande",
    img: arianaGrandeImg,
    song: "Bloodline",
    preview: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9e/6e/81/9e6e8116-e8a5-207d-5a33-ee5b33525f10/mzaf_16057526830536441990.plus.aac.p.m4a",
  },
];

type BubbleState = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  wobble: number;
  size: number;
  scale: number;
  status: "floating" | "popping" | "dead" | "spawning";
  popProgress: number;
};

const CONTAINER_H = 640;
const BUBBLE_SIZE = 86;

// Spread evenly across FULL width and height — no clustering
const GRID_POSITIONS = [
  { x: 5, y: 14 },
  { x: 28, y: 8 },
  { x: 52, y: 16 },
  { x: 76, y: 10 },
  { x: 14, y: 65 },
  { x: 38, y: 72 },
  { x: 63, y: 60 },
  { x: 87, y: 68 },
];

function makeInitialBubbles(): BubbleState[] {
  return ARTISTS.map((_, i) => ({
    id: i,
    x: GRID_POSITIONS[i].x + (Math.random() - 0.5) * 5,
    y: GRID_POSITIONS[i].y + (Math.random() - 0.5) * 5,
    // Each bubble starts moving in a unique direction
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    wobble: (i / ARTISTS.length) * Math.PI * 2,
    size: BUBBLE_SIZE + Math.floor(Math.random() * 14) - 7,
    scale: 1,
    status: "floating",
    popProgress: 0,
  }));
}

function BubbleGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<BubbleState[]>(() => makeInitialBubbles());
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; angle: number; progress: number }[]>([]);
  const [toast, setToast] = useState<{ name: string; song: string; countdown: number } | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);
  const toastTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = Math.min(now - lastTime, 32);
      lastTime = now;

      setBubbles((prev) =>
        prev.map((b) => {
          if (b.status === "dead") return b;

          if (b.status === "popping") {
            const next = b.popProgress + dt * 0.004;
            if (next >= 1) return { ...b, status: "dead", popProgress: 1, scale: 0 };
            const s = next < 0.3 ? 1 + next * 0.8 : 1.24 - (next - 0.3) * 1.77;
            return { ...b, popProgress: next, scale: Math.max(0, s) };
          }

          if (b.status === "spawning") {
            const next = b.popProgress + dt * 0.003;
            if (next >= 1) return { ...b, status: "floating", popProgress: 0, scale: 1 };
            return { ...b, popProgress: next, scale: next < 0.6 ? next * 1.4 : 0.84 + (next - 0.6) * 0.4 };
          }

          let { x, y, vx, vy } = b;
          x += vx * (dt / 16);
          y += vy * (dt / 16);

          // Tight margin so bubbles reach right to the edges
          const margin = 2.5;
          if (x <= margin) { x = margin; vx = Math.abs(vx) * 0.88; }
          if (x >= 100 - margin) { x = 100 - margin; vx = -Math.abs(vx) * 0.88; }
          if (y <= margin) { y = margin; vy = Math.abs(vy) * 0.88; }
          if (y >= 100 - margin) { y = 100 - margin; vy = -Math.abs(vy) * 0.88; }

          // Very gentle centre pull — only kicks in near edges
          const distFromCenterX = Math.abs(x - 50);
          const distFromCenterY = Math.abs(y - 50);
          if (distFromCenterX > 35) vx += (50 - x) * 0.000035;
          if (distFromCenterY > 35) vy += (50 - y) * 0.000035;

          const speed = Math.sqrt(vx * vx + vy * vy);
          if (speed > 0.17) { vx = (vx / speed) * 0.17; vy = (vy / speed) * 0.17; }

          return {
            ...b, x, y, vx, vy,
            wobble: b.wobble + dt * 0.0018,
            scale: 1 + Math.sin(b.wobble) * 0.022,
          };
        })
      );

      setParticles((prev) =>
        prev.map((p) => ({ ...p, progress: p.progress + dt * 0.004 })).filter((p) => p.progress < 1)
      );

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pop = useCallback((id: number) => {
    setBubbles((prev) => {
      const bubble = prev.find((b) => b.id === id);
      if (!bubble || bubble.status !== "floating") return prev;

      const artist = ARTISTS[id];

      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: particleIdRef.current++,
        x: bubble.x,
        y: bubble.y,
        angle: (i / 12) * Math.PI * 2 + Math.random() * 0.4,
        progress: 0,
      }));
      setParticles((p) => [...p, ...newParticles]);

      if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; }
      if (toastTimerRef.current) clearInterval(toastTimerRef.current);

      const audio = new Audio(artist.preview);
      audio.volume = 0.75;
      audioRef.current = audio;
      audio.play().catch(() => { });

      setToast({ name: artist.name, song: artist.song, countdown: 8 });
      let remaining = 8;
      toastTimerRef.current = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(toastTimerRef.current!);
          audioRef.current?.pause();
          audioRef.current = null;
          setToast(null);
        } else {
          setToast({ name: artist.name, song: artist.song, countdown: remaining });
        }
      }, 1000);

      setTimeout(() => {
        const edge = Math.floor(Math.random() * 4);
        const spawnX = edge === 1 ? 95 : edge === 3 ? 5 : 5 + Math.random() * 90;
        const spawnY = edge === 0 ? 5 : edge === 2 ? 95 : 5 + Math.random() * 90;
        setBubbles((p) =>
          p.map((b) =>
            b.id === id
              ? { ...b, x: spawnX, y: spawnY, vx: (Math.random() - 0.5) * 0.13, vy: (Math.random() - 0.5) * 0.13, status: "spawning", popProgress: 0, scale: 0 }
              : b
          )
        );
      }, 8000);

      return prev.map((b) => b.id === id ? { ...b, status: "popping", popProgress: 0 } : b);
    });
  }, []);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (toastTimerRef.current) clearInterval(toastTimerRef.current);
    };
  }, []);

  return (
    <CreamSection className="overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>§ Pop to listen</SectionLabel>
        <h2 className="font-display italic font-light text-4xl md:text-5xl mb-4 max-w-3xl">
          Every pop artist, literally.
        </h2>
        <p className="font-mono text-[11px] text-[var(--ink)]/50 mb-10" style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Pop a bubble · hear 8 seconds · that's the deal
        </p>

        <div
          ref={containerRef}
          className="relative w-full"
          style={{ height: `${CONTAINER_H}px` }}
        >
          {/* Ghost watermark */}
          <p
            className="absolute inset-0 flex items-center justify-center font-display italic select-none pointer-events-none"
            style={{ fontSize: "clamp(40px, 10vw, 110px)", letterSpacing: "-0.04em", color: "rgba(26,26,26,0.03)" }}
          >
            POP TO LISTEN
          </p>

          {/* Particles */}
          {particles.map((p) => {
            const dist = p.progress * 90;
            const px = p.x + Math.cos(p.angle) * dist * 0.72;
            const py = p.y + Math.sin(p.angle) * dist * 0.52;
            const size = 4 + (1 - p.progress) * 6;
            return (
              <div
                key={p.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${px}%`, top: `${py}%`,
                  width: size, height: size,
                  background: p.progress < 0.45 ? "#9B4D5E" : "#C8B4B4",
                  opacity: 1 - p.progress,
                  transform: "translate(-50%,-50%)",
                }}
              />
            );
          })}

          {/* Bubbles */}
          {bubbles.map((b) => {
            if (b.status === "dead") return null;
            const artist = ARTISTS[b.id];
            const squishX = 1 + Math.sin(b.wobble) * 0.028;
            const squishY = 1 - Math.sin(b.wobble) * 0.028;
            return (
              <div
                key={b.id}
                className="absolute select-none"
                style={{
                  left: `${b.x}%`, top: `${b.y}%`,
                  width: b.size, height: b.size,
                  transform: `translate(-50%,-50%) scale(${b.scale * squishX},${b.scale * squishY})`,
                  cursor: b.status === "floating" ? "pointer" : "default",
                  willChange: "transform",
                  zIndex: b.status === "spawning" ? 2 : 1,
                }}
                onClick={() => pop(b.id)}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle at 35% 32%, rgba(255,255,255,0.6), rgba(155,77,94,0.07) 65%, rgba(155,77,94,0.2))",
                    border: "1px solid rgba(155,77,94,0.28)",
                    boxShadow: "0 6px 28px rgba(155,77,94,0.13), inset 0 1px 0 rgba(255,255,255,0.65)",
                  }}
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "11%", left: "19%", width: "30%", height: "16%",
                    background: "rgba(255,255,255,0.58)",
                    filter: "blur(2.5px)", borderRadius: "50%",
                    transform: "rotate(-28deg)",
                  }}
                />
                <div className="absolute rounded-full overflow-hidden" style={{ inset: "9%", opacity: 0.86 }}>
                  <img src={artist.img} alt={artist.name} className="w-full h-full object-cover object-top" loading="lazy" draggable={false} />
                </div>
                {b.status === "floating" && (
                  <div
                    className="absolute inset-0 rounded-full flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "rgba(18,18,18,0.54)", backdropFilter: "blur(2px)" }}
                  >
                    <span className="font-mono text-[var(--ivory)] font-medium" style={{ fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase" }}>Pop</span>
                    <span className="font-display italic text-[var(--ivory)]/80 mt-0.5" style={{ fontSize: "10px" }}>{artist.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {toast && (
          <div
            className="mt-4 mx-auto flex items-center gap-4 px-6 py-4"
            style={{ maxWidth: "420px", background: "#141414", border: "0.5px solid rgba(155,77,94,0.4)" }}
          >
            <MiniWavePulse />
            <div className="flex-1 min-w-0">
              <p className="font-mono text-[9px] text-[var(--wine)]" style={{ letterSpacing: "0.18em", textTransform: "uppercase" }}>Now playing</p>
              <p className="font-display italic text-[var(--ivory)] text-sm truncate mt-0.5">{toast.song}</p>
              <p className="font-mono text-[10px] text-[var(--ivory)]/50 mt-0.5" style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>{toast.name}</p>
            </div>
            <CountdownRing seconds={toast.countdown} total={8} />
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <WineButton to="/connect">Compose mine</WineButton>
        </div>
      </div>
    </CreamSection>
  );
}

function MiniWavePulse() {
  return (
    <div className="flex items-center gap-[2px] h-6 shrink-0">
      {[0.6, 1, 0.7, 0.9, 0.5, 1, 0.75].map((h, i) => (
        <div key={i} className="w-[2px] bg-[var(--wine)] rounded-full"
          style={{ height: `${h * 20}px`, animation: `barPulse 0.8s ease-in-out infinite`, animationDelay: `${i * 0.08}s` }}
        />
      ))}
    </div>
  );
}

function CountdownRing({ seconds, total }: { seconds: number; total: number }) {
  const r = 16;
  const circumference = 2 * Math.PI * r;
  return (
    <div className="relative shrink-0 flex items-center justify-center" style={{ width: 40, height: 40 }}>
      <svg width="40" height="40" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="20" cy="20" r={r} fill="none" stroke="rgba(155,77,94,0.2)" strokeWidth="2" />
        <circle cx="20" cy="20" r={r} fill="none" stroke="#9B4D5E" strokeWidth="2"
          strokeDasharray={circumference} strokeDashoffset={circumference * (1 - seconds / total)}
          style={{ transition: "stroke-dashoffset 0.9s linear" }}
        />
      </svg>
      <span className="absolute font-mono text-[var(--wine)]" style={{ fontSize: "11px" }}>{seconds}</span>
    </div>
  );
}

function Platforms() {
  const platforms = [
    { src: spotifyimg, name: "Spotify", note: "OAuth · Listening history" },
    { src: appleimg, name: "Apple Music", note: "MusicKit · Library access" },
    { src: amazonimg, name: "Amazon Music", note: "Token · Recently played" },
  ];
  return (
    <CreamSection>
      <div className="max-w-6xl mx-auto">
        <SectionLabel>§ Connect a source</SectionLabel>
        <h2 className="font-display font-light text-5xl md:text-6xl leading-[1.05] max-w-3xl mb-20">
          Lend us your <em className="italic">ear</em>. We will compose its reflection.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--ink)]/10">
          {platforms.map((p) => (
            <div key={p.name} className="bg-[var(--ivory)] p-10 flex flex-col gap-8 min-h-[260px]">
              <img src={p.src} alt={p.name} loading="lazy" className="w-full h-[440px] object-cover" width={800} height={600} />
              <div className="mt-auto">
                <p className="font-display text-2xl mb-1">{p.name}</p>
                <p className="font-mono text-[10px] text-[var(--ink)]/50 mb-6" style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>{p.note}</p>
                <Link to="/connect" className="inline-block font-mono text-[11px] border border-[var(--ink)] px-5 py-2 hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors duration-500" style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Connect
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CreamSection>
  );
}

function Newsletter() {
  return (
    <section className="bg-[var(--ivory)] py-32 px-8 border-t border-[var(--ink)]/10">
      <div className="max-w-3xl mx-auto text-center">
        <SectionLabel>§ Stay close</SectionLabel>
        <h2 className="font-display font-medium text-4xl md:text-5xl leading-tight mb-6 tracking-[-0.02em]">
          A quiet letter, <em className="italic font-normal">once a month.</em>
        </h2>
        <p className="text-base md:text-lg text-[var(--ink)]/70 mb-14 max-w-xl mx-auto leading-relaxed">
          New compositions, studio notes, and the occasional invitation. Drop your email — we keep our mailing list as carefully edited as our records.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-stretch gap-0 max-w-xl mx-auto border-b border-[var(--ink)]/30 focus-within:border-[var(--wine)] transition-colors">
          <input type="email" placeholder="your@gmail.com" className="flex-1 bg-transparent border-0 outline-none py-4 font-display italic text-xl text-left placeholder:text-[var(--ink)]/30" />
          <button type="submit" className="font-mono text-[11px] bg-[var(--wine)] text-[var(--ivory)] px-8 py-4 hover:opacity-85 transition-opacity" style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>Subscribe</button>
        </form>
        <p className="font-mono text-[10px] text-[var(--ink)]/40 mt-6" style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>No spam. Unsubscribe with one click.</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--ivory)] py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-display text-2xl mb-2">FREQUENCE</p>
          <p className="font-mono text-[10px] text-[var(--ivory)]/50" style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>your listening history, composed into sound</p>
        </div>
        <div className="flex gap-12 font-mono text-[10px] text-[var(--ivory)]/60" style={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
          <Link to="/about" className="hover:text-[var(--rose)]">About</Link>
          <Link to="/connect" className="hover:text-[var(--rose)]">Connect</Link>
          <Link to="/how-it-works" className="hover:text-[var(--rose)]">How It Works</Link>
          <Link to="/login" className="hover:text-[var(--rose)]">Login</Link>
        </div>
      </div>
      <p className="font-mono text-[10px] text-[var(--ivory)]/30 mt-12 text-center" style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>FREQUENCE · MMXXVI</p>
    </footer>
  );
}