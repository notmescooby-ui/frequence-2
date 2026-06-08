import { supabase } from "@/lib/supabase";

export async function getSpotifyToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const sessionToken = session?.provider_token;
  if (sessionToken) {
    if (typeof window !== "undefined") {
      localStorage.setItem("spotify_provider_token", sessionToken);
    }
    return sessionToken;
  }

  if (typeof window !== "undefined") {
    const localToken = localStorage.getItem("spotify_provider_token");
    if (localToken) {
      return localToken;
    }
  }

  return null;
}

