import localFont from "next/font/local";
import FooterText from "./FooterText";
const customFont = localFont({
  src: "../../../fonts/JustAnotherHand-Regular.ttf",
  display: "swap",
});
export default function Footer() {
  return (
    <footer className="relative border-t border-black/5 px-6 pt-10 pb-6 sm:px-10 dark:border-white/5">
      <FooterText handwritingClassName={customFont.className} />
    </footer>
  );
}
