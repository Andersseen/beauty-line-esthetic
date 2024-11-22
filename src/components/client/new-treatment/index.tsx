"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface NewTreatmentProps {
  dict: {
    title: string;
    content: string;
    additionalInfo?: string[];
  };
}

export default function NewTreatment({ dict }: NewTreatmentProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-sh-screen bg-gradient-to-br flex flex-col lg:flex-row"
    >
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg space-y-6"
        >
          <h2 className="text-3xl lg:text-4xl font-bold">{dict.title}</h2>
          <p className="text-lg">{dict.content}</p>

          <ul className="mt-2 space-y-1 text-neutral-500">
            {dict.additionalInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </motion.div>
      </div>
      <div className="w-fit h-fit p-4 lg:p-8 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-lg overflow-hidden"
        >
          <div className="w-full relative mx-auto h-auto overflow-hidden rounded-lg ">
            <Image
              src="/26.webp"
              alt="Image teratment"
              width={600}
              height={400}
              className="rounded-lg shadow-lg w-full h-auto relative z-0 object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
