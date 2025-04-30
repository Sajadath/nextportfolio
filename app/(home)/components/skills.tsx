"use client";
import React from "react";
import Heading from "./Heading";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import {
  SiCss3,
  SiCssmodules,
  SiGit,
  SiGitconnected,
  SiGithub,
  SiGitlab,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
} from "react-icons/si";

export default function skills({
  skillsRef,
}: {
  skillsRef: React.RefObject<HTMLElement | null>;
}) {
  const skills = [
    {
      text: "React",
      Icon: SiReact,
    },
    {
      text: "Next.Js",
      Icon: SiNextdotjs,
    },
    {
      text: "TailWind",
      Icon: SiTailwindcss,
    },
    { text: "Redux", Icon: SiRedux },
    {
      text: "Supabase",
      Icon: SiSupabase,
    },
    {
      text: "JavaScript",
      Icon: SiJavascript,
    },
    {
      text: "CSS",
      Icon: SiCss3,
    },
    {
      text: "CSS Modules",
      Icon: SiCssmodules,
    },
    {
      text: "Next.Js",
      Icon: SiNextdotjs,
    },
    {
      text: "HTML5",
      Icon: SiHtml5,
    },
    { text: "React Router", Icon: SiReactrouter },
    {
      text: "ReactQuery",
      Icon: SiReactquery,
    },
    {
      text: "Resful APIs",
      Icon: SiGitconnected,
    },
    {
      text: "Git",
      Icon: SiGit,
    },
    { text: "GitHub", Icon: SiGithub },
    { text: "Gitlab", Icon: SiGitlab },
  ];
  return (
    <section id="skills" ref={skillsRef} className="mx-auto max-w-5xl px-8">
      <Heading>Skills</Heading>
      <HoverEffect items={skills} />
    </section>
  );
}
