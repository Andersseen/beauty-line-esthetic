"use client";

import { useRef, useEffect } from "react";
import FeatureSection from "../client/feature-section";

export default function Features() {
  const path = useRef<SVGPathElement>(null);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId: number | null = null;

  useEffect(() => {
    setPath(progress);
  }, []);

  const setPath = (progress: number) => {
    const width = window.innerWidth;
    if (path.current) {
      path.current.setAttribute(
        "d",
        `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
      );
    }
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseEnter = () => {
    if (reqId) {
      cancelAnimationFrame(reqId);
      resetAnimation();
    }
  };

  const manageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { movementY, clientX } = e;
    if (path.current) {
      const pathBound = path.current.getBoundingClientRect();
      x = (clientX - pathBound.left) / pathBound.width;
      progress += movementY;
      setPath(progress);
    }
  };

  const manageMouseLeave = () => {
    animateOut();
  };

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);
    if (Math.abs(progress) > 0.75) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col">
        <div className="relative w-full h-px mb-5">
          <div
            onMouseEnter={manageMouseEnter}
            onMouseMove={manageMouseMove}
            onMouseLeave={manageMouseLeave}
            className="relative z-10 w-full h-10 -top-5 hover:h-[500px] hover:-top-[250px] transition-all"
          ></div>
          <svg className="absolute top-[-250px] w-full h-[500px]">
            <path
              ref={path}
              className="stroke-neutral-900 dark:stroke-neutral-100 stroke-[1px] fill-none"
            ></path>
          </svg>
        </div>
        <FeatureSection />
      </div>
    </div>
  );
}
