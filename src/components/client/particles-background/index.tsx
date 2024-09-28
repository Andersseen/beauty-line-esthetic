"use client";
import { Canvas } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sparkles } from "@react-three/drei";

export default function ParticlesBackground() {
  const { resolvedTheme } = useTheme();
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const [particleColor, setParticleColor] = useState("#050505");

  useEffect(() => {
    if (resolvedTheme === "dark") {
      setParticleColor("#f6f6f6");
    } else {
      setParticleColor("#171717");
    }
  }, [resolvedTheme]);

  return (
    <Canvas
      camera={{ position: [-1, -1, 1], fov: 20 }}
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <fog attach="fog" args={["white", 50, 190]} />
      <pointLight distance={100} intensity={4} color="white" />
      <Particles
        amount={isMobile ? 500 : 1000}
        color={particleColor}
        position={[1, 1, -1]}
      />
    </Canvas>
  );
}

const Particles = ({ size = 1, amount = 500, color, ...props }) => (
  <mesh {...props}>
    <Sparkles
      noise={0.5}
      opacity={0.5}
      count={amount}
      scale={size * 2}
      size={size}
      speed={0.5}
      color={color}
    />
  </mesh>
);
