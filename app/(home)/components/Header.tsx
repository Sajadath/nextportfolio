"use client";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { SiGithub, SiInstagram, SiTelegram } from "react-icons/si";

export default function Header() {
  const socials = [
    {
      link: "https://t.me/sajadath",
      label: "Telegram",
      icon: SiTelegram,
    },
    {
      link: "https://github.com/sajadath",
      label: "Github",
      icon: SiGithub,
    },
    {
      link: "https://www.instagram.com/sajad.ath",
      label: "InstaGram",
      icon: SiInstagram,
    },
  ];
  return (
    <header
      id="home"
      className="flex h-[20dvh] w-full flex-col-reverse items-center justify-center gap-4 py-10 sm:flex-row sm:justify-around sm:space-y-0"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 1.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="text-center text-2xl font-bold underline decoration-[rgb(93_24_220)] underline-offset-8 sm:text-left"
      >
        Sajad Atharyan 🧑🏻‍💻
      </motion.h1>
      <div className="flex items-center gap-5">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link
              className="transition-transform duration-300 hover:scale-[175%]"
              key={index}
              href={social.link}
              aria-label={social.label}
              target="_blank"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.5, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.8,
                  ease: "easeOut",
                }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
            </Link>
          );
        })}
      </div>
    </header>
  );
}
