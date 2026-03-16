'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import ScrollReveal from './animations/ScrollReveal';
import TextReveal from './animations/TextReveal';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

const categories = ['Todos', 'Infláveis', 'Pula-Pula', 'Tobogãs', 'Jogos'];

const toys = [
  { id: 1, name: 'Pula-Pula Castelo Encantado', category: 'Pula-Pula', popular: true, color: 'from-blue-400 to-blue-600', emoji: '🏰' },
  { id: 2, name: 'Tobogã Radical Duplo', category: 'Tobogãs', popular: true, color: 'from-red-400 to-red-600', emoji: '🎢' },
  { id: 3, name: 'Piscina de Bolinhas Gigante', category: 'Infláveis', popular: false, color: 'from-purple-400 to-purple-600', emoji: '🎱' },
  { id: 4, name: 'Futebol de Sabão', category: 'Jogos', popular: true, color: 'from-green-400 to-green-600', emoji: '⚽' },
  { id: 5, name: 'Cama Elástica Premium', category: 'Pula-Pula', popular: false, color: 'from-yellow-400 to-orange-500', emoji: '🤸' },
  { id: 6, name: 'Tobogã Aquático', category: 'Tobogãs', popular: true, color: 'from-cyan-400 to-blue-500', emoji: '💦' },
  { id: 7, name: 'Castelo Inflável Real', category: 'Infláveis', popular: false, color: 'from-pink-400 to-rose-600', emoji: '👑' },
  { id: 9, name: 'Touro Mecânico', category: 'Jogos', popular: true, color: 'from-red-500 to-orange-500', emoji: '🐂' },
];

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  // Glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['100%', '0%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['100%', '0%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative group ${className}`}
    >
      <div
        className="absolute inset-0 z-50 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.2) 0%, transparent 60%)`,
          opacity: 0,
        }}
      />
      {children}
    </motion.div>
  );
}

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filtered = activeCategory === 'Todos'
    ? toys
    : toys.filter((t) => t.category === activeCategory);

  return (
    <section id="catalogo" className="relative py-24 bg-gradient-to-b from-white to-primary-50/30">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-primary-900 to-transparent opacity-5" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <ScrollReveal>
            <motion.span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Nosso Catálogo
            </motion.span>
          </ScrollReveal>
          <TextReveal className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">
            Brinquedos que Fazem a Festa Acontecer
          </TextReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Escolha entre nossa ampla seleção de brinquedos para todas as idades e estilos de festa
            </p>
          </ScrollReveal>
        </div>

        {/* Category Filters */}
        <ScrollReveal delay={0.2}>
          <div className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center gap-3 mb-12 pb-4 -mx-4 px-4 md:px-0 md:mx-0 snap-x hide-scrollbar">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 snap-center px-6 py-3 md:px-5 md:py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30'
                    : 'bg-white text-gray-600 hover:bg-primary-50 border border-gray-200 hover:border-primary-200'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((toy, i) => (
              <motion.div
                key={toy.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 40 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group relative"
              >
                <TiltCard>
                  {/* Gradient border glow on hover */}
                  <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-gold opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />

                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                    {/* Image Placeholder */}
                    <div className={`relative h-52 bg-gradient-to-br ${toy.color} flex items-center justify-center overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/5" />
                      <span className="text-7xl relative z-10 group-hover:scale-130 transition-transform duration-700 ease-out">{toy.emoji}</span>
                      {toy.popular && (
                        <motion.div
                          initial={{ x: 100 }}
                          animate={{ x: 0 }}
                          className="absolute top-4 right-4 px-3 py-1 bg-accent-gold text-white text-xs font-bold rounded-full shadow-lg"
                        >
                          Popular
                        </motion.div>
                      )}
                      {/* Shimmer overlay on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1 group-hover:text-primary-600 transition-colors">
                        {toy.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">{toy.category}</p>
                      <div className="flex items-center justify-end mt-4">
                        <motion.a
                          href="https://wa.me/5562985545046?text=Ol%C3%A1%21%20Vim%20pelo%20site.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20brinquedos%20para%20a%20minha%20festa%21%20%F0%9F%8E%89"
                          target="_blank"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold shadow-md transition-colors duration-200"
                        >
                          <FaWhatsapp size={16} />
                          Alugar
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}

            {/* "Ver todas as opções" Extra Card */}
            <motion.div
              layout
              key="all-options-card"
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ duration: 0.4, delay: filtered.length * 0.08 }}
              className="group relative h-full min-h-[350px]"
            >
              <TiltCard className="h-full">
                <a
                  href="https://wa.me/5562985545046?text=Ol%C3%A1%21%20Vim%20pelo%20site.%20Gostaria%20de%20ver%20todas%20as%20op%C3%A7%C3%B5es%20de%20brinquedos%20para%20a%20minha%20festa%21%20%F0%9F%8E%89"
                  target="_blank"
                  className="relative flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-white/50 h-full cursor-pointer"
                >
                  <div className="absolute inset-0 bg-white/5 group-hover:bg-transparent transition-colors duration-500" />
                  <span className="text-7xl mb-6 relative z-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500 ease-out">
                    🎉
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-white mb-3 relative z-10">
                    Ver Mais Opções
                  </h3>
                  <p className="text-white/85 text-sm max-w-xs relative z-10">
                    Fale com a gente no WhatsApp para conferir nosso catálogo!
                  </p>
                  {/* Decorative glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </a>
              </TiltCard>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
