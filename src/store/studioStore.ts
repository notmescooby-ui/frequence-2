import { create } from "zustand";
import { Beat, Clip, Track, Scene } from "../types/studio";

interface StudioState {
    projectBpm: number;
    isPlaying: boolean;
    playheadPosition: number;
    activeBeat: Beat | null;
    selectedCategory: string;
    selectedClipId: string | null;
    scenes: Scene[];
    activeSceneId: string;

    // Actions
    setProjectBpm: (bpm: number) => void;
    setIsPlaying: (isPlaying: boolean) => void;
    setPlayheadPosition: (pos: number) => void;
    setActiveBeat: (beat: Beat | null) => void;
    setSelectedCategory: (cat: string) => void;
    setSelectedClipId: (id: string | null) => void;

    // Scene Actions
    addScene: () => void;
    setActiveScene: (id: string) => void;
    removeScene: (id: string) => void;

    // Timeline Actions
    addBeatToActiveScene: (beat: Beat) => void;
    removeClipFromActiveScene: (clipId: string) => void;
    removeTrackFromActiveScene: (trackId: string) => void;
    updateClipProperties: (clipId: string, updates: Partial<Clip>) => void;
    updateTrackProperties: (trackId: string, updates: Partial<Track>) => void;
}

export const useStudioStore = create<StudioState>((set) => ({
    projectBpm: 120,
    isPlaying: false,
    playheadPosition: 0,
    activeBeat: null,
    selectedCategory: "All",
    selectedClipId: null,
    scenes: [
        {
            id: "scene_1",
            name: "Scene 1",
            tracks: [],
        },
    ],
    activeSceneId: "scene_1",

    setProjectBpm: (projectBpm) => set({ projectBpm }),
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    setPlayheadPosition: (playheadPosition) => set({ playheadPosition }),
    setActiveBeat: (activeBeat) => set({ activeBeat }),
    setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
    setSelectedClipId: (selectedClipId) => set({ selectedClipId }),

    addScene: () =>
        set((state) => {
            const newId = `scene_${crypto.randomUUID()}`;
            const newSceneNumber = state.scenes.length + 1;
            const newScene: Scene = {
                id: newId,
                name: `Scene ${newSceneNumber}`,
                tracks: [],
            };
            return {
                scenes: [...state.scenes, newScene],
                activeSceneId: newId,
            };
        }),

    setActiveScene: (activeSceneId) => set({ activeSceneId }),

    removeScene: (sceneId) =>
        set((state) => {
            if (state.scenes.length <= 1) return {}; // Keep at least one scene
            const filteredScenes = state.scenes.filter((s) => s.id !== sceneId);
            const activeSceneId =
                state.activeSceneId === sceneId ? filteredScenes[0].id : state.activeSceneId;
            return {
                scenes: filteredScenes,
                activeSceneId,
            };
        }),

    addBeatToActiveScene: (beat) =>
        set((state) => {
            const scenes = state.scenes.map((scene) => {
                if (scene.id !== state.activeSceneId) return scene;

                // Check if a clip with this beat name already exists in this scene
                const alreadyExists = scene.tracks.some((track) =>
                    track.clips.some((clip) => clip.title === beat.name)
                );

                if (alreadyExists) return scene;

                // Create a new track for the beat containing exactly 1 clip
                const newClip: Clip = {
                    id: `clip_${crypto.randomUUID()}`,
                    title: beat.name,
                    file: beat.file,
                    color: beat.color,
                    duration: 8,
                    pitch: 0,
                    volume: 100,
                    startOffset: 0,
                    bpm: beat.bpm,
                };

                const newTrack: Track = {
                    id: `track_${crypto.randomUUID()}`,
                    name: beat.name,
                    color: beat.color,
                    volume: 100,
                    mute: false,
                    solo: false,
                    clips: [newClip],
                };

                return {
                    ...scene,
                    tracks: [...scene.tracks, newTrack],
                };
            });

            return { scenes };
        }),

    removeClipFromActiveScene: (clipId) =>
        set((state) => {
            const scenes = state.scenes.map((scene) => {
                if (scene.id !== state.activeSceneId) return scene;

                // Filter out the clip and clean up empty tracks
                const updatedTracks = scene.tracks
                    .map((track) => ({
                        ...track,
                        clips: track.clips.filter((clip) => clip.id !== clipId),
                    }))
                    .filter((track) => track.clips.length > 0);

                return {
                    ...scene,
                    tracks: updatedTracks,
                };
            });

            const selectedClipId = state.selectedClipId === clipId ? null : state.selectedClipId;

            return { scenes, selectedClipId };
        }),

    removeTrackFromActiveScene: (trackId) =>
        set((state) => {
            const scenes = state.scenes.map((scene) => {
                if (scene.id !== state.activeSceneId) return scene;
                return {
                    ...scene,
                    tracks: scene.tracks.filter((track) => track.id !== trackId),
                };
            });
            return { scenes };
        }),

    updateClipProperties: (clipId, updates) =>
        set((state) => {
            const scenes = state.scenes.map((scene) => {
                if (scene.id !== state.activeSceneId) return scene;

                const updatedTracks = scene.tracks.map((track) => ({
                    ...track,
                    clips: track.clips.map((clip) =>
                        clip.id === clipId ? { ...clip, ...updates } : clip
                    ),
                }));

                return {
                    ...scene,
                    tracks: updatedTracks,
                };
            });

            return { scenes };
        }),

    updateTrackProperties: (trackId, updates) =>
        set((state) => {
            const scenes = state.scenes.map((scene) => {
                if (scene.id !== state.activeSceneId) return scene;

                const updatedTracks = scene.tracks.map((track) =>
                    track.id === trackId ? { ...track, ...updates } : track
                );

                return {
                    ...scene,
                    tracks: updatedTracks,
                };
            });

            return { scenes };
        }),
}));
