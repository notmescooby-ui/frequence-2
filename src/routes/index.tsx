import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitShell } from "@/components/SplitShell";
import { SplitButton } from "@/components/SplitButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FREQUENCE — Your listening history, composed into sound" },
      { name: "description", content: "FREQUENCE is an AI music composer that turns your Spotify listening history into original sound. A study in light and dark." },
      { property: "og:title", content: "FREQUENCE — Composed from your sound" },
      { property: "og:description", content: "An AI music composer split between light and dark. Connect Spotify, receive a song written from your taste." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <>
      <Nav />
      <SplitShell
        left={<LeftHero />}
        right={<RightHero />}
        center={<CenterPiece />}
      />
      <Tagline />
    </>
  );
}

function LeftHero() {
  return (
    <div className="relative h-screen flex items-center justify-end pr-[6vw]">
      <div className="animate-slow-fade" style={{ animationDelay: "0.3s" }}>
        <p className="font-mono text-[10px] caps text-[var(--ink)]/60 mb-6">CHAPTER · I</p>
        <h1 className="font-display font-light leading-[0.82] text-[22vw] md:text-[14vw] tracking-[-0.04em] text-[var(--ink)]">
          FREQUE
        </h1>
      </div>
    </div>
  );
}

function RightHero() {
  return (
    <div className="relative h-screen flex items-center justify-start pl-[6vw]">
      <div className="animate-slow-fade" style={{ animationDelay: "0.5s" }}>
        <h1 className="font-display font-light leading-[0.82] text-[22vw] md:text-[14vw] tracking-[-0.04em] text-[var(--ivory)]">
          NCE
        </h1>
        <p className="font-mono text-[10px] caps text-[var(--ivory)]/60 mt-6 text-right">MMXXVI · SIDE B</p>
      </div>
    </div>
  );
}

function CenterPiece() {
  return (
    <div className="flex flex-col items-center gap-12 translate-y-[28vh]">
      <p className="font-display italic font-light text-base md:text-xl text-center max-w-md leading-snug">
        <span className="text-[var(--ink)]">your listening history,</span>{" "}
        <span className="text-[var(--ivory)]">composed into sound.</span>
      </p>
      <SplitButton to="/taste" kicker="Connect Spotify">
        Begin Side A
      </SplitButton>
    </div>
  );
}

function Tagline() {
  return (
    <div className="grid grid-cols-2 border-t border-[var(--taupe)]/30">
      <div className="bg-[var(--ivory)] text-[var(--ink)] p-12 md:p-20 grain relative">
        <p className="font-mono text-[10px] caps opacity-60 mb-6">§ 01 — PREMISE</p>
        <p className="font-display text-2xl md:text-3xl leading-tight max-w-md">
          One side silk. One side matte. The same object — read twice.
        </p>
      </div>
      <div className="bg-[var(--charcoal)] text-[var(--ivory)] p-12 md:p-20 grain relative">
        <p className="font-mono text-[10px] caps opacity-60 mb-6">§ 02 — METHOD</p>
        <p className="font-display text-2xl md:text-3xl leading-tight max-w-md">
          We listen to what you listen to. Then we write you back.
        </p>
      </div>
    </div>
  );
}
