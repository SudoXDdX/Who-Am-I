"use client";

import { useEffect, useState, useCallback, useRef } from "react";

type ColorScheme = "blue" | "pink" | "green" | "black" | "white" | "red" | "cyan" | "purple";
type ColorMode = "dark" | "light";

const COLOR_LABELS: Record<ColorScheme, { pt: string; en: string }> = {
  blue: { pt: "Azul", en: "Blue" },
  pink: { pt: "Rosa", en: "Pink" },
  green: { pt: "Verde", en: "Green" },
  black: { pt: "Preto", en: "Black" },
  white: { pt: "Branco", en: "White" },
  red: { pt: "Vermelho", en: "Red" },
  cyan: { pt: "Ciano", en: "Cyan" },
  purple: { pt: "Roxo", en: "Purple" },
};

const COLOR_DOTS: Record<ColorScheme, string> = {
  blue: "#4e8ff8",
  pink: "#f94aab",
  green: "#1aa64a",
  black: "#5e5e5e",
  white: "#e3e3e3",
  red: "#ff5252",
  cyan: "#38bdf8",
  purple: "#a855f7",
};

function getInitialTheme(): { mode: ColorMode; color: ColorScheme } {
  if (typeof window === "undefined") return { mode: "dark", color: "blue" };
  const savedMode = localStorage.getItem("theme-mode") as ColorMode | null;
  const savedColor = localStorage.getItem("theme-color") as ColorScheme | null;
  return {
    mode: savedMode || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"),
    color: savedColor || "blue",
  };
}

export function ThemeToggle({ locale }: { locale: "pt" | "en" }) {
  const [mode, setMode] = useState<ColorMode>(() => getInitialTheme().mode);
  const [color, setColor] = useState<ColorScheme>(() => getInitialTheme().color);
  const [showPicker, setShowPicker] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    root.setAttribute("data-color", color);
    root.style.colorScheme = mode;
    localStorage.setItem("theme-mode", mode);
    localStorage.setItem("theme-color", color);
  }, [mode, color]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const pickColor = useCallback((c: ColorScheme) => {
    setColor(c);
    setShowPicker(false);
  }, []);

  return (
    <div className="theme-toggle-wrapper" ref={panelRef}>
      {showPicker && (
        <div className="theme-color-picker glass-card">
          <p className="theme-picker-label">{locale === "pt" ? "Cor" : "Color"}</p>
          <div className="theme-color-options">
            {(Object.keys(COLOR_DOTS) as ColorScheme[]).map((c) => (
              <button
                key={c}
                onClick={() => pickColor(c)}
                className={`theme-color-dot ${c === color ? "active" : ""}`}
                style={{ "--dot-color": COLOR_DOTS[c] } as React.CSSProperties}
                aria-label={`${COLOR_LABELS[c][locale]} theme`}
                title={COLOR_LABELS[c][locale]}
              >
                {c === color && (
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: c === "white" ? "#1b1b1c" : "#fff" }}>check</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="theme-toggle-row">
        <button
          onClick={() => setShowPicker((p) => !p)}
          className="theme-color-trigger"
          aria-label={locale === "pt" ? "Escolher cor" : "Pick color"}
          title={locale === "pt" ? "Escolher cor do tema" : "Pick theme color"}
        >
          <span className="theme-current-dot" style={{ background: COLOR_DOTS[color] }} />
        </button>

        <button
          onClick={toggleMode}
          className="theme-switch"
          role="switch"
          aria-checked={mode === "light"}
          aria-label={mode === "dark" ? (locale === "pt" ? "Ativar modo claro" : "Switch to light mode") : (locale === "pt" ? "Ativar modo escuro" : "Switch to dark mode")}
        >
          <span className="theme-switch-track">
            <span className="theme-switch-thumb">
              <span className="material-symbols-outlined theme-switch-icon" style={{ fontSize: 16 }}>
                {mode === "dark" ? "dark_mode" : "light_mode"}
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
