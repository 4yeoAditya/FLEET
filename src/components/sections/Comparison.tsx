import { SectionHeading } from "../ui/SectionHeading";
import { Sticker } from "../ui/Sticker";

const LEGACY = [
  "25–30% commission squeeze on merchants",
  "High-attrition gig workers and open auctions",
  "City-wide sprawl with unpredictable times",
  "Fragmented internal-combustion vehicles",
  "Per-order bounties that reward rushing",
  "ETAs that swing with rider supply",
];

const FLEET = [
  "Fixed monthly salaried workforce",
  "100% company-owned EV fleet (lower TCO)",
  "Guaranteed assignment algorithm",
  "Strict 3 km micro-radius guarantees",
  "Salary plus safety and punctuality bonus",
  "ETAs you can promise to customers",
];

export function Comparison() {
  return (
    <section id="compare" className="bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Structural comparison" title="Aggregator vs fleet infrastructure">
          Same order, same customer, very different economics. Here is what
          changes when you own the wheels.
        </SectionHeading>

        <div className="relative grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border-2 border-ink bg-cream p-8 shadow-[6px_6px_0_#121218] md:p-10">
            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-tomato">
              Legacy paradigm
            </span>
            <h3 className="mb-8 font-display text-3xl uppercase">
              Standard aggregator
            </h3>
            <ul className="space-y-5 font-mono text-sm">
              {LEGACY.map((t, i) => (
                <li
                  key={t}
                  className="flex gap-4 border-b border-ink/15 pb-4 text-ink/80"
                >
                  <span className="font-display text-tomato">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border-2 border-ink bg-cobalt p-8 text-cream shadow-[6px_6px_0_#121218] md:p-10">
            <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-sun">
              Owned infrastructure
            </span>
            <h3 className="mb-8 font-display text-3xl uppercase text-sun">
              Dedicated fleet
            </h3>
            <ul className="space-y-5 font-mono text-sm">
              {FLEET.map((t, i) => (
                <li
                  key={t}
                  className="flex gap-4 border-b border-cream/25 pb-4"
                >
                  <span className="font-display text-sun">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <Sticker
            text="Own the wheels"
            bg="#f7d44a"
            ring="#121218"
            size={110}
            className="animate-spin-slow absolute -top-8 left-1/2 hidden -translate-x-1/2 md:block"
          />
        </div>
      </div>
    </section>
  );
}
