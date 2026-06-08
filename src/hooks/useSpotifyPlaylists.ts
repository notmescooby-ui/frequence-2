import { useEffect, useState } from "react";
import { getAllPlaylists } from "@/lib/spotifyApi";

export function useSpotifyPlaylists() {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getAllPlaylists();
      setPlaylists(data);
      setLoading(false);
    }
    load();
  }, []);

  return {
    playlists,
    loading,
  };
}
