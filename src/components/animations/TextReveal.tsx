'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  gradient?: boolean;
}

export default function TextReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'h2',
  gradient = false,
}: TextRevealProps) {
  const words = children.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  const wordVariant = {
    hidden: {
      y: 80,
      opacity: 0,
      rotateX: -40,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`${className} flex flex-wrap justify-center`}
      style={{ perspective: '600px' }}
    >
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            variants={wordVariant}
            className={`inline-block ${gradient ? 'text-gradient' : ''}`}
            style={gradient ? {
              background: 'linear-gradient(135deg, #60a5fa, #f87171, #fbbf24)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 3s ease infinite',
            } : undefined}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// Variant for inline text (not full-width)
export function TextRevealInline({
  children,
  className = '',
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const chars = children.split('');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const charVariant = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {chars.map((char, i) => (
        <motion.span key={i} variants={charVariant} className="inline-block">
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
