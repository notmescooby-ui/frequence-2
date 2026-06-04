import { Beat } from "../../types/studio";
import { useStudioStore } from "../../store/studioStore";
import { usePreviewPlayer } from "../../hooks/usePreviewPlayer";

interface AssetCardProps {
    beat: Beat;
}

export function AssetCard({ beat }: AssetCardProps) {
    const { activeBeat, previewBeat } = usePreviewPlayer();
    const addBeatToActiveScene = useStudioStore((state) => state.addBeatToActiveScene);

    const active = activeBeat?.id === beat.id;

    // Stable seed-based height generation for the waveform representation
    const getWaveformHeight = (index: number) => {
        const charCode = beat.name.charCodeAt(index % beat.name.length) || 10;
        return ((index * charCode + 7) % 65) + 20; // returns height percentage between 20 and 85
    };

    return (
        <button
            onClick={() => previewBeat(beat)}
            onDoubleClick={() => addBeatToActiveScene(beat)}
            className={`w-full border p-5 text-left transition-all cursor-pointer ${
                active
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
                            background: active ? beat.color : "rgba(26,26,26,0.15)",
                            height: `${getWaveformHeight(i)}%`,
                        }}
                    />
                ))}
            </div>
        </button>
    );
}
