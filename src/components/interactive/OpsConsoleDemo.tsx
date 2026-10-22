import { useState } from "react";

type Status = "Delivering" | "Returning" | "Charging" | "Idle";

interface Row {
  id: string;
  name: string;
  status: Status;
  battery: number;
  orders: number;
  zone: string;
}

// Illustrative demo data only.
const ROWS: Row[] = [
  { id: "R-101", name: "Arjun", status: "Delivering", battery: 74, orders: 11, zone: "Zone A" },
  { id: "R-102", name: "Kabir", status: "Delivering", battery: 45, orders: 9, zone: "Zone A" },
  { id: "R-104", name: "Dev", status: "Charging", battery: 15, orders: 7, zone: "Zone B" },
  { id: "R-105", name: "Meera", status: "Returning", battery: 58, orders: 12, zone: "Zone B" },
  { id: "R-106", name: "Ishaan", status: "Idle", battery: 91, orders: 4, zone: "Zone C" },
  { id: "R-107", name: "Zoya", status: "Delivering", battery: 66, orders: 10, zone: "Zone C" },
];

const FILTERS: ("All" | Status)[] = ["All", "Delivering", "Returning", "Charging", "Idle"];

const STATUS_STYLE: Record<Status, string> = {
  Delivering: "bg-cobalt text-cream",
  Returning: "bg-sun text-ink",
  Charging: "bg-tomato text-cream",
  Idle: "bg-cream text-ink",
};

export function OpsConsoleDemo() {
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [selected, setSelected] = useState<string>(ROWS[0].id);

  const rows = ROWS.filter((r) => filter === "All" || r.status === filter);
  const active = ROWS.find((r) => r.id === selected) ?? ROWS[0];
  const onShift = ROWS.filter((r) => r.status !== "Idle").length;
  const totalOrders = ROWS.reduce((a, r) => a + r.orders, 0);
  const lowBattery = ROWS.filter((r) => r.battery < 20).length;

  return (
    <div className="overflow-hidden rounded-[2rem] border-2 border-ink bg-cream text-ink shadow-[8px_8px_0_#121218]">
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b-2 border-ink bg-sun px-5 py-3">
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-tomato" />
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-cream" />
        <span className="h-3 w-3 rounded-full border-2 border-ink bg-cobalt" />
        <span className="ml-3 font-mono text-xs font-bold uppercase tracking-widest">
          ops.fleet / live board
        </span>
        <span className="ml-auto flex items-center gap-2 font-mono text-xs font-bold uppercase">
          <span className="animate-pulse-dot h-2.5 w-2.5 rounded-full bg-tomato" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-3 border-b-2 border-ink">
        {[
          { label: "On shift", value: `${onShift}/${ROWS.length}` },
          { label: "Orders today", value: String(totalOrders) },
          { label: "Low battery", value: String(lowBattery) },
        ].map((k, i) => (
          <div key={k.label} className={`p-5 text-center ${i < 2 ? "border-r-2 border-ink" : ""}`}>
            <div className="font-display text-3xl text-cobalt md:text-4xl">{k.value}</div>
            <div className="mt-1 font-mono text-[11px] font-bold uppercase tracking-widest text-ink/70">
              {k.label}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        <div className="p-5 md:p-6">
          <div className="mb-4 flex flex-wrap gap-2" role="tablist" aria-label="Filter riders by status">
            {FILTERS.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border-2 border-ink px-4 py-1.5 font-mono text-xs font-bold uppercase transition-colors ${
                  filter === f ? "bg-ink text-cream" : "bg-cream hover:bg-sun"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left font-mono text-xs">
              <thead>
                <tr className="border-b-2 border-ink uppercase tracking-widest">
                  <th className="py-2 pr-3">Rider</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Battery</th>
                  <th className="py-2 text-right">Orders</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelected(r.id)}
                    className={`cursor-pointer border-b border-ink/15 ${
                      r.id === active.id ? "bg-sun/50" : "hover:bg-ink/5"
                    }`}
                  >
                    <td className="py-3 pr-3 font-bold">
                      <button
                        className="text-left"
                        onClick={() => setSelected(r.id)}
                        aria-pressed={r.id === active.id}
                      >
                        {r.name} <span className="font-normal text-ink/50">{r.id}</span>
                      </button>
                    </td>
                    <td className="py-3 pr-3">
                      <span className={`rounded-full border-2 border-ink px-2.5 py-0.5 ${STATUS_STYLE[r.status]}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className={`py-3 pr-3 font-bold ${r.battery < 20 ? "text-tomato" : ""}`}>
                      {r.battery}%
                    </td>
                    <td className="py-3 text-right">{r.orders}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-ink/60">
                      No riders with that status right now.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="border-t-2 border-ink bg-cobalt p-6 text-cream lg:border-l-2 lg:border-t-0">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-sun">
            Selected rider
          </span>
          <h4 className="mt-2 font-display text-3xl uppercase text-sun">{active.name}</h4>
          <p className="font-mono text-xs text-cream/80">
            {active.id} · {active.zone}
          </p>
          <dl className="mt-6 space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b border-cream/25 pb-3">
              <dt>Status</dt>
              <dd className="font-bold">{active.status}</dd>
            </div>
            <div className="flex justify-between border-b border-cream/25 pb-3">
              <dt>Battery</dt>
              <dd className="font-bold">{active.battery}%</dd>
            </div>
            <div className="flex justify-between border-b border-cream/25 pb-3">
              <dt>Orders today</dt>
              <dd className="font-bold">{active.orders}</dd>
            </div>
          </dl>
          <button
            className="btn btn-sun mt-6 w-full"
            disabled={active.battery >= 20}
            title={active.battery >= 20 ? "Battery is fine" : "Send to swap bay"}
          >
            {active.battery < 20 ? "Send to swap bay" : "No action needed"}
          </button>
        </aside>
      </div>
    </div>
  );
}
