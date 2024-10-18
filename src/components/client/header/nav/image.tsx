"use client";
import React from "react";
import { motion } from "framer-motion";
import { opacity } from "../anim";
import Image from "next/image";

interface ImageBoxProps {
  src: string;
  isActive: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({ src, isActive }) => {
  return (
    <motion.div
      variants={opacity}
      initial="initial"
      animate={isActive ? "open" : "closed"}
      className="hidden md:block relative w-[300px] h-[250px] rounded-lg"
    >
      <Image
        src={`/${src}`}
        fill={true}
        alt="image"
        className="object-cover rounded-lg"
      />
    </motion.div>
  );
};

export default ImageBox;
