'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaShieldAlt, FaTruck, FaSmile, FaAward } from 'react-icons/fa';
import ScrollReveal from './animations/ScrollReveal';
import TextReveal from './animations/TextReveal';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const features = [
  { icon: FaShieldAlt, title: 'Segurança Total', desc: 'Brinquedos certificados e seguros, com monitores treinados' },
  { icon: FaTruck, title: 'Entrega & Montagem', desc: 'Levamos, montamos e retiramos. Você só se preocupa em se divertir!' },
  { icon: FaSmile, title: 'Diversão Garantida', desc: 'Ampla variedade para todas as idades e tipos de evento' },
  { icon: FaAward, title: 'Qualidade Premium', desc: 'Equipamentos de primeira linha, sempre limpos e bem cuidados' },
];

export default function About() {
  return (
    <section id="sobre" className="relative py-24 bg-white overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-100/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="relative aspect-square max-w-lg mx-auto">
                {/* Main Circle */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="absolute inset-8 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-2xl shadow-primary-500/20 overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[120px]">🎪</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <p className="text-2xl font-bold">Aero Festas</p>
                    <p className="text-white/70 text-sm">Transformando sonhos em realidade</p>
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <FaSmile className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900"><AnimatedCounter target={500} suffix="+" /></p>
                      <p className="text-xs text-gray-500">Clientes Felizes</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <FaAward className="text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900"><AnimatedCounter target={8} suffix=" anos" /></p>
                      <p className="text-xs text-gray-500">de Experiência</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Content */}
          <div>
            <ScrollReveal direction="right">
              <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                Sobre Nós
              </span>
            </ScrollReveal>
            <TextReveal className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-6 !justify-start">
              A Melhor Experiência em Locação de Brinquedos
            </TextReveal>
            <ScrollReveal direction="right">
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                A Aero Festas nasceu com o propósito de levar alegria e diversão para festas e eventos.
                Com anos de experiência, oferecemos brinquedos de altíssima qualidade com total segurança
                e o melhor atendimento da região.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feat, i) => (
                <ScrollReveal key={feat.title} delay={0.1 * i} direction="right">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-5 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                      <feat.icon className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">{feat.title}</h3>
                    <p className="text-sm text-gray-500">{feat.desc}</p>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
