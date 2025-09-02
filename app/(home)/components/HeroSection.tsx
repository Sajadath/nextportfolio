import AboutMe from "./AboutMe";
import FadedLine from "./FadedLine";
import HiName from "./HiName";
import ModalOpener from "./ModalOpener";
import TypedText from "./TypedText";
import ViewMoreButton from "./ViewMoreButton";

export default function HeroSection() {
  return (
    <>
      <div className="px-8">
        <HiName />
        <TypedText>Nice To Meet You</TypedText>
        <FadedLine startFrom="left" />
        <AboutMe />
        <FadedLine startFrom="right" />
        <div className="mx-auto mt-6 flex w-fit items-center gap-4">
          <ModalOpener />
          <ViewMoreButton />
        </div>
      </div>
    </>
  );
}
