'use client';

import { motion } from 'framer-motion';
import { FaPhoneAlt, FaClipboardList, FaTruckMoving, FaMusic } from 'react-icons/fa';
import ScrollReveal from './animations/ScrollReveal';
import TextReveal from './animations/TextReveal';

const steps = [
  {
    icon: FaPhoneAlt,
    title: 'Entre em Contato',
    desc: 'Fale conosco pelo WhatsApp ou telefone e conte sobre seu evento',
    color: 'from-primary-400 to-primary-600',
  },
  {
    icon: FaClipboardList,
    title: 'Escolha os Brinquedos',
    desc: 'Selecione os brinquedos ideais para a sua festa e receba o orçamento',
    color: 'from-secondary-400 to-secondary-600',
  },
  {
    icon: FaTruckMoving,
    title: 'Entrega & Montagem',
    desc: 'Nossa equipe entrega e monta tudo no local com total segurança',
    color: 'from-accent-gold to-orange-500',
  },
  {
    icon: FaMusic,
    title: 'Hora da Diversão!',
    desc: 'Aproveite a festa! Ao final, desmontamos e retiramos tudo',
    color: 'from-green-400 to-green-600',
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="relative py-24 bg-gradient-to-b from-primary-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-semibold mb-4">
              Simples & Rápido
            </span>
            <TextReveal className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">
              Como Funciona
            </TextReveal>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Em apenas 4 passos simples, sua festa estará completa com a melhor diversão
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connection Line - Desktop */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="hidden lg:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-green-200 -translate-y-1/2 origin-left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={0.15 * i}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="relative text-center group"
                >
                  {/* Step Number */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * i, type: 'spring', stiffness: 200 }}
                    className="relative mx-auto mb-6"
                  >
                    <div className={`w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300 group-hover:scale-110 transform duration-300`}>
                      <step.icon className="text-white" size={32} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center font-bold text-sm text-primary-600 border-2 border-primary-100">
                      {i + 1}
                    </div>
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
