"use client";

import Magnetic from "@/components/ui/Magnetic";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { SiGithub, SiInstagram, SiTelegram } from "react-icons/si";
import ModalOpener from "./ModalOpener";

const socials = [
  { label: "Telegram", link: "https://t.me/sajadath", Icon: SiTelegram },
  { label: "GitHub", link: "https://github.com/Sajadath", Icon: SiGithub },
  {
    label: "Instagram",
    link: "https://www.instagram.com/sajad.ath",
    Icon: SiInstagram,
  },
];

export default function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const lineOneX = useTransform(scrollYProgress, [0, 1], ["-15%", "0%"]);
  const lineTwoX = useTransform(scrollYProgress, [0, 1], ["15%", "0%"]);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden px-6 py-28 sm:px-10 md:py-40"
    >
      <div
        aria-hidden
        className="dark:bg-mainGreen/15 pointer-events-none absolute -bottom-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-300/30 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-neutral-500 uppercase"
        >
          <span className="dark:text-mainGreen text-emerald-600">04</span>
          <span className="dark:bg-mainGreen h-px w-12 bg-emerald-600" />
          Get in touch
        </motion.p>

        <h2 className="text-[13vw] leading-[0.9] font-bold tracking-tighter text-black md:text-[9vw] dark:text-white">
          <motion.span style={{ x: lineOneX }} className="block">
            Let&apos;s build
          </motion.span>
          <motion.span style={{ x: lineTwoX }} className="text-gradient block">
            together.
          </motion.span>
        </h2>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="max-w-md text-neutral-600 dark:text-neutral-400">
              Have a project in mind, a role to fill, or just want to say hi? My
              inbox is always open.
            </p>
            <a
              href="mailto:Sajadath1@gmail.com"
              className="group hover:text-mainGreen mt-4 inline-flex items-center gap-2 text-2xl font-bold text-black transition-colors sm:text-4xl dark:text-white"
            >
              Sajadath1@gmail.com
              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
            {socials.map(({ label, link, Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 * i,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
              >
                <Magnetic strength={0.5}>
                  <a
                    href={link}
                    target="_blank"
                    aria-label={label}
                    className="hover:bg-mainGreen grid size-14 place-items-center rounded-full border border-black/15 text-black transition-colors duration-300 hover:border-transparent hover:text-black dark:border-white/15 dark:text-white dark:hover:text-black"
                  >
                    <Icon className="size-5" />
                  </a>
                </Magnetic>
              </motion.div>
            ))}
            <Magnetic>
              <ModalOpener className="bg-mainGreen border-none px-8 py-4 font-bold text-black shadow-[0_0_40px_rgba(0,255,136,0.4)] hover:bg-[hsl(261deg_80%_48%)] hover:text-white">
                Contact Me
              </ModalOpener>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
