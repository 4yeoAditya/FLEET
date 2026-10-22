import { useState } from "react";
import { SectionHeading } from "../ui/SectionHeading";
import { PlusIcon } from "../ui/Art";

const ITEMS = [
  {
    q: "How is this different from a delivery aggregator?",
    a: "Aggregators take a 25–30% commission and route orders through an open auction of gig workers. Fleet runs salaried riders on company-owned EVs and assigns every order automatically, so merchants pay for delivery capacity, not for a percentage of every basket.",
  },
  {
    q: "What does the 3 km micro-zone guarantee actually mean?",
    a: "Every pickup is served by riders operating inside a fixed 3 km radius. Riders outside the zone are excluded from the candidate pool before scoring, which keeps delivery times predictable and stops city-wide sprawl.",
  },
  {
    q: "How does the dispatch engine pick a rider?",
    a: "It builds a candidate pool of in-zone riders with at least 20% battery, scores each one on distance (60%) and battery (40%), then locks the highest score. There is no bidding and no rider can decline into a re-auction. Try it in the simulator above.",
  },
  {
    q: "Who owns the vehicles?",
    a: "Fleet does. Owning a single standardised EV model keeps maintenance, battery swaps and insurance predictable, and lowers total cost of ownership compared with a mixed fleet of personal petrol bikes.",
  },
  {
    q: "Are riders employees or gig workers?",
    a: "Riders are paid a fixed monthly salary for scheduled shifts, with an on-time bonus on top. Predictable pay is what drives retention and the consistent service quality merchants see.",
  },
  {
    q: "How long does it take to launch a new zone?",
    a: "A pilot zone is sized around one dense 3 km area: onboard merchants, hire and train a shift roster, stage the EVs and a charging bay, then switch on auto-assign. See the roadmap for how pilots grow into a multi-zone city network.",
  },
  {
    q: "What happens when a rider's battery runs low?",
    a: "Riders under 20% are removed from new assignments automatically and routed to the nearest charging bay. The Ops Console flags them in red so supervisors can rebalance the zone.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="faq" className="bg-cream px-6 py-20 md:py-28 scroll-mt-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="FAQ" title={<>Questions, answered.</>}>
            The short version of how Fleet works, who it is for and what to expect on day one.
          </SectionHeading>
        </div>

        <ul className="space-y-4">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className={`rounded-3xl border-2 border-ink shadow-[5px_5px_0_#15120f] transition-colors ${
                  isOpen ? "bg-sun" : "bg-paper"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                >
                  <span className="font-display text-lg uppercase leading-tight md:text-xl">{item.q}</span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-cream transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>
                {isOpen && (
                  <p className="px-5 pb-6 font-mono text-sm leading-relaxed md:px-6 md:text-[15px]">{item.a}</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
