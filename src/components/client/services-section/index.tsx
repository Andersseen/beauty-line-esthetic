"use client";
import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceSectionProps {
  dict: {
    sections: {
      title: string;
      content: string;
      additionalInfo?: string[];
    }[];
  };
}

export default function ServicesSection({ dict }: ServiceSectionProps) {
  const sections = [
    {
      ...dict.sections[0],
      imageUrl: "/06.webp",
    },
    {
      ...dict.sections[1],
      imageUrl: "/07.webp",
    },
    {
      ...dict.sections[2],
      imageUrl: "/24.webp",
    },
    {
      ...dict.sections[3],
      imageUrl: "/08.webp",
    },
    {
      ...dict.sections[4],
      imageUrl: "/23.webp",
    },
    {
      ...dict.sections[5],
      imageUrl: "/13.webp",
    },
    {
      ...dict.sections[6],
      imageUrl: "/04.webp",
    },
    {
      ...dict.sections[7],
      imageUrl: "/17.webp",
    },
    {
      ...dict.sections[8],
      imageUrl: "/11.webp",
    },
  ];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      {sections.map((section, index) => (
        <motion.section
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.3 }}
          viewport={{ once: true }}
          className={`flex flex-col md:flex-row items-center gap-8 py-12 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          <motion.div
            initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 space-y-4"
          >
            <h2 className="text-3xl font-bold">{section.title}</h2>
            <p className="text-lg text-gray-600">{section.content}</p>
          </motion.div>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <Image
              src={section.imageUrl}
              alt={`Imagen para ${section.title}`}
              width={600}
              height={400}
              className="rounded-lg shadow-lg max-h-[400px] max-w-[600px] object-cover"
            />
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}
