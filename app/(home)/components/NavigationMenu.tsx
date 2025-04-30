"use client";
import React, { useState } from "react";

interface NavigationMenuProps {
  homeRef: React.RefObject<HTMLElement | null>;
  skillsRef: React.RefObject<HTMLElement | null>;
  projectsRef: React.RefObject<HTMLElement | null>;
  scrollToSection: (ref: React.RefObject<HTMLElement | null>) => void;
}

export default function NavigationMenu({
  homeRef,
  skillsRef,
  projectsRef,
  scrollToSection,
}: NavigationMenuProps) {
  const [checkedIndex, setCheckedIndex] = useState<number | null>(0);
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
    <nav className="fixed top-1/2 right-10 hidden -translate-y-1/2 2xl:block">
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
  );
}
