"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  phase: number;
  speed: number;
}

export function BackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const pulseRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const orbs: Orb[] = [
      { x: 0.2, y: 0.3, vx: 0.0003, vy: 0.0002, radius: 220, color: "130,177,255", phase: 0, speed: 0.4 },
      { x: 0.7, y: 0.2, vx: -0.0002, vy: 0.0003, radius: 200, color: "167,139,250", phase: 1.5, speed: 0.35 },
      { x: 0.5, y: 0.7, vx: 0.0002, vy: -0.0002, radius: 180, color: "34,211,238", phase: 3.0, speed: 0.45 },
      { x: 0.8, y: 0.8, vx: -0.0003, vy: -0.0001, radius: 160, color: "52,211,153", phase: 4.5, speed: 0.3 },
    ];

    function resize() {
      if (!canvas) return;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const time = Date.now() * 0.001;
      const pulse = pulseRef.current;

      // Draw dot grid
      const gridCols = 12;
      const gridRows = 13;
      const spacingX = w / (gridCols + 1);
      const spacingY = h / (gridRows + 1);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let row = 1; row <= gridRows; row++) {
        for (let col = 1; col <= gridCols; col++) {
          const dx = col * spacingX;
          const dy = row * spacingY;
          const dist = Math.sqrt((dx - mx) ** 2 + (dy - my) ** 2);
          const maxDist = 180;
          const brightness = dist < maxDist ? 0.06 + 0.12 * (1 - dist / maxDist) : 0.025;
          ctx.fillStyle = `rgba(138,156,196,${brightness})`;
          ctx.beginPath();
          ctx.arc(dx, dy, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw orbs
      for (const orb of orbs) {
        const ox = w * (orb.x + Math.sin(time * orb.speed + orb.phase) * 0.08);
        const oy = h * (orb.y + Math.cos(time * orb.speed + orb.phase + 1) * 0.06);
        const r = orb.radius + pulse * 30;
        const safeR = Math.max(1, r);
        const gradient = ctx.createRadialGradient(ox, oy, 0, ox, oy, safeR);
        gradient.addColorStop(0, `rgba(${orb.color},0.06)`);
        gradient.addColorStop(0.5, `rgba(${orb.color},0.02)`);
        gradient.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ox, oy, safeR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mouse glow
      if (mx > 0 && my > 0) {
        const mouseGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        mouseGrad.addColorStop(0, "rgba(130,177,255,0.025)");
        mouseGrad.addColorStop(1, "rgba(130,177,255,0)");
        ctx.fillStyle = mouseGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      // Decay pulse
      if (pulseRef.current > 0) {
        pulseRef.current *= 0.95;
        if (pulseRef.current < 0.01) pulseRef.current = 0;
      }
    }

    function loop() {
      draw();
      rafRef.current = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    }

    function onScroll() {
      const newScroll = window.scrollY;
      if (Math.abs(newScroll - scrollRef.current) > 50) {
        pulseRef.current = Math.min(pulseRef.current + 0.3, 1);
        scrollRef.current = newScroll;
      }
    }

    function onClick() {
      pulseRef.current = Math.min(pulseRef.current + 0.5, 1);
    }

    function onVisibility() {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current);
      } else {
        loop();
      }
    }

    resize();
    loop();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("click", onClick, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
