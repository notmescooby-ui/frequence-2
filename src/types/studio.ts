export interface Beat {
    id: string;
    name: string;
    file: string;
    category: string;
    genre: string;
    mood: string;
    bpm: number;
    color: string;
}

export interface Clip {
    id: string;
    title: string;
    file: string;
    color: string;
    duration: number; // in seconds, default 8s
    pitch: number;    // semitone shift (-12 to +12)
    volume: number;   // percentage (0 to 100)
    startOffset: number; // position on timeline in seconds (0 to 16)
    bpm: number;      // native bpm of the clip
}

export interface Track {
    id: string;
    name: string;
    color: string;
    volume: number;   // track volume percentage
    mute: boolean;
    solo: boolean;
    clips: Clip[];
}

export interface Scene {
    id: string;
    name: string;
    tracks: Track[];
}
