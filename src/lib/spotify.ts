import { supabase } from "@/lib/supabase";

export async function getSpotifyToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.provider_token ?? null;
}
