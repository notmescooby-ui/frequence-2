
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
    component: Onboarding,
});

function Onboarding() {
    const [hovered, setHovered] = useState<"listen" | "compose" | null>(null);

    return (
        <main className="fixed inset-0 flex overflow-hidden">
            {/* LISTEN SIDE */}
            <Link
                to="/lab"
                className="relative flex-1 flex flex-col justify-center items-center overflow-hidden transition-all duration-700"
                style={{
                    background:
                        hovered === "listen"
                            ? "#141414"
                            : hovered === "compose"
                                ? "#0f0f0f"
                                : "var(--ivory)",
                }}
                onMouseEnter={() => setHovered("listen")}
                onMouseLeave={() => setHovered(null)}
            >
                {/* background word */}
                <h1
                    className="absolute font-display pointer-events-none"
                    style={{
                        fontSize: "clamp(100px, 14vw, 220px)",
                        opacity: hovered === "listen" ? 0.06 : 0.03,
                        color: hovered === "listen" ? "white" : "black",
                        transition: "all 0.5s ease",
                        letterSpacing: "-0.08em",
                    }}
                >
                    LISTEN
                </h1>

                <div className="relative z-10 text-center max-w-[380px] px-10">
                    <p
                        className="font-mono text-[10px] uppercase tracking-[0.22em]"
                        style={{
                            color:
                                hovered === "listen"
                                    ? "var(--wine)"
                                    : "rgba(26,26,26,0.5)",
                        }}
                    >
                        I · Listener Mode
                    </p>

                    <h2
                        className="font-display mt-8"
                        style={{
                            fontSize: "clamp(42px, 5vw, 72px)",
                            color: hovered === "listen" ? "white" : "var(--ink)",
                            transition: "all 0.5s ease",
                            lineHeight: 0.95,
                        }}
                    >
                        Your music.
                        <br />
                        Reimagined.
                    </h2>

                    <p
                        className="font-display italic mt-8 leading-8"
                        style={{
                            fontSize: 18,
                            color:
                                hovered === "listen"
                                    ? "rgba(255,255,255,0.55)"
                                    : "rgba(26,26,26,0.55)",
                            transition: "all 0.5s ease",
                        }}
                    >
                        FREQUENCE mirrors your connected music account directly into the
                        platform — playlists, artists, liked tracks, and listening history.
                    </p>

                    <div
                        className="mt-14 inline-flex border px-8 py-4 transition-all duration-500"
                        style={{
                            borderColor:
                                hovered === "listen"
                                    ? "var(--wine)"
                                    : "rgba(26,26,26,0.15)",
                            background:
                                hovered === "listen" ? "var(--wine)" : "transparent",
                        }}
                    >
                        <span
                            className="font-mono text-[10px] uppercase tracking-[0.22em]"
                            style={{
                                color:
                                    hovered === "listen"
                                        ? "white"
                                        : "var(--ink)",
                            }}
                        >
                            Open Listening Mode →
                        </span>
                    </div>
                </div>
            </Link>

            {/* divider */}
            <div className="w-[1px] bg-[rgba(0,0,0,0.08)] relative z-20" />

            {/* COMPOSE SIDE */}
            <Link
                to="/compose"
                className="relative flex-[1.15] flex flex-col justify-center overflow-hidden bg-[var(--charcoal)]"
                onMouseEnter={() => setHovered("compose")}
                onMouseLeave={() => setHovered(null)}
            >
                {/* background word */}
                <h1
                    className="absolute right-10 top-10 font-display pointer-events-none"
                    style={{
                        fontSize: "clamp(100px, 16vw, 240px)",
                        opacity: hovered === "compose" ? 0.08 : 0.04,
                        color: "white",
                        transition: "all 0.5s ease",
                        letterSpacing: "-0.08em",
                        lineHeight: 0.85,
                    }}
                >
                    COMPOSE
                </h1>

                <div className="relative z-10 px-20 max-w-[900px]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--wine)]">
                        II · Creation Mode
                    </p>

                    <h2 className="font-display text-[92px] leading-[0.9] tracking-[-0.07em] text-white mt-8">
                        Build songs
                        <br />
                        from emotional
                        <br />
                        references.
                    </h2>

                    <p className="font-display italic text-[24px] leading-10 text-white/55 mt-12 max-w-[720px]">
                        Guide the algorithm through rhythm, atmosphere, lyrics, emotional
                        tone, structure, and references — then generate a fully original
                        composition inspired by your taste.
                    </p>

                    {/* steps */}
                    <div className="grid grid-cols-2 gap-10 mt-20">
                        {[
                            "Beat Direction",
                            "Lyrics & Mood",
                            "Energy Curve",
                            "Structure",
                        ].map((step, i) => (
                            <div
                                key={step}
                                className="border border-white/5 p-7 bg-white/[0.02]"
                            >
                                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--wine)]">
                                    Step 0{i + 1}
                                </p>

                                <h3 className="font-display text-[34px] leading-none text-white mt-5">
                                    {step}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* scratch studio card */}
                    <div className="mt-16 border border-[var(--wine)]/25 bg-[var(--wine)]/5 p-8">
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--wine)]">
                            Included
                        </p>

                        <h3 className="font-display text-[42px] text-white mt-5">
                            Scratch Studio
                        </h3>

                        <p className="font-display italic text-[18px] leading-8 text-white/55 mt-5 max-w-[620px]">
                            Open the fully manual production environment with pre-installed
                            beat libraries, synth textures, vocal fragments, arrangement
                            layers, and preview players.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 mt-16">
                        <div className="bg-[var(--wine)] px-10 py-5">
                            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white">
                                Open Composition Studio →
                            </span>
                        </div>

                        <p className="font-display italic text-[18px] text-white/40">
                            AI-assisted creation + manual production tools
                        </p>
                    </div>
                </div>
            </Link>

            {/* wordmark */}
            <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-center z-50 pointer-events-none">
                <p className="font-display text-[15px] uppercase tracking-[0.18em]">
                    FREQUENCE
                </p>
            </div>
        </main>
    );
}
