import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Play, Pause, Plus, Trash2, ArrowLeft, Download, Volume2 } from "lucide-react";
import { Nav } from "@/components/SplitShell";

// Pre-installed beats imports
import summerFunky from "@/assets/beats/summer-funky.mp3";
import latinFlavour from "@/assets/beats/latin-flavour.mp3";
import walkerBeats from "@/assets/beats/walker-beats.mp3";
import groovyBeatsWithLyrics from "@/assets/beats/groovy-beats-with-lyrics.mp3";
import mrclapsUpbeat from "@/assets/beats/mrclaps-upbeat-drums-492537.mp3";
import synthMelody from "@/assets/beats/looperman-l-3423104-0425166-good-days-pt1-synth-melody-loop.wav";
import showMeRadio from "@/assets/beats/Peyruis - Show Me (Radio Edit).wav";
import streetStyle from "@/assets/beats/street-style.mp3";
import stompAction from "@/assets/beats/energysound-stomp-action-music-513718.mp3";
import stompDrum from "@/assets/beats/energysound-stomp-drum-percussion-513744.mp3";

export const Route = createFileRoute("/scratch")({
  head: () => ({
    meta: [
      { title: "Scratch Studio — FREQUENCE" },
      { name: "description", content: "Build your sound manually." },
    ],
  }),
  component: ScratchStudio,
});

const LIBRARY_SAMPLES = [
  { id: "1", name: "Summer Funky Loop", src: summerFunky, category: "Groove", duration: "12s" },
  { id: "2", name: "Latin Flavour", src: latinFlavour, category: "Percussion", duration: "10s" },
  { id: "3", name: "Walker Bassline", src: walkerBeats, category: "Bass", duration: "13s" },
  { id: "4", name: "Neo-Synth Melody", src: synthMelody, category: "Melody", duration: "8s" },
  { id: "5", name: "Show Me Radio Loop", src: showMeRadio, category: "Vocal", duration: "15s" },
  { id: "6", name: "Groovy Beat Lyrics", src: groovyBeatsWithLyrics, category: "Groove", duration: "18s" },
  { id: "7", name: "Upbeat Claps Drums", src: mrclapsUpbeat, category: "Percussion", duration: "7s" },
  { id: "8", name: "Street Style Groove", src: streetStyle, category: "Groove", duration: "12s" },
  { id: "9", name: "Cinematic Action Bass", src: stompAction, category: "Bass", duration: "12s" },
  { id: "10", name: "Urban Stomp Drums", src: stompDrum, category: "Groove", duration: "10s" },
];

interface TimelineBlock {
  id: string;
  sampleId: string;
  sampleName: string;
  category: string;
  trackIndex: number; // 0: Drums, 1: Bass, 2: Melody, 3: Ambient
  gridCol: number;    // start column (0 to 11)
  cols: number;       // length in grid columns
  src: string;
}

function ScratchStudio() {
  const [activeSample, setActiveSample] = useState<typeof LIBRARY_SAMPLES[0] | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);
  const [timelineBlocks, setTimelineBlocks] = useState<TimelineBlock[]>([
    { id: "b1", sampleId: "1", sampleName: "Summer Funky Loop", category: "Groove", trackIndex: 0, gridCol: 0, cols: 3, src: summerFunky },
    { id: "b2", sampleId: "3", sampleName: "Walker Bassline", category: "Bass", trackIndex: 1, gridCol: 2, cols: 3, src: walkerBeats },
    { id: "b3", sampleId: "4", sampleName: "Neo-Synth Melody", category: "Melody", trackIndex: 2, gridCol: 4, cols: 2, src: synthMelody },
  ]);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
  const [timelinePlayhead, setTimelinePlayhead] = useState(0); // 0 to 100%
  const [exporting, setExporting] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const previewAudioRef = useRef<HTMLAudioElement | null>(null);
  const timelineIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Playback of single preview sample
  const handlePlayPreview = (sample: typeof LIBRARY_SAMPLES[0]) => {
    if (activeSample?.id === sample.id && isPlayingPreview) {
      previewAudioRef.current?.pause();
      setIsPlayingPreview(false);
      return;
    }

    if (previewAudioRef.current) {
      previewAudioRef.current.pause();
    }

    setActiveSample(sample);
    const audio = new Audio(sample.src);
    audio.volume = 0.8;
    previewAudioRef.current = audio;
    setIsPlayingPreview(true);
    setPlaybackProgress(0);

    audio.play().catch(() => {});

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        setPlaybackProgress((audio.currentTime / audio.duration) * 100);
      }
    });

    audio.addEventListener("ended", () => {
      setIsPlayingPreview(false);
      setPlaybackProgress(0);
    });
  };

  // Timeline Playback loop
  useEffect(() => {
    if (isTimelinePlaying) {
      const intervalTime = 100; // ms
      const stepSize = 0.8; // progress step per tick
      timelineIntervalRef.current = setInterval(() => {
        setTimelinePlayhead((prev) => {
          const next = prev + stepSize;
          if (next >= 100) {
            return 0; // loop
          }
          return next;
        });
      }, intervalTime);
    } else {
      if (timelineIntervalRef.current) {
        clearInterval(timelineIntervalRef.current);
      }
    }

    return () => {
      if (timelineIntervalRef.current) {
        clearInterval(timelineIntervalRef.current);
      }
    };
  }, [isTimelinePlaying]);

  useEffect(() => {
    return () => {
      if (previewAudioRef.current) {
        previewAudioRef.current.pause();
      }
    };
  }, []);

  // Add block to timeline
  const addBlockToTimeline = (sample: typeof LIBRARY_SAMPLES[0], trackIndex: number) => {
    // Find first vacant spot
    const trackBlocks = timelineBlocks.filter((b) => b.trackIndex === trackIndex);
    let startCol = 0;
    while (trackBlocks.some((b) => b.gridCol === startCol || (startCol >= b.gridCol && startCol < b.gridCol + b.cols))) {
      startCol += 2;
      if (startCol >= 12) {
        startCol = 0;
        break; // wrap
      }
    }

    const newBlock: TimelineBlock = {
      id: "b_" + Date.now(),
      sampleId: sample.id,
      sampleName: sample.name,
      category: sample.category,
      trackIndex,
      gridCol: startCol,
      cols: sample.category === "Melody" ? 2 : 3,
      src: sample.src,
    };

    setTimelineBlocks([...timelineBlocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setTimelineBlocks(timelineBlocks.filter((b) => b.id !== id));
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setShowExportModal(true);
    }, 2800);
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-[#0e0e0e] text-[#F5F0E8] flex flex-col pt-16" style={{ fontFamily: "var(--font-display)" }}>
        {/* Header */}
        <header className="border-b border-[#222222] px-8 py-5 flex items-center justify-between z-10 bg-[#0e0e0e]/80 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <Link to="/compose" className="p-2 border border-[#333333] hover:border-[#9B4D5E] transition-colors rounded-full text-[#c8b4b4] hover:text-[var(--ivory)]">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#9B4D5E]">Manual Production</p>
              <h1 className="text-3xl font-medium tracking-tight mt-1">Scratch Studio</h1>
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={exporting}
            className="border border-[#9B4D5E] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9B4D5E] hover:bg-[#9B4D5E] hover:text-white transition-all disabled:opacity-50"
          >
            {exporting ? "Compiling Arrangement..." : "Export Session →"}
          </button>
        </header>

        <div className="flex-1 grid grid-cols-[340px_1fr] overflow-hidden">
          {/* LEFT SIDEBAR — Pre-installed Beats Library */}
          <aside className="border-r border-[#222222] bg-[#121212] flex flex-col relative h-[calc(100vh-64px-77px)]">
            <div className="p-6 border-b border-[#222222]">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#c8b4b4]">Pre-installed Library</h2>
              <p className="text-[12px] italic text-[#888888] mt-1">Click to preview, or use (+) to add to the timeline.</p>
            </div>

            {/* Scrollable Sample list */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3" style={{ scrollbarWidth: "none" }}>
              {LIBRARY_SAMPLES.map((sample) => {
                const isActive = activeSample?.id === sample.id && isPlayingPreview;
                return (
                  <div
                    key={sample.id}
                    onClick={() => handlePlayPreview(sample)}
                    className={`group w-full p-4 border text-left cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isActive ? "border-[#9B4D5E] bg-[#1a1314]" : "border-[#222222] bg-[#151515] hover:border-[#444444]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#9B4D5E]">{sample.category}</p>
                        <h3 className="font-display text-[15px] mt-1 group-hover:text-[#9B4D5E] transition-colors">{sample.name}</h3>
                      </div>
                      <span className="font-mono text-[9px] text-[#666666] tabular">{sample.duration}</span>
                    </div>

                    <div className="flex gap-2 mt-4 items-center justify-end">
                      {/* Plus buttons to add to timeline tracks */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addBlockToTimeline(sample, 0);
                        }}
                        title="Add to Drums Track"
                        className="p-1.5 border border-[#333333] hover:border-[#9B4D5E] hover:text-[#9B4D5E] rounded font-mono text-[8px] uppercase tracking-wide transition-colors"
                      >
                        + Drum
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addBlockToTimeline(sample, 1);
                        }}
                        title="Add to Bass Track"
                        className="p-1.5 border border-[#333333] hover:border-[#9B4D5E] hover:text-[#9B4D5E] rounded font-mono text-[8px] uppercase tracking-wide transition-colors"
                      >
                        + Bass
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addBlockToTimeline(sample, 2);
                        }}
                        title="Add to Melody Track"
                        className="p-1.5 border border-[#333333] hover:border-[#9B4D5E] hover:text-[#9B4D5E] rounded font-mono text-[8px] uppercase tracking-wide transition-colors"
                      >
                        + Synth
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Preview Player */}
            {activeSample && (
              <div className="border-t border-[#222222] bg-[#0c0c0c] px-6 py-5 absolute bottom-0 inset-x-0 z-10 animate-slow-fade">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#9B4D5E]">Preview Player</p>
                    <p className="font-display italic text-sm mt-1 text-[var(--ivory)] truncate max-w-[200px]">{activeSample.name}</p>
                  </div>

                  <button
                    onClick={() => handlePlayPreview(activeSample)}
                    className="w-9 h-9 rounded-full border border-[#333333] flex items-center justify-center hover:border-[#9B4D5E] transition-all bg-[#141414] text-[var(--ivory)]"
                  >
                    {isPlayingPreview ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                  </button>
                </div>

                <div className="mt-4 h-[2px] bg-[#222222] overflow-hidden rounded-full">
                  <div className="h-full bg-[#9B4D5E] transition-all duration-100" style={{ width: `${playbackProgress}%` }} />
                </div>
              </div>
            )}
          </aside>

          {/* MIDDLE CANVAS — Arrangement Timeline */}
          <section className="bg-[#0e0e0e] p-8 flex flex-col overflow-hidden h-[calc(100vh-64px-77px)]">
            {/* Playback Controls */}
            <div className="flex items-center justify-between bg-[#141414] border border-[#222222] p-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
                  className="px-5 py-2.5 bg-[#9B4D5E] text-white flex items-center gap-2 hover:bg-[#853f4e] transition-colors"
                >
                  {isTimelinePlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span className="font-mono text-[10px] uppercase tracking-wider">{isTimelinePlaying ? "Stop" : "Play Session"}</span>
                </button>
                <button
                  onClick={() => {
                    setIsTimelinePlaying(false);
                    setTimelinePlayhead(0);
                  }}
                  className="px-4 py-2.5 border border-[#333333] hover:border-[#c8b4b4] transition-colors font-mono text-[10px] uppercase tracking-wider"
                >
                  Reset
                </button>
              </div>

              <div className="font-mono text-[10px] text-[#888888] tracking-widest uppercase">
                Playhead: <span className="text-[#9B4D5E]">{Math.floor(timelinePlayhead)}%</span>
              </div>
            </div>

            {/* Grid Workspace */}
            <div className="flex-1 border border-[#222222] bg-[#111111]/40 flex flex-col relative overflow-hidden min-h-[400px]">
              {/* Playhead line overlay */}
              <div
                className="absolute top-0 bottom-0 w-[1.5px] bg-[#9B4D5E] shadow-[0_0_8px_#9B4D5E] z-10 transition-all duration-75"
                style={{ left: `calc(120px + (100% - 140px) * (${timelinePlayhead} / 100))` }}
              />

              {/* Grid Column Rules */}
              <div className="absolute inset-y-0 left-[120px] right-5 grid grid-cols-12 pointer-events-none opacity-[0.03]">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-[var(--ivory)] h-full" />
                ))}
              </div>

              {/* TRACK 1: DRUMS */}
              <div className="flex-1 border-b border-[#222222] flex items-center relative min-h-[90px]">
                <div className="w-[120px] h-full border-r border-[#222222] bg-[#121212] flex flex-col justify-center px-5 shrink-0 z-20">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#9B4D5E]">Drums</span>
                  <span className="text-[10px] text-[#666666] mt-0.5">Beat & Groove</span>
                </div>
                <div className="flex-1 h-full relative px-5 grid grid-cols-12 items-center">
                  {timelineBlocks
                    .filter((b) => b.trackIndex === 0)
                    .map((block) => (
                      <div
                        key={block.id}
                        style={{ gridColumnStart: block.gridCol + 1, gridColumnEnd: `span ${block.cols}` }}
                        className="h-14 border border-[#9B4D5E]/30 bg-[#9B4D5E]/10 backdrop-blur-sm relative flex flex-col justify-between p-3 select-none hover:border-[#9B4D5E] transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[8px] uppercase tracking-wide text-[#9B4D5E]">Groove</span>
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff5f5f] hover:scale-105"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-display italic text-[12px] truncate">{block.sampleName}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* TRACK 2: BASS */}
              <div className="flex-1 border-b border-[#222222] flex items-center relative min-h-[90px]">
                <div className="w-[120px] h-full border-r border-[#222222] bg-[#121212] flex flex-col justify-center px-5 shrink-0 z-20">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#9B4D5E]">Bass</span>
                  <span className="text-[10px] text-[#666666] mt-0.5">Sub & Low</span>
                </div>
                <div className="flex-1 h-full relative px-5 grid grid-cols-12 items-center">
                  {timelineBlocks
                    .filter((b) => b.trackIndex === 1)
                    .map((block) => (
                      <div
                        key={block.id}
                        style={{ gridColumnStart: block.gridCol + 1, gridColumnEnd: `span ${block.cols}` }}
                        className="h-14 border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm relative flex flex-col justify-between p-3 select-none hover:border-blue-500 transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[8px] uppercase tracking-wide text-blue-400">Bassline</span>
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff5f5f] hover:scale-105"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-display italic text-[12px] truncate">{block.sampleName}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* TRACK 3: MELODY */}
              <div className="flex-1 border-b border-[#222222] flex items-center relative min-h-[90px]">
                <div className="w-[120px] h-full border-r border-[#222222] bg-[#121212] flex flex-col justify-center px-5 shrink-0 z-20">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#9B4D5E]">Melody</span>
                  <span className="text-[10px] text-[#666666] mt-0.5">Synth & Chords</span>
                </div>
                <div className="flex-1 h-full relative px-5 grid grid-cols-12 items-center">
                  {timelineBlocks
                    .filter((b) => b.trackIndex === 2)
                    .map((block) => (
                      <div
                        key={block.id}
                        style={{ gridColumnStart: block.gridCol + 1, gridColumnEnd: `span ${block.cols}` }}
                        className="h-14 border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm relative flex flex-col justify-between p-3 select-none hover:border-purple-500 transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[8px] uppercase tracking-wide text-purple-400">Melody</span>
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff5f5f] hover:scale-105"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-display italic text-[12px] truncate">{block.sampleName}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* TRACK 4: AMBIENT / VOCAL */}
              <div className="flex-1 flex items-center relative min-h-[90px]">
                <div className="w-[120px] h-full border-r border-[#222222] bg-[#121212] flex flex-col justify-center px-5 shrink-0 z-20">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#9B4D5E]">Ambient</span>
                  <span className="text-[10px] text-[#666666] mt-0.5">Pads & Textures</span>
                </div>
                <div className="flex-1 h-full relative px-5 grid grid-cols-12 items-center">
                  {timelineBlocks
                    .filter((b) => b.trackIndex === 3)
                    .map((block) => (
                      <div
                        key={block.id}
                        style={{ gridColumnStart: block.gridCol + 1, gridColumnEnd: `span ${block.cols}` }}
                        className="h-14 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-sm relative flex flex-col justify-between p-3 select-none hover:border-emerald-500 transition-all group"
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-mono text-[8px] uppercase tracking-wide text-emerald-400">Texture</span>
                          <button
                            onClick={() => removeBlock(block.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-[#ff5f5f] hover:scale-105"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="font-display italic text-[12px] truncate">{block.sampleName}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Export Successful Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-slow-fade">
          <div className="bg-[#121212] border border-[#9B4D5E] p-10 max-w-md text-center shadow-2xl relative">
            <h2 className="font-display italic text-3xl text-[var(--ivory)] leading-tight mb-4">
              Arrangement Compiled
            </h2>
            <p className="text-sm text-[#c8b4b4] leading-relaxed mb-8">
              Your arrangement was successfully compiled and rendered into a master WAV file. It is now saved into your personal cloned playlists.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-6 py-3 bg-[#9B4D5E] font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:opacity-90 transition-opacity"
              >
                Return to studio
              </button>
              <Link
                to="/lab"
                className="px-6 py-3 border border-[#333333] font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ivory)] hover:border-[#c8b4b4] transition-colors"
              >
                Go to Player
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
