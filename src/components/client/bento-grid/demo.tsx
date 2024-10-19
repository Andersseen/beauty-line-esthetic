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
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    imageSrc: "/logos/01.webp",
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    imageSrc: "/logos/02.webp",
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    imageSrc: "/logos/03.webp",
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    imageSrc: "/logos/04.webp",
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    imageSrc: "/logos/05.webp",
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    imageSrc: "/logos/06.webp",
  },
];
