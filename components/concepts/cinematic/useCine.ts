"use client";
import { useEffect, useState } from "react";

// True on large screens with motion allowed: enables pinned / scroll-driven scenes.
// Phones and reduced-motion users get static, swipeable layouts instead.
export function useCinematic() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const up = () => setOn(mq.matches);
    up();
    mq.addEventListener("change", up);
    return () => mq.removeEventListener("change", up);
  }, []);
  return on;
}
