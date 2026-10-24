"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { ReactNode } from "react";

export default function SpotlightCard({
  children,
  className,
  color = "0, 255, 136",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);

  const glow = useMotionTemplate`radial-gradient(420px circle at ${x}px ${y}px, rgba(${color}, 0.14), transparent 70%)`;
  const border = useMotionTemplate`radial-gradient(260px circle at ${x}px ${y}px, rgba(${color}, 0.9), transparent 70%)`;

  return (
    <div
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onPointerLeave={() => {
        x.set(-500);
        y.set(-500);
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-black/10 bg-white/70 p-px dark:border-white/10 dark:bg-white/[0.03]",
        className,
      )}
    >
      <motion.div
        aria-hidden
        style={{ background: border }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative h-full rounded-[15px] bg-white dark:bg-neutral-950">
        <motion.div
          aria-hidden
          style={{ background: glow }}
          className="pointer-events-none absolute inset-0 rounded-[15px]"
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
