"use client";
import React, { useState } from "react";
import { IoFingerPrintSharp } from "react-icons/io5";
import {
  SiCreatereactapp,
  SiCss3,
  SiCssmodules,
  SiGoogle,
  SiHtml5,
  SiJavascript,
  SiLeaflet,
  SiNextdotjs,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiVite,
  SiWordpress,
} from "react-icons/si";
import Heading from "./Heading";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import InputDetection from "./Touchscreen";
import { AnimatePresence, motion } from "motion/react";

export default function Projects({
  projectsRef,
}: {
  projectsRef: React.RefObject<HTMLElement | null>;
}) {
  const [inputType, setInputType] = useState("mouse");
  const [additionalInfo, setAdditionalInfo] = useState<{
    shown: boolean;
    index: number | null;
  }>({
    shown: true,
    index: null,
  });

  const projects = [
    {
      title: " Hotel Website",
      techs: [
        { Icon: SiNextdotjs, name: "Next JS" },
        { Icon: SiReact, name: "React" },
        { Icon: SiTailwindcss, name: "Tailwind CSS" },
        { Icon: SiSupabase, name: "Supabase" },
        { Icon: IoFingerPrintSharp, name: "AuthJS" },
        { Icon: SiGoogle, name: "Google Auth" },
      ],
      link: "https://sajadathhotel.vercel.app",
      cover: "/wild-oasis.jpg",
      background: "bg-transparent",
    },
    {
      title: "Old Portfolio",
      techs: [
        { Icon: SiHtml5, name: "HTML5" },
        { Icon: SiJavascript, name: "JavaScript" },
        { Icon: SiCss3, name: "CSS3" },
      ],
      link: "https://sajadath.github.io/portfolio/",
      cover: "/old-portfolio.jpg",
      background: "bg-transparent",
    },
    {
      title: "SadrTell Demo Website",
      techs: [
        { Icon: SiReact, name: "React" },
        { Icon: SiVite, name: "Vite" },
        { Icon: SiTailwindcss, name: "Tailwind CSS" },
        { Icon: SiReactrouter, name: "React Router" },
        { Icon: SiRedux, name: "Redux" },
      ],
      link: "https://sadrtell.vercel.app",
      cover: "/demo-sadrtell.jpg",
      background: "bg-transparent",
    },
    {
      title: "Fast Pizza Order",
      techs: [
        { Icon: SiReact, name: "React" },
        { Icon: SiTailwindcss, name: "Tailwind CSS" },
        { Icon: SiVite, name: "Vite" },
        { Icon: SiRedux, name: "Redux" },
      ],
      link: "https://fastpizzasajadath.vercel.app/",
      cover: "/fastPizza.jpg",
      background: "bg-transparent",
    },
    {
      title: "Official SadrTell Website",
      techs: [
        { Icon: SiReact, name: "React" },
        { Icon: SiCss3, name: "CSS3" },
        { Icon: SiCssmodules, name: "CSS Modules" },
        { Icon: SiWordpress, name: "WordPress" },
        { Icon: SiVite, name: "Vite" },
      ],
      link: "https://sadrtell.ir",
      cover: "/sadrtell.jpg",
      background: "bg-transparent",
    },
    {
      title: "usePopCorn Website",
      techs: [
        { Icon: SiReact, name: "React" },
        { Icon: SiCss3, name: "CSS3" },
        { Icon: SiCreatereactapp, name: "Create React App" },
      ],
      link: "https://usepopcorn-beta-three.vercel.app/",
      cover: "/usepopcorn.jpg",
      background: "bg-transparent",
    },
    {
      title: "Small React Quiz App",
      techs: [
        { Icon: SiReact, name: "React" },
        { Icon: SiCss3, name: "CSS3" },
        { Icon: SiCreatereactapp, name: "Create React App" },
      ],
      link: "https://reactquiz-nine.vercel.app/",
      cover: "/react-small-quiz.jpg",
      background: "bg-transparent",
    },
    {
      title: "Small TodoList App",
      techs: [
        { Icon: SiReact, name: "React" },
        { Icon: SiCss3, name: "CSS3" },
        { Icon: SiCreatereactapp, name: "Create React App" },
      ],
      link: "https://todolist-zeta-eosin.vercel.app/",
      cover: "/todolist.jpg",
      background: "bg-transparent",
    },
    {
      title: "Trip Location , WorldWise",
      techs: [
        { Icon: SiReact, name: "React" },
        { Icon: SiVite, name: "Vite" },
        { Icon: SiCssmodules, name: "CSS Modules" },
        { Icon: SiLeaflet, name: "Leaflet" },
      ],
      link: "https://github.com/Sajadath/worldwise/tree/master",
      cover: "/worldwise.jpg",
      background: "bg-transparent",
    },
  ];
  return (
    <>
      <InputDetection inputType={inputType} setInputType={setInputType} />
      <section ref={projectsRef} id="projects" className="mt-5 py-10 sm:p-0">
        <Heading cyan={true}>Projects</Heading>
        <div className="mt-20 grid grid-cols-2 gap-5 px-9 sm:grid-cols-2">
          {projects.map((project, index) => {
            return (
              <Link target="_blank" href={project.link} key={index}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.2 * index,
                  }}
                  className={`${cn("p-[1px]", project.background)} rounded-lg`}
                >
                  <DirectionAwareHover
                    className="w-full cursor-pointer space-y-5"
                    imageUrl={project.cover}
                    inputType={inputType}
                  >
                    <div className="w-fit space-y-1 rounded-lg bg-black/50 p-1 sm:space-y-5 sm:p-4">
                      <h1 className="text-[8px] font-bold sm:text-xl md:text-2xl">
                        {project.title}
                      </h1>
                      <div className="flex items-center gap-2 sm:gap-5">
                        {project.techs.map((tech, index) => {
                          const { Icon, name } = tech;

                          return (
                            <div key={index} className="relative h-fit w-fit">
                              <Icon
                                onMouseEnter={() =>
                                  setAdditionalInfo({
                                    shown: true,
                                    index: index,
                                  })
                                }
                                onMouseLeave={() =>
                                  setAdditionalInfo({
                                    shown: false,
                                    index: null,
                                  })
                                }
                                className={`${additionalInfo.shown && additionalInfo.index == index ? "scale-125" : "scale-100"} h-3 w-3 transition-all duration-300 sm:h-5 sm:w-5 md:h-8 md:w-8`}
                              />
                              <AnimatePresence>
                                {additionalInfo.shown &&
                                index == additionalInfo.index ? (
                                  <motion.h3
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className={`absolute bottom-[120%] left-1/2 -translate-x-1/2 rounded-lg bg-black px-2 py-1 text-lg text-nowrap`}
                                  >
                                    {name}
                                  </motion.h3>
                                ) : null}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </DirectionAwareHover>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
