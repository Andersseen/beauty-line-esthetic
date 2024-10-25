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
      imageUrl: "/10.webp",
    },
    {
      ...dict.sections[2],
      imageUrl: "/17.webp",
    },
    {
      ...dict.sections[3],
      imageUrl: "/16.webp",
    },
    {
      ...dict.sections[4],
      imageUrl: "/11.webp",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
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
            {section.additionalInfo && (
              <ul className="mt-2 space-y-1 list-disc list-inside text-gray-500">
                {section.additionalInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            )}
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
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </motion.section>
      ))}
    </div>
  );
}
