"use client";

import { useEffect, useState, useRef } from "react";

interface TypeWriterProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypeWriter({ text, className = "", speed = 30 }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const prevTextRef = useRef("");

  useEffect(() => {
    if (prevTextRef.current === text) return;
    prevTextRef.current = text;

    let i = 0;

    const timer = setInterval(() => {
      if (i === 0) {
        setDone(false);
      }
      i++;
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayed}
      <span className="typewriter-cursor" style={{ opacity: done ? 1 : undefined }}>
        |
      </span>
    </span>
  );
}
