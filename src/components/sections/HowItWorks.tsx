import { SectionHeading } from "../ui/SectionHeading";

const STEPS = [
  {
    n: "01",
    title: "Pickup set",
    body: "A merchant order arrives and the pickup point is pinned. Every order is checked against the 3 km micro-zone before anything else happens.",
    bg: "bg-sun",
  },
  {
    n: "02",
    title: "Candidate pool",
    body: "Only on-shift riders inside the zone with at least 20% battery stay in the pool. Everyone else is filtered out, with the reason logged.",
    bg: "bg-lilac",
  },
  {
    n: "03",
    title: "Score & rank",
    body: "Remaining riders are scored on distance (60%) and battery (40%). Closer and fuller wins, so the pickup is fast and the bike doesn't stall mid-route.",
    bg: "bg-mint",
  },
  {
    n: "04",
    title: "Auto-assign",
    body: "The top-ranked rider is locked in instantly. No bidding, no open auction, no waiting for someone to accept.",
    bg: "bg-cream",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-cobalt px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="How it works"
          tone="dark"
          title="Four steps from order to wheels"
        >
          The assignment algorithm is deliberately boring: it is predictable,
          explainable and fast. You can run it yourself in the dispatch demo
          further down.
        </SectionHeading>

        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              className={`relative rounded-[2rem] border-2 border-ink p-7 shadow-[6px_6px_0_#121218] ${s.bg} ${
                i % 2 ? "lg:translate-y-6" : ""
              }`}
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-cobalt font-display text-xl text-cream">
                {s.n}
              </span>
              <h3 className="mb-3 font-display text-2xl uppercase leading-none text-ink">
                {s.title}
              </h3>
              <p className="font-mono text-sm leading-relaxed text-ink/85">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
