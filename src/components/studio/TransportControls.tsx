import { useTransport } from "../../hooks/useTransport";

export function TransportControls() {
    const { isPlaying, play, pause, stop } = useTransport();

    return (
        <div className="flex items-center gap-4">
            <button
                onClick={isPlaying ? pause : play}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                    isPlaying
                        ? "border-wine bg-wine text-white shadow-[0_0_15px_rgba(155,77,94,0.5)]"
                        : "border-white/10 text-white hover:border-[#9B4D5E] hover:text-white hover:bg-white/5"
                }`}
                title={isPlaying ? "Pause Timeline" : "Play Timeline"}
            >
                {isPlaying ? "❚❚" : "▶"}
            </button>

            <button
                onClick={stop}
                className="w-12 h-12 rounded-full border border-white/10 text-white hover:border-[#9B4D5E] hover:text-[#9B4D5E] hover:bg-white/5 transition-all duration-300 flex items-center justify-center cursor-pointer"
                title="Stop & Reset Timeline"
            >
                ■
            </button>
        </div>
    );
}
