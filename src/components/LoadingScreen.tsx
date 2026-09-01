"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [visible, setVisible] = useState(true);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleReady = useCallback(() => {
    const MIN_DISPLAY = 1500;
    const EXIT_DELAY = 600;
    const elapsed = performance.now();

    const t1 = setTimeout(() => {
      setHidden(true);
    }, MIN_DISPLAY);

    const t2 = setTimeout(() => {
      setVisible(false);
      timerRefs.current = [];
    }, MIN_DISPLAY + EXIT_DELAY);

    timerRefs.current = [t1, t2];
  }, []);

  useEffect(() => {
    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady);
      return () => window.removeEventListener("load", handleReady);
    }
    return () => {
      timerRefs.current.forEach(t => clearTimeout(t));
    };
  }, [handleReady]);

  if (!visible) return null;

  return (
    <div
      className={`loading-screen ${hidden ? "hidden" : ""}`}
      aria-hidden="true"
    >
      <div className="loading-logo">whoami</div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill" />
      </div>
    </div>
  );
}
