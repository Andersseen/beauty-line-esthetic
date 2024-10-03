"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, Sparkles, Leaf, Heart } from "lucide-react";

const ShuffleHero = () => {
  return (
    <section className="w-full min-h-screen px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-xs md:text-sm text-main-500 font-medium">
          Better every day
        </span>
        <h3 className="text-xl md:text-4xl font-semibold">
          Tratamientos personalizados para realzar tu belleza interior y
          exterior
        </h3>

        <div className="flex justify-center lg:justify-start space-x-8 pt-4">
          <div className="flex flex-col items-center">
            <Calendar className="h-8 w-8 text-main-600" />
            <span className="mt-2 text-sm text-gray-600">
              Horarios flexibles
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Sparkles className="h-8 w-8 text-main-600" />
            <span className="mt-2 text-sm text-gray-600">
              Resultados brillantes
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="h-8 w-8 text-main-600" />
            <span className="mt-2 text-sm text-gray-600">
              Productos naturales
            </span>
          </div>
        </div>
        <div className="w-fit bg-main-100 p-4 rounded-lg shadow-lg flex items-center space-x-2 mt-4">
          <Heart className="h-6 w-6 text-main-500" />
          <span className="text-neutral-900 font-medium">
            100% de clientes satisfechos
          </span>
        </div>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array: (typeof squareData)[0][]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/01.webp",
  },
  {
    id: 2,
    src: "/02.webp",
  },
  {
    id: 3,
    src: "/03.webp",
  },
  {
    id: 4,
    src: "/04.webp",
  },
  {
    id: 5,
    src: "/05.webp",
  },
  {
    id: 6,
    src: "/06.webp",
  },
  {
    id: 7,
    src: "/07.webp",
  },
  {
    id: 8,
    src: "/08.webp",
  },
  {
    id: 9,
    src: "/09.webp",
  },
  {
    id: 10,
    src: "/10.webp",
  },
  {
    id: 11,
    src: "/11.webp",
  },
  {
    id: 12,
    src: "/12.webp",
  },
  {
    id: 13,
    src: "/13.webp",
  },
  {
    id: 14,
    src: "/14.webp",
  },
  {
    id: 15,
    src: "/15.webp",
  },
  {
    id: 16,
    src: "/16.webp",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;
