"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   CURSOR TYPES
   ═══════════════════════════════════════════════════════════ */

export const CURSOR_TYPES = [
  { id: 'default', label: { pt: 'System Default', en: 'System Default' } },
  { id: 'phantom-cross', label: { pt: 'Phantom Cross', en: 'Phantom Cross' } },
  { id: 'neon-ring', label: { pt: 'Neon Ring', en: 'Neon Ring' } },
  { id: 'plasma-orb', label: { pt: 'Plasma Orb', en: 'Plasma Orb' } },
  { id: 'pixel-arrow', label: { pt: 'Pixel Arrow', en: 'Pixel Arrow' } },
  { id: 'void-dot', label: { pt: 'Void Dot', en: 'Void Dot' } },
  { id: 'cyber-diamond', label: { pt: 'Cyber Diamond', en: 'Cyber Diamond' } },
  { id: 'glitch-trail', label: { pt: 'Glitch Trail', en: 'Glitch Trail' } },
  { id: 'hex-spinner', label: { pt: 'Hex Spinner', en: 'Hex Spinner' } },
  { id: 'flame', label: { pt: 'Flame', en: 'Flame' } },
  { id: 'ice-crystal', label: { pt: 'Ice Crystal', en: 'Ice Crystal' } },
  { id: 'star-field', label: { pt: 'Star Field', en: 'Star Field' } },
  { id: 'sonic-wave', label: { pt: 'Sonic Wave', en: 'Sonic Wave' } },
  { id: 'classic-cross', label: { pt: 'Classic Cross', en: 'Classic Cross' } },
] as const;

export type CursorType = (typeof CURSOR_TYPES)[number]['id'];

/* ═══════════════════════════════════════════════════════════
   PARTICLE SYSTEM (shared across cursor types)
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

/* ═══════════════════════════════════════════════════════════
   CUSTOM CURSOR — Multi-type support
   ═══════════════════════════════════════════════════════════ */

function getCursorClass(type: CursorType): string {
  switch (type) {
    case 'default': return 'default-cursor-hidden';
    case 'phantom-cross': return 'phantom-cursor';
    case 'neon-ring': return 'neon-ring-cursor';
    case 'plasma-orb': return 'plasma-orb-cursor';
    case 'pixel-arrow': return 'pixel-arrow-cursor';
    case 'void-dot': return 'void-dot-cursor';
    case 'cyber-diamond': return 'cyber-diamond-cursor';
    case 'glitch-trail': return 'glitch-trail-cursor';
    case 'hex-spinner': return 'hex-spinner-cursor';
    case 'flame': return 'flame-cursor';
    case 'ice-crystal': return 'ice-crystal-cursor';
    case 'star-field': return 'star-field-cursor';
    case 'sonic-wave': return 'sonic-wave-cursor';
    case 'classic-cross': return 'classic-cross-cursor';
    default: return 'phantom-cursor';
  }
}

function getInitialCursorType(): CursorType {
  if (typeof window === 'undefined') return 'phantom-cross';
  const stored = localStorage.getItem('cursor-type');
  if (stored && CURSOR_TYPES.some(c => c.id === stored)) return stored as CursorType;
  return 'phantom-cross';
}

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<CursorType>(getInitialCursorType);
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
  const cursorPosRef = { x: -100, y: -100 };
  const cursorTypeRef = useRef<CursorType>(getInitialCursorType());

  // Listen for cursor-change custom event
  useEffect(() => {
    function onCursorChange(e: Event) {
      const customEvent = e as CustomEvent<{ type: CursorType }>;
      const newType = customEvent.detail?.type;
      if (newType && CURSOR_TYPES.some(c => c.id === newType)) {
        cursorTypeRef.current = newType;
        setCursorType(newType);
        // Cleanup existing particles on type switch
        particlesRef.current.forEach(p => p.el.remove());
        particlesRef.current = [];
      }
    }
    document.addEventListener('cursor-change', onCursorChange);
    return () => document.removeEventListener('cursor-change', onCursorChange);
  }, []);

  const spawnParticle = useCallback((type?: CursorType) => {
    const maxParticles = type === 'pixel-arrow' ? 20 : 12;
    if (particlesRef.current.length > maxParticles) return;
    const el = document.createElement('div');
    const ct = type || cursorTypeRef.current;
    el.className = ct === 'pixel-arrow' ? 'cursor-pixel-particle' : 'cursor-particle';
    trailRef.current?.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const speed = ct === 'pixel-arrow' ? 0.2 + Math.random() * 0.5 : 0.3 + Math.random() * 0.8;
    const particle: Particle = {
      x: posRef.current.x,
      y: posRef.current.y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 30 + Math.random() * 20,
      size: ct === 'pixel-arrow' ? (2 + Math.floor(Math.random() * 3)) : (2 + Math.random() * 3),
      el,
    };
    particlesRef.current.push(particle);
  }, []);

  const spawnClickBurst = useCallback((type: CursorType, x: number, y: number) => {
    const count = type === 'pixel-arrow' ? 12 : type === 'plasma-orb' ? 15 : type === 'cyber-diamond' ? 10 : 6;
    for (let i = 0; i < count; i++) {
      if (particlesRef.current.length > 30) break;
      const el = document.createElement('div');
      el.className = type === 'pixel-arrow' ? 'cursor-pixel-particle' : 'cursor-particle';
      trailRef.current?.appendChild(el);

      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = 1 + Math.random() * 2;
      const particle: Particle = {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 20 + Math.random() * 15,
        size: type === 'pixel-arrow' ? (2 + Math.floor(Math.random() * 4)) : (2 + Math.random() * 4),
        el,
      };
      particlesRef.current.push(particle);
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (!cursorRef.current || !trailRef.current) return;

    const cursor = cursorRef.current;
    const trail = trailRef.current;

    // Smooth lerp — less springy, more responsive
    const LERP = 0.35;

    function onMouseMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };
    }

    function onMouseDown() {
      isClickingRef.current = true;
      cursor.classList.add('cursor-clicking');
      spawnClickBurst(cursorTypeRef.current, cursorPosRef.x, cursorPosRef.y);
    }

    function onMouseUp() {
      isClickingRef.current = false;
      cursor.classList.remove('cursor-clicking');
    }

    function checkHoverTarget(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const isHoverable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('summary') ||
        target.closest('details') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isHoverable && !isHoveringRef.current) {
        isHoveringRef.current = true;
        cursor.classList.add('cursor-hover');
      } else if (!isHoverable && isHoveringRef.current) {
        isHoveringRef.current = false;
        cursor.classList.remove('cursor-hover');
      }
    }

    function onMouseLeave() {
      cursor.style.opacity = '0';
      trail.style.opacity = '0';
    }

    function onMouseEnter() {
      cursor.style.opacity = '1';
      trail.style.opacity = '1';
    }

    function animate() {
      const ct = cursorTypeRef.current;

      // If default, hide custom cursor and show system
      if (ct === 'default') {
        cursor.style.display = 'none';
        trail.style.display = 'none';
        document.documentElement.classList.add('system-cursor-active');
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      document.documentElement.classList.remove('system-cursor-active');
      cursor.style.display = '';
      trail.style.display = '';

      // Direct lerp — no spring oscillation
      const dx = posRef.current.x - cursorPosRef.x;
      const dy = posRef.current.y - cursorPosRef.y;
      cursorPosRef.x += dx * LERP;
      cursorPosRef.y += dy * LERP;

      cursor.style.left = `${cursorPosRef.x}px`;
      cursor.style.top = `${cursorPosRef.y}px`;

      const speed = Math.sqrt(dx * dx + dy * dy);

      // Type-specific animation
      if (ct === 'phantom-cross') {
        rotationRef.current += speed * 0.8;
        cursor.style.setProperty('--rotation', `${rotationRef.current}deg`);
      } else if (ct === 'cyber-diamond') {
        rotationRef.current += speed * 0.5 + 0.3;
        cursor.style.setProperty('--rotation', `${rotationRef.current}deg`);
      } else if (ct === 'plasma-orb') {
        rotationRef.current += 1;
        cursor.style.setProperty('--rotation', `${rotationRef.current}deg`);
      } else if (ct === 'void-dot') {
        cursor.style.setProperty('--speed', `${Math.min(speed, 8)}`);
      }

      // Spawn trail particles (reduced rate for perf)
      // Skip particles for classic-cross (no trail)
      if (ct === 'classic-cross') {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const now = performance.now();
      const spawnThreshold = ct === 'pixel-arrow' ? 50 : ct === 'void-dot' ? 40 : 60;
      const speedThreshold = ct === 'void-dot' ? 1.2 : 2.5;
      if (speed > speedThreshold && now - lastSpawnRef.current > spawnThreshold) {
        spawnParticle(ct);
        lastSpawnRef.current = now;
      }

      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.94; p.vy *= 0.94;
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

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', checkHoverTarget, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', checkHoverTarget);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      particlesRef.current.forEach(p => p.el.remove());
      particlesRef.current = [];
    };
  }, [spawnParticle, spawnClickBurst]);

  // Don't render on server (avoids SSR hydration mismatch)
  if (typeof window === 'undefined') return null;

  // Don't render cursor div at all for default — system cursor handles it
  if (cursorType === 'default') {
    return null;
  }

  const cursorClass = getCursorClass(cursorType);

  // Render different inner HTML based on cursor type
  function renderCursorInner() {
    switch (cursorType) {
      case 'phantom-cross':
        return (
          <>
            <div className="phantom-cross-h" />
            <div className="phantom-cross-v" />
            <div className="phantom-center" />
            <div className="phantom-ring" />
          </>
        );
      case 'neon-ring':
        return (
          <>
            <div className="neon-ring-inner" />
            <div className="neon-ring-glow" />
          </>
        );
      case 'plasma-orb':
        return (
          <>
            <div className="plasma-orb-core" />
            <div className="plasma-orb-particle pop-1" />
            <div className="plasma-orb-particle pop-2" />
            <div className="plasma-orb-particle pop-3" />
            <div className="plasma-orb-particle pop-4" />
          </>
        );
      case 'pixel-arrow':
        return <div className="pixel-arrow-shape" />;
      case 'void-dot':
        return (
          <>
            <div className="void-dot-core" />
            <div className="void-dot-ring" />
          </>
        );
      case 'cyber-diamond':
        return (
          <>
            <div className="cyber-diamond-shape" />
            <div className="cyber-diamond-circuit cd-circuit-1" />
            <div className="cyber-diamond-circuit cd-circuit-2" />
            <div className="cyber-diamond-circuit cd-circuit-3" />
            <div className="cyber-diamond-circuit cd-circuit-4" />
          </>
        );
      case 'glitch-trail':
        return (
          <>
            <div className="glitch-main" />
            <div className="glitch-offset glitch-r" />
            <div className="glitch-offset glitch-b" />
          </>
        );
      case 'hex-spinner':
        return (
          <>
            <div className="hex-ring" />
            <div className="hex-ring-inner" />
            <div className="hex-dot" />
          </>
        );
      case 'flame':
        return (
          <>
            <div className="flame-core" />
            <div className="flame-tip" />
            <div className="flame-outer" />
          </>
        );
      case 'ice-crystal':
        return (
          <>
            <div className="ice-core" />
            <div className="ice-spoke ice-spoke-1" />
            <div className="ice-spoke ice-spoke-2" />
            <div className="ice-spoke ice-spoke-3" />
            <div className="ice-spoke ice-spoke-4" />
            <div className="ice-spoke ice-spoke-5" />
            <div className="ice-spoke ice-spoke-6" />
          </>
        );
      case 'star-field':
        return (
          <>
            <div className="star-cross-h" />
            <div className="star-cross-v" />
            <div className="star-dot" />
            <div className="star-ring" />
            <div className="star-spark star-spark-1" />
            <div className="star-spark star-spark-2" />
            <div className="star-spark star-spark-3" />
            <div className="star-spark star-spark-4" />
          </>
        );
      case 'sonic-wave':
        return (
          <>
            <div className="sonic-ring sonic-ring-1" />
            <div className="sonic-ring sonic-ring-2" />
            <div className="sonic-ring sonic-ring-3" />
            <div className="sonic-dot" />
          </>
        );
      case 'classic-cross':
        return (
          <>
            <div className="classic-h" />
            <div className="classic-v" />
            <div className="classic-dot" />
          </>
        );
      default:
        return null;
    }
  }

  return (
    <>
      <div ref={cursorRef} className={cursorClass} aria-hidden="true">
        {renderCursorInner()}
      </div>
      <div ref={trailRef} className="cursor-trail-layer" aria-hidden="true" />
    </>
  );
}