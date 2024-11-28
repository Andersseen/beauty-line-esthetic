"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { background, opacity } from "./anim";
import Nav from "./nav";
import LanguageSwitcher from "../../server/language-switcher/index";
import { Locale } from "@/i18n-config";
import Logo from "@/components/server/logo";
import { MenuButton } from "./menu-button";

interface ClientHeaderProps {
  lang: Locale;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ lang }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="flex justify-between uppercase text-xs font-light">
        <Link href="/" className="text-main-100 no-underline">
          <Logo />
        </Link>
        <div
          onClick={() => setIsActive(!isActive)}
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <div
            className={`relative w-[22.5px] pointer-events-none ${
              isActive ? "burger-active" : ""
            }`}
          ></div>

          <MenuButton
            isOpen={isActive}
            strokeWidth="6"
            color="#fdf2f8"
            lineProps={{ strokeLinecap: "round" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration: 1,
            }}
          />
        </div>
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className="absolute right-0 flex gap-7"
        ></motion.div>
        <div className="relative flex items-center px-2">
          <LanguageSwitcher />
        </div>
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className="absolute top-full left-0 w-full h-full bg-main-900 opacity-50"
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} lang={lang} />}
      </AnimatePresence>
    </>
  );
};

export default ClientHeader;
