
import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import stompandclap from "@/assets/beats/bombinsound-stomp-and-claps-512483.mp3";
import upbeatgroove from "@/assets/beats/mrclaps-upbeat-drums-492537.mp3";
import powerpercussion from "@/assets/beats/energysound-powerful-percussion-513717.mp3";
import actionstomp from "@/assets/beats/energysound-stomp-drum-percussion-513744.mp3";
import goodday from "@/assets/beats/looperman-l-3423104-0425166-good-days-pt1-synth-melody-loop.wav";
import futurebass from "@/assets/beats/alex_makemusic-on-this-future-bass-243982.mp3";
import showme from "@/assets/beats/Peyruis - Show Me (Radio Edit).wav";
import sweetescape from "@/assets/beats/kontraa-sweet-escape-k-pop-music-239117.mp3";
import summermp3 from "@/assets/beats/top-flow-summer-party-157615.mp3";
import musicfree from "@/assets/beats/deltax-music-free-332569.mp3";
import actionrock from "@/assets/beats/magpiemusic-action-trailer-promo-rock-513687.mp3";
import groovy from "@/assets/beats/lightbeatsmusic-joyful-rhythm-walk-funk-513936.mp3";
import playfulnight from "@/assets/beats/alexzavesa-dance-playful-night-510786.mp3";
import actionmusic from "@/assets/beats/energysound-stomp-action-music-513718.mp3";
export const Route = createFileRoute("/scratch")({
    component: ScratchStudio,
});

const beatLibrary = [
    {
        id: "drm_001",
        name: "Stomp & Claps",
        file: stompandclap,
        category: "Drums",
        genre: "Pop",
        mood: "Energetic",
        bpm: 120,
        color: "#9B4D5E"
    },

    {
        id: "drm_002",
        name: "Upbeat Groove Kit",
        file: upbeatgroove,
        category: "Drums",
        genre: "Dance",
        mood: "Happy",
        bpm: 128,
        color: "#FF5E7E"
    },

    {
        id: "drm_003",
        name: "Power Percussion",
        file: powerpercussion,
        category: "Percussion",
        genre: "Trailer",
        mood: "Epic",
        bpm: 135,
        color: "#4A90E2"
    },

    {
        id: "drm_004",
        name: "Action Stomps",
        file: actionstomp,
        category: "Percussion",
        genre: "Cinematic",
        mood: "Aggressive",
        bpm: 140,
        color: "#E05A47"
    },

    {
        id: "syn_001",
        name: "Good Days Synth",
        file: goodday,
        category: "Synth",
        genre: "Chill",
        mood: "Dreamy",
        bpm: 95,
        color: "#9B5DE5"
    },

    {
        id: "syn_002",
        name: "Future Bass Lead",
        file: futurebass,
        category: "Synth",
        genre: "Future Bass",
        mood: "Uplifting",
        bpm: 150,
        color: "#F15BB5"
    },
    {
        id: "beat_001",
        name: "Show Me",
        file: showme,
        category: "Beat",
        genre: "Dance Pop",
        mood: "Feel Good",
        bpm: 122,
        color: "#00BBF9"
    },

    {
        id: "beat_002",
        name: "Sweet Escape",
        file: sweetescape,
        category: "Beat",
        genre: "K-Pop",
        mood: "Bright",
        bpm: 130,
        color: "#00F5D4"
    },

    {
        id: "beat_003",
        name: "Summer Party",
        file: summermp3,
        category: "Beat",
        genre: "Party Pop",
        mood: "Fun",
        bpm: 125,
        color: "#EE9B00"
    },

    {
        id: "beat_004",
        name: "Music Free",
        file: musicfree,
        category: "Beat",
        genre: "Electronic",
        mood: "Open",
        bpm: 128,
        color: "#CA6702"
    },

    {
        id: "beat_005",
        name: "Action Rock",
        file: actionrock,
        category: "Beat",
        genre: "Rock",
        mood: "Powerful",
        bpm: 145,
        color: "#AE2012"
    },

    {
        id: "beat_006",
        name: "Joyful Funk Walk",
        file: groovy,
        category: "Beat",
        genre: "Funk",
        mood: "Groovy",
        bpm: 115,
        color: "#9B2226"
    },

    {
        id: "beat_007",
        name: "Playful Night",
        file: playfulnight,
        category: "Beat",
        genre: "Dance",
        mood: "Playful",
        bpm: 126,
        color: "#118AB2"
    },

    {
        id: "beat_008",
        name: "Action Stomp",
        file: actionmusic,
        category: "Beat",
        genre: "Trailer",
        mood: "Epic",
        bpm: 138,
        color: "#06D6A0"
    }
];

function ScratchStudio() {
    const [activeBeat, setActiveBeat] = useState(beatLibrary[0]);

    const tracks = useMemo(
        () => [
            {
                name: activeBeat.name,
                color: activeBeat.color,
            },
            {
                name: "Bass Layer",
                color: "#3B3B3B",
            },
            {
                name: "Atmosphere",
                color: "#4F4F4F",
            },
            {
                name: "Percussion",
                color: "#636363",
            },
        ],
        [activeBeat]
    );

    return (
        <main className="min-h-screen bg-[#0D0D0D] text-white flex flex-col overflow-hidden">
            {/* TOP BAR */}
            <header className="h-[74px] border-b border-white/5 px-8 flex items-center justify-between bg-black/30 backdrop-blur-xl">
                <div className="flex items-center gap-8">
                    <h1 className="font-display text-[30px] tracking-[-0.04em]">
                        FREQUENCE
                    </h1>

                    <div className="h-6 w-[1px] bg-white/10" />

                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9B4D5E]">
                            Project
                        </p>

                        <p className="font-display italic text-[18px] mt-1">
                            Midnight Session
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#9B4D5E] transition-colors">
                        ▶
                    </button>

                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[#9B4D5E] transition-colors">
                        ❚❚
                    </button>

                    <div className="border border-white/10 px-6 py-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em]">
                            BPM · {activeBeat.bpm}
                        </p>
                    </div>

                    <button className="bg-[#9B4D5E] px-8 py-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                            Export
                        </span>
                    </button>
                </div>
            </header>

            {/* MAIN */}
            <section className="grid grid-cols-[320px_1fr_340px] flex-1 overflow-hidden">
                {/* LEFT PANEL */}
                <aside className="border-r border-ink/10 overflow-y-auto bg-ivory text-ink">
                    <div className="p-8">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-wine">
                            Beat Assets
                        </p>

                        <div className="space-y-4 mt-10">
                            {beatLibrary.map((beat) => {
                                const active = activeBeat.id === beat.id;

                                return (
                                    <button
                                        key={beat.id}
                                        onClick={() => setActiveBeat(beat)}
                                        className={`w-full border p-5 text-left transition-all ${active
                                            ? "border-wine bg-wine/5"
                                            : "border-ink/10 hover:border-ink/20 hover:bg-black/[0.02]"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-wine">
                                                {beat.category}
                                            </p>

                                            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink/50">
                                                {beat.bpm} BPM
                                            </p>
                                        </div>

                                        <h3 className="font-display text-[26px] leading-none mt-4 text-ink">
                                            {beat.name}
                                        </h3>

                                        <div className="mt-6 h-[44px] flex items-end gap-[2px]">
                                            {Array.from({ length: 40 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="flex-1 rounded-full"
                                                    style={{
                                                        background:
                                                            active ? beat.color : "rgba(26,26,26,0.15)",
                                                        height: `${Math.random() * 100}%`,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* CENTER */}
                <section className="relative overflow-hidden bg-[#0B0B0B]">
                    {/* GRID */}
                    <div className="absolute inset-0 opacity-[0.06]">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute top-0 bottom-0 w-[1px] bg-white"
                                style={{
                                    left: `${(i + 1) * 6}%`,
                                }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 p-8 h-full flex flex-col">
                        {/* CHANNEL CONTROLS */}
                        <div className="flex gap-4 mb-8">
                            {["Drums", "Bass", "Synth", "Vocals", "FX"].map((item) => (
                                <button
                                    key={item}
                                    className={`px-6 py-3 border transition-all ${item === "Drums"
                                        ? "border-[#9B4D5E] bg-[#9B4D5E]"
                                        : "border-white/10"
                                        }`}
                                >
                                    <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                                        {item}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* TIMELINE */}
                        <div className="flex-1 border border-white/5 bg-black/20 relative overflow-hidden">
                            {/* TRACKS */}
                            <div className="absolute inset-0">
                                {tracks.map((track, index) => (
                                    <div
                                        key={track.name}
                                        className="h-[110px] border-b border-white/5 relative"
                                    >
                                        <div className="absolute left-0 top-0 bottom-0 w-[140px] border-r border-white/5 bg-black/20 flex items-center px-6">
                                            <div>
                                                <p className="font-display text-[22px]">
                                                    {track.name}
                                                </p>

                                                <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35 mt-2">
                                                    ACTIVE CHANNEL
                                                </p>
                                            </div>
                                        </div>

                                        {/* BLOCKS */}
                                        <div className="ml-[160px] h-full relative">
                                            <div
                                                className="absolute top-[22px] h-[66px] rounded-sm border"
                                                style={{
                                                    left: `${10 + index * 8}%`,
                                                    width: `${42 - index * 5}%`,
                                                    background: `${track.color}22`,
                                                    borderColor: track.color,
                                                }}
                                            />

                                            <div
                                                className="absolute top-[22px] h-[66px] rounded-sm border"
                                                style={{
                                                    left: `${58 - index * 2}%`,
                                                    width: `${18 + index * 2}%`,
                                                    background: `${track.color}15`,
                                                    borderColor: `${track.color}88`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* PLAYHEAD */}
                            <div className="absolute top-0 bottom-0 left-[44%] w-[2px] bg-[#9B4D5E] shadow-[0_0_20px_rgba(155,77,94,0.8)] z-20" />
                        </div>
                    </div>
                </section>

                {/* RIGHT PANEL */}
                <aside className="border-l border-white/5 bg-[#111111] p-8 overflow-y-auto">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#9B4D5E]">
                        Mixer
                    </p>

                    <div className="grid grid-cols-5 items-end justify-items-center mt-10 h-[400px] w-full">
                        {["Drums", "Bass", "Synth", "Vocals", "FX"].map(
                            (channel, index) => (
                                <div
                                    key={channel}
                                    className="flex flex-col items-center"
                                >
                                    <div className="h-[360px] w-[2px] bg-white/10 relative rounded-full">
                                        <div
                                            className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#9B4D5E] border border-white/20"
                                            style={{
                                                bottom: `${20 + index * 12}%`,
                                            }}
                                        />
                                    </div>

                                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45 mt-6">
                                        {channel}
                                    </p>
                                </div>
                            )
                        )}
                    </div>

                    {/* ACTIVE SAMPLE */}
                    <div className="mt-10 border border-white/5 p-6 bg-black/20">
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9B4D5E]">
                            Active Sample
                        </p>

                        <h2 className="font-display text-[38px] leading-none mt-5">
                            {activeBeat.name}
                        </h2>

                        <p className="font-display italic text-[18px] leading-8 text-white/45 mt-5">
                            Loaded directly into the arrangement timeline from your installed
                            beat assets.
                        </p>
                    </div>
                </aside>
            </section>
        </main>
    );
}