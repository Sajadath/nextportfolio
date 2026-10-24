"use client";

import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import {
  closeMenu,
  setIsInTransition,
  setTransitionTarget,
} from "@/lib/slices/menuSlice";
import { useLenis } from "lenis/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function usePageTransition() {
  const pathName = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const lenis = useLenis();

  return useCallback(
    async (href: string) => {
      dispatch(closeMenu());
      if (pathName === href) return;

      dispatch(setTransitionTarget(href));
      dispatch(setIsInTransition(true));
      await sleep(950);
      router.push(href);
      lenis?.scrollTo(0, { immediate: true, force: true });
      await sleep(750);
      dispatch(setIsInTransition(false));
    },
    [dispatch, lenis, pathName, router],
  );
}
