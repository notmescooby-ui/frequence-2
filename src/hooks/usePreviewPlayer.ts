import { useRef, useState, useEffect } from "react";
import { Beat } from "../types/studio";
import { useStudioStore } from "../store/studioStore";

export function usePreviewPlayer() {
    const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);
    const previewTimeout = useRef<number | null>(null);
    
    const activeBeat = useStudioStore((state) => state.activeBeat);
    const setActiveBeat = useStudioStore((state) => state.setActiveBeat);
    const isPlaying = useStudioStore((state) => state.isPlaying);
    const setIsPlaying = useStudioStore((state) => state.setIsPlaying);

    function previewBeat(beat: Beat) {
        // If main timeline is playing, pause it first
        if (isPlaying) {
            setIsPlaying(false);
        }

        if (previewAudio) {
            previewAudio.pause();
            previewAudio.currentTime = 0;
        }

        if (previewTimeout.current) {
            window.clearTimeout(previewTimeout.current);
        }

        const audio = new Audio(beat.file);
        audio.currentTime = 0;
        audio.volume = 0.8;
        audio.play().catch((err) => console.log("Preview play failed:", err));
        setPreviewAudio(audio);

        previewTimeout.current = window.setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, 8000);

        setActiveBeat(beat);
    }

    useEffect(() => {
        return () => {
            if (previewTimeout.current) {
                window.clearTimeout(previewTimeout.current);
            }
            if (previewAudio) {
                previewAudio.pause();
            }
        };
    }, [previewAudio]);

    return {
        activeBeat,
        previewBeat,
    };
}
