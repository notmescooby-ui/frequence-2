import { useEffect } from "react";
import { useStudioStore } from "../store/studioStore";
import { toneEngine } from "../lib/audio/toneEngine";
export function useTransport() {
    const isPlaying = useStudioStore((state) => state.isPlaying);
    const setIsPlaying = useStudioStore((state) => state.setIsPlaying);
    const playheadPosition = useStudioStore((state) => state.playheadPosition);
    const setPlayheadPosition = useStudioStore((state) => state.setPlayheadPosition);
    const projectBpm = useStudioStore((state) => state.projectBpm);
    const setProjectBpm = useStudioStore((state) => state.setProjectBpm);

    // Sync project BPM to Tone.js Transport
    useEffect(() => {
        toneEngine.setBpm(projectBpm);
    }, [projectBpm]);

    // Handle Transport play/stop actions reactively
    useEffect(() => {
        if (isPlaying) {
            toneEngine.startTransport().catch((err) => console.error("Tone Transport failed to start:", err));
        } else {
            toneEngine.stopTransport();
        }
    }, [isPlaying]);

    // Animate playhead smoothly synced to Transport seconds
    useEffect(() => {
        let animationFrameId: number;

        const updatePlayhead = () => {
            const state = toneEngine.getTransportState();
            if (state === "started") {
                const seconds = toneEngine.getSeconds();
                const pos = (seconds / 16) * 100;
                setPlayheadPosition(pos % 100);
            } else if (state === "stopped") {
                setPlayheadPosition(0);
            }
            animationFrameId = requestAnimationFrame(updatePlayhead);
        };

        animationFrameId = requestAnimationFrame(updatePlayhead);
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [setPlayheadPosition]);

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    const stop = () => {
        setIsPlaying(false);
        toneEngine.stopTransport();
        setPlayheadPosition(0);
    };

    return {
        isPlaying,
        playheadPosition,
        projectBpm,
        setProjectBpm,
        play,
        pause,
        stop,
    };
}
