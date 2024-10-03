"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { background, opacity } from "./anim";
import Nav from "./nav";

const Index: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed w-full bg-neutral-500 box-border p-2 sm:p-5 z-50">
      <div className="relative flex justify-center uppercase text-xs font-light">
        <Link href="/" className="absolute left-0 text-black no-underline">
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
            <span className="absolute top-[-4px] block h-[1px] w-full bg-black transition-all duration-1000 ease-[cubic-bezier(0.76, 0, 0.24, 1)]" />
            <span className="absolute top-[4px] block h-[1px] w-full bg-black transition-all duration-1000 ease-[cubic-bezier(0.76, 0, 0.24, 1)]" />
          </div>
          <div className="relative flex items-center">
            <motion.p
              variants={opacity}
              animate={!isActive ? "open" : "closed"}
            >
              Menu
            </motion.p>
            <motion.p
              variants={opacity}
              animate={isActive ? "open" : "closed"}
              className="absolute opacity-0"
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
      </div>
      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className="absolute top-full left-0 w-full h-full bg-neutral-900 opacity-50"
      ></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </div>
  );
};

export default Index;
