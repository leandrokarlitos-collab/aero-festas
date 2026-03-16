'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FaWhatsapp, FaArrowDown } from 'react-icons/fa';

const words = ['Inesquecível', 'Mágica', 'Encantadora', 'Especial', 'Perfeita'];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse tracking for blobs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.height / 2) / rect.height;
    mouseX.set(x * 40);
    mouseY.set(y * 40);
  };

  // Staggered title words animation
  const titleWords = ['Torne', 'sua', 'Festa'];
  const titleContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };
  const titleWord = {
    hidden: { y: 80, opacity: 0, rotateX: -40 },
    visible: {
      y: 0, opacity: 1, rotateX: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]},
    },
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700" />

      {/* Animated Blob Shapes with Parallax + Mouse Tracking */}
      <motion.div
        style={{ y: blob1Y, x: smoothMouseX, translateY: smoothMouseY }}
        className="absolute top-20 -left-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-blob"
      />
      <motion.div
        style={{ y: blob2Y, x: smoothMouseX }}
        className="absolute bottom-20 -right-40 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"
      />
      <motion.div
        style={{ y: blob3Y }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-purple/10 rounded-full blur-3xl animate-blob animation-delay-4000"
      />

      {/* Decorative Circles with Parallax */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
        className="absolute top-10 right-10 w-64 h-64 border border-white/5 rounded-full animate-spin-slow"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -40]) }}
        className="absolute bottom-20 left-20 w-40 h-40 border border-white/5 rounded-full animate-spin-slow"
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content with Parallax */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-white/80 text-sm font-medium">Locação de Brinquedos para Festas e Eventos</span>
        </motion.div>

        {/* Title with Staggered Word Reveal */}
        <motion.h1
          variants={titleContainer}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl lg:text-8xl font-bold font-heading text-white leading-tight mb-6"
          style={{ perspective: '600px' }}
        >
          <span className="flex flex-wrap justify-center">
            {titleWords.map((w, i) => (
              <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
                <motion.span variants={titleWord} className="inline-block">
                  {w}
                </motion.span>
              </span>
            ))}
          </span>
          <br />
          <span className="relative inline-block">
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 40, rotateX: -90, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, rotateX: 90, filter: 'blur(10px)' }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-gradient inline-block"
              style={{
                background: 'linear-gradient(135deg, #60a5fa, #f87171, #fbbf24)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease infinite',
              }}
            >
              {words[wordIndex]}
            </motion.span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-gold rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </span>
        </motion.h1>

        {/* Subtitle with blur reveal */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Transformamos momentos em memórias com brinquedos infláveis,
          pula-pulas, tobogãs e muito mais. A diversão garantida para sua festa!
        </motion.p>

        {/* CTAs with ripple-ready styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://wa.me/5500000000000"
            target="_blank"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FaWhatsapp size={24} className="relative z-10" />
            <span className="relative z-10">Faça seu Orçamento</span>
          </motion.a>

          <motion.a
            href="#catalogo"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Ver Brinquedos</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: '500+', label: 'Festas Realizadas' },
            { value: '50+', label: 'Brinquedos' },
            { value: '100%', label: 'Satisfação' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 + i * 0.15, type: 'spring', stiffness: 200 }}
              className="text-center"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Wave Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" className="w-[200%] animate-wave" preserveAspectRatio="none">
          <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z" fill="white" fillOpacity="0.05" />
          <path d="M0,90 C240,50 480,110 720,70 C960,30 1200,100 1440,60 L1440,120 L0,120 Z" fill="white" fillOpacity="0.03" />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-xs">Explore</span>
          <FaArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
