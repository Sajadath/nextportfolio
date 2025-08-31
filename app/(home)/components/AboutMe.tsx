"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const paragraph =
  "I am a Front-End Developer with a strong passion for creating interactive, user-friendly, and visually appealing web applications. My focus is on crafting seamless user experiences by combining modern design principles with cutting-edge technologies. I enjoy solving complex problems, learning new tools, and continuously improving my skills to deliver high-quality solutions that make a difference.";

const words = paragraph.split(" ");
const letters = words.map((word) => word.split(""));
console.log(letters);

const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 3.5,
      staggerChildren: 0.05,
    },
  },
};

const wordAnimation = {
  hidden: {
    opacity: 0,
    x: -18,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

export default function AboutMe() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "text">(
    "default",
  );

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const textHovered = () => {
    setCursorVariant("text");
  };
  const textNotHovered = () => {
    setCursorVariant("default");
  };

  return (
    <motion.div
      className="relative cursor-none overflow-hidden py-5 pr-0 text-xs text-neutral-200"
      variants={container}
      initial="hidden"
      animate="visible"
      onMouseEnter={textHovered}
      onMouseLeave={textNotHovered}
    >
      <AnimatePresence>
        {cursorVariant === "text" && (
          <motion.div
            id="magnifying-glass"
            initial={{ scale: 0, height: 75, width: 75 }}
            animate={{ scale: 1.3, height: 75, width: 75 }}
            exit={{ scale: 0 }}
            transition={{
              duration: 0.1,
              ease: "linear",
            }}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            className={`pointer-events-none fixed z-100 h-[75px] w-[75px] translate-x-[-50%] translate-y-[-50%] rounded-full bg-white mix-blend-difference`}
          />
        )}
      </AnimatePresence>
      <p className="flex cursor-none flex-wrap gap-1">
        {letters.map((word, i) => (
          <motion.span key={i} variants={wordAnimation} className={``}>
            {word}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
