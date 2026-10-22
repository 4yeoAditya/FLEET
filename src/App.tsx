import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero, Marquee } from "./components/sections/Hero";
import { Stats } from "./components/sections/Stats";
import { HowItWorks } from "./components/sections/HowItWorks";
import { FleetCarousel } from "./components/sections/FleetCarousel";
import { Comparison } from "./components/sections/Comparison";
import { Plans } from "./components/sections/Plans";
import { FAQ } from "./components/sections/FAQ";
import { Contact } from "./components/sections/Contact";
import { SectionHeading } from "./components/ui/SectionHeading";
import { DispatchSimulator } from "./components/interactive/DispatchSimulator";
import { OpsConsoleDemo } from "./components/interactive/OpsConsoleDemo";
import { RiderAppDemo } from "./components/interactive/RiderAppDemo";
import { RoadmapTimeline } from "./components/interactive/RoadmapTimeline";

const SECTION_IDS = [
  "overview",
  "stats",
  "how",
  "fleet",
  "dispatch",
  "compare",
  "ops",
  "plans",
  "rider",
  "roadmap",
  "faq",
  "contact",
];

const RIDER_PERKS = [
  ["Fixed monthly salary", "No per-drop gambling. Pay is predictable, so riders stay."],
  ["Guaranteed assignment", "Orders arrive automatically. No bidding, no waiting on a map."],
  ["Zone geofence", "The app keeps riders inside their 3 km micro-zone."],
  ["Battery-aware", "Low battery pauses new orders and points to the nearest charging bay."],
  ["On-time bonus", "Hit the delivery window and the bonus is added to the shift summary."],
];

function Shell({ id, className, children }: { id: string; className: string; children: ReactNode }) {
  return (
    <section id={id} className={`${className} scroll-mt-16 px-6 py-20 md:py-28`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function App() {
  const [currentTab, setCurrentTab] = useState("overview");

  const goTo = useCallback((id: string) => {
    setCurrentTab(id);
    const el = document.getElementById(id);
    if (!el) return;
    const top = id === "overview" ? 0 : el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  // Scroll-spy so the navbar highlights the section in view.
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrentTab(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <Navbar currentTab={currentTab} setCurrentTab={goTo} />

      <main className="flex-grow">
        <Hero onDemo={() => goTo("dispatch")} onPlans={() => goTo("plans")} />
        <Marquee />
        <Stats />
        <HowItWorks />
        <FleetCarousel />

        {/* Dispatch engine */}
        <Shell id="dispatch" className="bg-cobalt">
          <SectionHeading eyebrow="Dispatch engine" title="Guaranteed auto-assign. No open auctions." tone="dark">
            Step through the engine: set the pickup, build the candidate pool, score and rank, then lock the
            assignment. Riders outside the 3&nbsp;km zone or under 20% battery never make the shortlist.
          </SectionHeading>
          <DispatchSimulator />
        </Shell>

        <Comparison />

        {/* Ops console */}
        <Shell id="ops" className="bg-tiles">
          <SectionHeading eyebrow="Ops console" title="One board. Every rider, every zone.">
            Supervisors see live status, battery and order counts at a glance. Filter by state, open a rider and
            rebalance the zone before a delivery slips.
          </SectionHeading>
          <OpsConsoleDemo />
        </Shell>

        <Plans onSeeAll={() => goTo("contact")} />

        {/* Rider app */}
        <Shell id="rider" className="bg-cobalt">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
            <div>
              <SectionHeading eyebrow="Rider app" title="Built for the shift, not the hustle." tone="dark">
                Riders start a shift, get assigned work and deliver. Tap through the phone to see the whole flow.
              </SectionHeading>
              <ul className="grid gap-4 sm:grid-cols-2">
                {RIDER_PERKS.map(([title, body], i) => (
                  <li
                    key={title}
                    className="rounded-3xl border-2 border-ink bg-cream p-5 shadow-[5px_5px_0_#15120f]"
                  >
                    <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-sun font-display text-xs">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-base uppercase leading-tight text-cobalt">{title}</h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed">{body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <RiderAppDemo />
          </div>
        </Shell>

        {/* Roadmap */}
        <Shell id="roadmap" className="bg-tiles">
          <SectionHeading eyebrow="Roadmap" title="From one zone to a whole city.">
            Each phase is gated on unit economics. Open a phase to see what ships and what it unlocks.
          </SectionHeading>
          <RoadmapTimeline />
        </Shell>

        <FAQ />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
