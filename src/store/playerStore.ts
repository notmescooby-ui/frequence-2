import { create } from "zustand";

interface PlayerState {
  currentTrack: any | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  playlistTracks: any[];
  playTrack: (track: any, playlistTracks?: any[]) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (seconds: number) => void;
}

let globalAudio: HTMLAudioElement | null = null;
let progressInterval: any = null;

export const usePlayerStore = create<PlayerState>((set, get) => {
  const startProgressTimer = () => {
    if (progressInterval) clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      if (globalAudio) {
        set({ progress: globalAudio.currentTime });
      }
    }, 250);
  };

  const stopProgressTimer = () => {
    if (progressInterval) {
      clearInterval(progressInterval);
      progressInterval = null;
    }
  };

  return {
    currentTrack: null,
    isPlaying: false,
    progress: 0,
    duration: 0,
    playlistTracks: [],

    playTrack: (track, tracks = []) => {
      if (globalAudio) {
        globalAudio.pause();
        stopProgressTimer();
      }

      // Handle nested or flat track format
      const rawTrack = track.track ? track.track : track;
      const previewUrl = rawTrack.preview_url || rawTrack.preview || null;

      const audio = previewUrl ? new Audio(previewUrl) : null;
      globalAudio = audio;

      const trackDuration = previewUrl ? 30 : (rawTrack.duration_ms ? rawTrack.duration_ms / 1000 : 180);

      set({
        currentTrack: rawTrack,
        isPlaying: true,
        progress: 0,
        duration: trackDuration,
        playlistTracks: tracks.length > 0 ? tracks : get().playlistTracks,
      });

      if (audio) {
        audio.volume = 0.5;
        audio.play().catch((err) => {
          console.warn("Failed to play preview audio:", err);
        });

        audio.addEventListener("loadedmetadata", () => {
          set({ duration: audio.duration });
        });

        audio.addEventListener("ended", () => {
          get().nextTrack();
        });

        startProgressTimer();
      } else {
        // Simulation for tracks without preview url
        startProgressTimer();
        
        let simProgress = 0;
        const duration = trackDuration;
        const simInterval = setInterval(() => {
          const current = get().currentTrack;
          if (!get().isPlaying || !current || current.id !== rawTrack.id) {
            clearInterval(simInterval);
            return;
          }
          simProgress += 1;
          if (simProgress >= duration) {
            clearInterval(simInterval);
            get().nextTrack();
          } else {
            set({ progress: simProgress });
          }
        }, 1000);
      }
    },

    togglePlay: () => {
      const { isPlaying, currentTrack } = get();
      if (!currentTrack) return;

      if (isPlaying) {
        if (globalAudio) {
          globalAudio.pause();
        }
        stopProgressTimer();
        set({ isPlaying: false });
      } else {
        if (globalAudio) {
          globalAudio.play().catch((err) => console.warn(err));
          startProgressTimer();
        } else {
          startProgressTimer();
        }
        set({ isPlaying: true });
      }
    },

    nextTrack: () => {
      const { currentTrack, playlistTracks } = get();
      if (!currentTrack || playlistTracks.length === 0) return;

      const currentIndex = playlistTracks.findIndex((t) => {
        const itemTrack = t.track ? t.track : t;
        return itemTrack.id === currentTrack.id;
      });

      if (currentIndex !== -1 && currentIndex < playlistTracks.length - 1) {
        const next = playlistTracks[currentIndex + 1];
        get().playTrack(next, playlistTracks);
      } else if (playlistTracks.length > 0) {
        const next = playlistTracks[0];
        get().playTrack(next, playlistTracks);
      }
    },

    prevTrack: () => {
      const { currentTrack, playlistTracks } = get();
      if (!currentTrack || playlistTracks.length === 0) return;

      const currentIndex = playlistTracks.findIndex((t) => {
        const itemTrack = t.track ? t.track : t;
        return itemTrack.id === currentTrack.id;
      });

      if (currentIndex > 0) {
        const prev = playlistTracks[currentIndex - 1];
        get().playTrack(prev, playlistTracks);
      } else if (playlistTracks.length > 0) {
        const prev = playlistTracks[playlistTracks.length - 1];
        get().playTrack(prev, playlistTracks);
      }
    },

    seek: (seconds) => {
      if (globalAudio) {
        globalAudio.currentTime = seconds;
      }
      set({ progress: seconds });
    },
  };
});
