import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitHero, CreamSection, SectionLabel, WineButton } from "@/components/SplitShell";
import spotifyimg from "@/assets/spotify.png"
import appleimg from "@/assets/apple-music-logo.png"
import amazonimg from "@/assets/amazon-music-logo.png"

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
    { name: "Spotify", note: "connect your account", src: spotifyimg },
    { name: "Apple Music", note: "connect your account", src: appleimg },
    { name: "Amazon Music", note: "connect your account", src: amazonimg },
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
            <SectionLabel>Choose a source</SectionLabel>
            <h2 className="font-display font-light text-4xl md:text-5xl mb-24 leading-tight">
              We read only what you choose to share — <em className="italic">play counts, top artists, the songs you return to.</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 items-end">
              {platforms.map((p) => (
                <div key={p.name} className="flex flex-col items-center gap-6">
                  <img
                    src={p.src}
                    alt={p.name}
                    loading="lazy"
                    className="w-full h-[440px] object-cover"
                    width={800}
                    height={600}
                  />
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
