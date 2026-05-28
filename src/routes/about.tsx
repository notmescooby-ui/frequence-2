import { createFileRoute } from "@tanstack/react-router";
import { Nav, SplitHero, CreamSection, SectionLabel, HairlineRule } from "@/components/SplitShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FREQUENCE" },
      { name: "description", content: "FREQUENCE is a study in listening — an editorial AI that turns your taste into composition." },
      { property: "og:title", content: "About — FREQUENCE" },
      { property: "og:description", content: "Know more, sing more." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <Nav />
      <div className="pt-16">
        <SplitHero
          kicker="Chapter II"
          word="ABOUT US"
          tagline="know more, sing more"
        />

        <CreamSection>
          <div className="max-w-3xl mx-auto">
            <SectionLabel>§ A short statement</SectionLabel>

            <p className="font-display font-light text-3xl md:text-4xl leading-tight mb-12">
              FREQUENCE began as a question. <em className="italic">What does a year of listening sound like, when you give it back to itself?</em>
            </p>

            <HairlineRule />

            <p className="text-base md:text-lg leading-relaxed text-[var(--ink)]/80 mb-8">
              We are a small studio of producers, engineers, and writers who believe taste is a form of authorship. Every song you return to, every artist you save at 2am, every chorus you skip — together they describe a sensibility. FREQUENCE listens to that sensibility, and answers it with a song that did not exist before you did.
            </p>

            <p className="text-base md:text-lg leading-relaxed text-[var(--ink)]/80 mb-12">
              The result is not a recommendation. It is a composition — three to four minutes of original music, written to fit the room only you live in.
            </p>

            <HairlineRule />

            <div className="grid grid-cols-2 gap-12 font-mono text-[10px] caps-wide text-[var(--ink)]/60">
              <div>
                <p className="text-[var(--wine)] mb-2">Founded</p>
                <p className="text-[var(--ink)] text-sm">MMXXVI · Paris / Brooklyn</p>
              </div>
              <div>
                <p className="text-[var(--wine)] mb-2">Made for</p>
                <p className="text-[var(--ink)] text-sm">Listeners, not users</p>
              </div>
            </div>
          </div>
        </CreamSection>
      </div>
    </>
  );
}
