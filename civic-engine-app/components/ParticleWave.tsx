'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  amplitude: number;
  color: string;
}

export default function ParticleWave() {
  const particles = useMemo(() => {
    const cols = 40;
    const rows = 8;
    const result: Particle[] = [];

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Vary position slightly for organic feel
        const xOffset = (Math.random() - 0.5) * 10;
        const yOffset = (Math.random() - 0.5) * 8;

        // Size varies more dramatically
        const baseSize = 3 + Math.random() * 6;
        const sizeVariation = Math.sin(col * 0.3) * 2;

        // Color gradient from blue to red across the wave
        const progress = col / cols;
        const color = progress < 0.5
          ? `rgba(47, 59, 189, ${0.3 + Math.random() * 0.5})` // Blue
          : `rgba(201, 26, 43, ${0.3 + Math.random() * 0.5})`; // Red

        result.push({
          id: row * cols + col,
          x: (col / cols) * 100 + xOffset * 0.5,
          y: (row / rows) * 100 + yOffset,
          size: Math.max(2, baseSize + sizeVariation),
          delay: col * 0.05 + row * 0.02,
          duration: 2 + Math.random() * 1,
          amplitude: 12 + Math.random() * 8 + Math.sin(col * 0.2) * 5,
          color,
        });
      }
    }
    return result;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            animate={{
              y: [0, -particle.amplitude, 0, particle.amplitude * 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}
