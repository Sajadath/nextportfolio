"use client";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { skills } from "@/data/skillsData";
import React from "react";
import Heading from "./Heading";

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-8">
      <Heading>Skills</Heading>
      <HoverEffect items={skills} />
    </section>
  );
}
