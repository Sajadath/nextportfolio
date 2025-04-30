"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface NavigationMenuProps {
  checkedIndex: number | null;
  homeRef: React.RefObject<HTMLElement | null>;
  skillsRef: React.RefObject<HTMLElement | null>;
  projectsRef: React.RefObject<HTMLElement | null>;
  setCheckedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
}

export default function NavigationMenu({
  checkedIndex,
  setCheckedIndex,
  homeRef,
  skillsRef,
  projectsRef,
  scrollToSection,
}: NavigationMenuProps) {
  const [openedNavbar, setOpenedNavbar] = useState(false);
  const navBarMenu = ["home", "skills", "projects"];

  const handleCheckboxChange = (index: number) => {
    if (checkedIndex !== index) {
      setCheckedIndex(index);

      if (index === 0) scrollToSection(homeRef);
      if (index === 1) scrollToSection(skillsRef);
      if (index === 2) scrollToSection(projectsRef);
    }
  };

  return (
    <>
      <div className="fixed top-[2%] right-4 z-50 h-fit w-fit bg-transparent">
        <button
          onClick={() => setOpenedNavbar(!openedNavbar)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-[#00ff88] bg-transparent text-xl font-bold text-[#00ff88] shadow-[0_0_10px_#00ff88,0_0_20px_#00ff88] transition-all duration-300 hover:shadow-[0_0_15px_#00ff88,0_0_250px_#00ff88] focus:outline-none active:scale-200"
        >
          <GiHamburgerMenu className="h-6 w-6" />
        </button>
      </div>
      <nav
        className={`fixed top-1/2 z-50 -translate-y-1/2 rounded-lg bg-black/70 p-4 pr-4 backdrop-blur-xs transition-all duration-700 2xl:bg-transparent ${!openedNavbar ? "right-[-50%]" : "right-4 sm:right-9"}`}
      >
        <ul className="flex flex-col gap-10">
          {navBarMenu.map((menu, index) => (
            <li key={index}>
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  checked={checkedIndex === index}
                  onChange={() => handleCheckboxChange(index)}
                />
                <div className="checkmark">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      d="M20 6L9 17L4 12"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
                <span className="label">{menu}</span>
              </label>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
