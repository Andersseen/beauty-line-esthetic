"use client";
import { useRef, useEffect } from "react";
import ParticlesHero from "../client/particles-background/particles-hero";

export default function Hero() {
  const loader = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const initialCurve = 200;
  const duration = 600;
  let start: number | undefined;

  useEffect(() => {
    setPath(initialCurve);
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = (timestamp: number) => {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    const newCurve = easeOutQuad(elapsed, initialCurve, -200, duration);
    setPath(newCurve);

    if (loader.current) {
      loader.current.style.top =
        easeOutQuad(elapsed, 0, -loaderHeight(), duration) + "px";
    }

    if (elapsed < duration) {
      requestAnimationFrame(animate);
    }
  };

  const easeOutQuad = (
    time: number,
    start: number,
    end: number,
    duration: number
  ) => {
    return -end * (time /= duration) * (time - 2) + start;
  };

  const loaderHeight = () => {
    if (loader.current) {
      const loaderBounds = loader.current.getBoundingClientRect();
      return loaderBounds.height;
    }
    return 0;
  };

  const setPath = (curve: number) => {
    const width = window.innerWidth;
    const height = loaderHeight();
    if (path.current) {
      path.current.setAttribute(
        "d",
        `M0 0
        L${width} 0
        L${width} ${height}
        Q${width / 2} ${height - curve} 0 ${height}
        L0 0`
      );
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <ParticlesHero />
      <div ref={loader} className="fixed w-full h-[calc(100vh+200px)] z-50">
        <svg className="w-full h-full">
          <path ref={path} className="stroke-black stroke-[1px]"></path>
        </svg>
      </div>
    </main>
  );
}
