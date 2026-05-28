import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitHero, CreamSection, SectionLabel, WineButton, HairlineRule } from "@/components/SplitShell";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — FREQUENCE" },
      { name: "description", content: "How FREQUENCE turns your listening into a song — step by step." },
      { property: "og:title", content: "How It Works — FREQUENCE" },
      { property: "og:description", content: "Know it, explore it." },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  { n: "01", t: "Connect", d: "Link Spotify, Apple Music, or Amazon. We pull your top artists, recent plays, and saved tracks — nothing more." },
  { n: "02", t: "Analyse", d: "We translate your taste into a brief — tempo, instrumentation, mood arc, lyrical register — a kind of musical fingerprint." },
  { n: "03", t: "Compose", d: "Our model writes an original three-minute piece against that brief. No samples, no covers — a new song, written to fit you." },
  { n: "04", t: "Listen", d: "Stream it, download the master, or share a one-of-one link. The composition is yours." },
];

function HowItWorks() {
  return (
    <>
      <Nav />
      <div className="pt-16">
        <SplitHero
          kicker="Chapter IV"
          word="HOW IT WORKS"
          tagline="know it, explore it"
        />

        <CreamSection>
          <div className="max-w-3xl mx-auto">
            <SectionLabel>§ The method, in four movements</SectionLabel>

            <div>
              {STEPS.map((s, i) => (
                <div key={s.n}>
                  <div className="grid grid-cols-[80px_1fr] gap-10 items-baseline py-12">
                    <span className="font-mono text-sm caps-wide text-[var(--wine)] tabular">{s.n}</span>
                    <div>
                      <h3 className="font-display font-light text-4xl md:text-5xl leading-tight mb-4">{s.t}</h3>
                      <p className="text-base md:text-lg leading-relaxed text-[var(--ink)]/75 max-w-xl">{s.d}</p>
                    </div>
                  </div>
                  {i < STEPS.length - 1 && <hr className="border-0 border-t border-[var(--ink)]/15" />}
                </div>
              ))}
            </div>
          </div>
        </CreamSection>

        <ContactForm />
      </div>
    </>
  );
}

function ContactForm() {
  return (
    <section className="bg-[var(--ivory)] text-[var(--ink)] py-32 px-8 border-t border-[var(--ink)]/10">
      <div className="max-w-2xl mx-auto">
        <SectionLabel>§ Questions, in confidence</SectionLabel>
        <h2 className="font-display font-light text-4xl md:text-5xl leading-tight mb-16">
          Write to us. <em className="italic">We answer every letter.</em>
        </h2>

        <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>
          <HairlineField label="Email" type="email" placeholder="your@address" />

          <div>
            <label className="block font-mono text-[10px] caps-wide text-[var(--ink)]/60 mb-3">Message</label>
            <textarea
              rows={4}
              placeholder="A thought, a question, a recommendation…"
              className="w-full bg-transparent border-0 border-b border-[var(--ink)]/30 focus:border-[var(--wine)] outline-none py-3 font-display italic text-xl resize-none transition-colors"
            />
          </div>

          <div className="pt-4">
            <WineButton type="submit">Send</WineButton>
          </div>
        </form>
      </div>
    </section>
  );
}

function HairlineField({ label, type = "text", placeholder }: { label: string; type?: string; placeholder?: string }) {
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
