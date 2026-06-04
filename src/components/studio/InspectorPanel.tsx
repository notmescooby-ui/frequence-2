import { useStudioStore } from "../../store/studioStore";

export function InspectorPanel() {
    const scenes = useStudioStore((state) => state.scenes);
    const activeSceneId = useStudioStore((state) => state.activeSceneId);
    const selectedClipId = useStudioStore((state) => state.selectedClipId);
    const setSelectedClipId = useStudioStore((state) => state.setSelectedClipId);
    const updateClipProperties = useStudioStore((state) => state.updateClipProperties);
    const removeClipFromActiveScene = useStudioStore((state) => state.removeClipFromActiveScene);

    const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];
    const clip = activeScene?.tracks.flatMap((t) => t.clips).find((c) => c.id === selectedClipId);

    if (!selectedClipId || !clip) {
        return (
            <aside className="w-[300px] border-l border-white/5 bg-[#0A0A0A] text-white flex flex-col justify-center items-center p-6 text-center">
                <div className="border border-dashed border-white/10 p-8 rounded flex flex-col items-center">
                    <span className="text-white/20 text-3xl mb-4 font-mono">ℹ</span>
                    <h3 className="font-display text-[16px] text-white/60 font-medium">
                        No Clip Selected
                    </h3>
                    <p className="font-sans text-[11px] text-white/40 mt-2 leading-relaxed">
                        Click on any audio clip in the arrangement timeline to inspect and edit its properties.
                    </p>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-[300px] border-l border-white/5 bg-[#0A0A0A] text-white flex flex-col justify-between p-6">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9B4D5E]">
                            Inspector
                        </p>
                        <h2 className="font-display text-[18px] font-semibold mt-1 truncate max-w-[200px]">
                            {clip.title}
                        </h2>
                    </div>
                    <button
                        onClick={() => setSelectedClipId(null)}
                        className="text-white/40 hover:text-white text-lg font-mono cursor-pointer"
                        title="Close Inspector"
                    >
                        ×
                    </button>
                </div>

                {/* Color and Type Badge */}
                <div className="h-10 rounded flex items-center px-4" style={{ background: `${clip.color}15`, borderLeft: `4px solid ${clip.color}` }}>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/80">
                        Waveform Audio Clip
                    </span>
                </div>

                {/* Properties Controls */}
                <div className="space-y-6">
                    {/* Volume */}
                    <div className="space-y-2">
                        <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-white/40">
                            <span>Volume</span>
                            <span className="text-white/70 tabular-nums">{clip.volume}%</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={clip.volume}
                            onChange={(e) => updateClipProperties(clip.id, { volume: Number(e.target.value) })}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#9B4D5E]"
                        />
                    </div>

                    {/* Pitch */}
                    <div className="space-y-2">
                        <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-white/40">
                            <span>Pitch Shift</span>
                            <span className="text-white/70 tabular-nums">
                                {clip.pitch > 0 ? `+${clip.pitch}` : clip.pitch} semitones
                            </span>
                        </div>
                        <div className="flex items-center justify-between bg-black/40 border border-white/5 p-2 rounded">
                            <button
                                onClick={() => updateClipProperties(clip.id, { pitch: Math.max(-12, clip.pitch - 1) })}
                                className="w-8 h-8 rounded border border-white/10 hover:border-white/30 flex items-center justify-center font-bold text-sm cursor-pointer"
                            >
                                -
                            </button>
                            <span className="font-mono text-sm tabular-nums">
                                {clip.pitch} st
                            </span>
                            <button
                                onClick={() => updateClipProperties(clip.id, { pitch: Math.min(12, clip.pitch + 1) })}
                                className="w-8 h-8 rounded border border-white/10 hover:border-white/30 flex items-center justify-center font-bold text-sm cursor-pointer"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Start Offset */}
                    <div className="space-y-2">
                        <div className="flex justify-between font-mono text-[9px] uppercase tracking-wider text-white/40">
                            <span>Start Offset</span>
                            <span className="text-white/70 tabular-nums">{clip.startOffset.toFixed(2)}s</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="8"
                            step="0.05"
                            value={clip.startOffset}
                            onChange={(e) => updateClipProperties(clip.id, { startOffset: Number(e.target.value) })}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#9B4D5E]"
                        />
                        <p className="font-mono text-[8px] text-white/35 uppercase tracking-wide">
                            Drag clip on timeline or slide to position
                        </p>
                    </div>

                    {/* Info Card */}
                    <div className="bg-black/30 border border-white/5 p-4 rounded space-y-2 font-mono text-[9px] text-white/50">
                        <div className="flex justify-between">
                            <span>NATIVE BPM:</span>
                            <span className="text-white/80">{clip.bpm} BPM</span>
                        </div>
                        <div className="flex justify-between">
                            <span>DURATION:</span>
                            <span className="text-white/80">{clip.duration}s</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-3">
                <button
                    onClick={() => {
                        updateClipProperties(clip.id, { volume: 100, pitch: 0, startOffset: 0 });
                    }}
                    className="w-full border border-white/10 hover:border-white/20 py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] hover:bg-white/[0.02] cursor-pointer"
                >
                    Reset Clip Settings
                </button>
                <button
                    onClick={() => {
                        removeClipFromActiveScene(clip.id);
                    }}
                    className="w-full bg-[#9B4D5E]/20 hover:bg-[#9B4D5E]/30 border border-[#9B4D5E]/40 text-[#FFA0B0] py-2.5 font-mono text-[9px] uppercase tracking-[0.2em] cursor-pointer"
                >
                    Delete Clip
                </button>
            </div>
        </aside>
    );
}
