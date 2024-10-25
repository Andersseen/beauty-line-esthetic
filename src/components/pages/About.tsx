"use client";
import Image from "next/image";

interface AboutProps {
  dict: {
    title: string;
    description: string;
    imageAlt: string;
  };
}

const About: React.FC<AboutProps> = ({ dict }) => {
  return (
    <div className="w-full min-h-screen bg-rose-50 flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2">
            <Image
              src="/14.webp"
              alt={dict?.imageAlt}
              width={600}
              height={600}
              className="object-cover w-full h-auto rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-main-600 mb-4">
              {dict.title}
            </h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              {dict.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
