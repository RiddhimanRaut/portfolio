'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  parallaxLayer: number; // 0 = far (slow), 1 = mid, 2 = close (fast)
}

interface Nebula {
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
  rotation: number;
  hue: number;
  opacity: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const starsRef = useRef<Star[]>([]);
  const nebulaeRef = useRef<Nebula[]>([]);
  const animationRef = useRef<number>(0);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initNebulae();
    };

    const initStars = () => {
      starsRef.current = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);

      for (let i = 0; i < starCount; i++) {
        const parallaxLayer = Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2;
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 3, // Extend for parallax scrolling
          size: parallaxLayer === 0 ? Math.random() * 1 + 0.5 :
                parallaxLayer === 1 ? Math.random() * 1.5 + 0.8 :
                Math.random() * 2 + 1.2,
          brightness: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 2 + 1,
          twinkleOffset: Math.random() * Math.PI * 2,
          parallaxLayer,
        });
      }
    };

    const initNebulae = () => {
      nebulaeRef.current = [];
      const nebulaCount = 4;

      for (let i = 0; i < nebulaCount; i++) {
        nebulaeRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 2,
          radiusX: Math.random() * 300 + 200,
          radiusY: Math.random() * 200 + 150,
          rotation: Math.random() * Math.PI,
          hue: Math.random() < 0.5 ? 220 + Math.random() * 40 : 280 + Math.random() * 40, // Blue or purple
          opacity: Math.random() * 0.06 + 0.03,
        });
      }
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const drawNebulae = (time: number) => {
      const scrollOffset = scrollYRef.current * 0.1;

      nebulaeRef.current.forEach((nebula) => {
        const y = nebula.y - scrollOffset * 0.3;

        // Only draw if visible
        if (y < -nebula.radiusY * 2 || y > canvas.height + nebula.radiusY * 2) return;

        ctx.save();
        ctx.translate(nebula.x, y);
        ctx.rotate(nebula.rotation);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, nebula.radiusX);
        const pulse = Math.sin(time * 0.0005 + nebula.rotation) * 0.2 + 1;

        gradient.addColorStop(0, `hsla(${nebula.hue}, 70%, 55%, ${nebula.opacity * pulse * 1.5})`);
        gradient.addColorStop(0.4, `hsla(${nebula.hue + 20}, 60%, 45%, ${nebula.opacity * 0.7 * pulse})`);
        gradient.addColorStop(0.7, `hsla(${nebula.hue - 10}, 50%, 35%, ${nebula.opacity * 0.3 * pulse})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.scale(1, nebula.radiusY / nebula.radiusX);
        ctx.beginPath();
        ctx.arc(0, 0, nebula.radiusX, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });
    };

    const drawStars = (time: number) => {
      const scrollOffset = scrollYRef.current;

      starsRef.current.forEach((star) => {
        // Parallax effect based on layer
        const parallaxMultiplier = star.parallaxLayer === 0 ? 0.05 :
                                    star.parallaxLayer === 1 ? 0.15 : 0.3;
        const y = (star.y - scrollOffset * parallaxMultiplier) % (canvas.height * 3);
        const adjustedY = y < 0 ? y + canvas.height * 3 : y;

        // Only draw if visible
        if (adjustedY > canvas.height + 10) return;

        // Twinkling effect
        const twinkle = Math.sin(time * 0.001 * star.twinkleSpeed + star.twinkleOffset);
        const brightness = star.brightness * (0.7 + twinkle * 0.3);

        // Star color - mostly white, some slightly blue or yellow
        const colorVariation = Math.sin(star.twinkleOffset);
        let r = 255;
        let g = 255;
        let b = 255;

        if (colorVariation > 0.7) {
          // Slightly blue
          r = 220;
          g = 235;
          b = 255;
        } else if (colorVariation < -0.7) {
          // Slightly warm
          r = 255;
          g = 245;
          b = 220;
        }

        // Draw star glow for larger stars
        if (star.size > 1.5) {
          const glowSize = star.size * 3;
          const glow = ctx.createRadialGradient(star.x, adjustedY, 0, star.x, adjustedY, glowSize);
          glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${brightness * 0.3})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, adjustedY, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star core
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, adjustedY, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawShootingStar = (time: number) => {
      // Multiple shooting stars with different timings
      const shootingStars = [
        { cycle: 4000, offset: 0, startX: 0.85, startY: 0.05, endX: 0.15, endY: 0.35 },
        { cycle: 5500, offset: 2000, startX: 0.7, startY: 0.1, endX: 0.3, endY: 0.5 },
        { cycle: 3500, offset: 1000, startX: 0.95, startY: 0.2, endX: 0.4, endY: 0.45 },
        { cycle: 6000, offset: 3500, startX: 0.6, startY: 0.02, endX: 0.1, endY: 0.25 },
        { cycle: 4500, offset: 500, startX: 0.75, startY: 0.15, endX: 0.25, endY: 0.55 },
      ];

      shootingStars.forEach((star) => {
        const adjustedTime = (time + star.offset) % star.cycle;
        const cyclePosition = adjustedTime / star.cycle;

        if (cyclePosition < 0.12) {
          const progress = cyclePosition / 0.12;
          const startX = canvas.width * star.startX;
          const startY = canvas.height * star.startY;
          const endX = canvas.width * star.endX;
          const endY = canvas.height * star.endY;

          const currentX = startX + (endX - startX) * progress;
          const currentY = startY + (endY - startY) * progress;

          const tailLength = 120;
          const dist = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
          const tailX = currentX + ((startX - endX) / dist) * tailLength * (1 - progress);
          const tailY = currentY + ((startY - endY) / dist) * tailLength * (1 - progress);

          const gradient = ctx.createLinearGradient(tailX, tailY, currentX, currentY);
          gradient.addColorStop(0, 'transparent');
          gradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.4 * (1 - progress)})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, ${0.9 * (1 - progress)})`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(currentX, currentY);
          ctx.stroke();
        }
      });
    };

    const animate = (time: number) => {
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawNebulae(time);
      drawStars(time);
      drawShootingStar(time);

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className="fixed inset-0 bg-slate-950" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      aria-hidden="true"
    />
  );
}
