"use client";

import { motion } from "motion/react";

function FooterText() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <p className="py-2">Made by SajadAth Powered By Next.Js</p>
    </motion.div>
  );
}

export default FooterText;
