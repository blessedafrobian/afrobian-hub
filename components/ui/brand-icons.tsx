import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, props: SVGProps<SVGSVGElement>) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true as const,
  ...props,
});

export function InstagramIcon({ size = 20, ...props }: P) {
  return (
    <svg {...base(size, props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ size = 20, ...props }: P) {
  return (
    <svg {...base(size, props)}>
      <path
        d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.4 2.6 2.2 4.4 5 4.6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, ...props }: P) {
  return (
    <svg {...base(size, props)}>
      <path
        d="M4.2 19.8l1.1-3.9A8.3 8.3 0 1 1 8.4 19l-4.2.8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.4c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.1.3 0 .5.6 1 1.4 1.8 2.5 2.3.2.1.4.1.5-.1l.6-.7c.1-.2.3-.2.5-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.3-.9 1.6-.6.3-1.4.4-3-.3-1.7-.8-3.1-2.3-3.8-3.7-.6-1.3-.4-2.2 0-2.7z"
        fill="currentColor"
      />
    </svg>
  );
}

export function YouTubeIcon({ size = 20, ...props }: P) {
  return (
    <svg {...base(size, props)}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 9.2v5.6l4.8-2.8L10 9.2z" fill="currentColor" />
    </svg>
  );
}
