"use client";

import { useEffect } from "react";

export function Ripple() {
  useEffect(() => {
    function createRipple(e: PointerEvent) {
      if (e.pointerType === "mouse" && (e as MouseEvent).button !== 0) return;

      const target = (e.target as HTMLElement).closest(".neon-card, .btn-primary, .btn-ghost, .nav-link, .stack-tag");
      if (!target) return;

      const circle = document.createElement("span");
      const diameter = Math.max(target.clientWidth, target.clientHeight);
      const radius = diameter / 2;
      const rect = target.getBoundingClientRect();

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add("ripple-effect");

      const existing = target.querySelector(".ripple-effect");
      if (existing) existing.remove();

      (target as HTMLElement).appendChild(circle);
      window.setTimeout(() => circle.remove(), 600);
    }

    document.addEventListener("pointerdown", createRipple);
    return () => document.removeEventListener("pointerdown", createRipple);
  }, []);

  return null;
}