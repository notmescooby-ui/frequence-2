import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zvesnisvnjzoulpzhzlj.supabase.co";
const supabaseAnonKey = "sb_publishable_syIRWdR7X4b-xhtqrJxRiw_4xz9VSbf";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

if (typeof window !== "undefined") {
  // Capture session on initial load
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.provider_token) {
      localStorage.setItem("spotify_provider_token", session.provider_token);
      console.log("[Supabase Initial] Persisted provider_token");
    }
  });

  // Keep token updated when authentication events trigger
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.provider_token) {
      localStorage.setItem("spotify_provider_token", session.provider_token);
      console.log("[Supabase AuthChange] Persisted provider_token on event:", event);
    }
    if (event === "SIGNED_OUT") {
      localStorage.removeItem("spotify_provider_token");
      console.log("[Supabase AuthChange] Cleared provider_token");
    }
  });
}

