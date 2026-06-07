"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [touchDevice, setTouchDevice] = useState(true);

  // Position settings for the inner cursor dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inertial settings using springs for the outer lag ring
  const ringX = useSpring(mouseX, { damping: 40, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 40, stiffness: 220, mass: 0.6 });

  useEffect(() => {
    // 1. Check for touch device capability synchronously
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // 2. Defer the state update to break the synchronous render cascade
    const timer = setTimeout(() => {
      setTouchDevice(isTouch);
    }, 0);

    // If it's a touch device, bail early (but still clear the timer)
    if (isTouch) {
      return () => clearTimeout(timer);
    }

    // 3. Set up mouse listeners for desktop tracks
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setHidden(false);
    };

    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);
    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.classList.contains("clickable") ||
        target.closest(".clickable");

      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      // Clean up the macro-task timer alongside the listeners
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (touchDevice || hidden) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {/* Inner precise dot */}
      <motion.div
        id="cursor-dot"
        className="fixed w-2 h-2 rounded-full bg-[#C1FF00] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer physics ring */}
      <motion.div
        id="cursor-ring"
        className="fixed rounded-full border border-[#C1FF00]/60 bg-[#C1FF00]/5 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 46 : clicked ? 16 : 28,
          height: hovered ? 46 : clicked ? 16 : 28,
          borderColor: hovered
            ? "rgba(255, 255, 255, 0.9)"
            : "rgba(193, 255, 0, 0.7)",
          backgroundColor: hovered
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(193, 255, 0, 0.05)",
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
      />
    </div>
  );
}
