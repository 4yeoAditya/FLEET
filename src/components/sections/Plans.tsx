import { useState } from "react";
import { Scooter, Sticker, ArrowIcon, BoltIcon, C } from "../ui/Art";

interface Plan {
  id: string;
  name: string;
  sticker: string;
  stickerBg: string;
  stickerFg: string;
  body: string;
  box: string;
  includes: { text: string; key?: boolean }[];
  prices: [string, string][];
}

const PLANS: Plan[] = [
  {
    id: "micro",
    name: "Micro",
    sticker: "Micro zone",
    stickerBg: C.sun,
    stickerFg: C.ink,
    body: C.royal,
    box: C.sun,
    includes: [
      { text: "10 company-owned EVs" },
      { text: "1 × 3 km micro-zone", key: true },
      { text: "salaried shift riders" },
      { text: "guaranteed auto-assign", key: true },
      { text: "swap-ready battery dock" },
    ],
    prices: [["Single", "₹18,500"], ["Double", "₹27,000"], ["Triple", "₹34,000"]],
  },
  {
    id: "metro",
    name: "Metro",
    sticker: "Most popular",
    stickerBg: C.lilac,
    stickerFg: C.ink,
    body: C.tomato,
    box: C.cream,
    includes: [
      { text: "50 company-owned EVs" },
      { text: "4 linked micro-zones", key: true },
      { text: "salaried shift riders" },
      { text: "ops console · 5 seats", key: true },
      { text: "demand-based shift planner" },
      { text: "battery & maintenance alerts" },
    ],
    prices: [["Single", "₹17,000"], ["Double", "₹25,000"], ["Triple", "₹31,000"]],
  },
  {
    id: "mega",
    name: "Mega",
    sticker: "City scale",
    stickerBg: C.tomato,
    stickerFg: C.cream,
    body: C.ink,
    box: C.royal,
    includes: [
      { text: "200+ company-owned EVs" },
      { text: "12 micro-zones", key: true },
      { text: "custom dispatch rules" },
      { text: "merchant API & webhooks", key: true },
      { text: "dedicated fleet manager" },
      { text: "on-site battery swap hub" },
    ],
    prices: [["Single", "₹15,500"], ["Double", "₹23,000"], ["Triple", "₹29,000"]],
  },
];

function Card({ plan, focus }: { plan: Plan; focus: boolean }) {
  return (
    <article className={`flex flex-col items-center text-center transition-all duration-500 ${focus ? "" : "scale-[.78] opacity-90"}`}>
      <div className="relative w-full max-w-[420px]">
        <Scooter body={plan.body} box={plan.box} className={`w-full ${focus ? "animate-float" : ""}`} />
        <div className="absolute -top-2 left-[8%] -rotate-12">
          <Sticker text={plan.sticker} bg={plan.stickerBg} fg={plan.stickerFg} size={focus ? 96 : 84}>
            <BoltIcon className="w-6 h-6" />
          </Sticker>
        </div>
      </div>

      <h3 className="font-cond uppercase text-3xl md:text-4xl mt-4 tracking-wide">{plan.name}</h3>
      <p className="mt-3 max-w-[360px] uppercase text-[11px] md:text-xs leading-[1.9]">
        <b className="font-display">Includes: </b>
        {plan.includes.map((it, i) => (
          <span key={it.text}>
            <span className={it.key ? "underline decoration-dotted underline-offset-4 text-ink/70" : ""}>{it.text}</span>
            {i < plan.includes.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
      <p className="mt-4 font-display uppercase text-xs md:text-sm leading-relaxed max-w-[380px]">
        {plan.prices.map(([label, price], i) => (
          <span key={label}>
            {label} <span className="text-tomato">{price}</span>
            {i < plan.prices.length - 1 ? " / " : ""}
          </span>
        ))}
      </p>
      <p className="mt-1 text-[10px] uppercase tracking-widest text-ink/60">per rider / month · shift = 8h</p>
    </article>
  );
}

export function Plans({ onSeeAll }: { onSeeAll: () => void }) {
  const [i, setI] = useState(1);
  const n = PLANS.length;
  const at = (k: number) => PLANS[(k + n) % n];

  return (
    <section id="plans" className="relative bg-cream py-20 md:py-28 scroll-mt-16 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <h2 className="font-cond uppercase text-royal text-center text-5xl md:text-7xl lg:text-[6.5rem] leading-none tracking-tight -rotate-2">
          Check our popular zones
        </h2>
        <p className="text-center mt-5 text-xs md:text-sm uppercase tracking-wide max-w-xl mx-auto text-ink/70">
          Pick a package by how many micro-zones you want to own. Every plan is salaried, EV-only and guaranteed-dispatch.
        </p>

        <div className="relative mt-14 md:mt-20">
          <div className="grid md:grid-cols-3 gap-8 items-end">
            <div className="hidden md:block">
              <Card plan={at(i - 1)} focus={false} />
            </div>
            <Card key={at(i).id} plan={at(i)} focus />
            <div className="hidden md:block">
              <Card plan={at(i + 1)} focus={false} />
            </div>
          </div>

          <button
            onClick={() => setI((v) => (v - 1 + n) % n)}
            aria-label="Previous plan"
            className="absolute left-0 md:left-[3%] top-[34%] w-12 h-12 rounded-full bg-cream border-2 border-tomato text-tomato flex items-center justify-center hover:bg-tomato hover:text-cream transition-colors z-10"
          >
            <ArrowIcon dir="left" className="w-5 h-5" />
          </button>
          <button
            onClick={() => setI((v) => (v + 1) % n)}
            aria-label="Next plan"
            className="absolute right-0 md:right-[3%] top-[34%] w-12 h-12 rounded-full bg-tomato text-cream flex items-center justify-center hover:scale-110 transition-transform z-10"
          >
            <ArrowIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-10" role="tablist" aria-label="Plan selector">
          {PLANS.map((p, k) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={k === i}
              aria-label={p.name}
              onClick={() => setI(k)}
              className={`h-3 rounded-full transition-all ${k === i ? "w-10 bg-royal" : "w-3 bg-ink/25 hover:bg-ink/50"}`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button onClick={onSeeAll} className="pill pill-royal -rotate-2">
            Talk to us about a plan
          </button>
        </div>
      </div>
    </section>
  );
}
