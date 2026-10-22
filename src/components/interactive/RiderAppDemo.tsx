import { useState } from "react";

type Phase = "offline" | "online" | "assigned" | "pickedUp" | "done";

const PHASE_COPY: Record<Phase, { title: string; sub: string; action: string | null }> = {
  offline: { title: "You're off shift", sub: "Start your shift to receive guaranteed assignments.", action: "Start shift" },
  online: { title: "Waiting for dispatch", sub: "Stay inside Zone A. Orders are assigned to you automatically.", action: "Simulate order" },
  assigned: { title: "New order assigned", sub: "Cafe Nori → 1.2 km → Apt 4B, Lake Rd", action: "Picked up" },
  pickedUp: { title: "On the way", sub: "Drop-off in about 6 min. Customer notified.", action: "Mark delivered" },
  done: { title: "Delivered", sub: "Nice work. Shift pay plus on-time bonus updated.", action: "Next order" },
};

const NEXT: Record<Phase, Phase> = {
  offline: "online",
  online: "assigned",
  assigned: "pickedUp",
  pickedUp: "done",
  done: "online",
};

export function RiderAppDemo() {
  const [phase, setPhase] = useState<Phase>("offline");
  const [deliveries, setDeliveries] = useState(0);
  const copy = PHASE_COPY[phase];

  const advance = () => {
    if (phase === "pickedUp") setDeliveries((d) => d + 1);
    setPhase(NEXT[phase]);
  };

  return (
    <div className="mx-auto w-full max-w-[320px]">
      <div className="rounded-[2.8rem] border-[3px] border-ink bg-ink p-3 shadow-[8px_8px_0_#f7d44a]">
        <div className="relative overflow-hidden rounded-[2.2rem] bg-cream">
          {/* notch */}
          <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-ink" />

          <div className="bg-cobalt px-5 pb-5 pt-9 text-cream">
            <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-widest">
              <span>Fleet rider</span>
              <span className={phase === "offline" ? "text-cream/60" : "text-sun"}>
                ● {phase === "offline" ? "Offline" : "On shift"}
              </span>
            </div>
            <div className="mt-4 font-display text-4xl text-sun">{deliveries}</div>
            <div className="font-mono text-[11px] uppercase tracking-widest">Deliveries this shift</div>
          </div>

          <div className="min-h-[250px] space-y-4 p-5">
            <div className="relative h-28 overflow-hidden rounded-2xl border-2 border-ink bg-[#e8ecfb]">
              <svg viewBox="0 0 240 112" className="h-full w-full" aria-hidden="true">
                <path d="M-5 80 C60 70 80 30 140 40 S220 20 250 30" stroke="#4468cc" strokeWidth="9" fill="none" />
                <path d="M-5 80 C60 70 80 30 140 40 S220 20 250 30" stroke="#fff6e3" strokeWidth="2" strokeDasharray="8 8" fill="none" />
                <circle cx="150" cy="56" r="42" fill="#f7d44a" fillOpacity="0.25" stroke="#e8452c" strokeWidth="2.5" strokeDasharray="6 5" />
                {phase !== "offline" && <circle cx="108" cy="52" r="8" fill="#f7d44a" stroke="#121218" strokeWidth="3" />}
                {(phase === "assigned" || phase === "pickedUp") && (
                  <circle cx="196" cy="34" r="8" fill="#e8452c" stroke="#121218" strokeWidth="3" />
                )}
              </svg>
            </div>

            <div aria-live="polite">
              <h4 className="font-display text-lg uppercase leading-tight text-ink">{copy.title}</h4>
              <p className="mt-1 font-mono text-xs leading-relaxed text-ink/75">{copy.sub}</p>
            </div>

            {copy.action && (
              <button onClick={advance} className="btn btn-blue w-full !py-3">
                {copy.action}
              </button>
            )}
            {phase !== "offline" && (
              <button
                onClick={() => setPhase("offline")}
                className="w-full text-center font-mono text-[11px] font-bold uppercase text-ink/60 underline underline-offset-4 hover:text-tomato"
              >
                End shift
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
