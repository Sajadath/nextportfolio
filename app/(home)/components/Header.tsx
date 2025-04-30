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
      <h1 className="-rotate-2 text-center text-2xl font-bold underline decoration-[rgb(93_24_220)] underline-offset-8 sm:text-left">
        Sajad Atharyan 🧑🏻‍💻
      </h1>
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
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </div>
    </header>
  );
}
