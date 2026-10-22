import { Frame, Sticker, ArrowIcon, BoltIcon } from "../ui/Art";
import type { SceneName } from "../ui/Art";

const TRACK: { shape: "arch" | "circle" | "rect"; scene: SceneName }[] = [
  { shape: "rect", scene: "stack" },
  { shape: "circle", scene: "street" },
  { shape: "rect", scene: "map" },
  { shape: "circle", scene: "dock" },
];

export function Hero({ onDemo, onPlans }: { onDemo: () => void; onPlans: () => void }) {
  return (
    <header id="overview" className="relative bg-royal pt-[72px] overflow-hidden scroll-mt-0">
      <div className="absolute inset-0 bg-monogram opacity-70" aria-hidden />

      <div className="relative max-w-[1400px] mx-auto px-5 md:px-8 pt-12 md:pt-16">
        {/* eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full bg-cream text-ink border-2 border-ink px-4 py-2 text-[11px] font-bold uppercase tracking-widest -rotate-1">
          <span className="w-2 h-2 rounded-full bg-tomato animate-pulse" />
          Sector update: Hyperlocal logistics
        </div>

        {/* headline + intro */}
        <div className="mt-6 grid lg:grid-cols-[auto_1fr_auto] gap-x-10 gap-y-6 items-start">
          <h1 className="font-display uppercase text-sun leading-[0.82] tracking-tight text-[clamp(3.2rem,11vw,10.5rem)] lg:row-span-2">
            Dedicated
            <br />
            <span className="relative z-0">EV Fleets.</span>
          </h1>

          <p className="text-cream uppercase text-[13px] md:text-sm leading-[1.7] tracking-wide max-w-md lg:mt-3">
            High-margin speed, built on friendship with the math. Escaping aggregator commission traps with salaried
            shift drivers, guaranteed dispatch routing and strict 3&nbsp;km micro-zones.
          </p>

          <div className="flex flex-wrap gap-3 lg:mt-3 lg:justify-end lg:col-start-3">
            <button onClick={onDemo} className="pill pill-cream">
              Initialize Demo <ArrowIcon className="w-4 h-4" />
            </button>
            <button onClick={onPlans} className="pill pill-sun">
              See plans
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling shaped images — overlaps the headline like the reference */}
      <div className="relative z-10 -mt-6 md:-mt-14 pb-16 md:pb-24">
        <div className="flex w-max animate-marquee-slow hover:[animation-play-state:paused]">
          {[...TRACK, ...TRACK, ...TRACK, ...TRACK].map((t, i) => (
            <div key={i} className="pr-6 md:pr-10 shrink-0">
              <Frame
                shape={t.shape}
                scene={t.scene}
                className={
                  t.shape === "circle"
                    ? "w-[230px] h-[300px] md:w-[330px] md:h-[420px]"
                    : "w-[230px] h-[360px] md:w-[330px] md:h-[520px]"
                }
              />
            </div>
          ))}
        </div>

        {/* floating stickers */}
        <div className="hidden md:block absolute right-[6%] top-0 -translate-y-1/2 rotate-12 animate-float">
          <Sticker text="100% owned EV fleet" bg="#c9a8ea" size={150} spin>
            <BoltIcon className="w-9 h-9" />
          </Sticker>
        </div>
        <div className="hidden md:block absolute left-[4%] bottom-6 -rotate-12 animate-wiggle">
          <Sticker text="3km micro zones" bg="#e8402a" fg="#fff4dc" size={120} spin />
        </div>
      </div>
    </header>
  );
}

export function Marquee() {
  const items = [
    "0% commission",
    "Salaried riders",
    "100% company-owned EVs",
    "3 km micro-zones",
    "Guaranteed auto-assign",
    "No open auctions",
    "Lower TCO",
  ];
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center font-cond uppercase text-3xl md:text-4xl tracking-wide px-6 whitespace-nowrap">
          {t}
          <BoltIcon className="w-6 h-6 ml-12 text-tomato" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative z-20 bg-sun text-ink border-y-[3px] border-ink py-3 overflow-hidden -rotate-1 scale-[1.02] -my-2">
      <div className="flex w-max animate-marquee">
        {row}
        {row}
      </div>
    </div>
  );
}
