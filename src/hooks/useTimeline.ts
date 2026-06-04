import { useEffect, useRef, useState } from "react";
import { useStudioStore } from "../store/studioStore";
import { toneEngine } from "../lib/audio/toneEngine";

export function useTimeline() {
    const scenes = useStudioStore((state) => state.scenes);
    const activeSceneId = useStudioStore((state) => state.activeSceneId);
    const projectBpm = useStudioStore((state) => state.projectBpm);
    const isPlaying = useStudioStore((state) => state.isPlaying);
    const updateClipProperties = useStudioStore((state) => state.updateClipProperties);

    const activeScene = scenes.find((s) => s.id === activeSceneId) || scenes[0];
    const tracks = activeScene.tracks;
    
    // Flatten tracks to get all active clips in this scene
    const clips = tracks.flatMap((t) => t.clips);

    // Synchronize active scene clips parameters and players to ToneEngine
    useEffect(() => {
        toneEngine.syncTracks(clips, projectBpm, isPlaying);
    }, [clips, projectBpm, isPlaying]);

    // Drag-and-drop clip positioning logic
    const [draggingClipId, setDraggingClipId] = useState<string | null>(null);
    const dragStartXRef = useRef<number>(0);
    const dragStartOffsetRef = useRef<number>(0);
    const timelineRef = useRef<HTMLDivElement | null>(null);

    const handleMouseDown = (e: React.MouseEvent, clipId: string, currentOffset: number) => {
        setDraggingClipId(clipId);
        dragStartXRef.current = e.clientX;
        dragStartOffsetRef.current = currentOffset;
        e.preventDefault();
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!draggingClipId || !timelineRef.current) return;
            const timelineWidth = timelineRef.current.clientWidth;
            const deltaX = e.clientX - dragStartXRef.current;
            // Full timeline width translates to 16 seconds
            const deltaSeconds = (deltaX / timelineWidth) * 16;
            let newOffset = dragStartOffsetRef.current + deltaSeconds;

            // Constrain offset so clip doesn't overflow the 16s loop boundary (limit to 8s max start offset)
            newOffset = Math.max(0, Math.min(8, newOffset));

            updateClipProperties(draggingClipId, { startOffset: newOffset });
        };

        const handleMouseUp = () => {
            setDraggingClipId(null);
        };

        if (draggingClipId) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [draggingClipId, updateClipProperties]);

    // Dispose nodes on unmount
    useEffect(() => {
        return () => {
            toneEngine.disposeAll();
        };
    }, []);

    return {
        tracks,
        clips,
        timelineRef,
        handleMouseDown,
        isDragging: draggingClipId !== null,
    };
}
