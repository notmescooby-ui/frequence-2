import { createClient } from "@supabase/supabase-js";

// Same public (publishable) project values the other Supabase helpers in
// src/utils/supabase/* fall back to, so a fresh clone runs without a .env.
// Override with VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY (see .env.example).
// VITE_SUPABASE_ANON_KEY is still read for backwards compatibility.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://zvesnisvnjzoulpzhzlj.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_syIRWdR7X4b-xhtqrJxRiw_4xz9VSbf";

export const supabase = createClient(supabaseUrl, supabaseKey);

if (typeof window !== "undefined") {
  // Capture session on initial load
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.provider_token) {
      localStorage.setItem("spotify_provider_token", session.provider_token);
    }
  });

  // Keep token updated when authentication events trigger
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.provider_token) {
      localStorage.setItem("spotify_provider_token", session.provider_token);
    }
    if (event === "SIGNED_OUT") {
      localStorage.removeItem("spotify_provider_token");
    }
  });
}
