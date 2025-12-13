'use client';

import { useRef, useEffect } from 'react';

interface Particle {
  ix: number; // grid index x
  iy: number; // grid index y
  baseX: number;
  baseY: number;
  baseSize: number;
  color: string;
  baseOpacity: number;
  isLeft: boolean;
}

export default function ParticleWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const countRef = useRef<number>(0);
  const particleWidthRef = useRef<number>(0.25);
  const gradientWidthRef = useRef<number>(1.0); // Multiplier for gradient width

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      generateParticles();
    };

    const generateParticles = () => {
      const particles: Particle[] = [];
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Responsive settings based on screen width
      let amountY = 25;
      let verticalSpread = 0.5;
      let verticalOffset = 0; // How much to push particles down
      let particleWidth = 0.10; // How far particles extend from edge (0-0.5)

      let gradientWidth = 1.0; // Gradient width multiplier

      if (width < 640) {
        amountY = 15;
        verticalSpread = 0.25;
        verticalOffset = 0.15; // Push down on mobile
        particleWidth = 0.28; // Wider on mobile
      } else if (width < 1024) {
        amountY = 20;
        verticalSpread = 0.35;
        verticalOffset = 0.10; // Push down significantly on tablet
        gradientWidth = 0.6; // Narrower gradient on tablet
      } else if (width < 1440) {
        particleWidth = 0.22; // Standard desktop
      } else {
        particleWidth = 0.28; // Wide screens
      }

      particleWidthRef.current = particleWidth;
      gradientWidthRef.current = gradientWidth;

      const separationY = (height * verticalSpread) / amountY;
      const verticalStart = height * ((1 - verticalSpread) / 2 + verticalOffset);
      const verticalCenterY = height / 2;

      const createSideParticles = (startXPct: number, endXPct: number, isLeft: boolean) => {
        const amountX = 60;
        const xRange = (endXPct - startXPct) * width;
        const separationX = xRange / amountX;

        for (let ix = 0; ix < amountX; ix++) {
          for (let iy = 0; iy < amountY; iy++) {
            // Base position in grid
            let baseX: number;
            if (isLeft) {
              // Cluster more at left edge (ix=0), sparse towards center
              const t = ix / amountX;
              baseX = startXPct * width + Math.pow(t, 1.3) * xRange;
            } else {
              // Cluster more at right edge (ix=amountX), sparse towards center
              const t = ix / amountX;
              baseX = startXPct * width + (1 - Math.pow(1 - t, 1.3)) * xRange;
            }

            const baseY = verticalStart + iy * separationY;

            // Distance from vertical center (0-1)
            const distFromVertCenter = Math.abs(baseY - verticalCenterY) / (height * verticalSpread / 2);
            const centerProximity = Math.max(0, 1 - distFromVertCenter);

            // Skip particles further from vertical center for sparser edges
            if (distFromVertCenter > 0.7 && Math.random() > 0.7) continue;
            if (distFromVertCenter > 0.9 && Math.random() > 0.5) continue;

            // Skip particles closer to horizontal center
            const horizProgress = ix / amountX;
            const distFromHorizEdge = isLeft ? horizProgress : (1 - horizProgress);
            if (distFromHorizEdge > 0.7 && Math.random() > 0.6) continue;

            // Size based on position - larger at center
            const verticalSizeFactor = Math.pow(centerProximity, 1.5);
            const baseSize = 2 + verticalSizeFactor * 4;

            // Opacity - stronger at center
            const baseOpacity = 0.3 + centerProximity * 0.5;

            const color = isLeft ? 'rgba(47, 59, 189,' : 'rgba(201, 26, 43,';

            particles.push({
              ix,
              iy,
              baseX,
              baseY,
              baseSize,
              color,
              baseOpacity,
              isLeft,
            });
          }
        }
      };

      createSideParticles(0, particleWidth, true);
      createSideParticles(1 - particleWidth, 1, false);

      particlesRef.current = particles;
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const count = countRef.current;

      for (const particle of particlesRef.current) {
        // Wave motion inspired by Three.js example
        // Combine ix and iy with count for flowing wave effect
        const waveY = (Math.cos((particle.ix + count) * 0.3) * 15) +
                      (Math.cos((particle.iy + count) * 0.5) * 10);

        const waveX = (Math.sin((particle.ix + count) * 0.2) * 8) +
                      (Math.sin((particle.iy + count) * 0.3) * 5);

        // Pulsing size like the Three.js example
        const sizeWave = (Math.cos((particle.ix + count) * 0.3) + 2) * 0.5 +
                         (Math.cos((particle.iy + count) * 0.5) + 1) * 0.3;

        const x = particle.baseX + waveX;
        const y = particle.baseY + waveY;
        const size = particle.baseSize * sizeWave;

        // Fade particles near the center with gradient effect
        const distFromCenter = Math.abs(x - width / 2) / (width / 2);
        const centerFade = Math.min(1, Math.pow(distFromCenter / 0.4, 2));

        ctx.beginPath();
        ctx.arc(x, y, Math.max(1, size), 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${particle.baseOpacity * centerFade})`;
        ctx.fill();
      }

      // Draw white gradient overlay from center with quadratic falloff
      // Gradient width adapts to particle width and screen size
      const pw = particleWidthRef.current;
      const gw = gradientWidthRef.current; // Gradient width multiplier
      const gradient = ctx.createLinearGradient(0, 0, width, 0);

      // Quadratic falloff based on particle width, scaled by gradient width multiplier
      const innerEdge = 0.5 - (0.5 - pw) * gw; // Where gradient reaches near-solid
      const outerEdge = 1 - innerEdge;

      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(pw * 0.4, 'rgba(255, 255, 255, 0.05)');
      gradient.addColorStop(pw * 0.7, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(pw * 0.85, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(pw * 1.0, 'rgba(255, 255, 255, 0.85)');
      gradient.addColorStop(Math.min(innerEdge, 0.49), 'rgba(255, 255, 255, 0.98)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(Math.max(outerEdge, 0.51), 'rgba(255, 255, 255, 0.98)');
      gradient.addColorStop(1 - pw, 'rgba(255, 255, 255, 0.85)');
      gradient.addColorStop(1 - pw * 0.85, 'rgba(255, 255, 255, 0.5)');
      gradient.addColorStop(1 - pw * 0.7, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1 - pw * 0.4, 'rgba(255, 255, 255, 0.05)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Increment count for animation - controls speed (slower)
      countRef.current += 0.02;

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
