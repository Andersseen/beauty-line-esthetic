"use client";
import { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import { m, LazyMotion, domAnimation } from "motion/react";

const HoverContext = createContext(false);

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <HoverContext.Provider value={isHovered}>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 md:grid-rows-4 gap-4 p-2 h-full w-full rounded-lg group",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    </HoverContext.Provider>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  imageSrc: string;
}) => {
  const isHovered = useContext(HoverContext);

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={cn(
          "flex items-center justify-center min-h-32 rounded-lg group/bento shadow-md hover:shadow-xl transition duration-200 bg-gradient-to-br from-main-100 to-main-300",
          className
        )}
        whileHover={{ scale: 1.01 }}
        animate={{
          scale: isHovered ? 0.99 : 1,
          transition: {
            duration: 0.2,
          },
        }}
      >
        <div className="p-4">
          {title && (
            <div className="font-bold text-center mt-2 group-hover/bento:-translate-x-2 transition duration-200">
              {title}
            </div>
          )}
          {description && (
            <div className="text-center text-sm mt-1 group-hover/bento:translate-x-2 transition duration-200">
              {description}
            </div>
          )}
        </div>
      </m.div>
    </LazyMotion>
  );
};
