"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import SocialButtons from "./SocialButtons";
import { SiGithub, SiTelegram } from "react-icons/si";
import { BiLogoGmail } from "react-icons/bi";
import { LuInstagram } from "react-icons/lu";
import { motion } from "motion/react";

export default function ModalOpener() {
  return (
    <Modal>
      {/* Trigger Button */}
      <ModalTrigger>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          Contact Me
        </motion.div>
      </ModalTrigger>

      {/* Modal Body */}
      <ModalBody>
        <ModalContent className="w-fit">
          <h1 className="mb-7 text-xl font-bold">Contact Informations</h1>
          <div className="group">
            <div className="ml-1">
              <SocialButtons
                link="https://t.me/sajadath"
                delay={500}
                color="bg-sky-700"
                Icon={SiTelegram}
              >
                Telegram
              </SocialButtons>
            </div>
            <div className="mt-2 ml-10">
              <SocialButtons
                link="mailto:Sajadath1@gmail.com"
                delay={700}
                color="bg-white"
                Icon={BiLogoGmail}
              >
                Email
              </SocialButtons>
            </div>
            <div className="mt-2 ml-20 w-fit">
              <SocialButtons
                link="https://github.com/Sajadath"
                delay={900}
                color="bg-black"
                Icon={SiGithub}
              >
                GitHub
              </SocialButtons>
            </div>
            <div className="ml-30">
              <SocialButtons
                link="https://www.instagram.com/sajad.ath"
                gradient="bg-gradient-to-r from-[#f58529] via-[#dd2a7b] via-[#8134af] to-[#515bd4]"
                delay={1100}
                color="bg-sky-700"
                Icon={LuInstagram}
              >
                Instagram
              </SocialButtons>
            </div>
          </div>
        </ModalContent>

        {/* Modal Footer */}
      </ModalBody>
    </Modal>
  );
}
