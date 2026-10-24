import type { SVGProps } from "react";

export default function CursorLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M11.5.13 1.89 5.68a.84.84 0 0 0-.42.73v11.18c0 .3.16.58.42.73l9.61 5.55a1 1 0 0 0 1 0l9.61-5.55a.84.84 0 0 0 .42-.73V6.41a.84.84 0 0 0-.42-.73L12.5.13a1 1 0 0 0-1 0Zm-.06 21.71-8.6-15.3c-.06-.1.02-.22.13-.22h17.2c.2 0 .32.22.22.39l-8.6 14.9a.2.2 0 0 1-.35.03Z" />
    </svg>
  );
}
