import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/SplitShell";
import { LeftSidebar, RightPanel, BottomPlayer } from "./lab";
import { getPlaylistTracks } from "@/lib/spotifyApi";
import { generateFrequenceMixes } from "@/lib/tasteEngine";

export const Route = createFileRoute("/playlist/$id")({
  head: () => ({
    meta: [
      { title: "Playlist — FREQUENCE" },
      { name: "description", content: "Playlist track list view." },
    ],
  }),
  component: PlaylistTracksPage,
});

function PlaylistTracksPage() {
  const { id } = Route.useParams();
  const [tracks, setTracks] = useState<any[]>([]);
  const [playlistInfo, setPlaylistInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (id.startsWith("frequence-")) {
          const mixId = id.replace("frequence-", "");
          const mixes = await generateFrequenceMixes();
          const mix = mixes.find((m) => m.id === mixId);
          if (mix) {
            setPlaylistInfo({
              name: mix.name,
              description: mix.description,
              images: mix.image ? [{ url: mix.image }] : []
            });
            const mapped = mix.tracks.map((t) => ({
              track: {
                id: t.id,
                name: t.name,
                artists: t.artists.map((artistName) => ({ name: artistName })),
                album: { name: t.albumName },
                duration_ms: t.duration_ms
              }
            }));
            setTracks(mapped);
          } else {
            console.error("Mix not found:", mixId);
          }
        } else {
          const data = await getPlaylistTracks(id);
          if (data && data.items) {
            setTracks(data.items);
          }
        }
      } catch (err) {
        console.error("Failed to load playlist tracks:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  // Fetch playlist details from Spotify (only for Spotify playlists)
  useEffect(() => {
    if (id.startsWith("frequence-")) return;

    async function fetchDetails() {
      try {
        const { getSpotifyToken } = await import("@/lib/spotify");
        const token = await getSpotifyToken();
        if (token) {
          const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const info = await response.json();
            setPlaylistInfo(info);
          }
        }
      } catch (e) {
        console.error("Failed to fetch playlist details:", e);
      }
    }
    fetchDetails();
  }, [id]);

  const playlistName = playlistInfo?.name || "Spotify Playlist";
  const playlistDescription = playlistInfo?.description || "Curated sound selection.";
  const playlistImage = playlistInfo?.images?.[0]?.url;

  return (
    <>
      <Nav />
      <div className="pt-16 pb-20 min-h-screen bg-[var(--ivory)]">
        <div className="grid grid-cols-[280px_1fr_280px] gap-px bg-[var(--ink)]/10 min-h-[calc(100vh-64px-80px)]">
          <LeftSidebar />
          
          <main className="bg-[var(--ivory)] px-12 py-12 overflow-y-auto">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-64 font-mono text-xs text-[var(--ink)]/60">
                <span className="animate-pulse">Loading playlist tracks...</span>
              </div>
            ) : (
              <div className="animate-slow-fade">
                {/* Playlist Info Header */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-end mb-12 pb-8 border-b border-[var(--ink)]/10">
                  {playlistImage ? (
                    <img 
                      src={playlistImage} 
                      alt={playlistName}
                      className="w-44 h-44 object-cover shadow-lg border border-[var(--ink)]/10"
                    />
                  ) : (
                    <div className="w-44 h-44 bg-[var(--wine)]/10 flex items-center justify-center border border-[var(--ink)]/10">
                      <span className="font-display italic text-3xl text-[var(--wine)]">F</span>
                    </div>
                  )}
                  <div className="flex-1 text-center md:text-left">
                    <p className="font-mono text-[9px] caps-wide text-[var(--wine)] mb-2">Playlist</p>
                    <h1 className="font-display italic font-medium text-4xl md:text-5xl tracking-[-0.03em] leading-[1.1] mb-3 text-[var(--ink)]">
                      {playlistName}
                    </h1>
                    <p className="font-sans text-xs text-[var(--ink)]/60 max-w-xl leading-relaxed">
                      {playlistDescription}
                    </p>
                    <p className="font-mono text-[9px] caps-wide text-[var(--ink)]/40 mt-4">
                      {tracks.length} tracks
                    </p>
                  </div>
                </div>

                {/* Tracks list */}
                <div>
                  <p className="font-mono text-[10px] caps-wide text-[var(--wine)] mb-6">Tracks</p>
                  
                  {tracks.length === 0 ? (
                    <p className="font-sans text-sm text-[var(--ink)]/60 italic">No tracks in this playlist.</p>
                  ) : (
                    <div className="border-t border-[var(--ink)]/15">
                      {tracks.map((item: any, index: number) => {
                        const track = item.track;
                        if (!track) return null;
                        
                        // Format track duration
                        const min = Math.floor(track.duration_ms / 60000);
                        const sec = Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0');
                        const duration = `${min}:${sec}`;

                        return (
                          <div 
                            key={item.track.id + "-" + index} 
                            className="grid grid-cols-[40px_1fr_1fr_60px] items-baseline gap-6 py-4 border-b border-[var(--ink)]/10 hover:bg-[var(--ink)]/[0.02] transition-colors group cursor-pointer"
                          >
                            <span className="font-mono text-[10px] text-[var(--ink)]/40 tabular">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="font-display text-base group-hover:italic transition-all truncate text-[var(--ink)]">
                              {track.name}
                            </span>
                            <span className="font-mono text-[10px] caps-wide text-[var(--ink)]/60 truncate">
                              {track.artists?.map((a: any) => a.name).join(", ")}
                            </span>
                            <span className="font-mono text-[10px] text-[var(--ink)]/50 tabular text-right">
                              {duration}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
          
          <RightPanel />
        </div>
      </div>
      <BottomPlayer />
    </>
  );
}
