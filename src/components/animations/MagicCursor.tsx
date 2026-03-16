'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type Particle = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  type: 'star' | 'circle';
};

export default function MagicCursor() {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const particlesRef = useRef<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particleIdRef = useRef(0);

  // Playful colors
  const colors = ['#60a5fa', '#f87171', '#fbbf24', '#a78bfa', '#34d399', '#f472b6'];

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
    if (isMobile) return;

    setVisible(true);

    const spawnParticles = (x: number, y: number, count: number, isClick: false | true = false) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Clicks spawn particles faster and more explosively
        const speed = isClick ? Math.random() * 8 + 4 : Math.random() * 3 + 0.5;
        
        particlesRef.current.push({
          id: particleIdRef.current++,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - (isClick ? 2 : 0), // Slight upward bias on click
          life: 1,
          maxLife: isClick ? Math.random() * 0.5 + 0.5 : Math.random() * 0.4 + 0.3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: isClick ? Math.random() * 8 + 4 : Math.random() * 4 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          type: Math.random() > 0.6 ? 'star' : 'circle',
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');
      setHovering(!!isInteractive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setClicking(true);
      // Explode confetes on click
      spawnParticles(e.clientX, e.clientY, 15, true);
    };
    
    const handleMouseUp = () => setClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Canvas animation loop
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
      resize();
      window.addEventListener('resize', resize);

      const drawStar = (cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string, alpha: number, rotation: number) => {
        if (!ctx) return;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.beginPath();
        let x = 0, y = 0;
        let step = Math.PI / spikes;
        let rot = (Math.PI / 2) * 3;
        ctx.moveTo(0, 0 - outerRadius);
        for (let i = 0; i < spikes; i++) {
          x = Math.cos(rot) * outerRadius;
          y = Math.sin(rot) * outerRadius;
          ctx.lineTo(x, y);
          rot += step;
          x = Math.cos(rot) * innerRadius;
          y = Math.sin(rot) * innerRadius;
          ctx.lineTo(x, y);
          rot += step;
        }
        ctx.lineTo(0, 0 - outerRadius);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.fill();
        ctx.restore();
      };

      const animate = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          particlesRef.current.forEach((p) => {
            // Physics update
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.1; // Gravity
            p.life -= 0.015 / p.maxLife;
            p.rotation += p.rotationSpeed;

            const alpha = Math.max(0, p.life);

            if (p.type === 'star') {
              drawStar(p.x, p.y, 5, p.size * 1.5, p.size * 0.6, p.color, alpha, p.rotation);
            } else {
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = alpha;
              ctx.shadowBlur = 10;
              ctx.shadowColor = p.color;
              ctx.fill();
            }
          });
          
          particlesRef.current = particlesRef.current.filter(p => p.life > 0);
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
  }, [cursorX, cursorY, colors]);

  if (!visible) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
      />

      {/* Main Cursor Element */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        {/* Playful Balloon/Wand Core */}
        <motion.div
          animate={{
            scale: clicking ? 0.7 : hovering ? 1.4 : 1,
            rotate: clicking ? -15 : hovering ? 15 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="relative flex items-center justify-center"
          style={{ width: '32px', height: '32px', marginLeft: '-16px', marginTop: '-16px' }}
        >
          {/* Main Visual */}
          <div className={`text-3xl drop-shadow-xl transition-all duration-300 filter ${hovering ? 'hue-rotate-90 brightness-110' : ''}`}>
             🎈
          </div>

          {/* Hover Expanding Ring */}
          <AnimatePresence>
            {hovering && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1.8, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-secondary-400 animate-spin-slow"
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

    </>
  );
}
