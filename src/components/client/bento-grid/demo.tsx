import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from ".";

export function BentoGridDemo() {
  return (
    <BentoGrid className="container mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          imageSrc={item.imageSrc}
          className={cn(
            "col-span-2 md:col-span-1", // Default to span 2 columns on mobile, 1 on medium and up
            i === 0
              ? "md:col-span-2 md:row-span-1"
              : i === 1
              ? "md:col-span-2 md:row-span-1"
              : i === 2
              ? "md:col-span-1 md:row-span-4"
              : i === 3
              ? "md:col-span-2 md:row-span-2"
              : i === 4
              ? "md:col-span-1 md:row-span-2"
              : i === 5
              ? "md:col-span-3 md:row-span-2"
              : ""
          )}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Casmara",
    description:
      "Cosmética innovadora con tratamientos avanzados para el cuidado de la piel.",
    imageSrc: "/logos/casmara.webp",
  },
  {
    title: "Atache",
    description:
      "Soluciones dermocosméticas de alta calidad para la salud y belleza de la piel.",
    imageSrc: "/logos/atache.webp",
  },
  {
    title: "Skin Clinic",
    description:
      "Especialistas en tratamientos para la regeneración y rejuvenecimiento facial.",
    imageSrc: "/logos/skin-clinic.webp",
  },
  {
    title: "Utsukusy",
    description:
      "Cosmética japonesa profesional centrada en la estética y la eficacia.",
    imageSrc: "/logos/utsukusy.webp",
  },
  {
    title: "On Macabim",
    description:
      "Productos naturales basados en la medicina herbal para el cuidado integral.",
    imageSrc: "/logos/on-macabim.webp",
  },
  {
    title: "Karoma",
    description:
      "Aromaterapia y cuidado holístico con aceites esenciales de alta pureza.",
    imageSrc: "/logos/karoma.webp",
  },
];
