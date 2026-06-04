
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/compose")({
    component: Compose,
});

export default function Compose() {
    return (
        <main className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex">
            {/* LEFT */}
            <aside className="w-[300px] border-r border-black/5 bg-[#f8f4ec] p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--wine)]">
                    Creation Tools
                </p>

                <div className="mt-10 space-y-4">
                    {[
                        "Beat References",
                        "Lyrics Direction",
                        "Energy Mapping",
                        "Structure Engine",
                    ].map((item) => (
                        <div
                            key={item}
                            className="border border-black/5 p-5 bg-white"
                        >
                            <p className="font-display text-[24px]">{item}</p>
                        </div>
                    ))}
                </div>

                <Link
                    to="/scratch"
                    className="mt-12 inline-flex border border-[var(--wine)] px-6 py-4 hover:bg-[var(--wine)] transition-colors"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] hover:text-white">
                        Open Scratch Studio →
                    </span>
                </Link>
            </aside>

            {/* CENTER */}
            <section className="flex-1 px-20 py-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--wine)]">
                    Guided Composition
                </p>

                <h1 className="font-display text-[100px] leading-[0.9] tracking-[-0.08em] mt-8">
                    Compose
                    <br />
                    through
                    <br />
                    emotion.
                </h1>

                <p className="font-display italic text-[24px] leading-10 text-black/55 mt-12 max-w-[760px]">
                    Build fully original music using emotional references, structure,
                    lyrical pacing, rhythm, atmosphere, and genre direction.
                </p>
            </section>
        </main>
    );
}
