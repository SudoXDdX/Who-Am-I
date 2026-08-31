"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface HeroParallaxProps {
  children: ReactNode;
  className?: string;
}

export function HeroParallax({ children, className = "" }: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      if (ref.current) {
        const y = window.scrollY * 0.15;
        ref.current.style.transform = `translateY(${y}px)`;
        ref.current.style.opacity = String(Math.max(0, 1 - window.scrollY / 600));
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
