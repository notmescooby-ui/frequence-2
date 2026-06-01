import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WineButton } from "@/components/SplitShell";
import { Play, Pause } from "lucide-react";

// Preview beat for composition completion
import summerFunky from "@/assets/beats/summer-funky.mp3";

export const Route = createFileRoute("/compose")({
    component: ComposeScreen,
});

const beatCards = [
    {
        title: "Sun-Drenched Pop",
        reference: "Watermelon Sugar · Harry Styles",
        mood: "Warm guitars · breezy percussion",
    },
    {
        title: "Arena Rock",
        reference: "T.N.T. · AC/DC",
        mood: "Heavy drums · explosive riffs",
    },
    {
        title: "Retro Synth",
        reference: "Blinding Lights · The Weeknd",
        mood: "80s synth pulse · cinematic drive",
    },
];

const lyricCards = [
    "Slow and passionate",
    "Chaotic heartbreak",
    "Late-night longing",
    "Confident and reckless",
];

const energyCards = [
    {
        title: "Intimate Stillness",
        desc: "Low volume, tender acoustics, close-mic vocals.",
        value: "2/10 · still · acoustic",
    },
    {
        title: "Restrained Build",
        desc: "Slow rise, layer by layer, building towards the end.",
        value: "6/10 · slow rise · builds",
    },
    {
        title: "Explosive Release",
        desc: "Heavy drops, energetic beats, epic choruses.",
        value: "9/10 · heavy drop · epic release",
    },
];

const structureCards = [
    {
        title: "Verse-Heavy Story",
        desc: "More words, storytelling, standard pop structure.",
        value: "verse ×2 · chorus ×2 · story",
    },
    {
        title: "Chorus Anthem",
        desc: "Big, memorable choruses, high energy repeats.",
        value: "chorus anthem · big repeats",
    },
    {
        title: "Loop-Based Ambient",
        desc: "Circular hypnotics, textured soundscapes, no hook.",
        value: "ambient loop · circular texture",
    },
];

function ComposeScreen() {
    const [step, setStep] = useState(1);
    const [selectedBeat, setSelectedBeat] = useState("");
    const [selectedLyrics, setSelectedLyrics] = useState("");
    const [selectedEnergy, setSelectedEnergy] = useState("");
    const [selectedStructure, setSelectedStructure] = useState("");

    // Step 5 Compilation state
    const [compiling, setCompiling] = useState(false);
    const [compilationProgress, setCompilationProgress] = useState(0);
    const [composedPlaying, setComposedPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (step === 5) {
            setCompiling(true);
            setCompilationProgress(0);
            const interval = setInterval(() => {
                setCompilationProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setCompiling(false);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 60);
            return () => clearInterval(interval);
        }
    }, [step]);

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const toggleComposedAudio = () => {
        if (composedPlaying) {
            audioRef.current?.pause();
            setComposedPlaying(false);
        } else {
            if (!audioRef.current) {
                audioRef.current = new Audio(summerFunky);
                audioRef.current.volume = 0.7;
                audioRef.current.addEventListener("ended", () => setComposedPlaying(false));
            }
            audioRef.current.play().catch(() => {});
            setComposedPlaying(true);
        }
    };

    return (
        <main className="min-h-screen bg-[#F5F0E8] text-[#141414] flex">
            {/* Left Sidebar */}
            <aside className="w-[280px] border-r border-[#d6cdc1] bg-[#141414] text-[#F5F0E8] p-6 flex flex-col">
                <h2 className="text-xl tracking-[0.25em] uppercase mb-8">
                    Scratch Library
                </h2>

                <div className="space-y-4">
                    {["Analog Drums", "Dreamy Guitar", "Soft Piano", "Neo Synth"].map((item) => (
                        <button
                            key={item}
                            className="w-full border border-[#2c2c2c] p-4 text-left hover:bg-[#1f1f1f] transition"
                        >
                            <p className="text-sm uppercase tracking-[0.2em] text-[#c8b4b4]">
                                Preview Sample
                            </p>
                            <p className="mt-2">{item}</p>
                        </button>
                    ))}
                </div>

                <Link
                    to="/scratch"
                    className="mt-8 block text-center border border-[#9B4D5E] text-[#9B4D5E] py-3 tracking-[0.25em] uppercase hover:bg-[#9B4D5E] hover:text-white transition"
                >
                    From Scratch
                </Link>

                <div className="mt-auto pt-8">
                    <div className="border border-[#2d2d2d] p-4">
                        <p className="text-xs uppercase tracking-[0.25em] text-[#c8b4b4]">
                            Preview Player
                        </p>
                        <div className="mt-3 h-[2px] bg-[#9B4D5E]" />
                    </div>
                </div>
            </aside>

            {/* Middle Workspace */}
            <section className="flex-1 px-16 py-14 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <p className="uppercase tracking-[0.3em] text-sm text-[#9B4D5E]">
                        FREQUENCE COMPOSITION
                    </p>

                    <h1 className="text-6xl leading-none mt-4">
                        Build a song from emotional references.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-[#4a4a4a] leading-relaxed">
                        FREQUENCE does not clone songs. It studies emotional energy,
                        instrumentation, structure, pacing, and lyrical atmosphere to
                        compose something original.
                    </p>

                    {/* Step dots */}
                    <div className="flex gap-3 mt-10">
                        {[1, 2, 3, 4, 5].map((dot) => (
                            <div
                                key={dot}
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                    step >= dot ? "bg-[#9B4D5E]" : "bg-[#d8cec4]"
                                }`}
                            />
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {/* STEP 1: BEAT DIRECTION */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                className="mt-14"
                            >
                                <h2 className="text-3xl mb-8">
                                    How should your beat feel?
                                </h2>

                                <div className="grid grid-cols-3 gap-6">
                                    {beatCards.map((card) => (
                                        <button
                                            key={card.title}
                                            onClick={() => setSelectedBeat(card.reference)}
                                            className={`border p-6 text-left transition ${
                                                selectedBeat === card.reference ? "border-[#9B4D5E] bg-white/40" : "border-[#d8cec4] hover:border-[#9B4D5E]"
                                            }`}
                                        >
                                            <p className="uppercase tracking-[0.25em] text-xs text-[#9B4D5E]">
                                                Reference
                                            </p>
                                            <h3 className="text-2xl mt-3">{card.title}</h3>
                                            <p className="mt-4 italic">{card.reference}</p>
                                            <p className="mt-6 text-sm text-[#5a5a5a]">
                                                {card.mood}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-10">
                                    <WineButton onClick={() => setStep(2)}>
                                        Continue
                                    </WineButton>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 2: LYRICS EMOTION */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                className="mt-14"
                            >
                                <h2 className="text-3xl mb-8">
                                    How should the lyrics feel?
                                </h2>

                                <div className="grid grid-cols-2 gap-6">
                                    {lyricCards.map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setSelectedLyrics(item)}
                                            className={`border p-8 text-left transition ${
                                                selectedLyrics === item ? "border-[#9B4D5E] bg-white/40" : "border-[#d8cec4] hover:border-[#9B4D5E]"
                                            }`}
                                        >
                                            <p className="text-2xl">{item}</p>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="border border-[#141414] px-6 py-3 font-mono text-[10px] uppercase tracking-wider"
                                    >
                                        Back
                                    </button>
                                    <WineButton onClick={() => setStep(3)}>
                                        Continue
                                    </WineButton>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 3: ENERGY CURVE */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                className="mt-14"
                            >
                                <h2 className="text-3xl mb-8">
                                    What's the energy level of the composition?
                                </h2>

                                <div className="grid grid-cols-3 gap-6">
                                    {energyCards.map((card) => (
                                        <button
                                            key={card.title}
                                            onClick={() => setSelectedEnergy(card.value)}
                                            className={`border p-6 text-left transition ${
                                                selectedEnergy === card.value ? "border-[#9B4D5E] bg-white/40" : "border-[#d8cec4] hover:border-[#9B4D5E]"
                                            }`}
                                        >
                                            <p className="uppercase tracking-[0.25em] text-xs text-[#9B4D5E]">
                                                Intensity
                                            </p>
                                            <h3 className="text-2xl mt-3">{card.title}</h3>
                                            <p className="mt-4 text-sm text-[#5a5a5a] leading-relaxed">
                                                {card.desc}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <button
                                        onClick={() => setStep(2)}
                                        className="border border-[#141414] px-6 py-3 font-mono text-[10px] uppercase tracking-wider"
                                    >
                                        Back
                                    </button>
                                    <WineButton onClick={() => setStep(4)}>
                                        Continue
                                    </WineButton>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 4: STRUCTURE */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -18 }}
                                className="mt-14"
                            >
                                <h2 className="text-3xl mb-8">
                                    What's the composition structure?
                                </h2>

                                <div className="grid grid-cols-3 gap-6">
                                    {structureCards.map((card) => (
                                        <button
                                            key={card.title}
                                            onClick={() => setSelectedStructure(card.value)}
                                            className={`border p-6 text-left transition ${
                                                selectedStructure === card.value ? "border-[#9B4D5E] bg-white/40" : "border-[#d8cec4] hover:border-[#9B4D5E]"
                                            }`}
                                        >
                                            <p className="uppercase tracking-[0.25em] text-xs text-[#9B4D5E]">
                                                Layout
                                            </p>
                                            <h3 className="text-2xl mt-3">{card.title}</h3>
                                            <p className="mt-4 text-sm text-[#5a5a5a] leading-relaxed">
                                                {card.desc}
                                            </p>
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-10 flex gap-4">
                                    <button
                                        onClick={() => setStep(3)}
                                        className="border border-[#141414] px-6 py-3 font-mono text-[10px] uppercase tracking-wider"
                                    >
                                        Back
                                    </button>
                                    <WineButton onClick={() => setStep(5)}>
                                        Compile Brief →
                                    </WineButton>
                                </div>
                            </motion.div>
                        )}

                        {/* STEP 5: HOW WE ARE GONNA COMPOSE EXPLANATION & MOCK COMPILED PLAYER */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-14"
                            >
                                <div className="border border-[#9B4D5E] bg-white/40 p-8 mb-10">
                                    <h2 className="text-3xl font-medium tracking-tight text-[#9B4D5E] mb-6">
                                        How We Are Gonna Compose Your Song
                                    </h2>

                                    {compiling ? (
                                        <div className="space-y-6 py-6">
                                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#555555]">
                                                Assembling audio layers ({compilationProgress}%)
                                            </p>
                                            <div className="h-[2px] bg-[#d8cec4] overflow-hidden rounded-full w-full">
                                                <div className="h-full bg-[#9B4D5E] transition-all duration-75" style={{ width: `${compilationProgress}%` }} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-8 animate-slow-fade">
                                            <p className="text-lg leading-relaxed text-[#333333]">
                                                Based on your emotional references, here is a detailed preview of how our AI model is going to compose your original song:
                                            </p>

                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#9B4D5E]">1. Groove & Pacing</span>
                                                    <p className="text-sm mt-2 leading-relaxed text-[#555555]">
                                                        We will study the drum and guitar signature of <em className="font-medium">{selectedBeat || "Sun-Drenched Pop"}</em> to craft a similar warm, breezy percussion pocket.
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#9B4D5E]">2. Lyric Metaphors</span>
                                                    <p className="text-sm mt-2 leading-relaxed text-[#555555]">
                                                        Our language model compiles rhythmic lyrics embodying a <em className="font-medium">{selectedLyrics || "Slow and passionate"}</em> sentiment, synthesizing them into custom vocal layers.
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#9B4D5E]">3. Energy Allocation</span>
                                                    <p className="text-sm mt-2 leading-relaxed text-[#555555]">
                                                        The dynamic curve matches <em className="font-medium">{selectedEnergy || "6/10 Restrained Build"}</em>, beginning with minimal close-mic acoustics and layering synths/grooves.
                                                    </p>
                                                </div>
                                                <div>
                                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#9B4D5E]">4. Structural Flow</span>
                                                    <p className="text-sm mt-2 leading-relaxed text-[#555555]">
                                                        We format the tracks strictly as a <em className="font-medium">{selectedStructure || "verse ×2 · chorus ×2"}</em> to shape transitions beautifully.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Auditory Player */}
                                            <div className="border-t border-[#d6cdc1] pt-8 flex items-center justify-between">
                                                <div>
                                                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9B4D5E]">Composition Preview</p>
                                                    <p className="font-display italic text-[22px] mt-1 text-[#141414]">Original Reflection.wav</p>
                                                </div>

                                                <button
                                                    onClick={toggleComposedAudio}
                                                    className="w-14 h-14 rounded-full bg-[#141414] text-[#F5F0E8] flex items-center justify-center hover:bg-[#9B4D5E] transition-colors"
                                                >
                                                    {composedPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(4)}
                                        className="border border-[#141414] px-6 py-3 font-mono text-[10px] uppercase tracking-wider"
                                    >
                                        Back to Questionnaire
                                    </button>

                                    <Link
                                        to="/lab"
                                        className="bg-[#9B4D5E] text-white px-8 py-4 font-mono text-[10px] uppercase tracking-wider hover:opacity-90 transition-opacity"
                                    >
                                        Master to Player →
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Right Sidebar — Live Composition Brief */}
            <aside className="w-[320px] border-l border-[#d6cdc1] p-8 bg-[#f8f3ec] flex flex-col">
                <p className="uppercase tracking-[0.25em] text-sm text-[#9B4D5E]">
                    Live Composition Brief
                </p>

                <div className="mt-10 space-y-8 flex-1">
                    <div>
                        <p className="uppercase tracking-[0.2em] text-xs text-[#8a8177]">
                            Beat
                        </p>
                        <p className="mt-2 text-lg">
                            {selectedBeat || "Waiting for selection"}
                        </p>
                    </div>

                    <div>
                        <p className="uppercase tracking-[0.2em] text-xs text-[#8a8177]">
                            Lyrics
                        </p>
                        <p className="mt-2 text-lg">
                            {selectedLyrics || "Waiting for selection"}
                        </p>
                    </div>

                    <div>
                        <p className="uppercase tracking-[0.2em] text-xs text-[#8a8177]">
                            Energy
                        </p>
                        <p className="mt-2 text-lg">
                            {selectedEnergy || "Waiting for selection"}
                        </p>
                    </div>

                    <div>
                        <p className="uppercase tracking-[0.2em] text-xs text-[#8a8177]">
                            Structure
                        </p>
                        <p className="mt-2 text-lg">
                            {selectedStructure || "Waiting for selection"}
                        </p>
                    </div>
                </div>
            </aside>
        </main>
    );
}
