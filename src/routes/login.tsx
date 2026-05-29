import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, SplitHero, CreamSection, SectionLabel, WineButton } from "@/components/SplitShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — FREQUENCE" },
      { name: "description", content: "Sign in to FREQUENCE." },
      { property: "og:title", content: "Login — FREQUENCE" },
      { property: "og:description", content: "Sign in into a world of musical AI." },
    ],
  }),
  component: Login,
});

function Login() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [account, setAccount] = useState("Spotify");

  function setDigit(i: number, v: string) {
    const next = [...otp];
    next[i] = v.replace(/\D/g, "").slice(-1);
    setOtp(next);
  }

  return (
    <>
      <Nav />
      <div className="pt-16">
        <SplitHero
          kicker="Chapter V"
          word="LOGIN"
          tagline="sign in into a world of musical AI"
        />

        <CreamSection>
          <div className="max-w-xl mx-auto">
            <SectionLabel>§ Your particulars</SectionLabel>

            <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
              <Field label="Name" placeholder="As it appears on your records" />
              <Field label="Email" type="email" placeholder="your@address" />
              <Field label="Phone" type="tel" placeholder="+1 555 0100" />

              <div>
                <label className="block font-mono text-[10px] caps-wide text-[var(--ink)]/60 mb-4">One-time code</label>
                <div className="flex gap-6">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      value={d}
                      onChange={(e) => setDigit(i, e.target.value)}
                      maxLength={1}
                      className="w-12 h-12 rounded-full border border-[var(--ink)]/40 bg-transparent text-center font-display text-xl focus:border-[var(--wine)] focus:outline-none transition-colors tabular"
                    />
                  ))}
                </div>
              </div>

              <Field label="Age" type="number" placeholder="—" />

              <div>
                <label className="block font-mono text-[10px] caps-wide text-[var(--ink)]/60 mb-4">Account type</label>
                <div className="flex flex-wrap gap-3">
                  {["Spotify", "Apple Music", "Amazon Music"].map((opt) => {
                    const active = account === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAccount(opt)}
                        className={`font-mono text-[11px] caps-wide px-5 py-2 border transition-colors duration-300 ${
                          active
                            ? "bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)]"
                            : "border-[var(--ink)]/30 text-[var(--ink)] hover:border-[var(--ink)]"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6">
                <WineButton to="/lab" full>Enter FREQUENCE</WineButton>
              </div>

              <p className="font-display italic text-center text-[var(--ink)]/55 pt-4">
                By signing in, you accept the quiet terms of listening.
              </p>
            </form>
          </div>
        </CreamSection>
      </div>
    </>
  );
}

function Field({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="block font-mono text-[10px] caps-wide text-[var(--ink)]/60 mb-3">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b border-[var(--ink)]/30 focus:border-[var(--wine)] outline-none py-3 font-display italic text-xl transition-colors"
      />
    </div>
  );
}
