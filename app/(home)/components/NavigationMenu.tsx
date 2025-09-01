"use client";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { closeMenu } from "@/lib/slices/menuSlice";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

function NavigationMenu() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
  ];
  const isMenuOpen = useAppSelector((state) => state.menu.isMenuOpen);
  const dispatch = useAppDispatch();
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

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 right-0 bottom-0 left-0 z-100 flex flex-col justify-center bg-gradient-to-b from-transparent to-white backdrop-blur-lg dark:to-black"
        >
          <div className="relative mx-auto px-30">
            <button
              onClick={() => dispatch(closeMenu())}
              className="hover:text-mainGreen hover:border-mainGreen absolute right-0 bottom-full mb-5 cursor-pointer rounded-full border-2 border-gray-300 p-1 px-3 transition-all duration-300"
            >
              X
            </button>
            <ul className="flex flex-col gap-5 text-2xl">
              {links.map((link) => (
                <li className="py-2" key={link.href}>
                  <TransitionLink href={link.href}>{link.label}</TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NavigationMenu;
