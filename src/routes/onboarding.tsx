import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Nav } from "@/components/SplitShell";

// Import artist image assets for vinyl labels
import taylorSwiftImg from "@/assets/taylor-swift-img.png";
import sabrinaCarpenterImg from "@/assets/sabrina-carpenter.png";
import harryStylesImg from "@/assets/harry-styles-img.png";
import edSheeranImg from "@/assets/ed-sheeran.png";
import oneDirectionImg from "@/assets/one-direction-img.png";
import jvkeImg from "@/assets/jvke.png";
import eminemImg from "@/assets/eminem.png";
import drakeImg from "@/assets/drake.png";
import selenaGomezImg from "@/assets/selena-gomez.png";
import fujiiKazeImg from "@/assets/fuji-kaze.png";
import connorPriceImg from "@/assets/connor-price.png";
import seanPaulImg from "@/assets/sean-paul.png";
import frequenceLogo from "@/assets/frequence-logo.png";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Onboarding Welcome — FREQUENCE" },
      { name: "description", content: "Your compiled musical taste profile." },
    ],
  }),
  component: OnboardingWelcome,
});

const artistList = [
  { name: "Taylor Swift", img: taylorSwiftImg },
  { name: "Sabrina Carpenter", img: sabrinaCarpenterImg },
  { name: "Harry Styles", img: harryStylesImg },
  { name: "Ed Sheeran", img: edSheeranImg },
  { name: "One Direction", img: oneDirectionImg },
  { name: "JVKE", img: jvkeImg },
  { name: "Eminem", img: eminemImg },
  { name: "Drake", img: drakeImg },
  { name: "Selena Gomez", img: selenaGomezImg },
  { name: "Fujii Kaze", img: fujiiKazeImg },
  { name: "Connor Price", img: connorPriceImg },
  { name: "Sean Paul", img: seanPaulImg }
];

function OnboardingWelcome() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);
  const [firstArtistImg, setFirstArtistImg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [onboardingStep, setOnboardingStep] = useState(1);

  useEffect(() => {
    const cached = localStorage.getItem("frequence_user_form");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Only load if name/country is completed
        if (parsed.personalDetails?.name && parsed.personalDetails?.country) {
          setFormData(parsed);

          // Find first selected artist PFP for vinyl disk label
          const firstArtistName = parsed.selectedArtists?.[0];
          const artist = artistList.find((a) => a.name === firstArtistName);
          if (artist) {
            setFirstArtistImg(artist.img);
          }
        }
      } catch (e) {
        console.error("Failed to parse cached questionnaire details:", e);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !formData) {
      navigate({ to: "/login" });
    }
  }, [loading, formData, navigate]);

  const handleListenClick = async () => {
    try {
      const { getSpotifyToken } = await import("@/lib/spotify");
      const token = await getSpotifyToken();
      if (token) {
        const { getAllPlaylists } = await import("@/lib/spotifyApi");
        const playlists = await getAllPlaylists();
        if (playlists && playlists.length > 0) {
          navigate({ to: "/playlist/$id", params: { id: playlists[0].id } });
          return;
        }
        navigate({ to: "/playlist/$id", params: { id: "saved" } });
        return;
      }
    } catch (e) {
      console.error("Failed to redirect to Spotify playlist:", e);
    }
    navigate({ to: "/lab" });
  };

  // Compute music personality details
  const getMusicPersonality = () => {
    if (!formData) return null;
    const items = formData.selectedPersonality || [];
    const lyrics = formData.selectedLyrics || [];

    // Let's count preference scores
    const scores = {
      Romantic: 0,
      Reflective: 0,
      Confident: 0,
      Heartbroken: 0,
      Hopeful: 0,
      Nostalgic: 0,
      Poetic: 0,
      Storytelling: 0,
    };

    // Map lyrics selection to preferences
    lyrics.forEach((song: string) => {
      if (song === "Those Eyes" || song === "Until I Found You") scores.Romantic += 2;
      if (song === "Good News" || song === "Vienna") scores.Reflective += 2;
      if (song === "Something About Us") scores.Poetic += 2;
      if (song === "Limerence" || song === "Do I Wanna Know?") scores.Heartbroken += 2;
      if (song === "Don't Let It Break Your Heart") scores.Hopeful += 2;
      if (song === "Perfect" || song === "So American") scores.Confident += 2;
      if (song === "Cigarette Daydreams") scores.Nostalgic += 2;
      if (song === "Sign of the Times") scores.Storytelling += 2;
    });

    // Map personality vibe selection to preferences
    items.forEach((item: string) => {
      if (item === "Midnight drives") scores.Nostalgic += 1;
      if (item === "Late night overthinking") scores.Reflective += 1;
      if (item === "First love butterflies") scores.Romantic += 1;
      if (item === "Healing after heartbreak") scores.Heartbroken += 1;
      if (item === "Dreaming about the future") scores.Hopeful += 1;
      if (item === "Escaping reality") scores.Poetic += 1;
      if (item === "Living for adventure") scores.Storytelling += 1;
      if (item === "Chasing ambition") scores.Confident += 1;
    });

    // Determine highest score preference
    let topPref = "Reflective";
    let maxScore = -1;
    Object.entries(scores).forEach(([pref, val]) => {
      if (val > maxScore) {
        maxScore = val;
        topPref = pref;
      }
    });

    // Personalisation tokens
    const firstName = formData?.personalDetails?.name?.split(" ")[0] || "";
    const topArtist = formData?.selectedArtists?.[0] || "your favourite artist";
    const topHabit = formData?.selectedHabits?.[0]?.toLowerCase() || "your daily moments";
    const you = firstName ? `${firstName}, you` : "You";

    if (topPref === "Romantic" || topPref === "Poetic") {
      return {
        title: "THE ROMANTIC DREAMER",
        description: `${you} gravitate toward soft acoustic details, strings, and sweeping vocal melodies — the kind ${topArtist} builds so effortlessly.

You listen to music to amplify your feelings, to live inside the imaginary spaces of lyrics.

Whether you're ${topHabit} or simply breathing, you notice the tiny, poetic details — and you carry them everywhere.`
      };
    }

    if (topPref === "Confident" || topPref === "Storytelling") {
      return {
        title: "THE AMBITIOUS CREATOR",
        description: `${you} look for energy, drive, and rhythm that match your pace — something ${topArtist} always delivers.

Your songs are an engine of motivation, filled with bold basslines and clean, direct lyricism.

When you're ${topHabit}, you need music that keeps up with you. You listen to conquer the day.`
      };
    }

    if (topPref === "Hopeful") {
      return {
        title: "THE HOPEFUL SEEKER",
        description: `${you} seek out melodies and chord progressions that lift the spirit — the kind ${topArtist} has built a whole world around.

You use music to light up darker days, especially during ${topHabit}.

For you, every song represents a fresh start. You believe music has the power to heal.`
      };
    }

    // Default/fallback — THE MIDNIGHT STORYTELLER
    return {
      title: "THE MIDNIGHT STORYTELLER",
      description: `${you} gravitate toward songs that feel lived in — songs that ${topArtist} writes like they were meant only for you.

You prefer emotional detail over loud production.

While ${topHabit}, your most meaningful songs are reflective, romantic, and nostalgic.

You don't listen to music to fill silence.

You listen to understand yourself.`
    };
  };

  const personality = getMusicPersonality();

  if (loading) {
    return (
      <main className="min-h-screen bg-ivory text-ink flex items-center justify-center font-mono">
        <p className="text-sm">Retrieving taste index profile...</p>
      </main>
    );
  }

  if (!formData) {
    return (
      <main className="min-h-screen bg-ivory text-ink flex items-center justify-center font-mono">
        <p className="text-sm text-ink/50 animate-pulse">Redirecting...</p>
      </main>
    );
  }

  if (onboardingStep === 2) {
    return (
      <div className="min-h-screen bg-ivory text-ink flex flex-col relative bg-cream-watermark select-none">
        {/* Header containing blended logo */}
        <header className="w-full flex justify-center py-6 bg-transparent flex-shrink-0 relative z-25 border-b border-ink/5">
          <img
            src={frequenceLogo}
            alt="FREQUENCE Logo"
            className="h-70 w-auto object-contain select-none transition-all duration-300 hover:scale-110"
          />
        </header>

        {/* 50/50 Split Screen below Logo */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 w-full relative z-10 min-h-0">
          {/* Left Side: LISTEN */}
          <button
            onClick={handleListenClick}
            className="bg-ivory hover:bg-[#eae4d9] text-ink p-12 flex flex-col justify-center items-center text-center transition-all duration-500 group border-r border-ink/10 cursor-pointer outline-none relative"
          >
            <div className="space-y-4 max-w-md">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine font-bold group-hover:scale-105 transition-transform block">
                Option 01
              </span>
              <h2 className="font-display italic text-4xl md:text-5xl font-bold tracking-tight text-ink group-hover:underline decoration-wine underline-offset-8 transition-all">
                Listen
              </h2>
              <p className="font-sans text-sm text-ink/60 leading-relaxed font-medium mt-2">
                Explore your Spotify cloned playlists, recently played tracks, and top music profiles. A pure, distraction-free listening room.
              </p>
            </div>
          </button>

          {/* Right Side: COMPOSE */}
          <button
            onClick={() => navigate({ to: "/compose" })}
            className="bg-ink hover:bg-[#1a1a1a]/95 text-ivory p-12 flex flex-col justify-center items-center text-center transition-all duration-500 group cursor-pointer outline-none relative"
          >
            <div className="space-y-4 max-w-md">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-rose font-bold group-hover:scale-105 transition-transform block">
                Option 02
              </span>
              <h2 className="font-display italic text-4xl md:text-5xl font-bold tracking-tight text-ivory group-hover:underline decoration-rose underline-offset-8 transition-all">
                Compose
              </h2>
              <p className="font-sans text-sm text-ivory/60 leading-relaxed font-medium mt-2">
                Turn a feeling into an original song. Describe what it feels like, shape the lyrics, and let FREQUENCE compose it with you.
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory text-ink flex flex-col relative bg-cream-watermark select-none">
      <Nav />
      <div className="h-16" />

      {/* Main summary view */}
      <main className="flex-1 flex flex-col justify-center max-w-4xl w-full mx-auto px-6 py-12 relative z-10">

        <div className="space-y-12 animate-slow-fade">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-wine font-bold">§ Welcome</span>
            <h1 className="font-display italic text-5xl md:text-6xl font-bold tracking-tight text-ink mt-2">
              Welcome to FREQUENCE.
            </h1>
            <p className="font-sans text-sm text-ink/55 mt-3 leading-relaxed max-w-xl">
              Your profile has been compiled into a personalized listening and compose matrix.
            </p>
          </div>

          {/* Section 6: Music Personality summary dashboard card */}
          {personality && (
            <div className="border border-ink/10 bg-white/40 p-8 rounded-lg shadow-sm space-y-6">
              <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-wine font-bold block">
                Section 06 / Music Personality
              </span>

              <div className="space-y-4 max-w-2xl">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-ink">
                  {personality.title}
                </h2>
                <p className="font-display italic text-lg md:text-xl text-ink/80 leading-relaxed font-medium whitespace-pre-line">
                  {personality.description}
                </p>
              </div>
            </div>
          )}

          {/* Album / Sliding vinyl jacket details card mockup */}
          <div className="relative flex flex-col md:flex-row items-center gap-12 bg-black/[0.02] border border-ink/5 p-8 rounded overflow-hidden group">

            {/* Spinning Vinyl Record Visual */}
            <div className="relative w-64 h-48 flex-shrink-0 flex items-center justify-center select-none">
              {/* Sliding holder: translates out on hover to reveal the center spindle image */}
              <div
                className="absolute top-1 left-0 w-46 h-46 z-10 transition-transform duration-700 ease-out translate-x-10 group-hover:translate-x-28"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                {/* Spinning Vinyl Record Disk */}
                <div
                  className="w-full h-full rounded-full bg-[#121212] shadow-2xl flex items-center justify-center animate-spin"
                  style={{
                    border: "2px solid rgba(255,255,255,0.06)",
                    animationDuration: "12s",
                    background: "repeating-radial-gradient(circle at center, #2c2c2c, #1a1a1a 4px, #0f0f0f 8px)",
                  }}
                >
                  {/* Vinyl Label */}
                  <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center overflow-hidden relative">
                    <img
                      src={firstArtistImg || taylorSwiftImg}
                      alt="Center Label Profile"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute w-4 h-4 bg-ivory border border-black rounded-full" />
                  </div>
                </div>
              </div>

              {/* Sleeve Jacket Box */}
              <div className="absolute left-0 top-0 w-48 h-48 bg-wine z-20 shadow-xl p-4 flex flex-col justify-between border border-white/5">
                <span className="font-mono text-[8px] uppercase tracking-widest text-white/50 block">Taste Index</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-white leading-tight truncate">
                    {formData.personalDetails?.name}
                  </h3>
                  <p className="font-sans text-[8px] uppercase tracking-wider text-white/40 mt-1">
                    {formData.personalDetails?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Selection Metadata Details Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 flex-1 font-sans text-xs">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-wine font-bold block">Favorite Artists</span>
                <span className="text-base italic font-display text-ink mt-1 block font-medium truncate max-w-[220px]">
                  {formData.selectedArtists?.join(", ")}
                </span>
              </div>

              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-wine font-bold block">Listening Habits</span>
                <span className="text-base italic font-display text-ink mt-1 block font-medium truncate max-w-[220px]">
                  {formData.selectedHabits?.join(", ")}
                </span>
              </div>

              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-wine font-bold block">Origin Country</span>
                <span className="text-base italic font-display text-ink mt-1 block font-medium">
                  {formData.personalDetails?.country}
                </span>
              </div>

              <div>
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-wine font-bold block">Lyric Choices</span>
                <span className="text-base italic font-display text-ink mt-1 block font-medium truncate max-w-[220px]">
                  {formData.selectedLyrics?.join(", ")}
                </span>
              </div>
            </div>

          </div>

          {/* Continue button */}
          <div className="pt-4 flex justify-start">
            <button
              onClick={() => setOnboardingStep(2)}
              className="bg-wine hover:bg-wine/90 text-white px-12 py-4.5 transition-all font-sans text-xs uppercase tracking-widest cursor-pointer font-bold rounded-full shadow-lg"
            >
              Continue →
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}