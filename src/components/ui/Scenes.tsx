import { ScooterArt } from "./Scooter";

const INK = "#121218";
const BLUE = "#4468cc";
const CREAM = "#fff6e3";
const SUN = "#f7d44a";
const TOMATO = "#e8452c";

/* All scenes share a 300x380 viewBox and slice-fill whatever shape wraps them. */
const svgProps = {
  viewBox: "0 0 300 380",
  preserveAspectRatio: "xMidYMid slice",
  className: "h-full w-full",
  role: "img",
} as const;

/** Scooter parked against a tiled wall with blue grout. */
export function TileScene() {
  return (
    <svg {...svgProps} aria-label="Fleet scooter against a tiled wall">
      <rect width="300" height="380" fill="#f3f4fb" />
      {[100, 200].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="380" stroke={BLUE} strokeWidth="3" />
      ))}
      {[95, 190, 285].map((y) => (
        <line key={y} x1="0" y1={y} x2="300" y2={y} stroke={BLUE} strokeWidth="3" />
      ))}
      {/* long soft shadow */}
      <path d="M30 250 L130 190 L250 190 L290 250 Z" fill={INK} opacity="0.07" />
      <g transform="translate(-6 150) scale(0.93)">
        <ScooterArt body={BLUE} variant="scout" />
      </g>
      <rect x="0" y="330" width="300" height="50" fill={BLUE} opacity="0.12" />
    </svg>
  );
}

/** A 3 km micro-zone with the hub in the middle and riders inside the ring. */
export function MapScene() {
  const riders = [
    [118, 150],
    [190, 235],
    [105, 255],
    [205, 140],
  ];
  return (
    <svg {...svgProps} aria-label="Three kilometre dispatch zone map">
      <rect width="300" height="380" fill={CREAM} />
      {/* roads */}
      <g stroke={BLUE} strokeWidth="14" strokeLinecap="round" opacity="0.9">
        <line x1="-10" y1="110" x2="310" y2="170" />
        <line x1="40" y1="-10" x2="170" y2="390" />
        <line x1="-10" y1="300" x2="310" y2="250" />
        <line x1="250" y1="-10" x2="210" y2="390" />
      </g>
      <g stroke={CREAM} strokeWidth="3" strokeDasharray="10 12" opacity="0.9">
        <line x1="-10" y1="110" x2="310" y2="170" />
        <line x1="40" y1="-10" x2="170" y2="390" />
        <line x1="-10" y1="300" x2="310" y2="250" />
        <line x1="250" y1="-10" x2="210" y2="390" />
      </g>
      {/* zone ring */}
      <circle
        cx="150"
        cy="195"
        r="112"
        fill={SUN}
        fillOpacity="0.22"
        stroke={TOMATO}
        strokeWidth="4"
        strokeDasharray="14 10"
      />
      {riders.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" fill={SUN} stroke={INK} strokeWidth="4" />
          <circle cx={x} cy={y} r="3.5" fill={INK} />
        </g>
      ))}
      {/* out-of-zone rider, greyed */}
      <circle cx="268" cy="330" r="11" fill="#d4d4d8" stroke={INK} strokeWidth="4" />
      {/* hub */}
      <circle cx="150" cy="195" r="24" fill={BLUE} stroke={INK} strokeWidth="5" />
      <text
        x="150"
        y="203"
        textAnchor="middle"
        fontSize="20"
        fill={CREAM}
        style={{ fontFamily: "Archivo Black, sans-serif" }}
      >
        F
      </text>
      <rect x="196" y="78" width="78" height="30" rx="15" fill={INK} />
      <text
        x="235"
        y="98"
        textAnchor="middle"
        fontSize="13"
        fill={CREAM}
        style={{ fontFamily: "Space Mono, monospace", fontWeight: 700 }}
      >
        3 KM MAX
      </text>
    </svg>
  );
}

/** Battery swap bay: nine cells in three charge states. */
export function BayScene() {
  const levels = [100, 100, 70, 100, 45, 100, 100, 85, 20];
  return (
    <svg {...svgProps} aria-label="Battery swap bay">
      <rect width="300" height="380" fill={BLUE} />
      <text
        x="150"
        y="70"
        textAnchor="middle"
        fontSize="38"
        fill={SUN}
        style={{ fontFamily: "Archivo Black, sans-serif" }}
      >
        SWAP BAY
      </text>
      {levels.map((lvl, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 32 + col * 84;
        const y = 110 + row * 86;
        const fill = lvl > 50 ? "#7ddc8a" : lvl > 30 ? SUN : TOMATO;
        return (
          <g key={i}>
            <rect x={x} y={y} width="72" height="68" rx="12" fill={CREAM} stroke={INK} strokeWidth="4" />
            <rect x={x + 26} y={y - 7} width="20" height="9" rx="3" fill={INK} />
            <rect x={x + 9} y={y + 56 - (lvl / 100) * 44} width="54" height={(lvl / 100) * 44} rx="5" fill={fill} />
            <path
              d={`M${x + 38} ${y + 16} l-10 16 h8 l-3 12 l12 -18 h-8 z`}
              fill={INK}
              opacity="0.85"
            />
          </g>
        );
      })}
      <text
        x="150"
        y="365"
        textAnchor="middle"
        fontSize="12"
        fill={CREAM}
        style={{ fontFamily: "Space Mono, monospace", fontWeight: 700 }}
      >
        MIN 20% TO TAKE A SHIFT
      </text>
    </svg>
  );
}

/** Corner hub with a blue awning, like the storefront shot. */
export function ShopScene() {
  return (
    <svg {...svgProps} aria-label="Fleet neighbourhood hub storefront">
      <rect width="300" height="380" fill="#e7e3d6" />
      <rect x="0" y="0" width="300" height="70" fill="#cfc9b8" />
      {/* sign */}
      <rect x="40" y="90" width="220" height="44" rx="4" fill={BLUE} stroke={INK} strokeWidth="4" />
      <text
        x="150"
        y="121"
        textAnchor="middle"
        fontSize="24"
        fill={CREAM}
        style={{ fontFamily: "Archivo Black, sans-serif" }}
      >
        FLEET HUB
      </text>
      {/* awning */}
      <path d="M26 150 H274 L290 196 H10 Z" fill={BLUE} stroke={INK} strokeWidth="4" strokeLinejoin="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path
          key={i}
          d={`M${26 + i * 41.3 + 41.3 / 2} 150 L${10 + i * 46.7 + 46.7 / 2} 196`}
          stroke={CREAM}
          strokeWidth="3"
          opacity="0.55"
        />
      ))}
      {/* window + door */}
      <rect x="30" y="206" width="150" height="110" rx="6" fill="#bcd0f5" stroke={INK} strokeWidth="4" />
      <rect x="196" y="206" width="70" height="132" rx="6" fill={CREAM} stroke={INK} strokeWidth="4" />
      <circle cx="252" cy="274" r="4" fill={INK} />
      {/* pavement + parked scooter */}
      <rect x="0" y="338" width="300" height="42" fill="#b9b5a6" />
      <g transform="translate(22 252) scale(0.46)">
        <ScooterArt body={TOMATO} variant="cruiser" />
      </g>
    </svg>
  );
}
