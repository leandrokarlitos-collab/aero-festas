'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import ScrollReveal from './animations/ScrollReveal';
import TextReveal from './animations/TextReveal';

const testimonials = [
  {
    name: 'Maria Fernanda',
    role: 'Aniversário Infantil',
    text: 'Simplesmente incrível! As crianças amaram os brinquedos e o atendimento foi impecável do início ao fim. Super recomendo a Aero Festas!',
    rating: 5,
    avatar: '👩',
  },
  {
    name: 'João Carlos',
    role: 'Festa Comunitária',
    text: 'Organizamos um evento para 200 crianças e a Aero Festas deu conta de tudo. Pontualidade, qualidade e profissionalismo nota 10!',
    rating: 5,
    avatar: '👨',
  },
  {
    name: 'Ana Paula',
    role: 'Festa de Empresa',
    text: 'A festa da nossa empresa ficou fantástica! Os brinquedos são muito bem cuidados e seguros. As crianças e até os adultos adoraram!',
    rating: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Ricardo Lima',
    role: 'Aniversário de 5 anos',
    text: 'O pula-pula e o tobogã fizeram o maior sucesso! Meu filho até hoje fala da festa. Preço justo e qualidade excelente.',
    rating: 5,
    avatar: '👨‍👧',
  },
  {
    name: 'Luciana Souza',
    role: 'Festa na Escola',
    text: 'Contratamos para o dia das crianças na escola e foi um espetáculo! Equipe super atenciosa e profissional. Já fechamos para o próximo ano!',
    rating: 5,
    avatar: '👩‍🏫',
  },
  {
    name: 'Pedro Henrique',
    role: 'Churrasco em Família',
    text: 'Alugamos a cama elástica e a piscina de bolinhas. Entrega pontual, montagem rápida e equipamentos impecáveis. Voltarei a alugar com certeza!',
    rating: 5,
    avatar: '👨‍👦',
  },
];

export default function Testimonials() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-primary-50/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-sm font-semibold mb-4">
              Depoimentos
            </span>
          </div>
        </ScrollReveal>
        <TextReveal className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">
          O que Nossos Clientes Dizem
        </TextReveal>
        <ScrollReveal>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto text-center mb-16">
            A satisfação dos nossos clientes é o que nos motiva a continuar fazendo festas incríveis
          </p>
        </ScrollReveal>

        {/* Infinite Scroll Carousel - Pauses on hover */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <motion.div
            className="flex gap-6"
            animate={{ x: [0, -1800] }}
            transition={{
              x: { duration: 40, repeat: Infinity, ease: 'linear' },
            }}
            style={{ animationPlayState: paused ? 'paused' : 'running' }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="flex-shrink-0 w-[380px] p-6 bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <FaQuoteLeft className="text-primary-200 mb-4" size={24} />
                <p className="text-gray-600 leading-relaxed mb-6">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-2xl">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <FaStar key={s} size={12} className="text-accent-gold" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
