'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MagicCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);
  const trailRef = useRef<{ x: number; y: number; opacity: number; color: string }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    if (isMobile) return;

    setVisible(true);
    const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#ec4899', '#8b5cf6'];

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Add trail particle
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        opacity: 0.6,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
      if (trailRef.current.length > 20) {
        trailRef.current.shift();
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setHovering(!!isInteractive);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Trail animation loop
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
      resize();
      window.addEventListener('resize', resize);

      const animate = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          trailRef.current.forEach((p, i) => {
            p.opacity -= 0.02;
            ctx.beginPath();
            // Draw a little "sparkle" or star-like circle
            const size = 6 * (p.opacity / 0.6);
            ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.opacity);
            // Add a glow effect
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
          });
          trailRef.current = trailRef.current.filter(p => p.opacity > 0);
        }
        rafRef.current = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseover', handleMouseOver);
        document.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(rafRef.current);
      };
    }
  }, [cursorX, cursorY]);

  if (!visible) return null;

  return (
    <>
      {/* Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />

      {/* Magic Wand Emoji Cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          // Offset slightly so the wand tip acts as the exact cursor point
          translateX: '-20%',
          translateY: '-20%',
        }}
      >
        <motion.div
          animate={{
            scale: clicking ? 0.8 : hovering ? 1.3 : 1,
            rotate: clicking ? -20 : hovering ? 10 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-3xl sm:text-4xl drop-shadow-lg filter"
          style={{ transformOrigin: 'bottom left' }}
        >
          🪄
        </motion.div>
      </motion.div>
    </>
  );
}
