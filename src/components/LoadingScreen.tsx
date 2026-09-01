"use client";

import { useState, useEffect } from "react";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const MIN_DISPLAY = 1500;
    const EXIT_DELAY = 600;
    const start = Date.now();

    const onReady = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_DISPLAY - elapsed);
      setTimeout(() => {
        setHidden(true);
        setTimeout(() => {
          setMounted(false);
        }, EXIT_DELAY);
      }, remaining);
    };

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady);
      return () => window.removeEventListener("load", onReady);
    }
  }, []);

  if (!mounted) return null;

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
