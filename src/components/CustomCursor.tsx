"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!dotRef.current || !ringRef.current) return;

    // TypeScript doesn't narrow refs in closures — use local non-null bindings
    const dot = dotRef.current;
    const ring = ringRef.current;

    function onMouseMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    }

    function onMouseDown() {
      ring.classList.add("clicking");
    }

    function onMouseUp() {
      ring.classList.remove("clicking");
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role=\"button\"]") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        dot.classList.add("hovering");
        ring.classList.add("hovering");
      }
    }

    function onMouseOut() {
      dot.classList.remove("hovering");
      ring.classList.remove("hovering");
    }

    function onMouseLeave() {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    }

    function onMouseEnter() {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    }

    function animateRing() {
      const dx = posRef.current.x - ringPosRef.current.x;
      const dy = posRef.current.y - ringPosRef.current.y;
      ringPosRef.current.x += dx * 0.15;
      ringPosRef.current.y += dy * 0.15;
      ring.style.left = `${ringPosRef.current.x}px`;
      ring.style.top = `${ringPosRef.current.y}px`;
      rafRef.current = requestAnimationFrame(animateRing);
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animateRing();

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
