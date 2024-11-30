import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from ".";

interface BentoGridProductsProps {
  dict: {
    title: string;
    description: string;
  }[];
}

export default function BentoGridProducts({ dict }: BentoGridProductsProps) {
  const items = [
    {
      ...dict[0],
      imageSrc: "/logos/karoma.webp",
    },
    {
      ...dict[1],
      imageSrc: "/logos/karoma.webp",
    },
    {
      ...dict[2],
      imageSrc: "/logos/karoma.webp",
    },
    {
      ...dict[3],
      imageSrc: "/logos/karoma.webp",
    },
    {
      ...dict[4],
      imageSrc: "/logos/karoma.webp",
    },
    {
      ...dict[5],
      imageSrc: "/logos/karoma.webp",
    },
  ];
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
