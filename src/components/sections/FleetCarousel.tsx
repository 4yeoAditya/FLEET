import { useState } from "react";
import { Scooter } from "../ui/Scooter";
import type { ScooterVariant } from "../ui/Scooter";
import { Sticker } from "../ui/Sticker";

interface Vehicle {
  name: string;
  variant: ScooterVariant;
  body: string;
  blurb: string;
  specs: { label: string; value: string }[];
  badge: { text: string; bg: string; ring: string };
}

// NOTE: specs below are placeholder copy — swap in your real vehicle data.
const VEHICLES: Vehicle[] = [
  {
    name: "Scout",
    variant: "scout",
    body: "#4468cc",
    blurb:
      "Compact EV scooter with an insulated top box. The workhorse for food, parcels and pharmacy runs inside a micro-zone.",
    specs: [
      { label: "Range", value: "80 km" },
      { label: "Swap", value: "3 min" },
      { label: "Payload", value: "12 kg" },
    ],
    badge: { text: "Classic", bg: "#fff6e3", ring: "#4468cc" },
  },
  {
    name: "Hauler",
    variant: "hauler",
    body: "#e8452c",
    blurb:
      "Extended cargo box for grocery baskets and multi-drop batches. Same swap system, more room.",
    specs: [
      { label: "Range", value: "65 km" },
      { label: "Swap", value: "3 min" },
      { label: "Payload", value: "25 kg" },
    ],
    badge: { text: "Big load", bg: "#f7d44a", ring: "#121218" },
  },
  {
    name: "Cruiser",
    variant: "cruiser",
    body: "#121218",
    blurb:
      "Slim, quick and light. Built for document drops and small high-value orders where time beats volume.",
    specs: [
      { label: "Range", value: "95 km" },
      { label: "Swap", value: "3 min" },
      { label: "Payload", value: "6 kg" },
    ],
    badge: { text: "Express", bg: "#c9a6e4", ring: "#4468cc" },
  },
  {
    name: "Chiller",
    variant: "hauler",
    body: "#7ddc8a",
    blurb:
      "Insulated cold box for dairy, bakery and pharmacy cold-chain, with a rider-side temperature readout.",
    specs: [
      { label: "Range", value: "60 km" },
      { label: "Swap", value: "3 min" },
      { label: "Payload", value: "18 kg" },
    ],
    badge: { text: "Cold chain", bg: "#b8e3c4", ring: "#121218" },
  },
];

function Arrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {dir === "left" ? (
        <>
          <path d="M19 12 H5" />
          <path d="M11 6 L5 12 L11 18" />
        </>
      ) : (
        <>
          <path d="M5 12 H19" />
          <path d="M13 6 L19 12 L13 18" />
        </>
      )}
    </svg>
  );
}

export function FleetCarousel() {
  const [index, setIndex] = useState(1);
  const n = VEHICLES.length;
  const at = (offset: number) => VEHICLES[(index + offset + n * 10) % n];
  const go = (d: number) => setIndex((i) => (i + d + n) % n);

  return (
    <section id="fleet" className="bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-16 -rotate-2 text-center font-display text-4xl uppercase leading-none tracking-tight text-cobalt md:text-6xl">
          Check our popular fleet
        </h2>

        <div className="relative">
          <button
            onClick={() => go(-1)}
            aria-label="Previous vehicle"
            className="absolute left-0 top-1/3 z-20 flex h-12 w-12 items-center justify-center rounded-full border-2 border-tomato bg-cream text-tomato transition-transform hover:scale-110"
          >
            <Arrow dir="left" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next vehicle"
            className="absolute right-0 top-1/3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-tomato text-cream transition-transform hover:scale-110"
          >
            <Arrow dir="right" />
          </button>

          <div
            className="grid items-end gap-6 px-10 md:grid-cols-[1fr_1.35fr_1fr] md:px-16"
            aria-live="polite"
          >
            {[-1, 0, 1].map((offset) => {
              const v = at(offset);
              const center = offset === 0;
              return (
                <article
                  key={`${v.name}-${offset}`}
                  className={`relative text-center ${
                    center ? "" : "hidden md:block md:opacity-80"
                  }`}
                >
                  <div className="relative mx-auto">
                    <Scooter
                      body={v.body}
                      variant={v.variant}
                      className={`mx-auto w-full ${center ? "max-w-md" : "max-w-xs"}`}
                    />
                    {center && (
                      <Sticker
                        text={v.badge.text}
                        bg={v.badge.bg}
                        ring={v.badge.ring}
                        size={96}
                        className="animate-bob absolute -top-4 left-4 md:left-10"
                      />
                    )}
                  </div>
                  <h3 className="mt-6 font-display text-xl uppercase">
                    {v.name}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs font-mono text-xs uppercase leading-relaxed text-ink/85">
                    <span className="font-bold">Built for:</span> {v.blurb}
                  </p>
                  <p className="mt-4 font-display text-sm uppercase">
                    {v.specs.map((s, i) => (
                      <span key={s.label}>
                        {s.label}{" "}
                        <span className="text-tomato">{s.value}</span>
                        {i < v.specs.length - 1 ? " / " : ""}
                      </span>
                    ))}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
            {VEHICLES.map((v, i) => (
              <span
                key={v.name}
                className={`h-2.5 rounded-full border border-ink transition-all ${
                  i === index ? "w-8 bg-cobalt" : "w-2.5 bg-cream"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a href="#plans" className="btn btn-blue">
            See all plans
          </a>
        </div>
      </div>
    </section>
  );
}
