import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/onboarding")({
    head: () => ({
        meta: [
            { title: "Welcome — FREQUENCE" },
            { name: "description", content: "Choose your path." },
        ],
    }),
    component: Onboarding,
});

function Onboarding() {
    const [hovered, setHovered] = useState<"listen" | "compose" | null>(null);

    return (
        <div className="fixed inset-0 flex overflow-hidden" style={{ fontFamily: "var(--font-display)" }}>
            {/* ── LISTEN side ── */}
            <Link
                to="/lab"
                className="relative flex-1 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-700"
                style={{
                    background: hovered === "compose" ? "#0e0e0e" : hovered === "listen" ? "#141414" : "var(--ivory)",
                }}
                onMouseEnter={() => setHovered("listen")}
                onMouseLeave={() => setHovered(null)}
            >
                {/* background word */}
                <span
                    className="absolute select-none pointer-events-none font-display font-medium"
                    style={{
                        fontSize: "clamp(80px, 14vw, 180px)",
                        letterSpacing: "-0.05em",
                        opacity: hovered === "listen" ? 0.06 : 0.03,
                        color: hovered === "listen" ? "var(--ivory)" : "var(--ink)",
                        transition: "opacity 0.6s ease, color 0.6s ease",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                    }}
                >
                    LISTEN
                </span>

                {/* Roman numeral */}
                <p
                    className="font-mono absolute top-10 left-10"
                    style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: hovered === "listen" ? "var(--wine)" : "var(--ink)",
                        opacity: 0.6,
                        transition: "color 0.5s ease",
                    }}
                >
                    I
                </p>

                {/* Content */}
                <div className="relative z-10 text-center px-12 flex flex-col items-center gap-10">
                    {/* Icon — headphones glyph */}
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            border: `1px solid ${hovered === "listen" ? "rgba(155,77,94,0.6)" : "rgba(26,26,26,0.2)"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "border-color 0.5s ease",
                        }}
                    >
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            stroke={hovered === "listen" ? "var(--ivory)" : "var(--ink)"}
                            strokeWidth="1.2"
                            style={{ transition: "stroke 0.5s ease" }}
                        >
                            <path d="M4 16v-4a10 10 0 0 1 20 0v4" />
                            <rect x="3" y="15" width="4" height="6" rx="2" />
                            <rect x="21" y="15" width="4" height="6" rx="2" />
                        </svg>
                    </div>

                    <div>
                        <h2
                            className="font-display font-medium"
                            style={{
                                fontSize: "clamp(36px, 5vw, 64px)",
                                letterSpacing: "-0.03em",
                                color: hovered === "listen" ? "var(--ivory)" : "var(--ink)",
                                transition: "color 0.5s ease",
                                lineHeight: 1,
                            }}
                        >
                            Listen
                        </h2>
                        <p
                            className="font-display italic font-light mt-4"
                            style={{
                                fontSize: "clamp(14px, 1.5vw, 18px)",
                                color: hovered === "listen" ? "rgba(245,240,232,0.6)" : "rgba(26,26,26,0.5)",
                                transition: "color 0.5s ease",
                                maxWidth: 260,
                                lineHeight: 1.5,
                            }}
                        >
                            Your library, your world. Every playlist, every song — inside FREQUENCE.
                        </p>
                    </div>

                    {/* CTA pill */}
                    <div
                        style={{
                            border: `0.5px solid ${hovered === "listen" ? "rgba(155,77,94,0.6)" : "rgba(26,26,26,0.25)"}`,
                            padding: "10px 28px",
                            transition: "all 0.4s ease",
                            background: hovered === "listen" ? "var(--wine)" : "transparent",
                        }}
                    >
                        <span
                            className="font-mono"
                            style={{
                                fontSize: "10px",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: hovered === "listen" ? "var(--ivory)" : "var(--ink)",
                                transition: "color 0.4s ease",
                            }}
                        >
                            Enter the player →
                        </span>
                    </div>
                </div>

                {/* Bottom label */}
                <p
                    className="font-mono absolute bottom-10 left-0 right-0 text-center"
                    style={{
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: hovered === "listen" ? "rgba(245,240,232,0.3)" : "rgba(26,26,26,0.25)",
                        transition: "color 0.5s ease",
                    }}
                >
                    Spotify · Apple Music · Amazon Music
                </p>
            </Link>

            {/* ── DIVIDER ── */}
            <div
                style={{
                    width: "0.5px",
                    background: hovered ? "var(--wine)" : "rgba(26,26,26,0.2)",
                    transition: "background 0.5s ease",
                    flexShrink: 0,
                    position: "relative",
                    zIndex: 10,
                }}
            />

            {/* ── COMPOSE side ── */}
            <Link
                to="/lab"
                search={{ mode: "create" }}
                className="relative flex-1 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all duration-700"
                style={{
                    background: hovered === "listen" ? "#0e0e0e" : hovered === "compose" ? "#141414" : "var(--charcoal)",
                }}
                onMouseEnter={() => setHovered("compose")}
                onMouseLeave={() => setHovered(null)}
            >
                {/* background word */}
                <span
                    className="absolute select-none pointer-events-none font-display font-medium"
                    style={{
                        fontSize: "clamp(80px, 14vw, 180px)",
                        letterSpacing: "-0.05em",
                        opacity: hovered === "compose" ? 0.07 : 0.03,
                        color: "var(--ivory)",
                        transition: "opacity 0.6s ease",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        whiteSpace: "nowrap",
                    }}
                >
                    COMPOSE
                </span>

                {/* Roman numeral */}
                <p
                    className="font-mono absolute top-10 right-10"
                    style={{
                        fontSize: "10px",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "var(--wine)",
                        opacity: 0.7,
                        transition: "opacity 0.5s ease",
                    }}
                >
                    II
                </p>

                {/* Content */}
                <div className="relative z-10 text-center px-12 flex flex-col items-center gap-10">
                    {/* Icon — waveform/compose glyph */}
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            border: `1px solid ${hovered === "compose" ? "rgba(155,77,94,0.7)" : "rgba(245,240,232,0.15)"}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "border-color 0.5s ease",
                        }}
                    >
                        <svg
                            width="28"
                            height="20"
                            viewBox="0 0 28 20"
                            fill="none"
                            stroke={hovered === "compose" ? "var(--rose)" : "rgba(245,240,232,0.7)"}
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            style={{ transition: "stroke 0.5s ease" }}
                        >
                            <line x1="2" y1="10" x2="4" y2="10" />
                            <line x1="5" y1="5" x2="5" y2="15" />
                            <line x1="8" y1="3" x2="8" y2="17" />
                            <line x1="11" y1="7" x2="11" y2="13" />
                            <line x1="14" y1="1" x2="14" y2="19" />
                            <line x1="17" y1="6" x2="17" y2="14" />
                            <line x1="20" y1="4" x2="20" y2="16" />
                            <line x1="23" y1="8" x2="23" y2="12" />
                            <line x1="24" y1="10" x2="26" y2="10" />
                        </svg>
                    </div>

                    <div>
                        <h2
                            className="font-display font-medium"
                            style={{
                                fontSize: "clamp(36px, 5vw, 64px)",
                                letterSpacing: "-0.03em",
                                color: hovered === "compose" ? "var(--ivory)" : "rgba(245,240,232,0.9)",
                                transition: "color 0.5s ease",
                                lineHeight: 1,
                            }}
                        >
                            Compose
                        </h2>
                        <p
                            className="font-display italic font-light mt-4"
                            style={{
                                fontSize: "clamp(14px, 1.5vw, 18px)",
                                color: hovered === "compose" ? "rgba(245,240,232,0.65)" : "rgba(245,240,232,0.4)",
                                transition: "color 0.5s ease",
                                maxWidth: 280,
                                lineHeight: 1.5,
                            }}
                        >
                            Make something entirely yours. The algorithm follows your taste.
                        </p>
                    </div>

                    {/* CTA pill */}
                    <div
                        style={{
                            border: `0.5px solid ${hovered === "compose" ? "var(--wine)" : "rgba(245,240,232,0.2)"}`,
                            padding: "10px 28px",
                            transition: "all 0.4s ease",
                            background: hovered === "compose" ? "var(--wine)" : "transparent",
                        }}
                    >
                        <span
                            className="font-mono"
                            style={{
                                fontSize: "10px",
                                letterSpacing: "0.2em",
                                textTransform: "uppercase",
                                color: "var(--ivory)",
                                transition: "color 0.4s ease",
                            }}
                        >
                            Open the studio →
                        </span>
                    </div>
                </div>

                {/* Bottom label */}
                <p
                    className="font-mono absolute bottom-10 left-0 right-0 text-center"
                    style={{
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: hovered === "compose" ? "rgba(245,240,232,0.3)" : "rgba(245,240,232,0.15)",
                        transition: "color 0.5s ease",
                    }}
                >
                    Guided wizard · Scratch studio · AI composition
                </p>
            </Link>

            {/* ── FREQUENCE wordmark centred at top ── */}
            <div
                className="absolute top-0 left-0 right-0 flex justify-center items-center"
                style={{ height: 64, pointerEvents: "none", zIndex: 20 }}
            >
                <p
                    className="font-display font-medium"
                    style={{
                        fontSize: 15,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: hovered === "listen" ? "var(--ivory)" : hovered === "compose" ? "var(--ivory)" : "var(--ink)",
                        transition: "color 0.5s ease",
                    }}
                >
                    FREQUENCE
                </p>
            </div>

            {/* ── chapter label centred at bottom ── */}
            <div
                className="absolute bottom-0 left-0 right-0 flex justify-center items-center pb-6"
                style={{ pointerEvents: "none", zIndex: 20 }}
            >
                <p
                    className="font-mono"
                    style={{
                        fontSize: "9px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: hovered ? "rgba(155,77,94,0.6)" : "rgba(100,100,100,0.35)",
                        transition: "color 0.5s ease",
                    }}
                >
                    Chapter II · Choose your path
                </p>
            </div>
        </div>
    );
}