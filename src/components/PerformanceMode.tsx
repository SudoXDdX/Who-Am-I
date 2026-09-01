"use client";

import { useState, useRef, useEffect } from "react";

export type PerfLevel = "low" | "mid" | "high";

function getInitialPerf(): PerfLevel {
  if (typeof window === "undefined") return "high";
  const stored = localStorage.getItem("perf-mode");
  if (stored === "low" || stored === "mid" || stored === "high") return stored;
  return "high";
}

export function PerformanceMode({ locale }: { locale: "pt" | "en" }) {
  const [perfLevel, setPerfLevel] = useState<PerfLevel>(getInitialPerf);
  const [showPicker, setShowPicker] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-perf", perfLevel);
    localStorage.setItem("perf-mode", perfLevel);
    // Notify WallpaperEngine and other components
    window.dispatchEvent(new CustomEvent("perf-change", { detail: { level: perfLevel } }));
  }, [perfLevel]);

  function selectPerf(level: PerfLevel) {
    setPerfLevel(level);
    setShowPicker(false);
  }

  const modes = [
    {
      id: "low" as PerfLevel,
      icon: "battery_saver",
      label: locale === "pt" ? "Low End" : "Low End",
      desc: locale === "pt" ? "Sem animações pesadas" : "No heavy animations",
    },
    {
      id: "mid" as PerfLevel,
      icon: "tune",
      label: locale === "pt" ? "Mid End" : "Mid End",
      desc: locale === "pt" ? "Otimizado" : "Optimized",
    },
    {
      id: "high" as PerfLevel,
      icon: "speed",
      label: locale === "pt" ? "High End" : "High End",
      desc: locale === "pt" ? "Experiência completa" : "Full experience",
    },
  ];

  return (
    <div className="relative" ref={panelRef}>
      {showPicker && (
        <div className="perf-picker glass-card md-elevation-3">
          <p className="perf-picker-label">
            {locale === "pt" ? "Performance" : "Performance"}
          </p>
          <div className="flex flex-col gap-0.5">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => selectPerf(mode.id)}
                className={`perf-option ${mode.id === perfLevel ? "active" : ""}`}
              >
                <span className="perf-option-icon">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: 16 }}
                  >
                    {mode.icon}
                  </span>
                </span>
                <div>
                  <div>{mode.label}</div>
                  <div className="perf-option-desc">{mode.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setShowPicker((p) => !p)}
        className="perf-mode-trigger md-ripple-soft"
        aria-label={
          locale === "pt"
            ? "Modo de performance"
            : "Performance mode"
        }
        title={
          locale === "pt"
            ? `Performance: ${perfLevel}`
            : `Performance: ${perfLevel}`
        }
      >
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
          {perfLevel === "low"
            ? "battery_saver"
            : perfLevel === "mid"
              ? "tune"
              : "speed"}
        </span>
      </button>
    </div>
  );
}