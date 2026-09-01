"use client";

import { useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════
   ORIGINAL CURSOR — "PHANTOM CROSS"
   
   Not a dot+ring (every portfolio has that). This is a
   rotating crosshair with a particle trail that dissolves
   into the theme color. On hover it morphs into a diamond.
   On click it fires a shockwave ring.
   ═══════════════════════════════════════════════════════════ */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  el: HTMLDivElement;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const velRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const rotationRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const lastSpawnRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isClickingRef = useRef(false);

  const spawnParticle = useCallback(() => {
    if (particlesRef.current.length > 20) return;
    const el = document.createElement("div");
    el.className = "cursor-particle";
    trailRef.current?.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const speed = 0.3 + Math.random() * 0.8;
    const particle: Particle = {
      x: posRef.current.x,
      y: posRef.current.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 30 + Math.random() * 20,
      size: 2 + Math.random() * 3,
      el,
    };
    particlesRef.current.push(particle);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (!cursorRef.current || !trailRef.current) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;

    // Spring constants for smooth follow
    const STIFFNESS = 0.12;
    const DAMPING = 0.75;
    const cursorPosRef = { x: -100, y: -100 };

    function onMouseMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseDown() {
      isClickingRef.current = true;
      cursor.classList.add("cursor-clicking");
      velRef.current = { x: 0, y: 0 };
      // Spawn burst
      for (let i = 0; i < 6; i++) spawnParticle();
    }

    function onMouseUp() {
      isClickingRef.current = false;
      cursor.classList.remove("cursor-clicking");
    }

    function checkHoverTarget(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role=\"button\"]") ||
        target.closest("summary") ||
        target.closest("details") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isHoverable && !isHoveringRef.current) {
        isHoveringRef.current = true;
        cursor.classList.add("cursor-hover");
      } else if (!isHoverable && isHoveringRef.current) {
        isHoveringRef.current = false;
        cursor.classList.remove("cursor-hover");
      }
    }

    function onMouseLeave() {
      cursor.style.opacity = "0";
      trail.style.opacity = "0";
    }

    function onMouseEnter() {
      cursor.style.opacity = "1";
      trail.style.opacity = "1";
    }

    function animate() {
      // Follow mouse with spring
      const dx = posRef.current.x - cursorPosRef.x;
      const dy = posRef.current.y - cursorPosRef.y;

      velRef.current.x = (velRef.current.x + dx * STIFFNESS) * DAMPING;
      velRef.current.y = (velRef.current.y + dy * STIFFNESS) * DAMPING;

      cursorPosRef.x += velRef.current.x;
      cursorPosRef.y += velRef.current.y;

      cursor.style.left = `${cursorPosRef.x}px`;
      cursor.style.top = `${cursorPosRef.y}px`;

      // Rotate based on velocity
      const speed = Math.sqrt(velRef.current.x ** 2 + velRef.current.y ** 2);
      rotationRef.current += speed * 0.8;
      cursor.style.setProperty("--rotation", `${rotationRef.current}deg`);

      // Spawn trail particles based on speed
      const now = performance.now();
      if (speed > 1.5 && now - lastSpawnRef.current > 40) {
        spawnParticle();
        lastSpawnRef.current = now;
      }

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life--;

        const alpha = p.life / p.maxLife;
        const scale = 0.3 + alpha * 0.7;

        p.el.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%) scale(${scale})`;
        p.el.style.opacity = `${alpha * 0.6}`;
        p.el.style.width = `${p.size * alpha}px`;
        p.el.style.height = `${p.size * alpha}px`;

        if (p.life <= 0) {
          p.el.remove();
          particlesRef.current.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    document.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", checkHoverTarget, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", checkHoverTarget);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      // Cleanup particles
      particlesRef.current.forEach((p) => p.el.remove());
      particlesRef.current = [];
    };
  }, [spawnParticle]);

  return (
    <>
      <div ref={cursorRef} className="phantom-cursor" aria-hidden="true">
        <div className="phantom-cross-h" />
        <div className="phantom-cross-v" />
        <div className="phantom-center" />
        <div className="phantom-ring" />
      </div>
      <div ref={trailRef} className="cursor-trail-layer" aria-hidden="true" />
    </>
  );
}
