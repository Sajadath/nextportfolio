import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function SocialButtons({
  children,
  Icon,
  color,
  delay,
  gradient,
  link,
}: {
  children: string;
  Icon: React.ElementType;
  color: string;
  delay: number;
  gradient?: string;
  link: string;
}) {
  const [animate, setAnimate] = useState(false);
  const whiteDetected = color.includes("white") ? true : false;

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <Link
      href={link}
      target="_blank"
      className={`group relative mt-2 flex h-12 w-12 cursor-pointer items-center justify-start gap-2 rounded-md hover:scale-x-[105%] active:scale-75 ${color} p-2 pr-6 font-bold ${whiteDetected && !gradient ? `text-[#de564a]` : "text-neutral-50"} ${gradient || ""} duration-700 ${
        animate ? "w-44" : ""
      } ${animate ? `${color}` : ""}`}
    >
      <Icon
        className={`h-8 w-8 shrink-0 ${whiteDetected && !gradient ? "fill-[#de564a]" : gradient ? "" : "fill-neutral-50"}`}
      />
      <span
        className={`inline-flex origin-left ${whiteDetected && !gradient ? `text-[#de564a]` : "text-neutral-50"} transform border-l-2 px-1 opacity-0 transition-all duration-300 ${
          animate ? "scale-x-100 opacity-100 delay-500" : "scale-x-0"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}
