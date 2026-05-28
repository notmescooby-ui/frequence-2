import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitHero, CreamSection, SectionLabel, WineButton } from "@/components/SplitShell";

export const Route = createFileRoute("/connect")({
  head: () => ({
    meta: [
      { title: "Connect — FREQUENCE" },
      { name: "description", content: "Connect Spotify, Apple Music, or Amazon Music to begin." },
      { property: "og:title", content: "Connect — FREQUENCE" },
      { property: "og:description", content: "Connect with us, connect with music." },
    ],
  }),
  component: Connect,
});

function Connect() {
  const platforms = [
    { name: "Spotify", note: "OAuth handshake" },
    { name: "Apple Music", note: "MusicKit token" },
    { name: "Amazon Music", note: "Account link" },
  ];
  return (
    <>
      <Nav />
      <div className="pt-16">
        <SplitHero
          kicker="Chapter III"
          word="CONNECT"
          tagline="connect with us, connect with music"
        />

        <CreamSection>
          <div className="max-w-4xl mx-auto text-center">
            <SectionLabel>§ Choose a source</SectionLabel>
            <h2 className="font-display font-light text-4xl md:text-5xl mb-24 leading-tight">
              We read only what you choose to share — <em className="italic">play counts, top artists, the songs you return to.</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 items-end">
              {platforms.map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-6">
                  <div className="w-20 h-20 border border-[var(--ink)] rounded-full flex items-center justify-center font-display italic text-2xl">
                    {p.name[0]}
                  </div>
                  <div>
                    <p className="font-display text-2xl">{p.name}</p>
                    <p className="font-mono text-[10px] caps-wide text-[var(--ink)]/50 mt-1">{p.note}</p>
                  </div>
                  <button
                    type="button"
                    className="font-mono text-[11px] caps-wide border border-[var(--ink)] px-8 py-3 hover:bg-[var(--ink)] hover:text-[var(--ivory)] transition-colors duration-500"
                  >
                    Connect
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-32">
              <p className="font-display italic text-xl text-[var(--ink)]/60 mb-6">
                Already connected?
              </p>
              <WineButton to="/login">Sign in</WineButton>
            </div>
          </div>
        </CreamSection>
      </div>
    </>
  );
}
