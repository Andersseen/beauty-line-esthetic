/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import * as THREE from "three";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";

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
      camera={{ position: [0, 0, 10], fov: 100 }}
      style={{
        width: "100%",
        height: "100vh",
      }}
    >
      <ambientLight intensity={0.01} />
      <pointLight distance={100} intensity={4} color="white" />
      <Swarm count={isMobile ? 500 : 1000} color={particleColor} />
    </Canvas>
  );
}

function Swarm({ count, color }) {
  const mesh = useRef();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = new THREE.Object3D();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    particles.forEach((particle, i) => {
      // eslint-disable-next-line prefer-const
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += (mouse.current.x * 1000 - particle.mx) * 0.01;
      particle.my += (mouse.current.y * 1000 - particle.my) * 0.01;
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.setScalar(s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // @ts-ignore
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    // @ts-ignore
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <pointsMaterial color={color} />
    </instancedMesh>
  );
}
