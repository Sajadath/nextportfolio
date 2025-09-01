"use client";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { closeMenu, setIsInTransition } from "@/lib/slices/menuSlice";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathName === href) return;

    dispatch(setIsInTransition(true));
    dispatch(closeMenu());
    await sleep(500);
    router.push(href);
    await sleep(1000);
    dispatch(setIsInTransition(false));
  };

  return (
    <div>
      <Link
        className={`${pathName === href ? "cursor-not-allowed font-bold" : ""} hover:text-mainGreen relative border-black transition-all duration-300 dark:border-white`}
        onClick={handleLinkClick}
        href={href}
        {...props}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span
          className={`inline-block text-center transition-all duration-300 ${pathName === href && "text-5xl"} ${isHovered ? "translate-x-6" : ""}`}
        >
          {children}
        </span>
      </Link>
    </div>
  );
};
