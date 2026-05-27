import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitShell, PrimaryButton, SplitWord } from "@/components/SplitShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frequence — Your listening history, composed into sound" },
      { name: "description", content: "An AI music composer that turns your Spotify history into an original song. A study in light and dark." },
      { property: "og:title", content: "Frequence" },
      { property: "og:description", content: "Your listening history, composed into sound." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      <Nav />
      <SplitShell>
        <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
          <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-10 animate-slow-fade">
            Chapter I · An Introduction
          </p>

          <h1 className="font-display font-light tracking-[-0.03em] text-[18vw] md:text-[13vw] leading-[0.9] animate-slow-fade" style={{ animationDelay: "0.2s" }}>
            <SplitWord>Frequence</SplitWord>
          </h1>

          <p className="mt-12 max-w-md font-display italic font-light text-xl md:text-2xl text-[var(--taupe)] animate-slow-fade" style={{ animationDelay: "0.5s" }}>
            Your listening history, composed into sound.
          </p>

          <div className="mt-14 animate-slow-fade" style={{ animationDelay: "0.8s" }}>
            <PrimaryButton to="/taste" kicker="Begin">
              Connect Spotify
            </PrimaryButton>
          </div>
        </div>
      </SplitShell>

      <Manifesto />
      <Footer />
    </>
  );
}

function Manifesto() {
  const lines = [
    ["§ I", "You listen. We listen with you."],
    ["§ II", "Your taste becomes a brief. The brief becomes a song."],
    ["§ III", "One side silk. One side matte. The same object."],
  ];
  return (
    <section className="bg-[var(--ivory)] text-[var(--ink)] py-32 px-8 grain relative">
      <div className="max-w-3xl mx-auto">
        <p className="font-mono text-[10px] caps text-[var(--taupe)] mb-12">The Method</p>
        <div className="space-y-10">
          {lines.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[60px_1fr] gap-8 items-baseline border-b border-[var(--ink)]/10 pb-8">
              <span className="font-mono text-[10px] caps text-[var(--taupe)]">{k}</span>
              <p className="font-display font-light text-3xl md:text-4xl leading-tight">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--ivory)] py-12 px-8 grain relative">
      <div className="max-w-3xl mx-auto flex justify-between items-center font-mono text-[10px] caps text-[var(--ivory)]/60">
        <span>Frequence · MMXXVI</span>
        <span>Side A / Side B</span>
      </div>
    </footer>
  );
}
