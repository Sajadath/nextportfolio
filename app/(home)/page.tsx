"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/reduxHooks";
import { setMountedTime } from "@/lib/slices/homePageSlice";
import { AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import PageContent from "./components/PageContent";
import Welcoming from "./components/Welcoming";

export default function Page() {
  const [showWelcome, setShowWelcome] = useState(false);
  const mountedTime = useAppSelector((state) => state.homePage.mountedTime);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (mountedTime === 0) {
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
        dispatch(setMountedTime(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, mountedTime]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && <Welcoming key="welcome" />}
      </AnimatePresence>

      {!showWelcome && <PageContent />}
    </>
  );
}
