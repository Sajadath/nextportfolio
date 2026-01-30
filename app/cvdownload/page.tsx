"use client";
import { useEffect } from "react";

function Page() {
  useEffect(() => {
    const link = document.createElement("a");
    link.href = "/SajadAth-cv-en.pdf";
    link.download = "SajadAth-cv-en.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return null;
}

export default Page;
