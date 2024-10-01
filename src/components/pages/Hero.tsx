import { Calendar, Sparkles, Leaf } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="min-h-screen w-full [background:radial-gradient(125%_125%_at_50%_10%,#ffe4e6_40%,#fecdd3_100%)]  flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full space-y-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
              Descubre tu belleza natural
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600">
              Tratamientos personalizados para realzar tu belleza interior y
              exterior
            </p>

            <div className="flex justify-center lg:justify-start space-x-8 pt-4">
              <div className="flex flex-col items-center">
                <Calendar className="h-8 w-8 text-purple-600" />
                <span className="mt-2 text-sm text-gray-600">
                  Horarios flexibles
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Sparkles className="h-8 w-8 text-purple-600" />
                <span className="mt-2 text-sm text-gray-600">
                  Resultados brillantes
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="h-8 w-8 text-purple-600" />
                <span className="mt-2 text-sm text-gray-600">
                  Productos naturales
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative h-80 sm:h-96 lg:h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Tratamiento de belleza"
                layout="fill"
                objectFit="cover"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
