"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { skillCategories, skills } from "@/data/skillsData";
import { motion } from "motion/react";
import dynamic from "next/dynamic";

const SkillsSphere = dynamic(() => import("@/components/three/SkillsSphere"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full place-items-center">
      <div className="border-mainGreen size-10 animate-spin rounded-full border-2 border-t-transparent" />
    </div>
  ),
});

export default function SkillsShowcase({ index = "02" }: { index?: string }) {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10 md:py-40"
    >
      <SectionHeading
        index={index}
        eyebrow="Skills & Tools"
        title="My digital"
        accent="toolbox."
        description="The technologies I reach for every day to design, build and ship fast, accessible and delightful interfaces — including the AI tools that speed up my workflow. Grab the globe to spin it."
      />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[380px] sm:h-[520px] lg:sticky lg:top-28"
        >
          <div
            aria-hidden
            className="dark:bg-mainGreen/15 absolute inset-[15%] rounded-full bg-emerald-300/25 blur-[90px]"
          />
          <SkillsSphere />
        </motion.div>

        <div className="space-y-5">
          {skillCategories.map((category, ci) => {
            const items = skills.filter((s) => s.category === category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: ci * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <SpotlightCard>
                  <div className="p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-black dark:text-white">
                        {category}
                      </h3>
                      <span className="font-mono text-xs text-neutral-500">
                        {String(items.length).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {items.map((skill, i) => {
                        const Icon = skill.Icon;
                        return (
                          <motion.div
                            key={skill.text}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.4,
                              delay: 0.2 + i * 0.06,
                            }}
                            whileHover={{ y: -4 }}
                            className="group/chip hover:border-mainGreen/60 flex items-center gap-2 rounded-xl border border-black/10 bg-black/[0.02] px-3.5 py-2 transition-colors duration-300 hover:bg-emerald-500/5 dark:border-white/10 dark:bg-white/[0.03]"
                          >
                            <Icon className="group-hover/chip:text-mainGreen size-4 text-neutral-700 transition-colors duration-300 dark:text-neutral-300" />
                            <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                              {skill.text}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
