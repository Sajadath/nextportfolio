import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="min-h-[80dvh] content-center">
      <div className="relative px-8">
        <h1 className="text-4xl font-bold lg:text-7xl">
          Hi, <br />
          <span className="underline underline-offset-8">
            I&apos;m Sajad
            <br />
          </span>
        </h1>
        <div className="w-fit text-4xl font-bold lg:text-7xl">
          <h2 className="writingAnimation">Nice To Meet You</h2>
        </div>
        <p className="py-5 pr-0 text-xs text-neutral-500 sm:text-lg 2xl:pr-30">
          I am a Front-End Developer with a strong passion for creating
          interactive, user-friendly, and visually appealing web applications.
          My focus is on crafting seamless user experiences by combining modern
          design principles with cutting-edge technologies. I enjoy solving
          complex problems, learning new tools, and continuously improving my
          skills to deliver high-quality solutions that make a difference.
        </p>
        <Link
          className="syledButton mx-auto block w-fit font-semibold text-black hover:text-white sm:mx-0"
          href={"mailto:sajadath1@gmail.com"}
        >
          Contact Me
        </Link>
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
