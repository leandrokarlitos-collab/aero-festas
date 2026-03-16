'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotateEnd: number;
}

export default function ConfettiEffect() {
  const [confetti, setConfetti] = useState<Confetti[]>([]);

  useEffect(() => {
    const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#ec4899', '#8b5cf6', '#10b981'];
    const pieces: Confetti[] = [];
    for (let i = 0; i < 30; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 10,
        duration: Math.random() * 8 + 8,
        rotateEnd: Math.random() * 720 - 360,
      });
    }
    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confetti.map((c) => (
        <motion.div
          key={c.id}
          className="absolute"
          style={{
            left: `${c.x}%`,
            width: c.size,
            height: c.size * 0.6,
            backgroundColor: c.color,
            borderRadius: '1px',
          }}
          initial={{ y: -20, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '110vh'],
            opacity: [0, 1, 1, 0],
            rotate: c.rotateEnd,
            x: [0, 30, -20, 15, -10, 0],
          }}
          transition={{
            duration: c.duration,
            delay: c.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
