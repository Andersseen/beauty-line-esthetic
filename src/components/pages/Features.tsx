"use client";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Feature {
  title: string;
  description: string;
}

interface FeaturesProps {
  dict: {
    title: string;
    description: string;
    features: Feature[];
  };
}

const FeatureItem: React.FC<Feature> = ({ title, description }) => {
  return (
    <div className="p-3 rounded-md bg-white dark:bg-gray-950 shadow-lg dark:shadow-none hover:shadow-main-800/20 shadow-transparent transition-all ease-linear border border-gray-100 hover:border-gray-100 dark:border-gray-900 dark:hover:border-gray-600">
      <div className="flex gap-4">
        <div className="min-w-max">
          <span className="flex text-main-600 dark:text-gray-100 aspect-square rounded bg-main-600/10 dark:bg-gray-900 p-3">
            <Heart className="text-main-600" />
          </span>
        </div>
        <div className="space-y-0.5">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC<FeaturesProps> = ({ dict }) => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col lg:flex-row gap-10 xl:gap-14">
        <div className="w-full lg:h-auto object-cover flex lg:items-end justify-center lg:w-1/2 xl:w-[45%] relative">
          <div className="absolute inset-x-0 bottom-0 h-1/4" />
          <Image
            src="/09.webp"
            width={1001}
            height={1001}
            alt="Centro de Estética"
            className="w-full h-auto lg:w-[86%] relative rounded-3xl"
          />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h2 className="text-4xl lg:text-4xl font-bold text-gray-800">
                {dict.title}
              </h2>
            </div>
            <p className="">{dict.description}</p>
          </div>
          <div className="space-y-3">
            {dict.features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
