import { useState } from "react";

interface Phase {
  tag: string;
  title: string;
  status: "Live" | "Building" | "Planned";
  summary: string;
  items: string[];
}

// Phases and timing are placeholders: edit to match the real plan.
const PHASES: Phase[] = [
  {
    tag: "Phase 1",
    title: "Single-zone pilot",
    status: "Live",
    summary: "Prove the unit economics inside one 3 km zone.",
    items: ["10 salaried riders on EV scooters", "Auto-assign engine v1", "Manual swap bay and shift roster"],
  },
  {
    tag: "Phase 2",
    title: "Ops console",
    status: "Building",
    summary: "Give dispatchers a live board instead of spreadsheets.",
    items: ["Live rider and battery board", "Zone health and SLA alerts", "Merchant order feed"],
  },
  {
    tag: "Phase 3",
    title: "Rider app",
    status: "Planned",
    summary: "Shift start, assignment, navigation and pay in one place.",
    items: ["Shift check-in and geofence", "Turn-by-turn pickup and drop", "Earnings and bonus tracker"],
  },
  {
    tag: "Phase 4",
    title: "Multi-zone scale",
    status: "Planned",
    summary: "Replicate the playbook across neighbourhoods.",
    items: ["Hub-in-a-box rollout kit", "Cross-zone rider balancing", "Merchant self-serve onboarding"],
  },
];

const BADGE: Record<Phase["status"], string> = {
  Live: "bg-mint text-ink",
  Building: "bg-sun text-ink",
  Planned: "bg-cream text-ink",
};

export function RoadmapTimeline() {
  const [open, setOpen] = useState(0);

  return (
    <ol className="relative space-y-4 border-l-4 border-sun pl-6 md:pl-10">
      {PHASES.map((p, i) => {
        const isOpen = open === i;
        return (
          <li key={p.tag} className="relative">
            <span
              className={`absolute -left-[2.15rem] top-5 h-6 w-6 rounded-full border-[3px] border-ink md:-left-[3.15rem] ${
                p.status === "Live" ? "bg-mint" : p.status === "Building" ? "bg-sun" : "bg-cream"
              }`}
              aria-hidden="true"
            />
            <div className="rounded-3xl border-2 border-ink bg-cream text-ink shadow-[5px_5px_0_#121218]">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span>
                  <span className="block font-mono text-xs font-bold uppercase tracking-widest text-tomato">
                    {p.tag}
                  </span>
                  <span className="font-display text-xl uppercase text-cobalt md:text-2xl">{p.title}</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className={`hidden rounded-full border-2 border-ink px-3 py-1 font-mono text-xs font-bold uppercase sm:inline ${BADGE[p.status]}`}>
                    {p.status}
                  </span>
                  <span className="font-display text-2xl" aria-hidden="true">
                    {isOpen ? "–" : "+"}
                  </span>
                </span>
              </button>
              {isOpen && (
                <div className="border-t-2 border-ink px-5 pb-5 pt-4">
                  <p className="mb-3 font-mono text-sm text-ink/85">{p.summary}</p>
                  <ul className="space-y-2 font-mono text-xs">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="text-tomato">✦</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
