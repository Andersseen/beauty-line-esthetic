"use client";
import BoxReveal from "@/components/box-reveal";
import { MagicCard } from "@/components/magic-card";
import { m, LazyMotion, domAnimation } from "motion/react";
import Image from "next/image";

const MotionImage = m(Image);

interface ServiceSectionProps {
  children: React.ReactNode;
  dict: {
    sections: {
      title: string;
      content: string;
    }[];
  };
}

export default function ServicesSection({
  children,
  dict,
}: ServiceSectionProps) {
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
      imageUrl: "/25.webp",
    },
    {
      ...dict.sections[7],
      imageUrl: "/04.webp",
    },
    {
      ...dict.sections[8],
      imageUrl: "/17.webp",
    },
    {
      ...dict.sections[9],
      imageUrl: "/11.webp",
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      {sections.map((section, index) => (
        <div key={index} className="py-4">
          <LazyMotion features={domAnimation}>
            <m.article
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, y: 50 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 py-12 lg:max-h-[400px] ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <MagicCard className="w-full md:w-1/2 space-y-4 lg:p-8">
                <m.div
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <BoxReveal>
                    <h2 className="text-xl sm:text-1xl md:text-2xl lg:text-3xl font-bold">{section.title}</h2>
                  </BoxReveal>
                  <BoxReveal>
                    <p className="text-md md:text-lg text-wrap">{section.content}</p>
                  </BoxReveal>
                </m.div>
              </MagicCard>
              <m.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="w-full md:w-1/2"
              >
                <div className="w-full relative mx-auto h-auto overflow-hidden rounded-lg ">
                  <MotionImage
                    src={section.imageUrl}
                    alt={`Imagen para ${section.title}`}
                    width={600}
                    height={400}
                    whileHover={{ scale: 1.05, rotate: 1 }}
                    animate={{
                      transition: {
                        type: "spring",
                        duration: 0.5,
                      },
                    }}
                    className="rounded-lg shadow-lg w-full h-fit lg:max-h-[400px] relative z-0 aspect-square sm:aspect-3/2 object-cover"
                  />
                </div>
              </m.div>
            </m.article>

            {index === 6 && children}
          </LazyMotion>
        </div>
      ))}
    </section>
  );
}
