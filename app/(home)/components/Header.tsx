"use client";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAppSelector } from "@/lib/hooks/reduxHooks";
import { usePageTransition } from "@/lib/hooks/usePageTransition";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoCodeSlash } from "react-icons/io5";
import { SiGithub, SiInstagram, SiTelegram } from "react-icons/si";
import NavigationMenuButton from "./NavigationMenuButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
];

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

  const pathName = usePathname();
  const navigate = usePageTransition();
  const isMenuOpen = useAppSelector((state) => state.menu.isMenuOpen);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 200 && !isMenuOpen);
    setScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -110 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 right-0 left-0 z-80 px-4 pt-4 sm:px-6"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border px-4 py-3 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "border-black/10 bg-white/70 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-black/60"
            : "border-transparent bg-transparent"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="group flex items-center gap-2 text-base font-bold whitespace-nowrap text-black sm:text-xl dark:text-white"
          >
            Sajad Atharyan
            <IoCodeSlash className="group-hover:text-mainGreen size-5 animate-pulse transition-colors sm:size-6" />
          </Link>
        </motion.div>

        <nav className="hidden items-center gap-1 rounded-full border border-black/5 p-1 md:flex dark:border-white/5">
          {navLinks.map((link) => {
            const active = pathName === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.href);
                }}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "text-black"
                    : "text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="bg-mainGreen absolute inset-0 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden items-center gap-4 sm:flex">
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  className="transition-transform duration-300 hover:scale-[150%]"
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
                    <Icon className="hover:fill-mainGreen h-4 w-4 fill-black transition-colors dark:fill-white" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
          <ThemeToggle />
          <NavigationMenuButton />
        </div>
      </div>
    </motion.header>
  );
}
