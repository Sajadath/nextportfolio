import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/skills";

export default function Page() {
  return (
    <div className="min-h-dvh bg-black">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <HeroSection />
      </div>
      <div className="mx-auto mt-0 max-w-7xl sm:mt-8">
        <Skills />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}
