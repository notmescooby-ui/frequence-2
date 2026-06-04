import { useTransport } from "../../hooks/useTransport";
import { useExport } from "../../hooks/useExport";
import { TransportControls } from "./TransportControls";

export function StudioHeader() {
    const { projectBpm, setProjectBpm } = useTransport();
    const { exportTimeline, isExporting } = useExport();

    return (
        <header className="h-[74px] border-b border-white/5 px-8 flex items-center justify-between bg-black/30 backdrop-blur-xl select-none">
            <div className="flex items-center gap-8">
                <h1 className="font-display text-[30px] tracking-[-0.04em] text-white font-semibold">
                    FREQUENCE
                </h1>

                <div className="h-6 w-[1px] bg-white/10" />

                <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9B4D5E]">
                        Project
                    </p>

                    <p className="font-display italic text-[18px] text-white mt-0.5">
                        Midnight Session
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Transport Controls */}
                <TransportControls />

                {/* BPM Input */}
                <div className="border border-white/10 px-4 py-2 flex items-center gap-3 bg-black/20">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/40">BPM</span>
                    <input
                        type="number"
                        min="60"
                        max="200"
                        value={projectBpm}
                        onChange={(e) => setProjectBpm(Number(e.target.value))}
                        className="bg-transparent border-none text-white font-mono text-[14px] w-12 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-center"
                    />
                    <div className="flex flex-col gap-0.5">
                        <button
                            onClick={() => setProjectBpm(Math.min(projectBpm + 1, 200))}
                            className="text-[10px] text-white/50 hover:text-white leading-none cursor-pointer"
                        >
                            ▲
                        </button>
                        <button
                            onClick={() => setProjectBpm(Math.max(projectBpm - 1, 60))}
                            className="text-[10px] text-white/50 hover:text-white leading-none cursor-pointer"
                        >
                            ▼
                        </button>
                    </div>
                </div>

                {/* Export Button */}
                <button
                    onClick={exportTimeline}
                    disabled={isExporting}
                    className="bg-[#9B4D5E] hover:bg-[#9B4D5E]/90 text-white px-8 py-3 transition-colors cursor-pointer select-none disabled:opacity-50"
                    title="Export Arrangement to WAV"
                >
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                        {isExporting ? "Exporting..." : "Export"}
                    </span>
                </button>
            </div>
        </header>
    );
}
