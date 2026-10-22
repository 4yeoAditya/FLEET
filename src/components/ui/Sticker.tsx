import { useId } from "react";
import type { ReactNode } from "react";

interface StickerProps {
  text: string;
  bg?: string;
  ring?: string;
  size?: number;
  className?: string;
  children?: ReactNode;
}

/** Round badge with text running around the edge — the little "stamp" from the burger menu. */
export function Sticker({
  text,
  bg = "#c9a6e4",
  ring = "#4468cc",
  size = 110,
  className = "",
  children,
}: StickerProps) {
  const id = "s" + useId().replace(/:/g, "");
  const label = text.toUpperCase();

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <defs>
        <path
          id={id}
          d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
        />
      </defs>
      <circle cx="60" cy="60" r="58" fill={bg} stroke={ring} strokeWidth="3" />
      <circle
        cx="60"
        cy="60"
        r="29"
        fill="#fff6e3"
        stroke={ring}
        strokeWidth="2.5"
      />
      {children ?? (
        <path
          d="M64 40 L48 64 H59 L55 82 L73 56 H62 Z"
          fill={ring}
          stroke={ring}
          strokeLinejoin="round"
          strokeWidth="2"
        />
      )}
      <text
        fontSize="12.5"
        fill={ring}
        style={{ fontFamily: "Archivo Black, sans-serif" }}
      >
        <textPath
          href={`#${id}`}
          textLength="266"
          lengthAdjust="spacing"
        >
          {`${label} • ${label} • `}
        </textPath>
      </text>
    </svg>
  );
}
