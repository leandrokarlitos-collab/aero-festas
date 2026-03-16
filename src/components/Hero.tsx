'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring, Variants } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { FaWhatsapp, FaArrowDown } from 'react-icons/fa';
import MagneticButton from './animations/MagneticButton';

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
    }, 1500);
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
  const titleContainer: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };
  const titleWord: Variants = {
    hidden: { y: 100, opacity: 0, rotateX: -50 },
    visible: {
      y: 0, opacity: 1, rotateX: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-10"
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
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8 shadow-2xl"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
          <span className="text-white/90 text-sm font-medium tracking-wide">Locação de Brinquedos Premium</span>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
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
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-lg sm:text-2xl text-white/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Transformamos momentos em memórias com brinquedos infláveis,
          pula-pulas, tobogãs e muito mais. A diversão garantida para sua festa!
        </motion.p>

        {/* CTAs with ripple-ready styling */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <MagneticButton
            href="https://wa.me/5562985545046?text=Ol%C3%A1%21%20Vim%20pelo%20site.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20brinquedos%20para%20a%20minha%20festa%21%20%F0%9F%8E%89"
            target="_blank"
          >
            <div className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl font-bold text-lg shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:shadow-[0_0_60px_rgba(34,197,94,0.5)] transition-all duration-500 flex items-center gap-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <FaWhatsapp size={24} className="relative z-10" />
              <span className="relative z-10">Faça seu Orçamento</span>
            </div>
          </MagneticButton>

          <MagneticButton href="#catalogo">
            <div className="group px-8 py-4 glass-premium text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-500 relative overflow-hidden">
              <span className="relative z-10">Ver Brinquedos</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </div>
          </MagneticButton>
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
