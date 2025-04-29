import React from "react";
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

export default function Projects() {
  const projects = [
    {
      title: "The Wild Oasis Hotel Website",
      tech: [
        SiNextdotjs,
        SiReact,
        SiTailwindcss,
        SiSupabase,
        IoFingerPrintSharp,
        SiGoogle,
      ],
      link: "https://sajadathhotel.vercel.app",
      cover: "/wild-oasis.jpg",
      background: "bg-transparent",
    },
    {
      title: "Old Portfolio",
      tech: [SiHtml5, SiJavascript, SiCss3],
      link: "https://sajadath.github.io/portfolio/",
      cover: "/old-portfolio.jpg",
      background: "bg-transparent",
    },
    {
      title: "SadrTell Demo Website",
      tech: [SiReact, SiVite, SiTailwindcss, SiReactrouter, SiRedux],
      link: "https://sadrtell.vercel.app",
      cover: "/demo-sadrtell.jpg",
      background: "bg-transparent",
    },
    {
      title: "Fast Pizza Order",
      tech: [SiReact, SiTailwindcss, SiVite, SiRedux],
      link: "https://fastpizzasajadath.vercel.app/",
      cover: "/fastPizza.jpg",
      background: "bg-transparent",
    },
    {
      title: "Official SadrTell Website",
      tech: [SiReact, SiCss3, SiCssmodules, SiWordpress, SiVite],
      link: "https://sadrtell.ir",
      cover: "/sadrtell.jpg",
      background: "bg-transparent",
    },
    {
      title: "usePopCorn Website",
      tech: [SiReact, SiCss3, SiCreatereactapp],
      link: "https://usepopcorn-beta-three.vercel.app/",
      cover: "/usepopcorn.jpg",
      background: "bg-transparent",
    },
    {
      title: "Small React Quiz App",
      tech: [SiReact, SiCss3, SiCreatereactapp],
      link: "https://reactquiz-nine.vercel.app/",
      cover: "/react-small-quiz.jpg",
      background: "bg-transparent",
    },
    {
      title: "Small TodoList App",
      tech: [SiReact, SiCss3, SiCreatereactapp],
      link: "https://todolist-zeta-eosin.vercel.app/",
      cover: "/todolist.jpg",
      background: "bg-transparent",
    },
    {
      title: "Trip Location , WorldWise",
      tech: [SiReact, SiVite, SiCssmodules, SiLeaflet],
      link: "https://github.com/Sajadath/worldwise/tree/master",
      cover: "/worldwise.jpg",
      background: "bg-transparent",
    },
  ];
  return (
    <div className="mt-5 py-10 sm:p-0">
      <Heading cyan={true}>Projects</Heading>
      <div className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((project, index) => {
          return (
            <Link target="_blank" href={project.link} key={index}>
              <div className={cn("p-[1px]", project.background)}>
                <DirectionAwareHover
                  className="w-full cursor-pointer space-y-5"
                  imageUrl={project.cover}
                >
                  <div className="w-fit space-y-5 rounded-lg bg-black/50 p-4">
                    <h1 className="text-2xl font-bold">{project.title}</h1>
                    <div className="flex items-center gap-5">
                      {project.tech.map((Icon, index) => {
                        return <Icon className="h-8 w-8" key={index} />;
                      })}
                    </div>
                  </div>
                </DirectionAwareHover>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
