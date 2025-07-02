import type { SVGProps } from "react";

export function SewingPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 11v10" />
      <path d="M15.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" />
    </svg>
  );
}
