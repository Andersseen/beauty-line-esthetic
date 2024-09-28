"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { NavbarItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion } from "framer-motion";
import { NavigationLink } from ".";

type ColourBgType = {
  active: string;
  notActive: string;
};

export const DeskNavigation = ({ navList }: { navList: NavigationLink[] }) => {
  const { resolvedTheme } = useTheme();

  const colourBg: Record<string, ColourBgType> = {
    light: {
      active: "text-main-950 font-bold",
      notActive: "text-main-900",
    },
    dark: {
      active: "text-main-100 font-bold",
      notActive: "text-main-300",
    },
  };

  const themeColour = colourBg[resolvedTheme || "light"];

  let pathname = usePathname() || "/";

  if (pathname.includes("/writing/")) {
    pathname = "/writing";
  }

  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <div className="p-[0.4rem] sticky top-4 z-[100]">
      <nav className="flex gap-2 relative justify-start w-full z-[100] rounded-lg">
        {navList.map((item: NavigationLink, index: number) => {
          const isActive = item.route === pathname;
          return (
            <NavbarItem key={`${item.route}-${index}`}>
              <Link
                key={item.route}
                href={item.route}
                passHref
                className={`px-4 py-2 rounded-md text-sm lg:text-base relative no-underline duration-300 ease-in ${
                  isActive ? themeColour.active : themeColour.notActive
                }`}
                data-active={isActive}
                onMouseOver={() => setHoveredPath(item.route)}
                onMouseLeave={() => setHoveredPath(pathname)}
              >
                <span>{item.label}</span>
                {item.route === hoveredPath && (
                  <motion.div
                    className={`absolute bottom-0 left-0 h-full rounded-md -z-10 bg-main-400/80`}
                    layoutId="navbar"
                    aria-hidden={true}
                    style={{
                      width: "100%",
                    }}
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                      duration: 0.3,
                    }}
                  />
                )}
              </Link>
            </NavbarItem>
          );
        })}
      </nav>
    </div>
  );
};
