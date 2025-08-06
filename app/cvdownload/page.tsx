"use client";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = "/Sajadath-Cv.pdf";
    link.download = "Sajadath-Cv.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return null;
}

export default Page;
