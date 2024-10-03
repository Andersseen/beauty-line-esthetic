"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import { HEADER_LINKS as links } from "@/data/links";
import Body from "./body";
import Footer from "./footer";

interface NavProps {
  setIsActive: (isActive: boolean) => void;
}

const Nav: React.FC<NavProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<{
    isActive: boolean;
    index: number;
  }>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className="overflow-hidden"
    >
      <div className="flex flex-col justify-between gap-12 mb-20">
        <Body
          links={links}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          setIsActive={setIsActive}
        />
        <Footer />
      </div>
    </motion.div>
  );
};

export default Nav;
