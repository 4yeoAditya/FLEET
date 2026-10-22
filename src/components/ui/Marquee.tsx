interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Endless ticker strip. The row is rendered twice so the -50% loop is seamless. */
export function Marquee({ items, className = "" }: MarqueeProps) {
  const row = [...items, ...items];
  return (
    <div
      className={`overflow-hidden whitespace-nowrap border-y-2 border-ink ${className}`}
      aria-label={items.join(", ")}
    >
      <div className="animate-marquee inline-flex min-w-max items-center gap-10 py-4 pr-10">
        {row.map((text, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-flex items-center gap-10 font-display text-xl uppercase tracking-tight md:text-2xl"
          >
            {text}
            <span className="text-tomato">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
