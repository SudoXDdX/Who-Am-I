"use client";

import { useEffect, useState, useRef } from "react";
import { CURSOR_TYPES, type CursorType } from "./CustomCursor";

function getStoredCursorType(): CursorType {
  if (typeof window === 'undefined') return 'phantom-cross';
  const stored = localStorage.getItem('cursor-type');
  if (stored && CURSOR_TYPES.some(c => c.id === stored)) return stored as CursorType;
  return 'phantom-cross';
}

export function CursorSelector({ locale }: { locale: 'pt' | 'en' }) {
  const [cursorType, setCursorType] = useState<CursorType>('phantom-cross');
  const [showPicker, setShowPicker] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCursorType(getStoredCursorType());
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function selectCursor(id: CursorType) {
    setCursorType(id);
    localStorage.setItem('cursor-type', id);
    document.dispatchEvent(new CustomEvent('cursor-change', { detail: { type: id } }));
    setShowPicker(false);
  }

  if (!mounted) return null;

  return (
    <div className="relative" ref={panelRef}>
      {showPicker && (
        <div className="cursor-selector-picker glass-card">
          <p className="theme-picker-label">{locale === 'pt' ? 'Cursor' : 'Cursor'}</p>
          <div className="flex flex-col gap-0.5">
            {CURSOR_TYPES.map((ct) => (
              <button
                key={ct.id}
                onClick={() => selectCursor(ct.id)}
                className={`cursor-option ${ct.id === cursorType ? 'active' : ''}`}
              >
                <span className="cursor-option-preview">
                  {ct.id === 'phantom-cross' && <PhantomCrossPreview />}
                  {ct.id === 'neon-ring' && <NeonRingPreview />}
                  {ct.id === 'plasma-orb' && <PlasmaOrbPreview />}
                  {ct.id === 'pixel-arrow' && <PixelArrowPreview />}
                  {ct.id === 'void-dot' && <VoidDotPreview />}
                  {ct.id === 'cyber-diamond' && <CyberDiamondPreview />}
                </span>
                {ct.label[locale]}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setShowPicker(p => !p)}
        className="cursor-selector-trigger"
        aria-label={locale === 'pt' ? 'Escolher cursor' : 'Pick cursor'}
        title={locale === 'pt' ? 'Escolher cursor' : 'Pick cursor'}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L5 13L6.5 7.5L13 6L1 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MINI PREVIEW ANIMATIONS
   ═══════════════════════════════════════════════════════════ */

function PhantomCrossPreview() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="cursor-preview-svg">
      <line x1="4" y1="7" x2="10" y2="7" stroke="var(--color-primary)" strokeWidth="0.8" />
      <line x1="7" y1="4" x2="7" y2="10" stroke="var(--color-primary)" strokeWidth="0.8" />
      <circle cx="7" cy="7" r="4.5" stroke="var(--color-primary)" strokeWidth="0.4" fill="none" opacity="0.5">
        <animate attributeName="r" values="4.5;5;4.5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function NeonRingPreview() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="cursor-preview-svg">
      <circle cx="7" cy="7" r="5" stroke="var(--color-primary)" strokeWidth="1" fill="none">
        <animate attributeName="r" values="5;5.5;5" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="7" cy="7" r="5" stroke="var(--color-primary)" strokeWidth="2" fill="none" opacity="0.3">
        <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function PlasmaOrbPreview() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="cursor-preview-svg">
      <circle cx="7" cy="7" r="2.5" fill="var(--color-primary)">
        <animate attributeName="r" values="2.5;3;2.5" dur="1s" repeatCount="indefinite" />
      </circle>
      <circle cx="10" cy="4" r="0.8" fill="var(--color-primary)" opacity="0.6">
        <animateTransform attributeName="transform" type="rotate" values="0 7 7;360 7 7" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="4" cy="10" r="0.6" fill="var(--color-cyan)" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" values="180 7 7;540 7 7" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function PixelArrowPreview() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="cursor-preview-svg" style={{ imageRendering: 'pixelated' }}>
      <rect x="5" y="1" width="4" height="2" fill="var(--color-primary)" />
      <rect x="3" y="3" width="8" height="2" fill="var(--color-primary)" />
      <rect x="5" y="5" width="4" height="2" fill="var(--color-primary)" />
      <rect x="5" y="7" width="4" height="2" fill="var(--color-primary)" />
      <rect x="5" y="9" width="4" height="2" fill="var(--color-primary)" />
      <rect x="6" y="11" width="2" height="2" fill="var(--color-primary)" />
    </svg>
  );
}

function VoidDotPreview() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="cursor-preview-svg">
      <circle cx="7" cy="7" r="2" fill="var(--color-text)" />
      <circle cx="7" cy="7" r="5" stroke="var(--color-text-muted)" strokeWidth="0.4" fill="none" opacity="0.4">
        <animate attributeName="r" values="5;5.5;5" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function CyberDiamondPreview() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="cursor-preview-svg">
      <rect x="4.5" y="4.5" width="5" height="5" fill="var(--color-primary)" transform="rotate(45 7 7)">
        <animateTransform attributeName="transform" type="rotate" values="45 7 7;405 7 7" dur="6s" repeatCount="indefinite" />
      </rect>
      <line x1="2" y1="7" x2="4" y2="7" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" values="45 7 7;405 7 7" dur="6s" repeatCount="indefinite" />
      </line>
      <line x1="10" y1="7" x2="12" y2="7" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.5">
        <animateTransform attributeName="transform" type="rotate" values="45 7 7;405 7 7" dur="6s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}