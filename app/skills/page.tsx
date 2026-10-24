import SkillsShowcase from "@/app/(home)/components/SkillsShowcase";
import TechMarquee from "@/app/(home)/components/TechMarquee";

function SkillsPage() {
  return (
    <div className="pt-16 sm:pt-20">
      <SkillsShowcase index="//" />
      <TechMarquee />
    </div>
  );
}

export default SkillsPage;
