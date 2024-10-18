"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import { HEADER_LINKS as links } from "@/data/links";
import Body from "./body";
import ImageBox from "./image";

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
      <div className="flex flex-col md:flex-row gap-12 md:gap-0 md:justify-between mb-20 md:mb-0">
        <div className="flex flex-col justify-between">
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
        </div>
        <ImageBox
          src={links[selectedLink.index].src}
          isActive={selectedLink.isActive}
        />
      </div>
    </motion.div>
  );
};

export default Nav;
