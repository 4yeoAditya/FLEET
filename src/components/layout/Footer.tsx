import type { MouseEvent } from "react";
import { Sticker, BoltIcon } from "../ui/Art";

const COLS = [
  {
    title: "Product",
    links: [
      ["Dispatch Engine", "dispatch"],
      ["Ops Console", "ops"],
      ["Rider App", "rider"],
      ["Fleet Plans", "plans"],
    ],
  },
  {
    title: "Company",
    links: [
      ["Roadmap", "roadmap"],
      ["Unit Economics", "compare"],
      ["FAQ", "faq"],
      ["Contact", "contact"],
    ],
  },
];

export function Footer() {
  const jump = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-royal-deep text-cream overflow-hidden border-t-[3px] border-ink">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 pt-16 pb-8 relative z-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="font-display text-4xl leading-[0.85] text-sun -rotate-2 inline-block">
              FLEET
              <span className="block font-sans font-bold text-[10px] tracking-[0.42em] text-cream mt-2">LOGISTICS</span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-cream/80 uppercase">
              Salaried riders. Company-owned EVs. Guaranteed dispatch inside strict 3&nbsp;km micro-zones.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display uppercase text-sun text-sm mb-5">{col.title}</h4>
              <ul className="space-y-3 text-sm uppercase">
                {col.links.map(([label, id]) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={jump(id)} className="hover:text-sun underline-offset-4 hover:underline">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex md:justify-end items-start">
            <Sticker text="Zero emissions" bg="#fbd24d" spin size={150}>
              <BoltIcon className="w-9 h-9" />
            </Sticker>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t-2 border-cream/25 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs uppercase tracking-widest">
          <div className="text-cream/80">© {new Date().getFullYear()} Fleet Logistics Infrastructure</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-sun underline-offset-4 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="hover:text-sun underline-offset-4 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* giant wordmark */}
      <div aria-hidden className="font-display text-[34vw] leading-[0.72] text-royal/60 text-center select-none -mb-[4vw] whitespace-nowrap">
        FLEET
      </div>
    </footer>
  );
}

export default Footer;
