"use client";
import { usePageTransition } from "@/lib/hooks/usePageTransition";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import AlreadyInThePageLine from "./AlreadyInThePageLine";

export const TransitionLink = ({
  children,

  href,
  ...props
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const pathName = usePathname();
  const navigate = usePageTransition();
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(href);
  };

  return (
    <div>
      <Link
        className={`${pathName === href ? "cursor-not-allowed font-bold" : ""} group hover:text-mainGreen relative border-black transition-all duration-300 dark:border-white`}
        onClick={handleLinkClick}
        href={href}
        {...props}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={`relative inline-block px-3 text-center transition-all duration-300 ${pathName === href && "text-5xl"} ${isHovered ? "translate-x-6" : ""}`}
        >
          {children}
          {pathName === href && (
            <>
              <AlreadyInThePageLine />
            </>
          )}
        </span>
      </Link>
    </div>
  );
};
