const STATS = [
  {
    value: "25–30%",
    label: "Typical aggregator commission we help merchants avoid",
    tilt: "-rotate-2",
    color: "text-tomato",
  },
  {
    value: "3 km",
    label: "Hard micro-zone radius for every pickup",
    tilt: "rotate-1",
    color: "text-cobalt",
  },
  {
    value: "100%",
    label: "Company-owned EV fleet, lower total cost of ownership",
    tilt: "-rotate-1",
    color: "text-cobalt",
  },
  {
    value: "Fixed",
    label: "Monthly salary for every shift rider, no open auctions",
    tilt: "rotate-2",
    color: "text-tomato",
  },
];

export function Stats() {
  return (
    <section id="stats" className="bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.value} className="text-center">
            <div
              className={`font-display uppercase leading-none ${s.tilt} ${s.color}`}
              style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)" }}
            >
              {s.value}
            </div>
            <p className="mx-auto mt-5 max-w-[16rem] font-mono text-xs uppercase leading-relaxed tracking-wide text-ink/80">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
