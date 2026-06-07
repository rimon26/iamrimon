"use client";

import { useEffect, useRef, useState } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const mouse = { x: -1000, y: -1000, active: false };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const density = Math.floor((canvas.width * canvas.height) / 9000);
      const count = Math.min(Math.max(density, 40), 120);

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.5 + 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();

    const draw = () => {
      if (isPaused) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle background radial glow
      const midX = canvas.width / 2;
      const midY = canvas.height / 2;
      const gradient = ctx.createRadialGradient(
        midX,
        midY,
        10,
        midX,
        midY,
        Math.max(canvas.width, canvas.height),
      );
      gradient.addColorStop(0, "rgba(12, 12, 12, 0.95)");
      gradient.addColorStop(1, "rgba(4, 4, 4, 1)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Clip-guards
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(193, 255, 0, 0.35)"; // Artistic Lime shadow glow
        ctx.fill();
      });

      // Connect particles with near lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.1;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`; // White subtle alignment connections
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Connect particles to mouse
      if (mouse.active) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.18;
            ctx.strokeStyle = `rgba(193, 255, 0, ${alpha})`; // Artistic Lime mouse pull
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none bg-neutral-950"
        style={{ contentVisibility: "auto" }}
        id="bg-canvas"
      />

      {/* Control overlay */}
      <button
        id="toggle-particles-btn"
        className="fixed bottom-6 left-6 z-40 text-[9px] font-mono select-none border border-white/10 hover:border-[#C1FF00]/45 text-neutral-400 hover:text-[#C1FF00] bg-black/80 backdrop-blur-md py-1 px-2.5 rounded-full transition-all duration-300 tracking-wider cursor-pointer"
        onClick={() => setIsPaused((prev) => !prev)}
      >
        <span>[{isPaused ? "RESUME AMBIENCE" : "PAUSE AMBIENCE"}]</span>
      </button>
    </>
  );
}
