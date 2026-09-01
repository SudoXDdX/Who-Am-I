"use client";

import { useState, useRef, useEffect } from "react";
import { CURSOR_TYPES, type CursorType } from "./CustomCursor";

function getInitialCursorType(): CursorType {
  if (typeof window === 'undefined') return 'phantom-cross';
  const stored = localStorage.getItem('cursor-type');
  if (stored && CURSOR_TYPES.some(c => c.id === stored)) return stored as CursorType;
  return 'phantom-cross';
}

export function CursorSelector({ locale }: { locale: 'pt' | 'en' }) {
  const [cursorType, setCursorType] = useState<CursorType>(getInitialCursorType);
  const [showPicker, setShowPicker] = useState(false);
  const mountedRef = useRef(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mountedRef.current = true;
  });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function selectCursor(id: CursorType) {
    setCursorType(id);
    localStorage.setItem('cursor-type', id);
    document.dispatchEvent(new CustomEvent('cursor-change', { detail: { type: id } }));
    setShowPicker(false);
  }

  // CursorSelector only renders meaningful content on client
  if (typeof window === 'undefined') return null;

  return (
    <div className="relative" ref={panelRef}>
      {showPicker && (
        <div className="cursor-selector-picker glass-card md-elevation-3">
          <p className="theme-picker-label">{locale === 'pt' ? 'Cursor' : 'Cursor'}</p>
          <div className="flex flex-col gap-0.5">
            {CURSOR_TYPES.map((ct) => (
              <button
                key={ct.id}
                onClick={() => selectCursor(ct.id)}
                className={`cursor-option ${ct.id === cursorType ? 'active' : ''}`}
              >
                <span className="cursor-option-preview">
                  <CursorPreview id={ct.id} />
                </span>
                {ct.label[locale]}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setShowPicker(p => !p)}
        className="cursor-selector-trigger md-ripple-soft"
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

function CursorPreview({ id }: { id: string }) {
  const s = { width: 14, height: 14, className: 'cursor-preview-svg' };
  const pc = 'var(--color-primary)';
  const cc = 'var(--color-cyan)';
  const vc = 'var(--color-violet)';
  const gc = 'var(--color-green)';
  const rc = 'var(--color-red)';
  const tc = 'var(--color-text)';
  const tmc = 'var(--color-text-muted)';

  switch (id) {
    case 'default':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <path d="M1 1L5 13L6.5 7.5L13 6L1 1Z" stroke="var(--color-text-sec)" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'phantom-cross':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <line x1="4" y1="7" x2="10" y2="7" stroke={pc} strokeWidth="0.8" />
          <line x1="7" y1="4" x2="7" y2="10" stroke={pc} strokeWidth="0.8" />
          <circle cx="7" cy="7" r="4.5" stroke={pc} strokeWidth="0.4" fill="none" opacity="0.5">
            <animate attributeName="r" values="4.5;5;4.5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'neon-ring':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="5" stroke={pc} strokeWidth="1" fill="none">
            <animate attributeName="r" values="5;5.5;5" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="7" cy="7" r="5" stroke={pc} strokeWidth="2" fill="none" opacity="0.3">
            <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'plasma-orb':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="2.5" fill={pc}>
            <animate attributeName="r" values="2.5;3;2.5" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="10" cy="4" r="0.8" fill={pc} opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" values="0 7 7;360 7 7" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="4" cy="10" r="0.6" fill={cc} opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" values="180 7 7;540 7 7" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'pixel-arrow':
      return (
        <svg {...s} viewBox="0 0 14 14" style={{ imageRendering: 'pixelated' }}>
          <rect x="5" y="1" width="4" height="2" fill={pc} />
          <rect x="3" y="3" width="8" height="2" fill={pc} />
          <rect x="5" y="5" width="4" height="2" fill={pc} />
          <rect x="5" y="7" width="4" height="2" fill={pc} />
          <rect x="5" y="9" width="4" height="2" fill={pc} />
          <rect x="6" y="11" width="2" height="2" fill={pc} />
        </svg>
      );
    case 'void-dot':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="2" fill={tc} />
          <circle cx="7" cy="7" r="5" stroke={tmc} strokeWidth="0.4" fill="none" opacity="0.4">
            <animate attributeName="r" values="5;5.5;5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'cyber-diamond':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <rect x="4.5" y="4.5" width="5" height="5" fill={pc} transform="rotate(45 7 7)">
            <animateTransform attributeName="transform" type="rotate" values="45 7 7;405 7 7" dur="6s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    case 'glitch-trail':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <rect x="5" y="5" width="4" height="4" fill={pc} opacity="0.9">
            <animate attributeName="x" values="5;5.5;4.5;5" dur="0.3s" repeatCount="indefinite" />
          </rect>
          <rect x="6" y="6" width="3" height="3" fill={rc} opacity="0.4">
            <animate attributeName="x" values="6;7;5;6" dur="0.2s" repeatCount="indefinite" />
          </rect>
        </svg>
      );
    case 'hex-spinner':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <polygon points="7,2 11.5,4.5 11.5,9.5 7,12 2.5,9.5 2.5,4.5" stroke={pc} strokeWidth="0.7" fill="none">
            <animateTransform attributeName="transform" type="rotate" values="0 7 7;360 7 7" dur="4s" repeatCount="indefinite" />
          </polygon>
          <circle cx="7" cy="7" r="1.5" fill={cc}>
            <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'flame':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <ellipse cx="7" cy="9" rx="3" ry="4" fill={rc} opacity="0.8">
            <animate attributeName="ry" values="4;4.5;4" dur="0.5s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="7" cy="8" rx="2" ry="3" fill="#FBBF24" opacity="0.9">
            <animate attributeName="ry" values="3;3.5;3" dur="0.4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="7" cy="7.5" rx="1" ry="2" fill="#fff" opacity="0.7" />
        </svg>
      );
    case 'ice-crystal':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <line x1="7" y1="2" x2="7" y2="12" stroke={cc} strokeWidth="0.7" />
          <line x1="2" y1="7" x2="12" y2="7" stroke={cc} strokeWidth="0.7" />
          <line x1="3.5" y1="3.5" x2="10.5" y2="10.5" stroke={cc} strokeWidth="0.5" opacity="0.6" />
          <line x1="10.5" y1="3.5" x2="3.5" y2="10.5" stroke={cc} strokeWidth="0.5" opacity="0.6" />
          <circle cx="7" cy="7" r="1.5" fill={cc} opacity="0.8">
            <animate attributeName="r" values="1.5;2;1.5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'star-field':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <line x1="5" y1="7" x2="9" y2="7" stroke={pc} strokeWidth="0.6" />
          <line x1="7" y1="5" x2="7" y2="9" stroke={pc} strokeWidth="0.6" />
          <circle cx="7" cy="7" r="1" fill={pc} />
          <circle cx="3" cy="3" r="0.5" fill={cc} opacity="0.6">
            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="11" cy="4" r="0.4" fill={vc} opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="10" cy="11" r="0.5" fill={gc} opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.15;0.5" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case 'sonic-wave':
      return (
        <svg {...s} viewBox="0 0 14 14">
          <circle cx="7" cy="7" r="2" fill={pc} />
          <circle cx="7" cy="7" r="4" stroke={pc} strokeWidth="0.5" fill="none" opacity="0.6">
            <animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1s" repeatCount="indefinite" />
          </circle>
          <circle cx="7" cy="7" r="6" stroke={pc} strokeWidth="0.3" fill="none" opacity="0.3">
            <animate attributeName="r" values="5;6.5;5" dur="1.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0.05;0.3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    default:
      return null;
  }
}
