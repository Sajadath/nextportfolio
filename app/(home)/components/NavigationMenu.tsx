"use client";

import { TransitionLink } from "@/components/ui/TransitionLink";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { closeMenu } from "@/lib/slices/menuSlice";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";

function NavigationMenu() {
  const { isMenuOpen, links } = useAppSelector((state) => state.menu);
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
  if (isMenuOpen && (!links || links.length === 0))
    throw new Error(
      `No links available , ${links && links.length === 0 ? "links array in redux is empty" : null} ${!links && "links array is undefiend"} `,
    );
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 right-0 bottom-0 left-0 z-100 flex flex-col justify-center bg-gradient-to-b from-transparent to-white backdrop-blur-lg dark:to-black"
        >
          <div className="relative mx-auto p-20">
            <button
              onClick={() => dispatch(closeMenu())}
              className="hover:text-mainGreen hover:border-mainGreen absolute top-1 right-1 mb-5 cursor-pointer rounded-full border-2 border-gray-300/20 p-1 px-3 transition-all duration-300"
            >
              X
            </button>
            <ul className="flex flex-col gap-5 text-2xl">
              {links.map((link, index) => (
                <motion.li
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ duration: 0.5, delay: index * 0.25 }}
                  className="py-2"
                  key={link.href}
                >
                  <TransitionLink href={link.href}>{link.label}</TransitionLink>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NavigationMenu;
