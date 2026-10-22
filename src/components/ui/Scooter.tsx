export type ScooterVariant = "scout" | "hauler" | "cruiser";

const BOXES: Record<
  ScooterVariant,
  { x: number; y: number; w: number; h: number }
> = {
  scout: { x: 34, y: 50, w: 92, h: 64 },
  hauler: { x: 18, y: 24, w: 112, h: 90 },
  cruiser: { x: 46, y: 62, w: 78, h: 48 },
};

interface ArtProps {
  body?: string;
  variant?: ScooterVariant;
}

/** Raw <g> so scenes can place and scale the scooter inside their own SVG. Natural size is 330x210. */
export function ScooterArt({ body = "#4468cc", variant = "scout" }: ArtProps) {
  const b = BOXES[variant];
  const ink = "#121218";
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="170" cy="193" rx="142" ry="8" fill={ink} opacity="0.15" />

      {/* delivery box */}
      <rect
        x={b.x}
        y={b.y}
        width={b.w}
        height={b.h}
        rx="12"
        fill="#f7d44a"
        stroke={ink}
        strokeWidth="5"
      />
      <line
        x1={b.x}
        y1={b.y + 18}
        x2={b.x + b.w}
        y2={b.y + 18}
        stroke={ink}
        strokeWidth="4"
      />
      <text
        x={b.x + b.w / 2}
        y={b.y + b.h / 2 + 20}
        textAnchor="middle"
        fontSize="24"
        fill={ink}
        style={{ fontFamily: "Archivo Black, sans-serif" }}
      >
        FL
      </text>

      {/* rear swing arm + wheel */}
      <line x1="124" y1="140" x2="84" y2="162" stroke={ink} strokeWidth="7" />
      <circle cx="84" cy="162" r="28" fill={ink} />
      <circle cx="84" cy="162" r="11" fill="#fff6e3" />
      <circle cx="84" cy="162" r="4" fill={ink} />

      {/* chassis */}
      <path
        d="M132 120 H214 L232 72 H258 L254 124 Q252 146 230 146 H156 Q132 146 132 120 Z"
        fill={body}
        stroke={ink}
        strokeWidth="5"
      />
      <rect x="136" y="106" width="64" height="15" rx="7" fill={ink} />
      <path d="M160 126 L172 126 L166 138 Z" fill="#f7d44a" />

      {/* fork, bars, lamp, front wheel */}
      <line x1="248" y1="72" x2="268" y2="162" stroke={ink} strokeWidth="7" />
      <path
        d="M246 72 L250 44 H274"
        fill="none"
        stroke={ink}
        strokeWidth="6"
      />
      <circle cx="278" cy="52" r="9" fill="#fff6e3" stroke={ink} strokeWidth="4" />
      <circle cx="268" cy="162" r="28" fill={ink} />
      <circle cx="268" cy="162" r="11" fill="#fff6e3" />
      <circle cx="268" cy="162" r="4" fill={ink} />
    </g>
  );
}

interface ScooterProps extends ArtProps {
  className?: string;
}

export function Scooter({ className = "", ...art }: ScooterProps) {
  return (
    <svg
      viewBox="0 0 330 210"
      className={className}
      role="img"
      aria-label="Electric delivery scooter"
    >
      <ScooterArt {...art} />
    </svg>
  );
}
