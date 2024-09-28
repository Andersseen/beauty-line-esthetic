"use client";

import { motion } from "framer-motion";
import { translate } from "../anim";

const Footer: React.FC = () => {
  return (
    <div className="flex flex-wrap items-end mt-10 text-xs uppercase">
      <ul className="w-1/2 mt-2 list-none p-0 overflow-hidden">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span className="text-[#9f9689]">Made by:</span> Studio Lumio
        </motion.li>
      </ul>
      <ul className="w-1/2 mt-2 list-none p-0 overflow-hidden">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span className="text-[#9f9689]">Typography:</span> Google Fonts
        </motion.li>
      </ul>
      <ul className="w-1/2 mt-2 list-none p-0 overflow-hidden">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <span className="text-[#9f9689]">Images:</span> Freepik, Envato
        </motion.li>
      </ul>
      <ul className="w-1/2 mt-2 list-none p-0 overflow-hidden">
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Privacy Policy
        </motion.li>
        <motion.li
          custom={[0.3, 0]}
          variants={translate}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          Terms & Conditions
        </motion.li>
      </ul>
    </div>
  );
};

export default Footer;
