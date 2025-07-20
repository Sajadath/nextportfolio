"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { IoCodeSlash } from "react-icons/io5";
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
      <motion.div
        initial={{ opacity: 0, scale: 1.5, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        className="text-center text-2xl font-bold sm:text-left"
      >
        <div className="flex items-center justify-center gap-2">
          Sajad Atharyan <IoCodeSlash className="size-7 animate-pulse" />
        </div>
        <div className="my-1 h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </motion.div>
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
