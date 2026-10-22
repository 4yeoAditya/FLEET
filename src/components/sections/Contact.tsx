import { useState } from "react";
import type { FormEvent } from "react";
import { Sticker, ArrowIcon, BoltIcon, CheckIcon } from "../ui/Art";

const VOLUMES = ["Under 100 orders / day", "100 – 500 orders / day", "500 – 2,000 orders / day", "2,000+ orders / day"];

export function Contact() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-royal px-6 py-20 md:py-28 scroll-mt-16">
      <div className="bg-monogram absolute inset-0 opacity-70" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h2 className="font-display uppercase text-sun leading-[0.85] tracking-tight text-[clamp(3rem,9vw,8rem)] -rotate-1">
            Ready
            <br />
            to roll?
          </h2>
          <p className="mt-8 max-w-md text-sm uppercase leading-[1.7] tracking-wide text-cream md:text-base">
            Tell us about your zone and volume. We&apos;ll come back with a pilot plan, rider roster and a per-order
            cost you can compare against your current aggregator bill.
          </p>
          <div className="mt-8 hidden -rotate-6 md:block">
            <Sticker text="Pilot a zone" bg="#fbd24d" size={130} spin>
              <BoltIcon className="h-8 w-8" />
            </Sticker>
          </div>
        </div>

        <div className="rounded-[2rem] border-[3px] border-ink bg-cream p-6 text-ink shadow-[8px_8px_0_#15120f] md:p-8">
          {sent ? (
            <div className="py-10 text-center">
              <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-ink bg-mint">
                <CheckIcon className="h-8 w-8" />
              </span>
              <h3 className="font-display text-2xl uppercase text-royal">You&apos;re on the list{name ? `, ${name.split(" ")[0]}` : ""}.</h3>
              <p className="mt-3 font-mono text-sm">This is a demo form, so nothing was sent. Wire it to your backend to go live.</p>
              <button onClick={() => setSent(false)} className="pill pill-outline mt-6">
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <h3 className="font-display text-2xl uppercase text-royal">Request a pilot</h3>
              {[
                { id: "name", label: "Your name", type: "text", ph: "Aditya Raj", val: name, set: setName },
                { id: "email", label: "Work email", type: "email", ph: "you@company.com" },
                { id: "zone", label: "Pilot area", type: "text", ph: "e.g. Koramangala, Bengaluru" },
              ].map((f) => (
                <label key={f.id} className="block">
                  <span className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest">{f.label}</span>
                  <input
                    required
                    type={f.type}
                    placeholder={f.ph}
                    value={f.val}
                    onChange={f.set ? (e) => f.set!(e.target.value) : undefined}
                    className="w-full rounded-full border-2 border-ink bg-paper px-5 py-3 font-mono text-sm outline-none focus:bg-white focus:ring-4 focus:ring-sun"
                  />
                </label>
              ))}
              <label className="block">
                <span className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-widest">Daily volume</span>
                <select
                  defaultValue={VOLUMES[1]}
                  className="w-full rounded-full border-2 border-ink bg-paper px-5 py-3 font-mono text-sm outline-none focus:ring-4 focus:ring-sun"
                >
                  {VOLUMES.map((v) => (
                    <option key={v}>{v}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="pill pill-royal w-full">
                Request pilot <ArrowIcon className="h-4 w-4" />
              </button>
              <p className="text-center font-mono text-[11px] uppercase tracking-widest text-ink/60">
                By continuing you agree to the Terms of Service and Privacy Policy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
