"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ServicesSection() {
  const sections = [
    {
      title: "Sección 1",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Sección 2",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Sección 3",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Sección 4",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      imageUrl: "/placeholder.svg?height=400&width=600",
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
