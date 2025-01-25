"use client";
import BoxReveal from "@/components/box-reveal";
import { MagicCard } from "@/components/magic-card";
import { domAnimation, LazyMotion, m } from "motion/react";
import Image from "next/image";

const MotionImage = m(Image);

interface SplitSectionProps {
  dict: {
    title: string;
    content: string;
    phases?: string[];
    additionalInfo?: string[];
  };
}

export default function SplitSection({ dict }: SplitSectionProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full min-sh-screen bg-gradient-to-br flex flex-col lg:flex-row items-center mb-8"
      >
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center lg:p-16">
          <MagicCard>
            <m.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <BoxReveal>
                <h2 className="text-xl sm:text-1xl md:text-2xl lg:text-3xl font-bold">{dict.title}</h2>
              </BoxReveal>

              <BoxReveal>
                <p className="text-md md:text-lg text-wrap">{dict.content}</p>
              </BoxReveal>
              <ul className="mt-2 space-y-1">
                {dict.phases.map((info, index) => (
                  <li key={index}>
                    <BoxReveal>
                      <span>{info}</span>
                    </BoxReveal>
                  </li>
                ))}
              </ul>
              <ul className="mt-2 space-y-1 list-disc list-inside text-neutral-500">
                {dict.additionalInfo.map((info, index) => (
                  <BoxReveal key={index}>
                    <li>{info}</li>
                  </BoxReveal>
                ))}
              </ul>
            </m.div>
          </MagicCard>
        </div>
        <div className="w-full lg:w-1/2 h-1/2 lg:min-h-[500px] lg:h-full lg:p-8 grid grid-cols-2 gap-4">
          {["/19.webp", "/20.webp", "/21.webp", "/22.webp"].map(
            (src, index) => (
              <m.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                className="relative overflow-hidden rounded-lg h-fit"
              >
                <MotionImage
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="rounded-lg shadow-lg w-full max-h-[300px] relative z-0 object-cover aspect-square"
                  width={300}
                  height={100}
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  animate={{
                    transition: {
                      type: "spring",
                      duration: 0.5,
                    },
                  }}
                />
              </m.div>
            )
          )}
        </div>
      </m.section>
    </LazyMotion>
  );
}
