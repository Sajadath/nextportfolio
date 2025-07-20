"use client";

import { motion } from "motion/react";

function Welcoming() {
  return (
    <motion.div
      initial={{ translateY: "100%" }}
      animate={{ translateY: "0%" }}
      exit={{ translateY: "-100%" }}
      transition={{
        duration: 1,
      }}
      className="fixed top-0 left-0 z-100 h-dvh w-screen overflow-hidden"
    >
      <motion.div
        initial={{ translateY: "100%" }}
        animate={{ translateY: "0%" }}
        exit={{ translateY: "-100%" }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 30,
          mass: 0.7,
        }}
        className="flex h-full w-full items-center justify-center bg-[#00ff88]"
      ></motion.div>
      <div className="absolute top-0 right-0 z-150 flex h-full w-full items-center justify-center gap-4 text-black">
        <motion.div
          initial={{ scale: 0, originY: 1 }}
          animate={{ scale: 1, originY: 1 }}
          transition={{
            delay: 1.2,
            duration: 1,
            ease: "easeInOut",
          }}
          className="w-1 bg-black py-10"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "easeInOut" }}
          className="text-center text-4xl font-bold"
        >
          Welcome to My Portfolio
        </motion.h1>
      </div>
    </motion.div>
  );
}

export default Welcoming;
