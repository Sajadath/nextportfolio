import AboutMe from "./AboutMe";
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
        <AboutMe />
        <div className="mx-auto mt-6 flex w-fit items-center gap-4">
          <ModalOpener />
          <ViewMoreButton />
        </div>
      </div>
    </>
  );
}
