'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import About from '@/components/About';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ParticleBackground from '@/components/animations/ParticleBackground';
import FloatingBalloons from '@/components/animations/FloatingBalloons';
import ConfettiEffect from '@/components/animations/ConfettiEffect';
import MagicCursor from '@/components/animations/MagicCursor';
import ScrollProgress from '@/components/animations/ScrollProgress';

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center"
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 150 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto flex items-center justify-center drop-shadow-2xl">
            <img src="/images/logo.png" alt="Logo Aero Festas" className="w-full h-full object-contain" />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white font-heading mb-2">
            Aero <span className="text-secondary-300">Festas</span>
          </h2>
          <p className="text-white/50 text-sm">Preparando a diversão...</p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div className="mt-8 w-48 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-gold rounded-full"
          />
        </motion.div>

        {/* Floating Emojis */}
        {['🎈', '🎪', '🎉', '🎊', '🎂'].map((emoji, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl"
            initial={{
              x: (i - 2) * 100,
              y: 100,
              opacity: 0,
            }}
            animate={{
              y: -200,
              opacity: [0, 1, 0],
              rotate: i * 72,
            }}
            transition={{
              duration: 2,
              delay: 0.3 * i,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MagicCursor />
          <ScrollProgress />
          <ParticleBackground />
          <FloatingBalloons />
          <ConfettiEffect />
          <Navbar />
          <main>
            <Hero />
            <Catalog />
            <About />
            <HowItWorks />
            <Testimonials />
            <Gallery />
            <FAQ />
            <Contact />
          </main>
          <Footer />
          <WhatsAppButton />
        </motion.div>
      )}
    </>
  );
}
