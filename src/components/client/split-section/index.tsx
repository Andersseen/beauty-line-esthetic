"use client";
import { motion } from "framer-motion";
import Image from "next/image";

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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-sh-screen bg-gradient-to-br flex flex-col lg:flex-row"
    >
      <div className="w-full lg:w-1/2 h-1/2 min-h-[500px] lg:h-full p-4 lg:p-8 grid grid-cols-2 gap-4">
        {["/19.webp", "/20.webp", "/21.webp", "/22.webp"].map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className="relative rounded-lg overflow-hidden"
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              layout="fill"
              objectFit="cover"
              className="min-w-[250px] min-h-[150px]"
            />
          </motion.div>
        ))}
      </div>
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg space-y-6"
        >
          <h2 className="text-3xl lg:text-4xl font-bold">{dict.title}</h2>
          <p className="text-lg">{dict.content}</p>
          <ul className="mt-2 space-y-1">
            {dict.phases.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
          <ul className="mt-2 space-y-1 list-disc list-inside text-neutral-500">
            {dict.additionalInfo.map((info, index) => (
              <li key={index}>{info}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
