import AboutMe from "./AboutMe";
import FadedLine from "./FadedLine";
import HiName from "./HiName";
import ModalOpener from "./ModalOpener";
import ScrollForMore from "./ScrollForMore";
import TypedText from "./TypedText";

export default function HeroSection() {
  return (
    <div className="min-h-[80dvh] content-center">
      <div className="px-8">
        <HiName />
        <TypedText>Nice To Meet You</TypedText>
        <FadedLine />
        <AboutMe />
        <FadedLine />
        <div className="mt-6">
          <ModalOpener />
        </div>
      </div>
      <ScrollForMore />
    </div>
  );
}
