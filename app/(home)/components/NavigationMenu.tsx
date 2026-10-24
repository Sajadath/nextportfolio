"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { usePageTransition } from "@/lib/hooks/usePageTransition";
import { closeMenu } from "@/lib/slices/menuSlice";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const ease = [0.76, 0, 0.24, 1] as const;

const socials = [
  { label: "Telegram", link: "https://t.me/sajadath" },
  { label: "GitHub", link: "https://github.com/Sajadath" },
  { label: "Instagram", link: "https://www.instagram.com/sajad.ath" },
];

function NavigationMenu() {
  const { isMenuOpen, links } = useAppSelector((state) => state.menu);
  const dispatch = useAppDispatch();
  const navigate = usePageTransition();
  const pathName = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeMenu());
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [dispatch]);

  useEffect(() => {
    if (isMenuOpen) lenis?.stop();
    else lenis?.start();
  }, [isMenuOpen, lenis]);

  if (isMenuOpen && (!links || links.length === 0))
    throw new Error(
      `No links available , ${links && links.length === 0 ? "links array in redux is empty" : null} ${!links && "links array is undefiend"} `,
    );

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key="menu"
          className="fixed inset-0 z-100 flex flex-col overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-0 bg-white dark:bg-neutral-950"
          >
            <div className="bg-grid absolute inset-0" />
            <div className="dark:bg-mainGreen/10 absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-emerald-300/30 blur-[120px]" />
          </motion.div>

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between px-6 py-8 sm:px-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-center justify-between font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase"
            >
              <span>Navigation</span>
              <button
                onClick={() => dispatch(closeMenu())}
                className="hover:text-mainGreen hover:border-mainGreen cursor-pointer rounded-full border-2 border-gray-300/20 px-4 py-2 text-black transition-all duration-300 dark:text-white"
              >
                Close ✕
              </button>
            </motion.div>

            <ul className="flex flex-col">
              {links.map((link, index) => {
                const active = pathName === link.href;
                return (
                  <li
                    key={link.href}
                    className="overflow-hidden border-b border-black/10 dark:border-white/10"
                  >
                    <motion.a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(link.href);
                      }}
                      initial={{ y: "100%" }}
                      animate={{
                        y: "0%",
                        transition: {
                          duration: 0.8,
                          delay: 0.3 + index * 0.08,
                          ease,
                        },
                      }}
                      exit={{
                        y: "-100%",
                        transition: {
                          duration: 0.4,
                          delay: index * 0.04,
                          ease,
                        },
                      }}
                      className="group flex items-center justify-between py-4 sm:py-6"
                    >
                      <span className="flex items-baseline gap-4 sm:gap-8">
                        <span className="font-mono text-xs text-neutral-500 sm:text-sm">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-5xl font-bold tracking-tight transition-all duration-500 group-hover:translate-x-4 sm:text-7xl lg:text-8xl ${
                            active
                              ? "text-gradient"
                              : "group-hover:text-mainGreen text-black dark:text-white"
                          }`}
                        >
                          {link.label}
                        </span>
                      </span>
                      <FiArrowUpRight className="group-hover:text-mainGreen size-8 -translate-x-4 text-neutral-400 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:rotate-45 group-hover:opacity-100 sm:size-12" />
                    </motion.a>
                  </li>
                );
              })}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex flex-col gap-4 text-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <a
                href="mailto:Sajadath1@gmail.com"
                className="hover:text-mainGreen text-black transition-colors dark:text-white"
              >
                Sajadath1@gmail.com
              </a>
              <div className="flex gap-6">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.link}
                    target="_blank"
                    className="hover:text-mainGreen text-neutral-500 transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NavigationMenu;
