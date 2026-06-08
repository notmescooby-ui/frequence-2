import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/debug")({
  head: () => ({
    meta: [
      { title: "Auth Debug — FREQUENCE" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Debug,
});

function Debug() {
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [localFormData, setLocalFormData] = useState<any>(null);

  useEffect(() => {
    // Retrieve active session and user profile info
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // Retrieve saved questionnaire inputs
    const savedForm = localStorage.getItem("frequence_user_form");
    if (savedForm) {
      try {
        setLocalFormData(JSON.parse(savedForm));
      } catch (e) {
        console.error("Failed to parse saved form data:", e);
      }
    }

    // Listen for auth state alterations
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Filtered payload specifically requested by the user: metadata & identities
  const filteredData = user
    ? {
        user_metadata: user.user_metadata,
        identities: user.identities,
      }
    : null;

  return (
    <main className="min-h-screen bg-ivory text-ink p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-display italic text-3xl font-bold text-wine">§ Supabase Auth Debugger</h1>
            <p className="text-xs text-ink/60 mt-1 uppercase tracking-widest">Verification page for OAuth profiles</p>
          </div>
          <a
            href="/"
            className="text-xs text-wine hover:underline"
          >
            ← Home
          </a>
        </div>

        {loading ? (
          <p className="text-sm">Loading user session...</p>
        ) : !user ? (
          <div className="border border-dashed border-ink/20 p-8 text-center space-y-4 bg-white/50">
            <p className="text-sm text-ink/75">No active user session detected.</p>
            <a
              href="/login"
              className="inline-block bg-wine text-white px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest hover:opacity-90 cursor-pointer"
            >
              Go to Login Page
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Onboarding Questionnaire Input Data */}
            {localFormData && (
              <div className="border border-ink/10 bg-white/40 p-6 rounded space-y-3">
                <h3 className="font-display italic text-lg font-semibold text-wine">§ Collected Onboarding Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-sans">
                  <div>
                    <span className="font-bold text-ink/50 uppercase tracking-wider block text-[10px]">Full Name</span>
                    <span className="text-base text-ink font-medium mt-1 block">{localFormData.name || "(not provided)"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-ink/50 uppercase tracking-wider block text-[10px]">Phone Number</span>
                    <span className="text-base text-ink font-medium mt-1 block">{localFormData.phone || "(not provided)"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-ink/50 uppercase tracking-wider block text-[10px]">Country</span>
                    <span className="text-base text-ink font-medium mt-1 block">{localFormData.country || "(not provided)"}</span>
                  </div>
                  <div>
                    <span className="font-bold text-ink/50 uppercase tracking-wider block text-[10px]">Favorite Artist</span>
                    <span className="text-base text-ink font-medium mt-1 block">{localFormData.favoriteArtist || "(not provided)"}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Requested user_metadata and identities */}
              <div className="space-y-4">
                <div>
                  <h2 className="font-display italic text-lg font-semibold text-wine">§ Target Metadata & Identities (Copy This Part)</h2>
                  <p className="text-[10px] text-ink/50 uppercase tracking-wider mt-0.5">Specifically requested details to evaluate Spotify Integration APIs</p>
                </div>
                <pre className="bg-black/5 p-4 rounded text-xs overflow-auto max-h-[500px] border border-ink/10 select-all whitespace-pre-wrap break-all">
                  {JSON.stringify(filteredData, null, 2)}
                </pre>
              </div>

              {/* Right Column: Full user profile */}
              <div className="space-y-4">
                <div>
                  <h2 className="font-display italic text-lg font-semibold text-ink/70">§ Full User Object</h2>
                  <p className="text-[10px] text-ink/50 uppercase tracking-wider mt-0.5">Complete client response returned by the authentication server</p>
                </div>
                <pre className="bg-black/5 p-4 rounded text-xs overflow-auto max-h-[500px] border border-ink/10 whitespace-pre-wrap break-all">
                  {JSON.stringify(user, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}

        {session && (
          <div className="border-t border-ink/10 pt-6">
            <h3 className="text-xs text-ink/40 uppercase tracking-wider mb-2">Access Token</h3>
            <pre className="bg-black/5 p-3 rounded text-[10px] overflow-auto break-all border border-ink/10">
              {session.access_token}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}
