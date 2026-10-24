"use client";

import { useAppSelector } from "@/lib/hooks/reduxHooks";
import LiquidGlass from "liquid-glass-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useEffect, useState } from "react";

const INTERACTIVE = "a, button, [role='button'], [data-cursor]";
const STILL_MOUSE = { x: 0, y: 0 };

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const isInTransition = useAppSelector((state) => state.menu.isInTransition);

  useEffect(() => {
    if (!isInTransition) return;
    setLabel(null);
    setHovering(false);
  }, [isInTransition]);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.5 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(INTERACTIVE);
      setHovering(Boolean(target));
      setLabel(target?.getAttribute("data-cursor") || null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    root.addEventListener("pointerleave", leave);
    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      root.removeEventListener("pointerleave", leave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2000]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}
    >
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute top-0 left-0"
      >
        <motion.div
          animate={{
            width: hovering ? 56 : 34,
            height: hovering ? 56 : 34,
            scale: pressed ? 0.8 : 1,
            opacity: label ? 0 : 1,
            backgroundColor: hovering
              ? "rgba(0,255,136,0.12)"
              : "rgba(0,255,136,0)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="border-mainGreen -translate-x-1/2 -translate-y-1/2 rounded-full border"
        />

        <AnimatePresence>
          {label && (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0"
            >
              <LiquidGlass
                displacementScale={64}
                blurAmount={0.08}
                saturation={160}
                aberrationIntensity={2}
                elasticity={0}
                cornerRadius={999}
                padding="0px"
                globalMousePos={STILL_MOUSE}
                mouseOffset={STILL_MOUSE}
                style={{ position: "absolute", top: "0px", left: "0px" }}
              >
                <motion.div
                  animate={{ scale: pressed ? 0.88 : 1 }}
                  className="grid size-[88px] place-items-center text-[11px] font-bold tracking-[0.2em] text-black uppercase [text-shadow:0_1px_8px_rgba(255,255,255,0.6)] dark:text-white dark:[text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
                >
                  {label}
                </motion.div>
              </LiquidGlass>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          className="bg-mainGreen h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
      </motion.div>
    </div>
  );
}
