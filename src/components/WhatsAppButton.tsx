'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [visible, setVisible] = useState(true);

  // Show tooltip periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3000);
    }, 8000);
    // Show immediately after 4s
    const initialTimeout = setTimeout(() => setShowTooltip(true), 4000);
    const hideInitial = setTimeout(() => setShowTooltip(false), 7000);
    return () => { clearInterval(interval); clearTimeout(initialTimeout); clearTimeout(hideInitial); };
  }, []);

  // Hide during active scroll
  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;
    const handleScroll = () => {
      setVisible(false);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setVisible(true), 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); clearTimeout(scrollTimer); };
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: visible ? 1 : 0.8,
        opacity: visible ? 1 : 0.5,
      }}
      transition={{ delay: visible ? 0 : 0, type: 'spring', stiffness: 200 }}
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && visible && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            className="bg-white text-gray-800 px-4 py-2 rounded-xl shadow-xl text-sm font-semibold whitespace-nowrap border border-gray-100"
          >
            Fale Conosco!
            <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-[-45deg]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href="https://wa.me/5500000000000"
        target="_blank"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-colors duration-300"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
        <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10 animation-delay-2000" />
        <FaWhatsapp className="text-white relative z-10" size={30} />
      </motion.a>
    </motion.div>
  );
}
