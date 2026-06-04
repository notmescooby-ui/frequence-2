import { Clip } from "../../types/studio";
import { useStudioStore } from "../../store/studioStore";

interface ClipBlockProps {
    clip: Clip;
    trackId: string;
    onDragStart: (e: React.MouseEvent, clipId: string, currentOffset: number) => void;
}

export function ClipBlock({ clip, trackId, onDragStart }: ClipBlockProps) {
    const selectedClipId = useStudioStore((state) => state.selectedClipId);
    const setSelectedClipId = useStudioStore((state) => state.setSelectedClipId);
    const removeClipFromActiveScene = useStudioStore((state) => state.removeClipFromActiveScene);
    const updateClipProperties = useStudioStore((state) => state.updateClipProperties);

    const isSelected = selectedClipId === clip.id;

    const handleClipClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedClipId(clip.id);
    };

    return (
        <div
            className={`absolute top-[20px] h-[80px] rounded border flex flex-col justify-between p-3 select-none transition-all cursor-grab active:cursor-grabbing ${
                isSelected
                    ? "ring-2 ring-wine ring-offset-2 ring-offset-black/20 shadow-[0_0_15px_rgba(155,77,94,0.3)] z-10"
                    : "z-0 hover:border-white/20"
            }`}
            style={{
                left: `${(clip.startOffset / 16) * 100}%`,
                width: "50%", // 8 seconds on a 16s timeline is 50%
                background: `${clip.color}22`,
                borderColor: clip.color,
            }}
            onClick={handleClipClick}
            onMouseDown={(e) => {
                const tag = (e.target as HTMLElement).tagName.toLowerCase();
                if (tag === "input" || tag === "button") return;
                onDragStart(e, clip.id, clip.startOffset);
            }}
        >
            <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-wider text-white/80 truncate pr-2">
                    {clip.title}
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeClipFromActiveScene(clip.id);
                    }}
                    className="text-white/40 hover:text-white/90 text-sm leading-none cursor-pointer p-0.5"
                    title="Remove Clip"
                >
                    ×
                </button>
            </div>

            {/* Quick Controls */}
            <div className="flex items-center gap-4 mt-1" onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1.5 flex-1">
                    <span className="font-mono text-[7px] uppercase tracking-wider text-white/40">Vol</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={clip.volume}
                        onChange={(e) => {
                            updateClipProperties(clip.id, { volume: Number(e.target.value) });
                        }}
                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#9B4D5E]"
                    />
                    <span className="font-mono text-[7px] text-white/50 w-5 text-right tabular-nums">{clip.volume}%</span>
                </div>

                <div className="flex items-center gap-1">
                    <span className="font-mono text-[7px] uppercase tracking-wider text-white/40">Pitch</span>
                    <div className="flex items-center gap-1 bg-black/40 border border-white/5 px-1.5 py-0.5 rounded">
                        <button
                            onClick={() => {
                                updateClipProperties(clip.id, { pitch: Math.max(-12, clip.pitch - 1) });
                            }}
                            className="text-white/50 hover:text-white text-[9px] leading-none focus:outline-none cursor-pointer"
                        >
                            -
                        </button>
                        <span className="font-mono text-[8px] text-white w-5 text-center tabular-nums">
                            {clip.pitch > 0 ? `+${clip.pitch}` : clip.pitch}
                        </span>
                        <button
                            onClick={() => {
                                updateClipProperties(clip.id, { pitch: Math.min(12, clip.pitch + 1) });
                            }}
                            className="text-white/50 hover:text-white text-[9px] leading-none focus:outline-none cursor-pointer"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
