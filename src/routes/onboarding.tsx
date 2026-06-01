import { createFileRoute, Link } from "@tanstack/react-router";
import logoImg from "@/assets/frequence-logo.png";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Select Mode — FREQUENCE" },
      {
        name: "description",
        content: "Choose how you want to enter FREQUENCE.",
      },
    ],
  }),
  component: Onboarding,
});

function Onboarding() {
  return (
    <main 
      className="fixed inset-0 flex flex-col items-center justify-center bg-[var(--ivory)] px-6 animate-slow-fade"
      style={{ fontFamily: "var(--font-display)" }}
    >
      {/* Background radial highlight */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_center,rgba(26,26,26,0.3)_0,transparent_60%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-xl text-center">
        {/* Logo */}
        <div className="mb-14">
          <img 
            src={logoImg} 
            alt="FREQUENCE" 
            className="w-[440px] md:w-[620px] h-auto object-contain select-none"
            style={{ mixBlendMode: "multiply" }}
            draggable={false}
          />
        </div>

        {/* Subtitle */}
        <p className="font-display italic text-lg md:text-xl text-[var(--ink)]/55 max-w-md leading-relaxed mb-16">
          Every playback, cloned. Every reference, composed. Choose your destination.
        </p>

        {/* Choice Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          {/* LISTEN BUTTON */}
          <Link
            to="/lab"
            className="w-full sm:w-[200px] text-center bg-[#141414] text-[var(--ivory)] font-mono text-xs uppercase tracking-[0.25em] py-5 px-8 transition-all duration-300 hover:bg-[var(--wine)] hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl active:shadow-md cursor-pointer"
          >
            Listen
          </Link>

          {/* COMPOSE BUTTON */}
          <Link
            to="/compose"
            className="w-full sm:w-[200px] text-center bg-[#141414] text-[var(--ivory)] font-mono text-xs uppercase tracking-[0.25em] py-5 px-8 transition-all duration-300 hover:bg-[var(--wine)] hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl active:shadow-md cursor-pointer"
          >
            Compose
          </Link>
        </div>

        {/* Tiny footer kicker */}
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--ink)]/30 mt-28">
          Chapter II · Select your path
        </p>
      </div>
    </main>
  );
}
