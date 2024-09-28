"use client";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const CanvasParticles = dynamic(() => import("."), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});
export default function ParticlesHero() {
  return (
    <section className="relative h-screen w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute h-full w-full inset-0 z-0 bg-transparent flex items-center justify-center"
      >
        <CanvasParticles />
      </motion.div>
      <div className="relative z-10 flex flex-col justify-center h-full items-center">
        <h2 className="text-2xl md:text-6xl font-bold text-center">
          The hell is this?
        </h2>
        <p className="text-sm md:text-2xl max-w-xl mt-6 text-center">
          This is chemical burn. It&apos;ll hurt more than you&apos;ve ever been
          burned and you&apos;ll have a scar.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <Button color="primary" radius="full">
            Button
          </Button>
          <Button color="default" radius="full">
            Button
          </Button>
        </div>
      </div>
    </section>
  );
}
