import React from "react";
import localFont from "next/font/local";
const customFont = localFont({
  src: "../../fonts/JustAnotherHand-Regular.ttf",
  display: "swap",
});
export default function Footer() {
  return (
    <div
      className={`mt-10 border-t text-center text-3xl ${customFont.className}`}
    >
      Made by SajadAth Powered By Next.Js
    </div>
  );
}
