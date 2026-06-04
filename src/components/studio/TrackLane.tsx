import { Track } from "../../types/studio";
import { useStudioStore } from "../../store/studioStore";
import { ClipBlock } from "./ClipBlock";

interface TrackLaneProps {
    track: Track;
    index: number;
    timelineRef: React.RefObject<HTMLDivElement | null>;
    onDragStart: (e: React.MouseEvent, clipId: string, currentOffset: number) => void;
}

export function TrackLane({ track, index, timelineRef, onDragStart }: TrackLaneProps) {
    const updateTrackProperties = useStudioStore((state) => state.updateTrackProperties);
    const removeTrackFromActiveScene = useStudioStore((state) => state.removeTrackFromActiveScene);

    const toggleMute = () => {
        updateTrackProperties(track.id, { mute: !track.mute });
    };

    const toggleSolo = () => {
        updateTrackProperties(track.id, { solo: !track.solo });
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateTrackProperties(track.id, { volume: Number(e.target.value) });
    };

    return (
        <div className="h-[120px] border-b border-white/5 relative flex items-center bg-black/10">
            {/* Track Info Header (Left) */}
            <div className="absolute left-0 top-0 bottom-0 w-[200px] border-r border-white/5 bg-black/20 flex flex-col justify-center px-4 z-20">
                <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
                        Track {index + 1}
                    </span>
                    <button
                        onClick={() => removeTrackFromActiveScene(track.id)}
                        className="text-white/30 hover:text-red-400 text-xs transition-colors cursor-pointer"
                        title="Delete Track"
                    >
                        Delete
                    </button>
                </div>
                
                <span className="font-display text-[15px] truncate text-white mt-0.5 font-medium">
                    {track.name}
                </span>

                {/* Mute/Solo & Vol Controls */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={toggleMute}
                        className={`w-5 h-5 rounded-sm font-mono text-[9px] font-bold border transition-colors flex items-center justify-center cursor-pointer ${
                            track.mute
                                ? "bg-red-900/60 border-red-500 text-white"
                                : "bg-black/40 border-white/10 text-white/40 hover:text-white"
                        }`}
                        title="Mute Track"
                    >
                        M
                    </button>
                    <button
                        onClick={toggleSolo}
                        className={`w-5 h-5 rounded-sm font-mono text-[9px] font-bold border transition-colors flex items-center justify-center cursor-pointer ${
                            track.solo
                                ? "bg-yellow-600/60 border-yellow-400 text-white"
                                : "bg-black/40 border-white/10 text-white/40 hover:text-white"
                        }`}
                        title="Solo Track"
                    >
                        S
                    </button>
                    <div className="flex items-center gap-1 flex-1 ml-1">
                        <span className="font-mono text-[8px] text-white/30">Vol</span>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={track.volume}
                            onChange={handleVolumeChange}
                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#9B4D5E]"
                        />
                    </div>
                </div>
            </div>

            {/* Timeline Workspace (Right) */}
            <div className="ml-[200px] flex-1 h-full relative" ref={timelineRef}>
                {track.clips.map((clip) => (
                    <ClipBlock
                        key={clip.id}
                        clip={clip}
                        trackId={track.id}
                        onDragStart={onDragStart}
                    />
                ))}
            </div>
        </div>
    );
}
