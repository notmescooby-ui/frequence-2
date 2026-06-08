import { useEffect, useState } from "react";
import { getSpotifyProfile } from "@/lib/spotifyApi";

export interface SpotifyProfile {
  displayName: string;
  initials: string;
  image?: string;
  product?: string;
}

export function useSpotifyProfile() {
  const [profile, setProfile] = useState<SpotifyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getSpotifyProfile();
      if (data) {
        // Calculate initials from display_name
        const name = data.display_name || "";
        const parts = name.split(" ").filter(Boolean);
        const initials = parts.map((p: string) => p[0]).slice(0, 2).join("").toUpperCase();

        setProfile({
          displayName: name || "Spotify Listener",
          initials: initials || "SL",
          image: data.images?.[0]?.url,
          product: data.product || "free",
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  return {
    profile,
    loading,
  };
}
