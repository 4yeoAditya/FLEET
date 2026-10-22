import { useState } from "react";
import type { FC } from "react";
import { BoxIcon, ScooterIcon, ArrowIcon } from "../ui/Art";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

const LINKS = [
  { id: "overview", label: "Strategy" },
  { id: "dispatch", label: "Dispatch Engine" },
  { id: "ops", label: "Ops Console" },
  { id: "rider", label: "Rider App" },
];

/** Page sections that should light up a given nav link. */
const GROUP: Record<string, string> = {
  overview: "overview",
  plans: "overview",
  compare: "overview",
  dispatch: "dispatch",
  ops: "ops",
  rider: "rider",
};

export const Navbar: FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const [open, setOpen] = useState(false);
  const active = GROUP[currentTab];

  const go = (id: string) => {
    setCurrentTab(id);
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-cream/95 backdrop-blur border-b-[3px] border-ink">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 h-[72px] grid grid-cols-[1fr_auto_1fr] items-center">
        {/* left: links */}
        <div className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`font-display text-[13px] uppercase tracking-tight underline-offset-[6px] decoration-[3px] decoration-royal hover:underline ${
                active === l.id ? "underline" : ""
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          className="lg:hidden justify-self-start w-11 h-11 rounded-full border-2 border-ink flex flex-col items-center justify-center gap-1.5"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`block w-5 h-[3px] bg-ink transition-transform ${open ? "translate-y-[9px] rotate-45" : ""}`} />
          <span className={`block w-5 h-[3px] bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[3px] bg-ink transition-transform ${open ? "-translate-y-[9px] -rotate-45" : ""}`} />
        </button>

        {/* center: wordmark */}
        <button onClick={() => go("overview")} className="text-royal text-center -rotate-2 hover:rotate-2 transition-transform" aria-label="Fleet home">
          <span className="block font-display text-[30px] leading-[0.8] tracking-tight">FLEET</span>
          <span className="block font-sans font-bold text-[9px] tracking-[0.42em] mt-1 pl-[0.42em]">LOGISTICS</span>
        </button>

        {/* right: actions */}
        <div className="flex items-center gap-2 md:gap-3 justify-self-end">
          <button
            onClick={() => go("plans")}
            className="hidden sm:flex w-11 h-11 rounded-full border-2 border-ink items-center justify-center hover:bg-sun transition-colors"
            aria-label="Fleet plans"
            title="Fleet plans"
          >
            <BoxIcon />
          </button>
          <button
            onClick={() => go("rider")}
            className="hidden sm:flex w-11 h-11 rounded-full border-2 border-ink items-center justify-center hover:bg-sun transition-colors"
            aria-label="Rider app"
            title="Rider app"
          >
            <ScooterIcon />
          </button>
          <button onClick={() => go("dispatch")} className="pill pill-royal -rotate-2">
            Live Demo
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="lg:hidden border-t-[3px] border-ink bg-cream px-5 py-4 flex flex-col">
          {[...LINKS, { id: "plans", label: "Plans" }, { id: "roadmap", label: "Roadmap" }, { id: "faq", label: "FAQ" }].map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="flex items-center justify-between py-3.5 border-b-2 border-ink/10 last:border-0 font-display uppercase text-lg text-left"
            >
              {l.label}
              <ArrowIcon className="w-5 h-5 text-royal" />
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
