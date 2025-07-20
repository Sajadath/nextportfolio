"use client";
import { useEffect, useState } from "react";
import Welcoming from "./components/Welcoming";
import PageContent from "./components/PageContent";
import { AnimatePresence } from "motion/react";

export default function Page() {
  const [welcomeEnds, setWelcomeEnds] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeEnds(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-black">
      <AnimatePresence>{!welcomeEnds && <Welcoming />}</AnimatePresence>

      {welcomeEnds && <PageContent />}
    </div>
  );
}
