import type { SVGProps } from "react";

export function PlaneDoodle({
  className = "",
  flip = false,
  ...rest
}: SVGProps<SVGSVGElement> & { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 220 120"
      fill="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      {...rest}
    >
      <path
        d="M8 96C8 96 6 44 44 30C82 16 92 60 62 66C32 72 40 20 96 14C132 10 152 24 166 36"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="7 9"
        opacity="0.85"
      />
      <path d="M203 22l-38 12 12 7-2 12 9-9 13 5-3-14 9-13z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}
