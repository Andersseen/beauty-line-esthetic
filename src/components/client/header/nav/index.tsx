"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { height } from "../anim";
import Body from "./body";
import Footer from "./footer";

const links = [
  {
    title: "Home",
    href: "/",
    src: "home.png",
  },
  {
    title: "Shop",
    href: "/shop",
    src: "shop.png",
  },
  {
    title: "About Us",
    href: "/about",
    src: "home.png",
  },
  {
    title: "Lookbook",
    href: "/lookbook",
    src: "lookbook.png",
  },
  {
    title: "Contact",
    href: "/contact",
    src: "contact.png",
  },
];

export default function Index() {
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
        />
        <Footer />
      </div>
    </motion.div>
  );
}
