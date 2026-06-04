import { useStudioStore } from "../../store/studioStore";

export function Playhead() {
    const playheadPosition = useStudioStore((state) => state.playheadPosition);

    return (
        <div
            className="absolute top-0 bottom-0 w-[2px] bg-wine shadow-[0_0_20px_rgba(155,77,94,0.8)] z-30 pointer-events-none"
            style={{ left: `${playheadPosition}%` }}
        />
    );
}
