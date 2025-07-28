"use client";
import { motion } from "framer-motion";

const paragraph =
  "I am a Front-End Developer with a strong passion for creating interactive, user-friendly, and visually appealing web applications. My focus is on crafting seamless user experiences by combining modern design principles with cutting-edge technologies. I enjoy solving complex problems, learning new tools, and continuously improving my skills to deliver high-quality solutions that make a difference.";

const words = paragraph.split(" ");

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
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 0.15,
      ease: "easeOut",
    },
  },
};

export default function AboutMe() {
  return (
    <motion.div
      className="overflow-hidden py-5 pr-0 text-xs text-neutral-200"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <p className="flex flex-wrap gap-1">
        {words.map((word, i) => (
          <motion.span key={i} variants={wordAnimation}>
            {word}
          </motion.span>
        ))}
      </p>
    </motion.div>
  );
}
