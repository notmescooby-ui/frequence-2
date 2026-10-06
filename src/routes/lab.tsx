import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/SplitShell";
import {
  Play, Pause, SkipBack, SkipForward, Search, Share2, Volume2, Plus,
} from "lucide-react";
import { useSpotifyPlaylists } from "@/hooks/useSpotifyPlaylists";
import { useSpotifyProfile } from "@/hooks/useSpotifyProfile";
import { getTopTracks, getTopArtists, getRecentlyPlayed } from "@/lib/spotifyApi";
import { usePlayerStore } from "@/store/playerStore";
import { supabase } from "@/lib/supabase";
export const Route = createFileRoute("/lab")({
  head: () => ({
    meta: [
      { title: "The Lab — FREQUENCE" },
      { name: "description", content: "Your music listening center." },
    ],
  }),
  component: Lab,
});

/* =========================================================
 *  DATA
 * ========================================================= */

const COMPOSITIONS = [
  { t: "Side Letter, no. III", time: "2:48" },
  { t: "Evening, in Rose", time: "3:14" },
  { t: "An Untitled Devotion", time: "4:02" },
];

const STEP_TITLES = [
  "How should it hit?",
  "How should it feel?",
  "What's the energy?",
  "What's the structure?",
];

const REFERENCE_CARDS = [
  [
    { song: "Pink + White", artist: "Frank Ocean", tag: "Breezy · Mid-tempo", tone: "#3A2E2A" },
    { song: "Sweet Life", artist: "Frank Ocean", tag: "Sun-bleached · Float", tone: "#6B4A4A" },
    { song: "By Your Side", artist: "Sade", tag: "Velvet · Slow", tone: "#1A1A1A" },
    { song: "Self Control", artist: "Frank Ocean", tag: "Aching · Soft", tone: "#9B4D5E" },
  ],
  [
    { song: "Motion Sickness", artist: "Phoebe Bridgers", tag: "Second-person · Hurt", tone: "#1A1A1A" },
    { song: "Liability", artist: "Lorde", tag: "Confessional · Quiet", tone: "#6B4A4A" },
    { song: "Lost in the Light", artist: "Bahamas", tag: "Yearning · Slow burn", tone: "#3A2E2A" },
    { song: "Vincent", artist: "Don McLean", tag: "Storytelling · Tender", tone: "#9B4D5E" },
  ],
  [
    { song: "See You Again", artist: "Tyler, The Creator", tag: "Builds · 6 / 10", tone: "#9B4D5E" },
    { song: "Pyramids", artist: "Frank Ocean", tag: "Climbs · 8 / 10", tone: "#1A1A1A" },
    { song: "Redbone", artist: "Childish Gambino", tag: "Pulse · 5 / 10", tone: "#6B4A4A" },
    { song: "Avril 14th", artist: "Aphex Twin", tag: "Still · 2 / 10", tone: "#3A2E2A" },
  ],
];
const STRUCTURE_TILES = ["Verse-heavy", "Chorus anthem", "Bridge-forward", "Loop-based"];

/* =========================================================
 *  PAGE
 * ========================================================= */
function Lab() {
  return (
    <>
      <Nav />
      <div className="pt-16 pb-20 min-h-screen bg-[var(--ivory)]">
        <div className="grid grid-cols-[280px_1fr_280px] gap-px bg-[var(--ink)]/10 min-h-[calc(100vh-64px-80px)]">
          <LeftSidebar />
          <CenterStage />
          <RightPanel />
        </div>
      </div>
      <BottomPlayer />
    </>
  );
}

/* =========================================================
 *  LEFT SIDEBAR
 * ========================================================= */
export function LeftSidebar() {
  const { playlists, loading } = useSpotifyPlaylists();
  const { profile, loading: profileLoading } = useSpotifyProfile();

  const handleReconnect = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "spotify",
        options: {
          scopes: "playlist-read-private playlist-read-collaborative user-library-read user-top-read user-read-recently-played",
          redirectTo: `${window.location.origin}/lab`,
        }
      });
    } catch (e) {
      console.error("Failed to connect Spotify:", e);
    }
  };

  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [artistsLoading, setArtistsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTopArtists();
        setTopArtists(data);
      } catch (e) {
        console.error(e);
      } finally {
        setArtistsLoading(false);
      }
    }
    if (profile) {
      load();
    } else {
      setTopArtists([]);
      setArtistsLoading(false);
    }
  }, [profile]);

  const displayName = profile?.displayName;
  const initials = profile?.initials;
  const image = profile?.image;
  const product = profile?.product ? `Spotify · ${profile.product.toUpperCase()}` : "Spotify";

  return (
    <aside className="bg-[var(--ivory)] p-6 flex flex-col gap-8 overflow-y-auto">
      {profile ? (
        <div className="flex items-center gap-3">
          <Avatar initials={initials || "OM"} tone="#9B4D5E" size={44} image={image} />
          <div>
            <p className="font-display text-base leading-tight">{displayName}</p>
            <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/50">{product}</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 opacity-50">
          <Avatar initials="?" tone="#9B4D5E" size={44} />
          <div>
            <p className="font-display text-base leading-tight">Not connected</p>
            <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/50">Spotify Session Inactive</p>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--ink)]/40" />
        <input
          placeholder="Search library"
          className="w-full bg-transparent border-0 border-b border-[var(--ink)]/20 focus:border-[var(--ink)] outline-none py-2 pl-6 font-display italic text-sm placeholder:text-[var(--ink)]/40 transition-colors"
        />
      </div>

      <div>
        <h3 className="font-mono text-[9px] caps-wide text-[var(--wine)] mb-4">Frequence Mixes</h3>
        <ul className="space-y-3 pr-2 mb-6">
          <li className="flex items-baseline justify-between gap-3 group cursor-pointer">
            <Link
              to="/playlist/$id"
              params={{ id: "frequence-midnight-drive" }}
              className="font-display text-sm group-hover:text-[var(--wine)] transition-colors truncate no-underline text-inherit"
            >
              Midnight Drive Mix
            </Link>
          </li>
          <li className="flex items-baseline justify-between gap-3 group cursor-pointer">
            <Link
              to="/playlist/$id"
              params={{ id: "frequence-healing-era" }}
              className="font-display text-sm group-hover:text-[var(--wine)] transition-colors truncate no-underline text-inherit"
            >
              Healing Era
            </Link>
          </li>
          <li className="flex items-baseline justify-between gap-3 group cursor-pointer">
            <Link
              to="/playlist/$id"
              params={{ id: "frequence-main-character" }}
              className="font-display text-sm group-hover:text-[var(--wine)] transition-colors truncate no-underline text-inherit"
            >
              Main Character Energy
            </Link>
          </li>
          <li className="flex items-baseline justify-between gap-3 group cursor-pointer">
            <Link
              to="/playlist/$id"
              params={{ id: "frequence-late-night" }}
              className="font-display text-sm group-hover:text-[var(--wine)] transition-colors truncate no-underline text-inherit"
            >
              Late Night Thoughts
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-mono text-[9px] caps-wide text-[var(--wine)] mb-4">Playlists</h3>
        {loading ? (
          <p className="font-mono text-[9px] text-[var(--ink)]/50 italic">Retrieving playlists...</p>
        ) : !profile && !profileLoading ? (
          <div className="border border-[var(--wine)]/25 bg-[var(--wine)]/[0.03] p-4 rounded text-left space-y-3">
            <p className="font-sans text-[11px] text-[var(--ink)]/65 leading-relaxed">
              Spotify session inactive. Reconnect to load your custom playlists.
            </p>
            <button
              onClick={handleReconnect}
              className="w-full bg-[var(--wine)] hover:bg-[var(--wine)]/90 text-white py-2 px-3 text-[9px] uppercase tracking-widest font-bold cursor-pointer transition-all rounded shadow-sm"
            >
              Connect Spotify
            </button>
          </div>
        ) : (
          <ul className="space-y-3 max-h-[260px] overflow-y-auto pr-2">
            <li className="flex items-baseline justify-between gap-3 group cursor-pointer border-b border-[var(--ink)]/5 pb-1">
              <Link
                to="/playlist/$id"
                params={{ id: "saved" }}
                className="font-display text-sm group-hover:text-[var(--wine)] transition-colors truncate no-underline text-[var(--wine)] font-medium"
              >
                Saved Music (Liked Songs)
              </Link>
            </li>
            {playlists.map((playlist: any) => (
              <li key={playlist.id} className="flex items-baseline justify-between gap-3 group cursor-pointer">
                <Link
                  to="/playlist/$id"
                  params={{ id: playlist.id }}
                  className="font-display text-sm group-hover:text-[var(--wine)] transition-colors truncate no-underline text-inherit"
                >
                  {playlist.name}
                </Link>
                <span className="font-mono text-[10px] text-[var(--ink)]/40 tabular shrink-0">
                  {playlist.tracks?.total || 0}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-mono text-[9px] caps-wide text-[var(--wine)] mb-4">Top 5 artists</h3>
        {artistsLoading ? (
          <p className="font-mono text-[9px] text-[var(--ink)]/50 italic">Loading top artists...</p>
        ) : topArtists.length === 0 ? (
          <p className="font-sans text-[11px] text-[var(--ink)]/50 italic">No top artists found.</p>
        ) : (
          <div className="space-y-3">
            {topArtists.slice(0, 5).map((artist: any, i: number) => {
              const image = artist.images?.[0]?.url;
              return (
                <div key={artist.id} className="flex items-center gap-3">
                  <Avatar
                    initials={artist.name.split(" ").map((w: any) => w[0]).slice(0, 2).join("")}
                    tone={["#1A1A1A", "#9B4D5E", "#3A2E2A", "#6B4A4A", "#1A1A1A"][i % 5]}
                    size={30}
                    image={image}
                  />
                  <span className="font-display text-sm">{artist.name}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}

/* =========================================================
 *  CENTER STAGE
 * ========================================================= */
function CenterStage() {
  return (
    <main className="bg-[var(--ivory)] px-12 py-12 overflow-y-auto">
      <ListenerMode />
    </main>
  );
}

function ListenerMode() {
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const togglePlay = usePlayerStore((state) => state.togglePlay);

  useEffect(() => {
    async function load() {
      try {
        const tracks = await getTopTracks();
        setTopTracks(tracks);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const tracksToDisplay = topTracks;

  const activeTrackName = currentTrack?.name || "Side Letter, no. III";
  const activeArtistName = currentTrack
    ? (Array.isArray(currentTrack.artists) ? currentTrack.artists.map((a: any) => a.name).join(", ") : currentTrack.artists || "Spotify Artist")
    : "Frequence · Original Composition";

  return (
    <div>
      <div className="flex items-start justify-between mb-12">
        <p className="font-mono text-[10px] caps-wide text-[var(--wine)]">Now playing</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-end mb-16">
        <AlbumArt />
        <div className="flex-1">
          <h1 className="font-display italic font-medium text-5xl md:text-6xl tracking-[-0.03em] leading-[1] mb-4">
            {activeTrackName}
          </h1>
          <p className="font-mono text-[11px] caps-wide text-[var(--ink)]/60 mb-10">
            {activeArtistName}
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => usePlayerStore.getState().prevTrack()}
              disabled={!currentTrack}
              className="text-[var(--ink)] hover:text-[var(--wine)] disabled:opacity-30 transition-colors cursor-pointer"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                if (currentTrack) {
                  togglePlay();
                } else {
                  if (tracksToDisplay.length > 0) {
                    playTrack(tracksToDisplay[0], tracksToDisplay);
                  }
                }
              }}
              className="w-14 h-14 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center hover:bg-[var(--wine)] transition-colors cursor-pointer"
            >
              {isPlaying && currentTrack ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={() => usePlayerStore.getState().nextTrack()}
              disabled={!currentTrack}
              className="text-[var(--ink)] hover:text-[var(--wine)] disabled:opacity-30 transition-colors cursor-pointer"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Top tracks */}
      <div className="mt-20">
        <p className="font-mono text-[10px] caps-wide text-[var(--wine)] mb-8">
          {topTracks.length > 0 ? "Your top tracks this month" : "Featured tracks"}
        </p>
        <div className="border-t border-[var(--ink)]/15">
          {tracksToDisplay.length === 0 ? (
            <p className="font-sans text-xs text-[var(--ink)]/50 italic py-6">No top tracks loaded. Connect your Spotify account to sync your library.</p>
          ) : (
            tracksToDisplay.map((t: any, index: number) => {
              const min = Math.floor(t.duration_ms / 60000);
              const sec = Math.floor((t.duration_ms % 60000) / 1000).toString().padStart(2, '0');
              const duration = `${min}:${sec}`;
              const isCurrent = currentTrack && currentTrack.id === t.id;

              return (
                <div
                  key={t.id}
                  onClick={() => playTrack(t, tracksToDisplay)}
                  className={`grid grid-cols-[40px_1fr_1fr_60px] items-baseline gap-6 py-5 border-b border-[var(--ink)]/10 hover:bg-[var(--ink)]/[0.02] transition-colors group cursor-pointer ${isCurrent ? "bg-[var(--wine)]/[0.03]" : ""}`}
                >
                  <span className="font-mono text-[10px] text-[var(--ink)]/40 tabular">{String(index + 1).padStart(2, '0')}</span>
                  <span className={`font-display text-lg group-hover:italic transition-all ${isCurrent ? "text-[var(--wine)] font-bold italic" : ""}`}>{t.name}</span>
                  <span className="font-mono text-[10px] caps-wide text-[var(--ink)]/60">{t.artists?.map((a: any) => a.name).join(", ")}</span>
                  <span className="font-mono text-[10px] text-[var(--ink)]/50 tabular text-right">{duration}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function AlbumArt() {
  return (
    <svg viewBox="0 0 200 200" className="w-56 h-56 shrink-0">
      {[80, 65, 50, 35, 20].map((r, i) => (
        <circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none"
          stroke={i === 0 ? "#9B4D5E" : "#6B6358"}
          strokeWidth="0.8"
          strokeDasharray={i === 2 ? "2 4" : undefined}
          opacity={1 - i * 0.15}
        />
      ))}
      <circle cx="100" cy="100" r="3" fill="#1A1A1A" />
    </svg>
  );
}

/* =========================================================
 *  CREATE WIZARD
 * ========================================================= */
function CreateWizard({
  step, setStep, selections, pick, onCancel,
}: {
  step: number;
  setStep: (n: number) => void;
  selections: (string | null)[];
  pick: (v: string) => void;
  onCancel: () => void;
}) {
  return (
    <div className="animate-slow-fade">
      {/* dots */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex gap-3">
          {[0, 1, 2, 3].map((i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}`}
              className="h-1.5 transition-all duration-500"
              style={{
                width: i === step ? "32px" : "16px",
                background: selections[i] ? "#9B4D5E" : i === step ? "#1A1A1A" : "rgba(26,26,26,0.2)",
              }}
            />
          ))}
        </div>
        <button onClick={onCancel} className="font-mono text-[10px] caps-wide text-[var(--ink)]/50 hover:text-[var(--ink)] transition-colors">
          Cancel
        </button>
      </div>

      <p className="font-mono text-[10px] caps-wide text-[var(--wine)] mb-4">Step {String(step + 1).padStart(2, "0")} of 04</p>
      <h2 className="font-display italic font-medium text-5xl tracking-[-0.03em] leading-[1] mb-12">
        {STEP_TITLES[step]}
      </h2>

      {step < 3 ? (
        <div className="grid grid-cols-2 gap-6">
          {REFERENCE_CARDS[step].map((c) => {
            const active = selections[step] === c.song;
            return (
              <button
                key={c.song}
                onClick={() => pick(c.song)}
                className={`group relative h-56 overflow-hidden text-left transition-all duration-500 ${active ? "ring-1 ring-[var(--wine)] -translate-y-1" : "hover:-translate-y-1"}`}
                style={{ background: c.tone }}
              >
                <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%)` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-[var(--ivory)]">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[9px] caps-wide bg-[var(--ivory)]/15 backdrop-blur px-2 py-1">{c.tag}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity w-9 h-9 rounded-full bg-[var(--ivory)] text-[var(--ink)] flex items-center justify-center">
                      <Play className="w-4 h-4 ml-0.5" />
                    </span>
                  </div>
                  <div>
                    <p className="font-display italic text-3xl tracking-[-0.02em] leading-tight">{c.song}</p>
                    <p className="font-mono text-[10px] caps-wide mt-2 opacity-70">{c.artist}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {STRUCTURE_TILES.map((t) => {
            const active = selections[3] === t;
            return (
              <button
                key={t}
                onClick={() => pick(t)}
                className={`h-44 border text-left p-6 transition-all duration-500 ${active
                    ? "border-[var(--wine)] bg-[var(--wine)]/5 -translate-y-1"
                    : "border-[var(--ink)]/20 hover:border-[var(--ink)] hover:-translate-y-1"
                  }`}
              >
                <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/50">Form</p>
                <p className="font-display font-medium text-3xl mt-3 tracking-[-0.02em] caps-wide">{t}</p>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================
 *  RIGHT PANEL
 * ========================================================= */
export function RightPanel() {
  return (
    <aside className="bg-[var(--ivory)] p-6 flex flex-col gap-8 overflow-y-auto">
      <ProfileCard />
      <RecentPlaybacksList />
    </aside>
  );
}

function ProfileCard() {
  const { profile } = useSpotifyProfile();

  const displayName = profile?.displayName;
  const initials = profile?.initials;
  const product = profile?.product;

  return (
    <div className="flex flex-col items-center text-center border border-[var(--ink)]/15 p-5">
      {profile ? (
        <>
          <p>{displayName}</p>
          <p>{product}</p>
        </>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
}

function RecentPlaybacksList() {
  const playTrack = usePlayerStore((state) => state.playTrack);
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const [playbacks, setPlaybacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const items = await getRecentlyPlayed();
        const mapped = items.map((item: any, idx: number) => ({
          id: item.track.id || `recent-${idx}`,
          name: item.track.name,
          artists: item.track.artists,
          duration_ms: item.track.duration_ms,
          preview_url: item.track.preview_url || item.track.preview
        }));
        setPlaybacks(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h3 className="font-mono text-[9px] caps-wide text-[var(--ink)]/60 mb-5">Recent Playbacks</h3>
      {loading ? (
        <p className="font-mono text-[9px] text-[var(--ink)]/50 italic">Retrieving recent playbacks...</p>
      ) : playbacks.length === 0 ? (
        <p className="font-sans text-[11px] text-[var(--ink)]/50 italic">No recent playbacks found.</p>
      ) : (
        <ul className="space-y-5">
          {playbacks.map((p) => {
            const isCurrent = currentTrack && currentTrack.id === p.id;
            const min = Math.floor(p.duration_ms / 60000);
            const sec = Math.floor((p.duration_ms % 60000) / 1000).toString().padStart(2, '0');
            const time = `${min}:${sec}`;

            return (
              <li key={p.id} className="border-b border-[var(--ink)]/10 pb-5">
                <p className={`font-display text-base leading-tight mb-1 ${isCurrent ? "text-[var(--wine)] font-bold" : ""}`}>{p.name}</p>
                <p className="font-mono text-[10px] text-[var(--ink)]/55">{p.artists?.[0]?.name || "Unknown Artist"}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="font-mono text-[10px] text-[var(--ink)]/40 tabular">{time}</span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => playTrack(p, playbacks)}
                      className="text-[var(--ink)]/60 hover:text-[var(--wine)] font-mono text-[10px] caps-wide transition-colors cursor-pointer"
                    >
                      Play
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* =========================================================
 *  BOTTOM PLAYER
 * ========================================================= */
const formatTime = (secs: number) => {
  if (isNaN(secs)) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export function BottomPlayer() {
  const { currentTrack, isPlaying, progress, duration, togglePlay, nextTrack, prevTrack, seek } = usePlayerStore();

  const trackName = currentTrack?.name || "Side Letter, no. III";
  const artistName = currentTrack
    ? (Array.isArray(currentTrack.artists) ? currentTrack.artists.map((a: any) => a.name).join(", ") : currentTrack.artists || "Spotify Artist")
    : "Frequence · Original Composition";

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentTrack || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const clickPercent = clickX / width;
    seek(clickPercent * duration);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 h-20 bg-[var(--ivory)] border-t border-[var(--ink)]/20 px-8 flex items-center gap-8 z-30">
      <div className="flex items-center gap-3 w-[260px]">
        <div className="w-11 h-11 rounded-full bg-[var(--ink)] flex items-center justify-center">
          <div className={`w-2.5 h-2.5 rounded-full bg-[var(--wine)] ${isPlaying ? "animate-ping" : ""}`} />
        </div>
        <div className="min-w-0">
          <p className="font-display italic text-sm leading-tight truncate">{trackName}</p>
          <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/50 truncate">{artistName}</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button
            onClick={prevTrack}
            disabled={!currentTrack}
            className="text-[var(--ink)]/70 hover:text-[var(--ink)] disabled:opacity-30 transition-colors cursor-pointer"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            disabled={!currentTrack}
            className="w-9 h-9 rounded-full bg-[var(--ink)] text-[var(--ivory)] flex items-center justify-center hover:bg-[var(--wine)] transition-colors disabled:opacity-30 cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button
            onClick={nextTrack}
            disabled={!currentTrack}
            className="text-[var(--ink)]/70 hover:text-[var(--ink)] disabled:opacity-30 transition-colors cursor-pointer"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
        <div className="w-full max-w-xl flex items-center gap-3">
          <span className="font-mono text-[9px] text-[var(--ink)]/50 tabular">{formatTime(progress)}</span>
          <div
            onClick={handleProgressBarClick}
            className="relative flex-1 h-1 bg-[var(--ink)]/20 cursor-pointer rounded-full hover:h-2 transition-all flex items-center"
          >
            <div className="absolute top-0 bottom-0 left-0 bg-[var(--wine)] rounded-full" style={{ width: `${progressPercent}%` }} />
            <div className="absolute w-[8px] h-[8px] rounded-full bg-[var(--wine)]" style={{ left: `calc(${progressPercent}% - 4px)` }} />
          </div>
          <span className="font-mono text-[9px] text-[var(--ink)]/50 tabular">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 w-[220px] justify-end">
        <Volume2 className="w-4 h-4 text-[var(--ink)]/60" />
        <div className="relative w-32 h-px bg-[var(--ink)]/20">
          <div className="absolute inset-y-0 left-0 bg-[var(--ink)]" style={{ width: "70%" }} />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
 *  Avatar
 * ========================================================= */
export function Avatar({ initials, tone, size, image }: { initials: string; tone: string; size: number; image?: string }) {
  if (image) {
    return (
      <img
        src={image}
        alt={initials}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center font-display italic text-[var(--ivory)] shrink-0"
      style={{ background: tone, width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}

