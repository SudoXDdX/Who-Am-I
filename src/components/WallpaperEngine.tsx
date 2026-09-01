"use client";

import { useEffect, useState } from "react";

export type PerfLevel = "low" | "mid" | "high";

function getPerf(): PerfLevel {
  if (typeof window === "undefined") return "high";
  const stored = localStorage.getItem("perf-mode");
  if (stored === "low" || stored === "mid" || stored === "high") return stored;
  return "high";
}

export function WallpaperEngine() {
  const [perf, setPerf] = useState<PerfLevel>("high");

  useEffect(() => {
    setPerf(getPerf());
    function onPerfChange() {
      setPerf(getPerf());
    }
    window.addEventListener("perf-change", onPerfChange);
    return () => window.removeEventListener("perf-change", onPerfChange);
  }, []);

  if (perf === "low") {
    return <div className="wallpaper-engine" aria-hidden="true" />;
  }

  const blobCount = perf === "mid" ? 3 : 6;

  return (
    <div className="wallpaper-engine" aria-hidden="true">
      <div className="wallpaper-blob wp-blob-1" />
      <div className="wallpaper-blob wp-blob-2" />
      <div className="wallpaper-blob wp-blob-3" />
      {blobCount > 3 && <div className="wallpaper-blob wp-blob-4" />}
      {blobCount > 3 && <div className="wallpaper-blob wp-blob-5" />}
      {blobCount > 3 && <div className="wallpaper-blob wp-blob-6" />}
      {perf === "high" && <div className="wallpaper-noise" />}
      {perf === "high" && <div className="wallpaper-grid" />}
    </div>
  );
}
