import { useState } from "react";
import { useStudioStore } from "../store/studioStore";
import { audioBufferToWav } from "../lib/audio/wavExport";
import * as Tone from "tone";

export function useExport() {
    const [isExporting, setIsExporting] = useState(false);
    const scenes = useStudioStore((state) => state.scenes);
    const activeSceneId = useStudioStore((state) => state.activeSceneId);
    const projectBpm = useStudioStore((state) => state.projectBpm);

    const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];
    const tracks = activeScene?.tracks || [];
    // Map track volume info into each clip
    const clips = tracks.flatMap((t) =>
        t.clips.map((c) => ({
            ...c,
            trackVolume: t.volume,
            trackMute: t.mute,
        }))
    );

    const exportTimeline = async () => {
        // Filter out clips belonging to muted tracks
        const activeClips = clips.filter((c) => !c.trackMute);
        if (activeClips.length === 0) return;

        setIsExporting(true);

        const duration = 16; // 16 seconds loop
        try {
            const buffer = await Tone.Offline(async () => {
                for (const clip of activeClips) {
                    const offlinePlayer = new Tone.GrainPlayer(clip.file);
                    
                    // Detune in cents
                    offlinePlayer.detune = clip.pitch * 100;
                    
                    // Combine track and clip volume
                    const combinedVolume = (clip.volume / 100) * (clip.trackVolume / 100) * 100;
                    offlinePlayer.volume.value = Tone.gainToDb(combinedVolume / 100);
                    
                    // playbackRate for time stretching
                    offlinePlayer.playbackRate = projectBpm / clip.bpm;
                    offlinePlayer.loop = false;
                    offlinePlayer.toDestination();

                    // Load buffer before starting
                    const bufferRef = await Tone.Buffer.fromUrl(clip.file);
                    offlinePlayer.buffer = bufferRef;
                    offlinePlayer.start(clip.startOffset || 0);
                }
            }, duration);

            // buffer.get() returns the native AudioBuffer
            const wavBlob = audioBufferToWav(buffer.get() as AudioBuffer);
            const url = URL.createObjectURL(wavBlob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "midnight_session_mix.wav";
            a.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed:", err);
        } finally {
            setIsExporting(false);
        }
    };

    return {
        exportTimeline,
        isExporting,
    };
}
