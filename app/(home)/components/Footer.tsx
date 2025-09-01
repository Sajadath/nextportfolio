import localFont from "next/font/local";
import FooterText from "./FooterText";
const customFont = localFont({
  src: "../../../fonts/JustAnotherHand-Regular.ttf",
  display: "swap",
});
export default function Footer() {
  return (
    <footer className={`mt-10 text-center text-3xl ${customFont.className}`}>
      <FooterText />
    </footer>
  );
}
