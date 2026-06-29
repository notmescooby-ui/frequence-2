import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
  Nav,
  SplitHero,
  CreamSection,
} from "@/components/SplitShell";

// Import artist image assets
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
import billieEilishImg from "@/assets/billie-eilish-img.png";
import articMonekyImg from "@/assets/artic-moneky-img.png";
import newwestimg from "@/assets/new-west.png";
import stephenSancheziImg from "@/assets/stephen-sanchez.png";
import macmillerimg from "@/assets/mac-miller.png";
import daftpunkimg from "@/assets/daft-punk.png";
import louisTomlinsonImg from "@/assets/louis-tomlinson.png";
import billyJoelImg from "@/assets/billy-joel.png";
import oliviaRodrigoImg from "@/assets/olivia-rodrigo.png";
import cageTheElephantImg from "@/assets/cage-the-elephant.png";
import lucyimg from "@/assets/lucy-dacus.png";
import btsimg from "@/assets/bts.png";
import noahimg from "@/assets/noah-kahan.png";
import conanimg from "@/assets/conan-gray.png";
export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — FREQUENCE" },
      { name: "description", content: "Enter your details and choose your style." },
    ],
  }),
  component: Login,
});

const countriesList = [
  "Australia", "Austria", "Belgium", "Brazil", "Canada", "Denmark", "Finland", "France", "Germany",
  "India", "Ireland", "Italy", "Japan", "Mexico", "Netherlands", "New Zealand", "Norway",
  "Singapore", "South Africa", "Spain", "Sweden", "Switzerland", "United Kingdom", "United States"
];

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
  { name: "Sean Paul", img: seanPaulImg },
  { name: "BTS", img: btsimg },
  { name: "Billie Eilish", img: billieEilishImg } 
];

const lyricsList = [
  {
    song: "Those Eyes",
    artist: "New West",
    lyric: "Every \"hi\", every \"bye\",\nevery \"I love you\" you've ever said\n\n'Cause all of the small things that you do\nare what remind me why I fell for you",
    art: newwestimg,
    bg: "#32231A"
  },
  {
    song: "Until I Found You",
    artist: "Stephen Sanchez",
    lyric: "I would never fall in love again\nuntil I found you\n\nI said I would never fall\nunless it's you I fall into\n\nI was lost within the darkness,\nbut then I found you",
    art: stephenSancheziImg,
    bg: "#202A36"
  },
  {
    song: "Good News",
    artist: "Mac Miller",
    lyric: "I spent the whole day in my head",
    art: macmillerimg,
    bg: "#1B2A25"
  },
  {
    song: "Something About Us",
    artist: "Daft Punk",
    lyric: "I'll miss you more than anyone in my life\n\nI love you more than anyone in my life",
    art: daftpunkimg,
    bg: "#3B3527"
  },
  {
    song: "Limerence",
    artist: "Lucy Dacus",
    lyric: "If I stay busy,\nmaybe I'll forget how I feel",
    art: lucyimg,
    bg: "#2A1F2C"
  },
  {
    song: "Do I Wanna Know?",
    artist: "Arctic Monkeys",
    lyric: "'Cause there's this tune I found\nthat makes me think of you somehow\n\nAnd I play it on repeat\nuntil I fall asleep",
    art: articMonekyImg,
    bg: "#1A1A1A"
  },
  {
    song: "Don't Let It Break Your Heart",
    artist: "Louis Tomlinson",
    lyric: "'Cause life gets hard\nand it gets messed up\n\nWhen you give so much\nand it's not enough\n\nWhen you love someone\nand they let you go",
    art: louisTomlinsonImg,
    bg: "#3D2B24"
  },
  {
    song: "Perfect",
    artist: "One Direction",
    lyric: "And if you like midnight driving\nwith the windows down\n\nAnd if you like going places\nwe can't even pronounce\n\nThen baby, you're perfect",
    art: oneDirectionImg,
    bg: "#1D2833"
  },
  {
    song: "Cigarette Daydreams",
    artist: "Cage The Elephant",
    lyric: "You can drive all night\n\nLooking for the answers\nin the pouring rain",
    art: cageTheElephantImg,
    bg: "#2C3531"
  },
  {
    song: "Vienna",
    artist: "Billy Joel",
    lyric: "Take the phone off the hook\nand disappear for a while\n\nIt's alright,\nyou can afford to lose a day or two",
    art: billyJoelImg,
    bg: "#332B3C"
  },
  {
    song: "So American",
    artist: "Olivia Rodrigo",
    lyric: "He's like a poem\nI wish I wrote",
    art: oliviaRodrigoImg,
    bg: "#3B1E2B"
  },
  {
    song: "Sign of the Times",
    artist: "Harry Styles",
    lyric: "We don't talk enough,\nwe should open up\n\nBefore it's all too much",
    art: harryStylesImg,
    bg: "#252B35"
  },
  {
    song: "Your needs, my needs",
    artist: "Noah Kahan",
    lyric: "You asked me why I\nwasn't saying a word\nI'm naming the stars in the sky\nafter you",
    art: noahimg,
    bg: "#84573D"
  },
  {
    song: "People Watching",
    artist: "Conan Gray",
    lyric: "But i cut people out\nlike tags on my clothing\nI end up all alone\nbut I still keep hoping",
    art: conanimg,
    bg: "#221A22"
  }

];

const personalitiesList = [
  "Midnight drives",
  "Late night overthinking",
  "First love butterflies",
  "Healing after heartbreak",
  "Dreaming about the future",
  "Escaping reality",
  "Living for adventure",
  "Chasing ambition",
  "Windows down, music loud",
  "Watching the sunset",
  "Dancing in your room",
  "Singing at the top of your lungs"
];

const habitsList = [
  "Studying",
  "Travelling",
  "Driving",
  "Gym",
  "Sleeping",
  "Working",
  "Drawing",
  "Bad Days",
  "Lying awake at 2 AM",
  "Quiet evenings alone",
  "Watching the rain",
  "Cleaning the house",
];

function Login() {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Profile Form States
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    phone: "",
    country: "",
  });
  const [countryQuery, setCountryQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedLyrics, setSelectedLyrics] = useState<string[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<string[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

  // Load from LocalStorage if pre-filled (saves form state when redirecting back from OAuth)
  useEffect(() => {
    const cached = localStorage.getItem("frequence_user_form");
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (parsed.personalDetails) setPersonalDetails(parsed.personalDetails);
        if (parsed.personalDetails?.country) setCountryQuery(parsed.personalDetails.country);
        if (parsed.selectedArtists) setSelectedArtists(parsed.selectedArtists);
        if (parsed.selectedLyrics) setSelectedLyrics(parsed.selectedLyrics);
        if (parsed.selectedPersonality) setSelectedPersonality(parsed.selectedPersonality);
        if (parsed.selectedHabits) setSelectedHabits(parsed.selectedHabits);
      } catch (e) {
        console.error("Failed to parse cached questionnaire state:", e);
      }
    }
  }, []);

  // Autosave current questionnaire options to localStorage
  useEffect(() => {
    const payload = {
      personalDetails,
      selectedArtists,
      selectedLyrics,
      selectedPersonality,
      selectedHabits,
    };
    localStorage.setItem("frequence_user_form", JSON.stringify(payload));
  }, [personalDetails, selectedArtists, selectedLyrics, selectedPersonality, selectedHabits]);

  // Handle country list click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async (provider: "google" | "spotify") => {
    try {
      if (provider === "spotify") {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "spotify",
          options: {
            scopes:
              "playlist-read-private playlist-read-collaborative user-library-read user-top-read user-read-recently-played",
            redirectTo: `${window.location.origin}/lab`,
          },
        });

        if (error) throw error;
        return;
      }

      if (provider === "google") {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: `${window.location.origin}/onboarding`,
          },
        });

        if (error) throw error;
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleContinue = () => {
    if (!personalDetails.name || !personalDetails.country) {
      alert("Please enter both your name and country under Personal Details.");
      return;
    }
    if (selectedArtists.length === 0 || selectedArtists.length > 5) {
      alert("Please select the artist that healed you or the artists you vibe with");
      return;
    }
    if (selectedLyrics.length === 0 || selectedLyrics.length > 5) {
      alert("Please select the lyrics that speaks to you, the emotions that connects you");
      return;
    }
    if (selectedPersonality.length !== 3) {
      alert("Please select the emotional situations you listen to your music in");
      return;
    }
    if (selectedHabits.length === 0) {
      alert("Please select the situations that surround your music listening experience");
      return;
    }

    // Go to onboarding summary screen
    navigate({ to: "/onboarding" });
  };

  const selectArtist = (name: string) => {
    setSelectedArtists((prev) => {
      if (prev.includes(name)) return prev.filter((a) => a !== name);
      if (prev.length < 5) return [...prev, name];
      return prev;
    });
  };

  const toggleLyric = (song: string) => {
    setSelectedLyrics((prev) => {
      if (prev.includes(song)) return prev.filter((s) => s !== song);
      if (prev.length < 5) return [...prev, song];
      return prev;
    });
  };

  const togglePersonality = (item: string) => {
    setSelectedPersonality((prev) => {
      if (prev.includes(item)) return prev.filter((i) => i !== item);
      if (prev.length < 3) return [...prev, item];
      return prev;
    });
  };

  const toggleHabit = (item: string) => {
    setSelectedHabits((prev) => {
      if (prev.includes(item)) return prev.filter((i) => i !== item);
      return [...prev, item];
    });
  };

  const filteredCountries = countriesList.filter((c) =>
    c.toLowerCase().includes(countryQuery.toLowerCase())
  );

  return (
    <>
      <Nav />

      <div className="pt-16">
        <SplitHero
          kicker="Chapter V"
          word="LOGIN"
          tagline="enter a world where listeners become creators"
        />

        <CreamSection className="space-y-24">
          <div className="max-w-4xl mx-auto space-y-24 relative z-10">

            {/* SCREEN 1: AUTHENTICATION & DETAILS */}
            <section className="space-y-12 border-b border-ink/10 pb-16">
              <div className="text-center space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine font-bold">Screen 01</span>
                <h2 className="font-display italic text-4xl md:text-5xl font-bold tracking-tight text-ink">
                  Enter FREQUENCE
                </h2>
                <p className="font-sans text-sm text-ink/60 max-w-sm mx-auto leading-relaxed font-medium">
                  Connect your account to begin building your musical identity.
                </p>
              </div>

              {/* Login buttons */}
              <div className="max-w-sm mx-auto space-y-4">
                <button
                  onClick={() => handleLogin("spotify")}
                  className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white border-0 px-8 py-4.5 transition-all font-sans text-sm uppercase tracking-widest cursor-pointer font-bold shadow-md rounded-full flex items-center justify-center gap-3 animate-pulse"
                  style={{ animationDuration: "3s" }}
                  title="Connect with Spotify (Recommended)"
                >
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.076-.336.135-.668.47-.743 3.856-.88 7.15-.503 9.822 1.13.295.18.387.563.205.858zm1.225-2.72c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.674-1.115 8.243-.57 11.35 1.343.366.226.486.707.258 1.07zm.105-2.81c-3.26-1.937-8.636-2.115-11.75-.85-.5.152-1.025-.135-1.176-.635-.152-.5.135-1.025.635-1.176 3.608-1.096 9.537-.887 13.29 1.342.45.267.6.845.333 1.295-.266.45-.844.6-1.294.333z" />
                  </svg>
                  Continue with Spotify
                </button>

                <button
                  onClick={() => handleLogin("google")}
                  className="w-full bg-white hover:bg-black/[0.02] text-ink border border-ink/20 px-8 py-4.5 transition-all font-sans text-sm uppercase tracking-widest cursor-pointer font-bold shadow-sm rounded-full flex items-center justify-center gap-3"
                  title="Connect with Google"
                >
                  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.478 0-6.3-2.823-6.3-6.3s2.822-6.3 6.3-6.3c1.63 0 3.106.625 4.225 1.644l3.053-3.053C19.336 2.766 15.992 1.5 12.24 1.5 6.033 1.5 1 6.533 1 12.75s5.033 11.25 11.24 11.25c6.26 0 11.5-4.437 11.5-11.25 0-.743-.075-1.425-.2-2.015H12.24z" />
                  </svg>
                  Continue with Google
                </button>
              </div>

              {/* Personal Details Form */}
              <div className="space-y-8 max-w-lg mx-auto pt-6 text-left">
                <h3 className="font-display italic text-2xl font-bold text-wine">A Few Particulars</h3>

                <div className="space-y-2">
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-ink/50 font-bold">Name</label>
                  <input
                    type="text"
                    value={personalDetails.name}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-0 border-b border-ink/20 focus:border-wine outline-none py-3 font-display italic text-2xl transition-colors focus:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-ink/50 font-bold">Phone Number</label>
                  <input
                    type="tel"
                    value={personalDetails.phone}
                    onChange={(e) => setPersonalDetails({ ...personalDetails, phone: e.target.value })}
                    placeholder="+91 00000 00000"
                    className="w-full bg-transparent border-0 border-b border-ink/20 focus:border-wine outline-none py-3 font-display italic text-2xl transition-colors focus:ring-0"
                  />
                </div>

                <div className="space-y-2 relative" ref={dropdownRef}>
                  <label className="block font-sans text-[10px] uppercase tracking-widest text-ink/50 font-bold">Country</label>
                  <input
                    type="text"
                    value={countryQuery}
                    onChange={(e) => {
                      setCountryQuery(e.target.value);
                      setPersonalDetails({ ...personalDetails, country: e.target.value });
                      setDropdownOpen(true);
                    }}
                    onFocus={() => setDropdownOpen(true)}
                    placeholder="Search country..."
                    className="w-full bg-transparent border-0 border-b border-ink/20 focus:border-wine outline-none py-3 font-display italic text-2xl transition-colors focus:ring-0"
                  />
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 max-h-48 overflow-y-auto bg-ivory border border-ink/10 shadow-lg mt-1 z-50">
                      {filteredCountries.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setPersonalDetails({ ...personalDetails, country: c });
                            setCountryQuery(c);
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-black/5 font-sans text-sm text-ink transition-colors cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                      {filteredCountries.length === 0 && (
                        <div className="px-4 py-3 text-xs text-ink/40 font-sans italic">No results</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* SECTION 2: ARTIST VINYL PICKER */}
            <section className="space-y-8 border-b border-ink/10 pb-16 text-left">
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine font-bold">Section 02</span>
                <h3 className="font-display italic text-3xl md:text-4xl font-bold tracking-tight text-ink">
                  Choose The Artists You Return To
                </h3>
                <p className="font-sans text-xs text-ink/50">Select up to 5 records. Selected: {selectedArtists.length}/5</p>
              </div>

              {/* Horizontal Scrollable vinyl shelf */}
              <div className="flex overflow-x-auto gap-6 pb-6 pt-4 scrollbar-thin scrollbar-thumb-wine/20">
                {artistList.map((artist) => {
                  const isSelected = selectedArtists.includes(artist.name);
                  return (
                    <button
                      key={artist.name}
                      onClick={() => selectArtist(artist.name)}
                      className="flex-shrink-0 group focus:outline-none cursor-pointer"
                    >
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        {/* Spinning vinyl record disk */}
                        <div
                          className="absolute w-34 h-34 rounded-full bg-[#111] shadow flex items-center justify-center transition-all duration-700 pointer-events-none group-hover:rotate-[20deg] group-hover:translate-x-6"
                          style={{
                            transform: isSelected
                              ? "translateX(36px) rotate(45deg)"
                              : "translateX(0px) rotate(0deg)",
                            zIndex: 1,
                            border: "1px solid rgba(255,255,255,0.06)"
                          }}
                        >
                          <div className="w-20 h-20 rounded-full border border-white/5 flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-[#222] border border-white/10" />
                          </div>
                        </div>

                        {/* Sleeved Art jacket cover */}
                        <div
                          className="relative w-36 h-36 flex flex-col justify-end overflow-hidden transition-all duration-500 rounded border bg-black"
                          style={{
                            zIndex: 2,
                            borderColor: isSelected ? "var(--wine)" : "rgba(26,26,26,0.1)",
                            borderWidth: isSelected ? "2px" : "1px",
                            transform: isSelected ? "translateY(-10px) scale(1.03)" : "translateY(0px) scale(1)",
                            boxShadow: isSelected ? "0 0 15px rgba(155,77,94,0.3)" : "0 4px 6px rgba(0,0,0,0.04)"
                          }}
                        >
                          <img
                            src={artist.img}
                            alt={artist.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-80 transition-all duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-wine text-white text-[8px] font-mono px-2 py-0.5 uppercase tracking-wider rounded-sm z-30 shadow-sm">
                              Selected
                            </div>
                          )}

                          <div className="relative z-10 p-3 text-left">
                            <span className="font-display font-semibold text-sm tracking-tight text-white leading-tight">
                              {artist.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 3: LYRIC PICKER */}
            <section className="space-y-8 border-b border-ink/10 pb-16 text-left">
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine font-bold">Section 03</span>
                <h3 className="font-display italic text-3xl md:text-4xl font-bold tracking-tight text-ink">
                  Lyric Picker
                </h3>
                <p className="font-sans text-xs text-ink/50">Choose up to 5 lyric cards that represent your preferences. Selected: {selectedLyrics.length}/5</p>
              </div>

              {/* Spotify style cards list */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                {lyricsList.map((card) => {
                  const isSelected = selectedLyrics.includes(card.song);
                  return (
                    <button
                      key={card.song}
                      onClick={() => toggleLyric(card.song)}
                      className={`text-left p-6 rounded-lg transition-all duration-500 cursor-pointer flex flex-col justify-between h-[360px] relative select-none ${isSelected
                        ? "ring-4 ring-wine shadow-[0_0_20px_rgba(155,77,94,0.25)] scale-[1.02] z-10"
                        : "hover:scale-[1.01] hover:brightness-105"
                        }`}
                      style={{ backgroundColor: card.bg }}
                    >
                      <div className="flex gap-3 items-center">
                        <img
                          src={card.art}
                          alt={card.song}
                          className="w-10 h-10 rounded object-cover border border-white/10"
                        />
                        <div className="min-w-0">
                          <h4 className="font-sans font-bold text-xs text-white truncate leading-snug">{card.song}</h4>
                          <p className="font-sans text-[10px] text-white/50 truncate mt-0.5">{card.artist}</p>
                        </div>
                      </div>

                      <p className="font-display italic text-base md:text-[17px] text-white leading-relaxed whitespace-pre-line my-auto pr-2">
                        {card.lyric}
                      </p>

                      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-4">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.075-.668-.135-.744-.47-.076-.336.135-.668.47-.743 3.856-.88 7.15-.503 9.822 1.13.295.18.387.563.205.858zm1.225-2.72c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.847-.107-.972-.52-.125-.413.107-.847.52-.972 3.674-1.115 8.243-.57 11.35 1.343.366.226.486.707.258 1.07zm.105-2.81c-3.26-1.937-8.636-2.115-11.75-.85-.5.152-1.025-.135-1.176-.635-.152-.5.135-1.025.635-1.176 3.608-1.096 9.537-.887 13.29 1.342.45.267.6.845.333 1.295-.266.45-.844.6-1.294.333z" />
                          </svg>
                          <span className="font-sans font-bold text-[8px] uppercase tracking-widest text-white/50">Spotify</span>
                        </div>
                        {isSelected && (
                          <span className="font-mono text-[8px] text-wine bg-wine/10 border border-wine px-2 py-0.5 rounded font-bold uppercase">
                            Selected
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 4: MUSIC PERSONALITY */}
            <section className="space-y-8 border-b border-ink/10 pb-16 text-left">
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine font-bold">Section 02</span>
                <h3 className="font-display italic text-3xl md:text-4xl font-bold tracking-tight text-ink">
                  What sounds most like you?
                </h3>
                <p className="font-sans text-xs text-ink/50">Choose exactly 3. Selected: {selectedPersonality.length}/3</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {personalitiesList.map((item) => {
                  const isSelected = selectedPersonality.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => togglePersonality(item)}
                      className={`px-8 py-5 border font-display italic text-lg transition-all duration-300 cursor-pointer ${isSelected
                        ? "border-wine bg-wine/10 text-wine shadow-[0_0_15px_rgba(155,77,94,0.1)] font-semibold"
                        : "border-ink/10 hover:border-ink/20 hover:bg-black/[0.01] text-ink/75"
                        }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SECTION 5: LISTENING HABITS */}
            <section className="space-y-8 border-b border-ink/10 pb-16 text-left">
              <div className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-wine font-bold">Section 05</span>
                <h3 className="font-display italic text-3xl md:text-4xl font-bold tracking-tight text-ink">
                  Where do you usually find music?
                </h3>
                <p className="font-sans text-xs text-ink/50">Select all that apply.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                {habitsList.map((habit) => {
                  const isSelected = selectedHabits.includes(habit);
                  return (
                    <button
                      key={habit}
                      onClick={() => toggleHabit(habit)}
                      className={`p-6 border font-sans text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer font-bold ${isSelected
                        ? "border-wine bg-wine/10 text-wine"
                        : "border-ink/10 hover:border-ink/20 hover:bg-black/[0.01] text-ink/70"
                        }`}
                    >
                      {habit}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* SUBMIT/CONTINUE BUTTON */}
            <div className="pt-8 text-center max-w-sm mx-auto">
              <button
                onClick={handleContinue}
                className="w-full bg-wine hover:bg-wine/90 text-white px-10 py-5 transition-all font-sans text-xs uppercase tracking-widest cursor-pointer font-bold rounded-full shadow-lg"
              >
                Compile and Continue →
              </button>
            </div>

          </div>
        </CreamSection>
      </div>
    </>
  );
}
