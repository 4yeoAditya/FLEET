import { useId } from "react";
import type { ReactNode } from "react";

export const C = {
  cream: "#fff4dc",
  paper: "#fffaf0",
  royal: "#4a6fd1",
  deep: "#2b4bb0",
  sky: "#cfdcff",
  sun: "#fbd24d",
  tomato: "#e8402a",
  lilac: "#c9a8ea",
  ink: "#15120f",
};

/* ───────────── Icons ───────────── */
type IconProps = { className?: string };

export const BoxIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8l9-5 9 5v8l-9 5-9-5V8z" />
    <path d="M3 8l9 5 9-5M12 13v8" />
  </svg>
);

export const ScooterIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17" r="2.5" />
    <circle cx="18.5" cy="17" r="2.5" />
    <path d="M8 17h7l-2-8h3M16 9l1.5 5.5M3 8h5v5" />
  </svg>
);

export const ArrowIcon = ({ className = "w-5 h-5", dir = "right" }: IconProps & { dir?: "left" | "right" | "up" | "down" }) => {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ transform: `rotate(${rot}deg)` }} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
};

export const BoltIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M13.5 2L4 14h6.5L9 22l11-13h-7l.5-7z" />
  </svg>
);

export const CheckIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export const CrossIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const PlusIcon = ({ className = "w-5 h-5" }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <path d="M12 4v16M4 12h16" />
  </svg>
);

/* ───────────── EV delivery scooter ───────────── */
export function Scooter({
  body = C.royal,
  box = C.sun,
  className = "",
}: {
  body?: string;
  box?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 300 200" className={className} fill="none" role="img" aria-label="Electric delivery scooter">
      <ellipse cx="150" cy="188" rx="128" ry="8" fill={C.ink} opacity=".18" />
      {/* delivery box */}
      <rect x="14" y="24" width="112" height="76" rx="14" fill={box} stroke={C.ink} strokeWidth="4" />
      <path d="M14 50h112" stroke={C.ink} strokeWidth="4" />
      <path d="M78 58L60 82h14l-6 16 24-28H77l7-12z" fill={C.ink} />
      {/* seat */}
      <rect x="34" y="100" width="104" height="16" rx="8" fill={C.ink} />
      {/* body */}
      <path
        d="M52 118h96l22 26h58l-20-86h24l30 92v8H72c-26 0-30-26-20-40z"
        fill={body}
        stroke={C.ink}
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* handlebar + light */}
      <path d="M212 52l34-8" stroke={C.ink} strokeWidth="8" strokeLinecap="round" />
      <circle cx="256" cy="62" r="10" fill={C.sun} stroke={C.ink} strokeWidth="4" />
      {/* wheels */}
      <g>
        <circle cx="74" cy="152" r="32" fill={C.ink} />
        <circle cx="74" cy="152" r="14" fill={C.cream} />
        <circle cx="74" cy="152" r="4" fill={C.ink} />
        <circle cx="238" cy="152" r="32" fill={C.ink} />
        <circle cx="238" cy="152" r="14" fill={C.cream} />
        <circle cx="238" cy="152" r="4" fill={C.ink} />
      </g>
    </svg>
  );
}

/* ───────────── Circular text sticker ───────────── */
export function Sticker({
  text,
  bg = C.lilac,
  fg = C.ink,
  size = 120,
  spin = false,
  children,
  className = "",
}: {
  text: string;
  bg?: string;
  fg?: string;
  size?: number;
  spin?: boolean;
  children?: ReactNode;
  className?: string;
}) {
  const id = "stk" + useId().replace(/:/g, "");
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        className={spin ? "animate-spin-slow" : ""}
        role="img"
        aria-label={text}
      >
        <circle cx="60" cy="60" r="58" fill={bg} stroke={C.ink} strokeWidth="2.5" />
        <path id={id} d="M60,60 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" fill="none" />
        <text fontFamily="'Archivo Black', Arial Black, sans-serif" fontSize="11.5" letterSpacing="1.6" fill={fg}>
          <textPath href={`#${id}`} startOffset="0">
            {(text + " • ").repeat(3).slice(0, 44)}
          </textPath>
        </text>
      </svg>
      {children && <div className="absolute inset-0 flex items-center justify-center" style={{ color: fg }}>{children}</div>}
    </div>
  );
}

/* ───────────── Illustrated scenes (used inside arches / circles) ───────────── */
export type SceneName = "map" | "dock" | "street" | "stack";

export function Scene({ name }: { name: SceneName }) {
  const common = { viewBox: "0 0 300 460", preserveAspectRatio: "xMidYMid slice", className: "w-full h-full block" } as const;

  if (name === "map")
    return (
      <svg {...common} role="img" aria-label="3 kilometre delivery micro-zone">
        <rect width="300" height="460" fill={C.paper} />
        {[60, 130, 200, 270, 340, 410].map((y) => (
          <path key={"h" + y} d={`M0 ${y}H300`} stroke={C.sky} strokeWidth="10" />
        ))}
        {[40, 110, 190, 260].map((x) => (
          <path key={"v" + x} d={`M${x} 0V460`} stroke={C.sky} strokeWidth="10" />
        ))}
        <path d="M0 400L300 80" stroke={C.sky} strokeWidth="14" />
        <circle cx="150" cy="230" r="128" fill={C.royal} opacity=".12" />
        <circle cx="150" cy="230" r="128" fill="none" stroke={C.royal} strokeWidth="4" strokeDasharray="10 10" />
        <circle cx="150" cy="230" r="64" fill="none" stroke={C.royal} strokeWidth="2" strokeDasharray="4 8" />
        <path d="M150 230L88 150M150 230L220 170M150 230L110 330" stroke={C.ink} strokeWidth="3" strokeDasharray="2 8" strokeLinecap="round" />
        {[[88, 150], [220, 170], [110, 330]].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r="14" fill={C.sun} stroke={C.ink} strokeWidth="4" />
            <circle cx={x} cy={y} r="4" fill={C.ink} />
          </g>
        ))}
        <circle cx="150" cy="230" r="22" fill={C.tomato} stroke={C.ink} strokeWidth="4" />
        <path d="M144 230h12M150 224v12" stroke={C.cream} strokeWidth="4" strokeLinecap="round" />
        <rect x="204" y="338" width="78" height="30" rx="15" fill={C.ink} />
        <text x="243" y="358" textAnchor="middle" fontFamily="'Archivo Black', sans-serif" fontSize="14" fill={C.cream}>3 KM</text>
      </svg>
    );

  if (name === "dock")
    return (
      <svg {...common} role="img" aria-label="Battery swap dock">
        <rect width="300" height="460" fill={C.sun} />
        <circle cx="150" cy="120" r="70" fill={C.cream} stroke={C.ink} strokeWidth="5" />
        <path d="M160 70L118 132h26l-8 40 46-64h-28l6-38z" fill={C.ink} />
        {[0, 1, 2, 3].map((i) => {
          const y = 230 + i * 56;
          const level = [100, 78, 55, 22][i];
          return (
            <g key={i}>
              <rect x="40" y={y} width="220" height="42" rx="21" fill={C.cream} stroke={C.ink} strokeWidth="4" />
              <rect x="50" y={y + 8} width={(200 * level) / 100} height="26" rx="13" fill={level > 30 ? C.royal : C.tomato} />
              <text x="250" y={y + 27} textAnchor="end" fontFamily="'Space Mono', monospace" fontWeight="700" fontSize="13" fill={C.ink}>{level}%</text>
            </g>
          );
        })}
      </svg>
    );

  if (name === "street")
    return (
      <svg {...common} role="img" aria-label="City street">
        <rect width="300" height="460" fill={C.royal} />
        <rect x="0" y="360" width="300" height="100" fill="#3a5bb5" />
        <path d="M0 410h300" stroke={C.cream} strokeWidth="5" strokeDasharray="30 20" />
        <rect x="30" y="60" width="240" height="300" fill={C.cream} stroke={C.ink} strokeWidth="5" />
        {[0, 1, 2].map((r) =>
          [0, 1, 2].map((c) => (
            <rect key={r + "" + c} x={52 + c * 76} y={82 + r * 62} width="52" height="42" fill={r === 1 && c === 1 ? C.sun : C.sky} stroke={C.ink} strokeWidth="4" />
          ))
        )}
        <path d="M20 270h260l-16 40H36z" fill={C.sun} stroke={C.ink} strokeWidth="5" />
        <rect x="100" y="310" width="100" height="50" fill={C.ink} />
        <text x="150" y="42" textAnchor="middle" fontFamily="'Archivo Black', sans-serif" fontSize="26" fill={C.cream}>FLEET HUB</text>
        <g transform="translate(70 352) scale(.52)">
          <Scooter body={C.tomato} box={C.cream} />
        </g>
      </svg>
    );

  /* stack */
  return (
    <svg {...common} role="img" aria-label="Stack of delivery boxes">
      <rect width="300" height="460" fill="#f6f8fd" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={"a" + i} d={`M${i * 75} 0V460`} stroke={C.royal} strokeWidth="3" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={"b" + i} d={`M0 ${i * 92}H300`} stroke={C.royal} strokeWidth="3" />
      ))}
      {[
        { x: 70, y: 250, w: 160, c: C.sun },
        { x: 40, y: 330, w: 220, c: C.royal },
        { x: 95, y: 175, w: 110, c: C.tomato },
      ].map((b) => (
        <g key={b.y}>
          <rect x={b.x} y={b.y} width={b.w} height="72" rx="16" fill={b.c} stroke={C.ink} strokeWidth="5" />
          <path d={`M${b.x} ${b.y + 24}h${b.w}`} stroke={C.ink} strokeWidth="5" />
          <path d={`M${b.x + b.w / 2 + 6} ${b.y + 32}l-14 20h11l-5 14 18-22h-11z`} fill={C.ink} />
        </g>
      ))}
      <path d="M150 120l16 16-16 16-16-16z" fill={C.ink} opacity=".0" />
      <rect x="196" y="60" width="86" height="34" rx="17" fill={C.ink} />
      <text x="239" y="83" textAnchor="middle" fontFamily="'Archivo Black', sans-serif" fontSize="14" fill={C.cream}>0% CUT</text>
    </svg>
  );
}

/* Shaped photo-style frame: arch / circle / rect */
export function Frame({
  shape,
  scene,
  className = "",
}: {
  shape: "arch" | "circle" | "rect";
  scene: SceneName;
  className?: string;
}) {
  const radius =
    shape === "circle" ? "rounded-[50%]" : shape === "arch" ? "rounded-t-[999px] rounded-b-[28px]" : "rounded-[28px]";
  return (
    <div className={`overflow-hidden border-[3px] border-ink bg-paper ${radius} ${className}`}>
      <Scene name={scene} />
    </div>
  );
}
