import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!;

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

