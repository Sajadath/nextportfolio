"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function BouncyScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (isBouncing) return;

      const atTop = el.scrollTop === 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;

      if (atTop || atBottom) {
        setIsBouncing(true);
        controls
          .start({
            y: atTop ? 20 : -20, // bounce direction
            transition: { type: "spring", stiffness: 200, damping: 10 },
          })
          .then(() => {
            controls
              .start({
                y: 0,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              })
              .then(() => setIsBouncing(false));
          });
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [controls, isBouncing]);

  return (
    <motion.div
      ref={containerRef}
      className="h-[400px] overflow-y-auto rounded-xl bg-gray-100 p-4"
      animate={controls}
    >
      <div className="space-y-6">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-white p-6 shadow">
            Item {i + 1}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
