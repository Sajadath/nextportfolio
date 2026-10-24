import CursorLogo from "@/components/ui/CursorLogo";
import type { ElementType } from "react";
import { GrStorage } from "react-icons/gr";
import { LuSparkles } from "react-icons/lu";
import { MdAccessibilityNew, MdDevices } from "react-icons/md";
import {
  SiClaude,
  SiCss3,
  SiCssmodules,
  SiEslint,
  SiFigma,
  SiGit,
  SiGitconnected,
  SiGithub,
  SiGithubcopilot,
  SiGitlab,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLighthouse,
  SiNextdotjs,
  SiNpm,
  SiOpenai,
  SiPerplexity,
  SiPrettier,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTestinglibrary,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
} from "react-icons/si";
import { TbBrandFramerMotion, TbPrompt, TbSeo } from "react-icons/tb";

export const skillCategories = [
  "AI & Productivity",
  "Languages",
  "Frameworks & Libraries",
  "State & Data",
  "Styling & Motion",
  "Testing & Quality",
  "Tooling",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export const skills = [
  {
    text: "React",
    Icon: SiReact,
    category: "Frameworks & Libraries",
  },
  {
    text: "Next.Js",
    Icon: SiNextdotjs,
    category: "Frameworks & Libraries",
  },
  { text: "TypeScript", Icon: SiTypescript, category: "Languages" },
  {
    text: "TailWind",
    Icon: SiTailwindcss,
    category: "Styling & Motion",
  },
  { text: "Cursor", Icon: CursorLogo, category: "AI & Productivity" },
  { text: "Zustand", Icon: GrStorage, category: "State & Data" },
  {
    text: "Framer Motion",
    Icon: TbBrandFramerMotion,
    category: "Styling & Motion",
  },
  {
    text: "GitHub Copilot",
    Icon: SiGithubcopilot,
    category: "AI & Productivity",
  },
  { text: "Redux", Icon: SiRedux, category: "State & Data" },
  {
    text: "Supabase",
    Icon: SiSupabase,
    category: "State & Data",
  },
  { text: "Three.js", Icon: SiThreedotjs, category: "Frameworks & Libraries" },
  {
    text: "JavaScript",
    Icon: SiJavascript,
    category: "Languages",
  },
  { text: "ChatGPT", Icon: SiOpenai, category: "AI & Productivity" },
  {
    text: "CSS",
    Icon: SiCss3,
    category: "Styling & Motion",
  },
  { text: "Vitest", Icon: SiVitest, category: "Testing & Quality" },
  {
    text: "CSS Modules",
    Icon: SiCssmodules,
    category: "Styling & Motion",
  },
  { text: "Claude", Icon: SiClaude, category: "AI & Productivity" },
  {
    text: "HTML5",
    Icon: SiHtml5,
    category: "Languages",
  },
  { text: "shadcn/ui", Icon: SiShadcnui, category: "Styling & Motion" },
  {
    text: "React Router",
    Icon: SiReactrouter,
    category: "Frameworks & Libraries",
  },
  { text: "Gemini", Icon: SiGooglegemini, category: "AI & Productivity" },
  {
    text: "ReactQuery",
    Icon: SiReactquery,
    category: "State & Data",
  },
  { text: "Jest", Icon: SiJest, category: "Testing & Quality" },
  {
    text: "RESTful APIs",
    Icon: SiGitconnected,
    category: "State & Data",
  },
  { text: "Prompt Engineering", Icon: TbPrompt, category: "AI & Productivity" },
  { text: "Sass", Icon: SiSass, category: "Styling & Motion" },
  {
    text: "Testing Library",
    Icon: SiTestinglibrary,
    category: "Testing & Quality",
  },
  {
    text: "Git",
    Icon: SiGit,
    category: "Tooling",
  },
  { text: "Vercel AI SDK", Icon: LuSparkles, category: "AI & Productivity" },
  { text: "Lighthouse", Icon: SiLighthouse, category: "Testing & Quality" },
  { text: "GitHub", Icon: SiGithub, category: "Tooling" },
  { text: "Perplexity", Icon: SiPerplexity, category: "AI & Productivity" },
  {
    text: "Accessibility",
    Icon: MdAccessibilityNew,
    category: "Testing & Quality",
  },
  { text: "Gitlab", Icon: SiGitlab, category: "Tooling" },
  { text: "Responsive Design", Icon: MdDevices, category: "Styling & Motion" },
  { text: "Vite", Icon: SiVite, category: "Tooling" },
  { text: "SEO", Icon: TbSeo, category: "Testing & Quality" },
  { text: "Figma", Icon: SiFigma, category: "Tooling" },
  { text: "Vercel", Icon: SiVercel, category: "Tooling" },
  { text: "npm", Icon: SiNpm, category: "Tooling" },
  { text: "ESLint", Icon: SiEslint, category: "Tooling" },
  { text: "Prettier", Icon: SiPrettier, category: "Tooling" },
] satisfies {
  text: string;
  Icon: ElementType;
  category: SkillCategory;
}[];
