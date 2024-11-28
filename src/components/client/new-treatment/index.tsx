"use client";
import BoxReveal from "@/components/box-reveal";
import Image from "next/image";
import { m, LazyMotion, domAnimation } from "motion/react";

const MotionImage = m(Image);

interface NewTreatmentProps {
  dict: {
    title: string;
    content: string;
    additionalInfo?: string[];
  };
}

export default function NewTreatment({ dict }: NewTreatmentProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full min-sh-screen bg-gradient-to-br flex flex-col lg:flex-row"
      >
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-8 lg:p-16">
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg space-y-6"
          >
            <BoxReveal>
              <h2 className="text-3xl lg:text-4xl font-bold">{dict.title}</h2>
            </BoxReveal>

            <BoxReveal>
              <p className="text-lg">{dict.content}</p>
            </BoxReveal>

            <ul className="mt-2 space-y-1 text-neutral-500">
              {dict.additionalInfo.map((info, index) => (
                <li key={index}>
                  <BoxReveal>
                    <span>{info}</span>
                  </BoxReveal>
                </li>
              ))}
            </ul>
          </m.div>
        </div>
        <div className="w-fit h-fit p-4 lg:p-8 gap-4">
          <m.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden"
          >
            <div className="w-full relative mx-auto h-auto overflow-hidden rounded-lg ">
              <MotionImage
                src="/26.webp"
                alt="Image teratment"
                width={600}
                height={400}
                whileHover={{ scale: 1.05, rotate: 1 }}
                animate={{
                  transition: {
                    type: "spring",
                    duration: 0.5,
                  },
                }}
                className="rounded-lg shadow-lg w-full h-auto relative z-0 object-cover"
              />
            </div>
          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
