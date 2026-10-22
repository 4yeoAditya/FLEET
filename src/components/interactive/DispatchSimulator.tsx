import React, { useState } from "react";

interface Rider {
  id: string;
  name: string;
  distanceKm: number;
  batteryPct: number;
  inZone: boolean;
  score?: number;
}

const mockRiders: Rider[] = [
  { id: "R-101", name: "Rider Arjun", distanceKm: 0.9, batteryPct: 82, inZone: true },
  { id: "R-102", name: "Rider Kabir", distanceKm: 2.1, batteryPct: 45, inZone: true },
  { id: "R-103", name: "Rider Sahil", distanceKm: 3.4, batteryPct: 60, inZone: false },
  { id: "R-104", name: "Rider Dev", distanceKm: 1.2, batteryPct: 15, inZone: true },
];

const STEPS = [
  { num: 1, label: "Pickup set" },
  { num: 2, label: "Candidate pool" },
  { num: 3, label: "Score & rank" },
  { num: 4, label: "Auto-assign" },
];

export const DispatchSimulator: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  // Scores are computed up front so cards can show them at step 3, before assignment.
  const scored = mockRiders
    .filter((r) => r.inZone && r.batteryPct >= 20)
    .map((r) => ({
      ...r,
      score: Math.round(
        (10 - r.distanceKm * 2) * 0.6 + (r.batteryPct / 10) * 0.4,
      ),
    }))
    .sort((a, b) => (b.score || 0) - (a.score || 0));

  const runStep = () => {
    if (step < 3) setStep(step + 1);
    else if (step === 3) {
      setSelectedRider(scored[0]);
      setStep(4);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedRider(null);
  };

  return (
    <div className="mx-auto w-full max-w-5xl rounded-[2rem] border-2 border-ink bg-cream p-6 text-ink shadow-[8px_8px_0_#121218] md:p-10">
      <div className="mb-8 flex flex-col items-start justify-between gap-5 border-b-2 border-ink pb-6 md:flex-row md:items-center">
        <div>
          <span className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-tomato">
            System execution
          </span>
          <h3 className="font-display text-2xl uppercase leading-none text-cobalt md:text-3xl">
            Guaranteed auto-assign engine
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={reset}
            className="font-mono text-xs font-bold uppercase underline underline-offset-4 hover:text-tomato"
          >
            Reset
          </button>
          <button
            onClick={runStep}
            disabled={step === 4}
            className="btn btn-blue"
          >
            {step === 4 ? "Assigned ✓" : "Run next step"}
          </button>
        </div>
      </div>

      <ol className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {STEPS.map((s) => {
          const active = step >= s.num;
          return (
            <li
              key={s.num}
              className={`rounded-full border-2 border-ink px-4 py-3 text-center font-mono text-xs font-bold uppercase transition-colors ${
                active ? "bg-sun" : "bg-cream text-ink/50"
              }`}
            >
              {s.num}. {s.label}
            </li>
          );
        })}
      </ol>

      <div className="grid gap-4 md:grid-cols-2">
        {mockRiders.map((rider) => {
          const isEliminated = step >= 2 && (!rider.inZone || rider.batteryPct < 20);
          const isAssigned = step === 4 && selectedRider?.id === rider.id;
          const score = scored.find((s) => s.id === rider.id)?.score;
          const reason = !rider.inZone
            ? "Out of zone"
            : rider.batteryPct < 20
              ? "Battery under 20%"
              : "";

          return (
            <div
              key={rider.id}
              className={`rounded-3xl border-2 p-6 transition-all ${
                isAssigned
                  ? "border-ink bg-sun shadow-[5px_5px_0_#121218]"
                  : isEliminated
                    ? "border-ink/30 bg-ink/5 opacity-60"
                    : "border-ink bg-white"
              }`}
            >
              <div className="mb-4 flex items-center justify-between border-b border-ink/20 pb-4">
                <span className="font-display text-base uppercase">
                  {rider.name}
                </span>
                <span className="rounded-full border-2 border-ink bg-cream px-3 py-1 font-mono text-xs">
                  {rider.id}
                </span>
              </div>

              <dl className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <dt className="text-ink/60">Distance</dt>
                  <dd className={rider.inZone ? "font-bold" : "font-bold text-tomato"}>
                    {rider.distanceKm} km {rider.inZone ? "(in zone)" : "(out of bounds)"}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-ink/60">Battery</dt>
                  <dd className="flex items-center gap-2">
                    <span className="h-2.5 w-20 overflow-hidden rounded-full border-2 border-ink bg-cream">
                      <span
                        className={`block h-full ${rider.batteryPct >= 20 ? "bg-cobalt" : "bg-tomato"}`}
                        style={{ width: `${rider.batteryPct}%` }}
                      />
                    </span>
                    <span className={rider.batteryPct >= 20 ? "font-bold" : "font-bold text-tomato"}>
                      {rider.batteryPct}%
                    </span>
                  </dd>
                </div>
              </dl>

              {isEliminated && (
                <div className="mt-4 rounded-full bg-tomato px-3 py-1.5 text-center font-mono text-xs font-bold uppercase text-cream">
                  Filtered: {reason}
                </div>
              )}
              {step >= 3 && !isEliminated && (
                <div className="mt-4 flex justify-between border-t border-ink/20 pt-4 font-mono text-xs font-bold text-cobalt">
                  <span>Computed score</span>
                  <span>{score} pts</span>
                </div>
              )}
              {isAssigned && (
                <div className="mt-4 rounded-full border-2 border-ink bg-cobalt px-3 py-2 text-center font-display text-xs uppercase tracking-widest text-cream">
                  Assignment locked
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
