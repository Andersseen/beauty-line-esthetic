"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { background, lineVariants, lineVariantsBottom, opacity } from "./anim";
import Nav from "./nav";
import LanguageSwitcher from "../../server/language-switcher/index";
import { Locale } from "@/i18n-config";

interface ClientHeaderProps {
  lang: Locale;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ lang }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="flex justify-between uppercase text-xs font-light">
        <Link href="/" className="text-main-100 no-underline">
          Logo
        </Link>
        <div
          onClick={() => setIsActive(!isActive)}
          className="flex items-center justify-center gap-2 cursor-pointer"
        >
          <div
            className={`relative w-[22.5px] pointer-events-none ${
              isActive ? "burger-active" : ""
            }`}
          >
            <motion.span
              className="absolute top-[-4px] left-1/2 transform -translate-x-1/2 block h-[1px] w-full bg-main-100"
              variants={lineVariants}
              initial="closed"
              animate={isActive ? "open" : "closed"}
            />
            {/* Línea inferior */}
            <motion.span
              className="absolute top-[4px] left-1/2 transform -translate-x-1/2 block h-[1px] w-full bg-main-100 shadow-sm"
              variants={lineVariantsBottom}
              initial="closed"
              animate={isActive ? "open" : "closed"}
            />
          </div>
          <div className="relative flex items-center px-2">
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
              className="text-main-100"
            >
              Menu
            </motion.p>
            <motion.p
              variants={opacity}
              animate={isActive ? "open" : "closed"}
              className="absolute opacity-0 text-main-100"
            >
              Close
            </motion.p>
          </div>
        </div>
        <motion.div
          variants={opacity}
          animate={!isActive ? "open" : "closed"}
          className="absolute right-0 flex gap-7"
        ></motion.div>
        <div>
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
