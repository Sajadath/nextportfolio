"use client";
import { motion } from "motion/react";

function AboutMe() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 50 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 4.7, ease: "easeOut" }}
      className="overflow-hidden py-5 pr-0 text-xs text-neutral-200"
    >
      <p>
        I am a Front-End Developer with a strong passion for creating
        interactive, user-friendly, and visually appealing web applications. My
        focus is on crafting seamless user experiences by combining modern
        design principles with cutting-edge technologies. I enjoy solving
        complex problems, learning new tools, and continuously improving my
        skills to deliver high-quality solutions that make a difference.
      </p>
    </motion.div>
  );
}

export default AboutMe;
