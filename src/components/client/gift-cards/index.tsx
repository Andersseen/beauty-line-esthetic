"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface GiftCardsProps {
  dict: {
    title: string;
    description: string;
  };
}

const GiftCards: React.FC<GiftCardsProps> = ({ dict }) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const instance = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/animation.json",
    });

    // Return clean up function here
    return () => instance.destroy();
  });

  return (
    <div className="container mx-auto flex flex-col md:flex-row h-fit">
      <div className="flex-1 flex items-center justify-center">
        <div
          ref={animationContainer}
          className="w-full h-full max-w-md max-h-md"
        ></div>
      </div>
      <div className="flex flex-col items-start justify-center p-4 lg:w-1/2 gap-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {dict.title}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 p-4">
          {dict.description}
        </p>
      </div>
    </div>
  );
};

export default GiftCards;
