"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { blur, translate } from "../anim";
import { Locale } from "@/i18n-config";

interface LinkItem {
  title: string;
  href: string;
}

interface BodyProps {
  links: LinkItem[];
  selectedLink: { isActive: boolean; index: number };
  setSelectedLink: React.Dispatch<
    React.SetStateAction<{ isActive: boolean; index: number }>
  >;
  setIsActive: (isActive: boolean) => void;
  lang: Locale;
}

const Body: React.FC<BodyProps> = ({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
  lang,
}) => {
  const getChars = (word: string) => {
    return word.split("").map((char, i) => (
      <motion.span
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <div className="flex flex-wrap mt-10">
      {links.map((link, index) => {
        const { title, href } = link;
        return (
          <Link
            key={`l_${index}`}
            href={`/${lang}${href}`}
            className="text-black no-underline uppercase"
            onClick={() => setIsActive(false)}
          >
            <motion.p
              onMouseOver={() => {
                setSelectedLink({ isActive: true, index });
              }}
              onMouseLeave={() => {
                setSelectedLink({ isActive: false, index });
              }}
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
              className="m-0 flex overflow-hidden text-[32px] pr-[30px] pt-[10px] font-light text-main-100"
            >
              {getChars(title)}
            </motion.p>
          </Link>
        );
      })}
    </div>
  );
};

export default Body;
