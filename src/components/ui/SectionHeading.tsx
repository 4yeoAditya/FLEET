import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  children?: ReactNode;
}

/** tone="light" is for cream backgrounds, tone="dark" is for cobalt backgrounds. */
export function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  align = "left",
  children,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div
      className={`mb-14 ${align === "center" ? "mx-auto text-center" : ""} max-w-4xl`}
    >
      <span
        className={`mb-5 inline-block rounded-full border-2 px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest ${
          dark
            ? "border-cream bg-cobalt-deep text-cream"
            : "border-ink bg-sun text-ink"
        }`}
      >
        {eyebrow}
      </span>
      <h2
        className={`-rotate-1 font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl ${
          dark ? "text-sun" : "text-cobalt"
        }`}
      >
        {title}
      </h2>
      {children && (
        <p
          className={`mt-6 max-w-2xl font-mono text-sm leading-relaxed md:text-base ${
            align === "center" ? "mx-auto" : ""
          } ${dark ? "text-cream/90" : "text-ink/80"}`}
        >
          {children}
        </p>
      )}
    </div>
  );
}
