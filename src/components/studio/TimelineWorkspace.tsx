import { useTimeline } from "../../hooks/useTimeline";
import { TrackLane } from "./TrackLane";
import { Playhead } from "./Playhead";

export function TimelineWorkspace() {
    const { tracks, timelineRef, handleMouseDown } = useTimeline();

    return (
        <div className="flex-1 border border-white/5 bg-black/20 relative overflow-hidden flex flex-col">
            {/* TIME RULER */}
            <div className="h-8 border-b border-white/5 bg-black/40 flex items-center relative z-20 select-none">
                <div className="w-[200px] h-full border-r border-white/5 flex items-center px-4 bg-black/10">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
                        Tracks
                    </span>
                </div>
                <div className="flex-1 h-full relative" ref={timelineRef}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16].map((sec) => (
                        <div
                            key={sec}
                            className="absolute top-0 bottom-0 flex flex-col justify-between"
                            style={{ left: `${(sec / 16) * 100}%` }}
                        >
                            <span className="font-mono text-[8px] text-white/40 mt-1.5 transform -translate-x-1/2">
                                {sec}s
                            </span>
                            <div className="w-[1px] h-2 bg-white/20" />
                        </div>
                    ))}
                </div>
            </div>

            {/* GRID LINES (16 ticks representation) */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none z-0 mt-8">
                <div className="absolute left-[200px] right-0 top-0 bottom-0">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 bottom-0 w-[1px] bg-white"
                            style={{
                                left: `${(i / 16) * 100}%`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* TRACKS LIST */}
            <div className="flex-1 overflow-y-auto relative z-10">
                {tracks.map((track, index) => (
                    <TrackLane
                        key={track.id}
                        track={track}
                        index={index}
                        timelineRef={timelineRef}
                        onDragStart={handleMouseDown}
                    />
                ))}

                {tracks.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center">
                            <h2 className="font-display text-5xl text-white/25">
                                Double click a beat
                            </h2>
                            <p className="mt-4 text-white/40 font-mono text-xs uppercase tracking-widest">
                                to add it to the arrangement
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* PLAYHEAD */}
            <div className="absolute left-[200px] right-0 top-0 bottom-0 pointer-events-none z-30">
                <Playhead />
            </div>
        </div>
    );
}
