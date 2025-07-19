import AboutMe from "./AboutMe";
import ModalOpener from "./ModalOpener";

export default function HeroSection() {
  return (
    <div className="min-h-[80dvh] content-center">
      <div className="relative px-8">
        <div className="relative py-4">
          <h1 className="text-4xl font-bold lg:text-7xl">
            Hi, <br />
            <span className="text-5xl underline underline-offset-8">
              I&apos;m Sajad
              <br />
            </span>
          </h1>
        </div>

        <div className="w-fit text-4xl font-bold lg:text-7xl">
          <h2 className="writingAnimation">Nice To Meet You</h2>
        </div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
        <AboutMe />
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
        <div className="my-3">
          <ModalOpener />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-3 py-10">
        <p className="text-xs">Scroll Down For More Info</p>
        <div
          className="scrolldown"
          style={{ "--color": "skyblue" } as React.CSSProperties}
        >
          <div className="chevrons">
            <div className="chevrondown"></div>
            <div className="chevrondown"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
