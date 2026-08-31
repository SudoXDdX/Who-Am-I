"use client";

import type { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
}

export function NeonCard({ children, className = "" }: NeonCardProps) {
  return (
    <div className={`neon-card ${className}`}>
      {children}
    </div>
  );
}
