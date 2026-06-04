import { createFileRoute } from "@tanstack/react-router";
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

import { StudioHeader } from "../components/studio/StudioHeader";
import { AssetBrowser } from "../components/studio/AssetBrowser";
import { TimelineWorkspace } from "../components/studio/TimelineWorkspace";
import { SceneSelector } from "../components/studio/SceneSelector";
import { InspectorPanel } from "../components/studio/InspectorPanel";
import { Beat } from "../types/studio";

export const Route = createFileRoute("/scratch")({
    component: ScratchStudio,
});

const beatLibrary: Beat[] = [
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
    return (
        <main className="min-h-screen bg-[#0D0D0D] text-white flex flex-col overflow-hidden">
            {/* TOP BAR */}
            <StudioHeader />

            {/* MAIN CONTENT AREA */}
            <section className="grid grid-cols-[320px_1fr_auto] flex-1 overflow-hidden">
                {/* LEFT SIDEBAR: ASSET BROWSER */}
                <AssetBrowser beatLibrary={beatLibrary} />

                {/* CENTER AREA: WORKSPACE TIMELINE */}
                <div className="flex flex-col flex-1 h-full overflow-hidden">
                    <div className="flex-1 p-8 overflow-hidden flex flex-col">
                        <TimelineWorkspace />
                    </div>
                    {/* SCENE SEQUENCER SELECTOR */}
                    <SceneSelector />
                </div>

                {/* RIGHT SIDEBAR: INSPECTOR PANEL */}
                <InspectorPanel />
            </section>
        </main>
    );
}