import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav, SplitHero, OutlineButton, CreamSection, SectionLabel, WineButton } from "@/components/SplitShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FREQUENCE — Your listening history, composed into sound" },
      { name: "description", content: "An AI music composer that turns your listening history into an original song. Editorial. Intimate. Audiophile-grade." },
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
        <WaveformGallery />
        <Footer />
      </div>
    </>
  );
}

/* ---------------- Platforms ---------------- */
function Platforms() {
  const platforms = [
    { name: "Spotify", note: "OAuth · Listening history" },
    { name: "Apple Music", note: "MusicKit · Library access" },
    { name: "Amazon Music", note: "Token · Recently played" },
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
              <PlatformMark name={p.name} />
              <div className="mt-auto">
                <p className="font-display text-2xl mb-1">{p.name}</p>
                <p className="font-mono text-[10px] caps-wide text-[var(--ink)]/50 mb-6">{p.note}</p>
                <Link
                  to="/connect"
                  className="inline-block font-mono text-[11px] caps-wide border border-[var(--ink)] px-5 py-2 hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors duration-500"
                >
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

function PlatformMark({ name }: { name: string }) {
  // Minimalist wordmark substitutes that read as logos
  if (name === "Spotify") {
    return (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <circle cx="30" cy="30" r="28" fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M14 24c10-4 22-3 32 2" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M17 32c8-3 18-2 26 2" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M20 39c6-2 13-1 19 2" stroke="#1A1A1A" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "Apple Music") {
    return (
      <svg viewBox="0 0 60 60" className="w-12 h-12">
        <path d="M38 12c-3 1-5 3-6 6-1-3 1-7 5-8 .5 1 .5 1.5 1 2z" fill="#1A1A1A" />
        <path d="M44 42c-1 3-2 5-4 7-2 1-4 2-6 0-2-1-4-1-6 0-2 2-4 1-6-1-3-3-5-9-3-15 1-3 4-5 7-5 2 0 4 1 5 1 1 0 4-2 7-1 1 0 4 1 6 4-5 3-4 9 0 10z" fill="#1A1A1A" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" className="w-12 h-12">
      <text x="6" y="36" fontFamily="serif" fontSize="22" fill="#1A1A1A" fontStyle="italic">a</text>
      <path d="M14 44c8 4 24 4 32 0" stroke="#9B4D5E" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------------- Waveform with artist avatars ---------------- */
function WaveformGallery() {
  const artists = ["Harry Styles", "Taylor Swift", "Frank Ocean", "Sade", "Tyler, The Creator", "Phoebe Bridgers", "Arctic Monkeys"];
  // Peak positions across the wave
  const peaks = [10, 24, 38, 50, 64, 78, 90];

  return (
    <CreamSection className="overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionLabel>§ The cadence of your year</SectionLabel>
        <h2 className="font-display italic font-light text-4xl md:text-5xl mb-16 max-w-3xl">
          A waveform of the artists who shaped it.
        </h2>

        <div className="relative w-full h-[260px]">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <path
              d="M0 20 Q5 8 10 8 T20 32 T30 8 T40 32 T50 8 T60 32 T70 8 T80 32 T90 8 T100 20"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="0.3"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M0 20 Q5 14 10 14 T20 26 T30 14 T40 26 T50 14 T60 26 T70 14 T80 26 T90 14 T100 20"
              fill="none"
              stroke="#9B4D5E"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
              opacity="0.6"
            />
          </svg>

          {artists.map((a, i) => (
            <div
              key={a}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${peaks[i]}%`,
                top: i % 2 === 0 ? "22%" : "78%",
              }}
            >
              <ArtistAvatar name={a} index={i} />
              <p className="mt-3 font-mono text-[9px] caps-wide text-center text-[var(--ink)]/70 whitespace-nowrap">
                {a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <WineButton to="/connect">Compose mine</WineButton>
        </div>
      </div>
    </CreamSection>
  );
}

function ArtistAvatar({ name, index }: { name: string; index: number }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  const tones = ["#1A1A1A", "#9B4D5E", "#3A2E2A", "#6B4A4A", "#1A1A1A", "#9B4D5E", "#3A2E2A"];
  return (
    <div
      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-display italic text-xl text-[var(--ivory)]"
      style={{ background: tones[index % tones.length] }}
    >
      {initials}
    </div>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--ivory)] py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="font-display text-2xl mb-2">FREQUENCE</p>
          <p className="font-mono text-[10px] caps-wide text-[var(--ivory)]/50">your listening history, composed into sound</p>
        </div>
        <div className="flex gap-12 font-mono text-[10px] caps-wide text-[var(--ivory)]/60">
          <Link to="/about" className="hover:text-[var(--rose)]">About</Link>
          <Link to="/connect" className="hover:text-[var(--rose)]">Connect</Link>
          <Link to="/how-it-works" className="hover:text-[var(--rose)]">How It Works</Link>
          <Link to="/login" className="hover:text-[var(--rose)]">Login</Link>
        </div>
      </div>
      <p className="font-mono text-[10px] caps-wide text-[var(--ivory)]/30 mt-12 text-center">FREQUENCE · MMXXVI</p>
    </footer>
  );
}
