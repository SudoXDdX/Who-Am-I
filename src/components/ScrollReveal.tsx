"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollRevealVariant = "default" | "left" | "scale" | "blur" | "tilt";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: ScrollRevealVariant;
}

export function ScrollReveal({ children, className = "", delay = 0, variant = "default" }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("revealed");
      return;
    }

    const classMap: Record<ScrollRevealVariant, string> = {
      default: "scroll-reveal",
      left: "scroll-reveal-left",
      scale: "scroll-reveal-scale",
      blur: "scroll-reveal-blur",
      tilt: "scroll-reveal-tilt",
    };

    const baseClass = classMap[variant] || "scroll-reveal";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => el.classList.add("revealed"), delay);
          } else {
            el.classList.add("revealed");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, variant]);

  const classMap: Record<ScrollRevealVariant, string> = {
    default: "scroll-reveal",
    left: "scroll-reveal-left",
    scale: "scroll-reveal-scale",
    blur: "scroll-reveal-blur",
    tilt: "scroll-reveal-tilt",
  };

  const variantClass = classMap[variant] || "scroll-reveal";

  return (
    <div ref={ref} className={`${variantClass} ${className}`}>
      {children}
    </div>
  );
}
