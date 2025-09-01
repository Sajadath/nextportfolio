"use client";
import { useEffect, useState } from "react";
import Header from "./Header";
import { usePathname } from "next/navigation";

function HeaderProvider() {
  const [welcomeEnds, setWelcomeEnds] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeEnds(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  return pathName === "/" && welcomeEnds ? (
    <Header />
  ) : (
    pathName !== "/" && <Header />
  );
}

export default HeaderProvider;
