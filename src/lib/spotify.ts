import { supabase } from "@/lib/supabase";

export async function getSpotifyToken() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("SESSION:", session);
  console.log("PROVIDER TOKEN:", session?.provider_token);

  return session?.provider_token ?? null;
}

