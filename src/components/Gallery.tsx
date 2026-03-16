'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ScrollReveal from './animations/ScrollReveal';
import TextReveal from './animations/TextReveal';

const galleryItems = [
  { emoji: '🎪', label: 'Evento Corporativo', color: 'from-blue-400 to-blue-600' },
  { emoji: '🎂', label: 'Aniversário Infantil', color: 'from-pink-400 to-pink-600' },
  { emoji: '🎈', label: 'Festa ao Ar Livre', color: 'from-green-400 to-green-600' },
  { emoji: '🏰', label: 'Castelo Inflável', color: 'from-purple-400 to-purple-600' },
  { emoji: '🎢', label: 'Tobogã Gigante', color: 'from-red-400 to-red-600' },
  { emoji: '⚽', label: 'Futebol de Sabão', color: 'from-yellow-400 to-orange-500' },
  { emoji: '🤸', label: 'Cama Elástica', color: 'from-cyan-400 to-cyan-600' },
  { emoji: '🎉', label: 'Festa Completa', color: 'from-indigo-400 to-indigo-600' },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="galeria" className="relative py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-accent-pink/10 text-accent-pink rounded-full text-sm font-semibold mb-4">
              Galeria
            </span>
            <TextReveal className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">Momentos Especiais</TextReveal>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Veja alguns dos eventos que já realizamos e como deixamos cada festa única
            </p>
          </div>
        </ScrollReveal>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryItems.map((item, i) => (
            <ScrollReveal key={i} delay={0.08 * i}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setLightboxIndex(i)}
                className={`relative cursor-pointer rounded-2xl overflow-hidden shadow-lg group ${
                  i % 3 === 0 ? 'row-span-2 aspect-[3/4]' : 'aspect-square'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl group-hover:scale-125 transition-transform duration-500">
                    {item.emoji}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm">{item.label}</p>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightboxIndex(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              onClick={() => setLightboxIndex(null)}
            >
              <FaTimes size={28} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute left-6 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + galleryItems.length) % galleryItems.length); }}
            >
              <FaChevronLeft size={32} />
            </motion.button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`w-full max-w-2xl aspect-square rounded-3xl bg-gradient-to-br ${galleryItems[lightboxIndex].color} flex items-center justify-center`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[150px]">{galleryItems[lightboxIndex].emoji}</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              className="absolute right-6 text-white/80 hover:text-white"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % galleryItems.length); }}
            >
              <FaChevronRight size={32} />
            </motion.button>

            <div className="absolute bottom-6 text-white text-center">
              <p className="font-bold text-xl">{galleryItems[lightboxIndex].label}</p>
              <p className="text-white/50 text-sm mt-1">{lightboxIndex + 1} / {galleryItems.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
