"use client";

import { useEffect } from "react";

export function Ripple() {
  useEffect(() => {
    function createRipple(e: PointerEvent) {
      if (e.pointerType === "mouse" && (e as MouseEvent).button !== 0) return;

      const target = (e.target as HTMLElement).closest(
        ".neon-card, .btn-primary, .btn-ghost, .nav-link, .stack-tag"
      );
      if (!target) return;

      const el = target as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2.5;

      const circle = document.createElement("span");
      circle.style.cssText = `
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
        background: radial-gradient(
          closest-side,
          color-mix(in srgb, var(--color-primary) 20%, transparent) max(calc(100% - 70px), 65%),
          transparent 100%
        );
        transform: scale(0);
        opacity: 1;
        animation: ripple-anim 450ms cubic-bezier(0.2, 0, 0, 1) forwards;
      `;

      const existing = el.querySelector(".ripple-effect");
      if (existing) existing.remove();

      circle.classList.add("ripple-effect");
      el.appendChild(circle);
      window.setTimeout(() => circle.remove(), 500);
    }

    document.addEventListener("pointerdown", createRipple);
    return () => document.removeEventListener("pointerdown", createRipple);
  }, []);

  return null;
}
