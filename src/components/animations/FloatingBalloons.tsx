'use client';

import { motion } from 'framer-motion';

const balloons = [
  { color: '#3b82f6', size: 60, left: '5%', delay: 0, duration: 15 },
  { color: '#ef4444', size: 45, left: '15%', delay: 2, duration: 18 },
  { color: '#f59e0b', size: 55, left: '25%', delay: 4, duration: 14 },
  { color: '#ec4899', size: 40, left: '40%', delay: 1, duration: 16 },
  { color: '#8b5cf6', size: 50, left: '55%', delay: 3, duration: 17 },
  { color: '#60a5fa', size: 35, left: '70%', delay: 5, duration: 13 },
  { color: '#ef4444', size: 48, left: '80%', delay: 2.5, duration: 15 },
  { color: '#3b82f6', size: 42, left: '90%', delay: 1.5, duration: 19 },
];

export default function FloatingBalloons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((b, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: b.left }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: [100, -1200],
            opacity: [0, 0.6, 0.6, 0],
            x: [0, 30, -20, 10, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg width={b.size} height={b.size * 1.3} viewBox="0 0 50 65">
            <defs>
              <radialGradient id={`grad-${i}`} cx="35%" cy="35%">
                <stop offset="0%" stopColor="white" stopOpacity="0.6" />
                <stop offset="100%" stopColor={b.color} stopOpacity="0.8" />
              </radialGradient>
            </defs>
            <ellipse cx="25" cy="22" rx="20" ry="22" fill={`url(#grad-${i})`} />
            <polygon points="25,44 22,48 28,48" fill={b.color} opacity="0.8" />
            <line x1="25" y1="48" x2="25" y2="65" stroke={b.color} strokeWidth="1" opacity="0.5" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
