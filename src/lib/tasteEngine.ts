import { getSpotifyToken } from "./spotify";

export interface TrackInfo {
  id: string;
  name: string;
  artists: string[];
  albumName: string;
  albumImage?: string;
  duration_ms: number;
}

export interface FrequenceMix {
  id: string;
  name: string;
  description: string;
  image?: string;
  tracks: TrackInfo[];
}

// Fallback tracks when Spotify API is empty or fails
const FALLBACK_TRACKS = {
  "midnight-drive": [
    { id: "fallback-md-1", name: "Pink + White", artists: ["Frank Ocean"], albumName: "Blonde", duration_ms: 184000 },
    { id: "fallback-md-2", name: "See You Again", artists: ["Tyler, The Creator"], albumName: "Flower Boy", duration_ms: 180000 },
    { id: "fallback-md-3", name: "Redbone", artists: ["Childish Gambino"], albumName: "Awaken, My Love!", duration_ms: 326000 },
    { id: "fallback-md-4", name: "Pyramids", artists: ["Frank Ocean"], albumName: "Channel Orange", duration_ms: 592000 },
    { id: "fallback-md-5", name: "Starboy", artists: ["The Weeknd"], albumName: "Starboy", duration_ms: 230000 }
  ],
  "healing-era": [
    { id: "fallback-he-1", name: "By Your Side", artists: ["Sade"], albumName: "Lovers Rock", duration_ms: 275000 },
    { id: "fallback-he-2", name: "Motion Sickness", artists: ["Phoebe Bridgers"], albumName: "Stranger in the Alps", duration_ms: 241000 },
    { id: "fallback-he-3", name: "Vincent", artists: ["Don McLean"], albumName: "American Pie", duration_ms: 240000 },
    { id: "fallback-he-4", name: "Lost in the Light", artists: ["Bahamas"], albumName: "Barchords", duration_ms: 268000 },
    { id: "fallback-he-5", name: "Liability", artists: ["Lorde"], albumName: "Melodrama", duration_ms: 171000 }
  ],
  "main-character": [
    { id: "fallback-mc-1", name: "See You Again", artists: ["Tyler, The Creator"], albumName: "Flower Boy", duration_ms: 180000 },
    { id: "fallback-mc-2", name: "Redbone", artists: ["Childish Gambino"], albumName: "Awaken, My Love!", duration_ms: 326000 },
    { id: "fallback-mc-3", name: "Cruel Summer", artists: ["Taylor Swift"], albumName: "Lover", duration_ms: 178000 },
    { id: "fallback-mc-4", name: "Espresso", artists: ["Sabrina Carpenter"], albumName: "Short n' Sweet", duration_ms: 175000 },
    { id: "fallback-mc-5", name: "Pink + White", artists: ["Frank Ocean"], albumName: "Blonde", duration_ms: 184000 }
  ],
  "late-night": [
    { id: "fallback-ln-1", name: "Self Control", artists: ["Frank Ocean"], albumName: "Blonde", duration_ms: 249000 },
    { id: "fallback-ln-2", name: "Avril 14th", artists: ["Aphex Twin"], albumName: "Drukqs", duration_ms: 125000 },
    { id: "fallback-ln-3", name: "Liability", artists: ["Lorde"], albumName: "Melodrama", duration_ms: 171000 },
    { id: "fallback-ln-4", name: "Motion Sickness", artists: ["Phoebe Bridgers"], albumName: "Stranger in the Alps", duration_ms: 241000 },
    { id: "fallback-ln-5", name: "By Your Side", artists: ["Sade"], albumName: "Lovers Rock", duration_ms: 275000 }
  ]
};

const MIX_METADATA = {
  "midnight-drive": {
    name: "Midnight Drive Mix",
    description: "Deep basslines, rhythmic synths, and driving beats compiled from your late night library.",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400"
  },
  "healing-era": {
    name: "Healing Era",
    description: "Warm acoustic selections, soft ambient tracks, and gentle melodies compiled from your calming library.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=400"
  },
  "main-character": {
    name: "Main Character Energy",
    description: "Bold pop production, high-valence dance beats, and popular anthems compiled from your highlight tracks.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400"
  },
  "late-night": {
    name: "Late Night Thoughts",
    description: "Melancholic piano chords, confessional songwriting, and introspective ambient tracks compiled from your reflective library.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400"
  }
};

export async function generateFrequenceMixes(): Promise<FrequenceMix[]> {
  try {
    const token = await getSpotifyToken();
    if (!token) {
      console.warn("No Spotify token found. Using local library fallbacks.");
      return getFallbackMixes();
    }

    // 1. Fetch tracks from multiple sources to compile taste profile
    const [topTracksRes, recentlyPlayedRes, savedTracksRes] = await Promise.all([
      fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      fetch("https://api.spotify.com/v1/me/player/recently-played?limit=50", {
        headers: { Authorization: `Bearer ${token}` }
      }),
      fetch("https://api.spotify.com/v1/me/tracks?limit=50", {
        headers: { Authorization: `Bearer ${token}` }
      })
    ]);

    const uniqueTracksMap = new Map<string, any>();

    // Parse top tracks
    if (topTracksRes.ok) {
      const data = await topTracksRes.json();
      data.items?.forEach((track: any) => {
        if (track && track.id) uniqueTracksMap.set(track.id, track);
      });
    }

    // Parse recently played
    if (recentlyPlayedRes.ok) {
      const data = await recentlyPlayedRes.json();
      data.items?.forEach((item: any) => {
        const track = item.track;
        if (track && track.id) uniqueTracksMap.set(track.id, track);
      });
    }

    // Parse saved tracks
    if (savedTracksRes.ok) {
      const data = await savedTracksRes.json();
      data.items?.forEach((item: any) => {
        const track = item.track;
        if (track && track.id) uniqueTracksMap.set(track.id, track);
      });
    }

    const allTracks = Array.from(uniqueTracksMap.values());
    if (allTracks.length === 0) {
      console.warn("Spotify taste profile contains 0 tracks. Using local library fallbacks.");
      return getFallbackMixes();
    }

    // 2. Fetch Audio Features for all unique tracks
    const trackIds = allTracks.map((t) => t.id);
    const audioFeatures: any[] = [];
    
    // Spotify API supports up to 100 ids per request
    const batches: string[][] = [];
    for (let i = 0; i < trackIds.length; i += 100) {
      batches.push(trackIds.slice(i, i + 100));
    }

    await Promise.all(
      batches.map(async (batch) => {
        const featuresRes = await fetch(`https://api.spotify.com/v1/audio-features?ids=${batch.join(",")}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (featuresRes.ok) {
          const data = await featuresRes.json();
          if (data && data.audio_features) {
            audioFeatures.push(...data.audio_features.filter(Boolean));
          }
        }
      })
    );

    const featuresMap = new Map<string, any>();
    audioFeatures.forEach((f) => featuresMap.set(f.id, f));

    // 3. Cluster tracks into Frequence Mixes
    const mixes: Record<string, TrackInfo[]> = {
      "midnight-drive": [],
      "healing-era": [],
      "main-character": [],
      "late-night": []
    };

    allTracks.forEach((track) => {
      const features = featuresMap.get(track.id);
      const mappedTrack: TrackInfo = {
        id: track.id,
        name: track.name,
        artists: track.artists?.map((a: any) => a.name) || [],
        albumName: track.album?.name || "",
        albumImage: track.album?.images?.[0]?.url,
        duration_ms: track.duration_ms
      };

      if (!features) {
        // Fallback default routing if no features available
        const rand = Math.random();
        if (rand < 0.25) mixes["midnight-drive"].push(mappedTrack);
        else if (rand < 0.5) mixes["healing-era"].push(mappedTrack);
        else if (rand < 0.75) mixes["main-character"].push(mappedTrack);
        else mixes["late-night"].push(mappedTrack);
        return;
      }

      const { energy, valence, danceability, acousticness } = features;

      // Grouping rules based on standard Spotify audio features metrics
      if (energy > 0.6 && danceability > 0.55 && valence < 0.65) {
        mixes["midnight-drive"].push(mappedTrack);
      } else if (energy < 0.45 && acousticness > 0.35 && valence > 0.45) {
        mixes["healing-era"].push(mappedTrack);
      } else if (energy > 0.65 && danceability > 0.6 && valence >= 0.5) {
        mixes["main-character"].push(mappedTrack);
      } else if (energy < 0.45 && valence < 0.45) {
        mixes["late-night"].push(mappedTrack);
      } else {
        // Fallback mapping based on closest distance metrics
        const scoreMD = Math.abs(energy - 0.7) + Math.abs(danceability - 0.6) + Math.abs(valence - 0.5);
        const scoreHE = Math.abs(energy - 0.3) + Math.abs(acousticness - 0.6) + Math.abs(valence - 0.6);
        const scoreMC = Math.abs(energy - 0.8) + Math.abs(danceability - 0.8) + Math.abs(valence - 0.7);
        const scoreLN = Math.abs(energy - 0.3) + Math.abs(acousticness - 0.5) + Math.abs(valence - 0.3);

        const minScore = Math.min(scoreMD, scoreHE, scoreMC, scoreLN);
        if (minScore === scoreMD) mixes["midnight-drive"].push(mappedTrack);
        else if (minScore === scoreHE) mixes["healing-era"].push(mappedTrack);
        else if (minScore === scoreMC) mixes["main-character"].push(mappedTrack);
        else mixes["late-night"].push(mappedTrack);
      }
    });

    // 4. Ensure each mix has tracks (backfill with fallbacks if needed)
    return Object.entries(MIX_METADATA).map(([mixId, meta]) => {
      let mixTracks = mixes[mixId];
      if (mixTracks.length === 0) {
        // Backfill with high quality fallback tracks
        mixTracks = FALLBACK_TRACKS[mixId as keyof typeof FALLBACK_TRACKS];
      }
      return {
        id: mixId,
        name: meta.name,
        description: meta.description,
        image: meta.image,
        tracks: mixTracks
      };
    });

  } catch (error) {
    console.error("Taste engine failed:", error);
    return getFallbackMixes();
  }
}

function getFallbackMixes(): FrequenceMix[] {
  return Object.entries(MIX_METADATA).map(([mixId, meta]) => ({
    id: mixId,
    name: meta.name,
    description: meta.description,
    image: meta.image,
    tracks: FALLBACK_TRACKS[mixId as keyof typeof FALLBACK_TRACKS]
  }));
}
