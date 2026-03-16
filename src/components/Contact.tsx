'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import ScrollReveal from './animations/ScrollReveal';
import TextReveal from './animations/TextReveal';

const contactInfo = [
  { icon: FaWhatsapp, label: 'WhatsApp', value: '(00) 00000-0000', href: 'https://wa.me/5500000000000', color: 'bg-green-500' },
  { icon: FaPhone, label: 'Telefone', value: '(00) 0000-0000', href: 'tel:+550000000000', color: 'bg-primary-500' },
  { icon: FaEnvelope, label: 'E-mail', value: 'contato@aerofestas.com.br', href: 'mailto:contato@aerofestas.com.br', color: 'bg-secondary-500' },
  { icon: FaMapMarkerAlt, label: 'Endereço', value: 'Sua Cidade - Estado', href: '#', color: 'bg-accent-purple' },
  { icon: FaClock, label: 'Horário', value: 'Seg-Sáb: 8h às 20h', href: '#', color: 'bg-accent-gold' },
];

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', phone: '', date: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Me chamo ${formState.name}. Gostaria de um orçamento para a data ${formState.date}. ${formState.message}`;
    window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(text)}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contato" className="relative py-24 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-50 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
              Fale Conosco
            </span>
            <TextReveal className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">Entre em Contato</TextReveal>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Faça seu orçamento sem compromisso! Estamos prontos para tornar sua festa inesquecível
            </p>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <ScrollReveal direction="left">
            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{info.label}</p>
                    <p className="font-semibold text-gray-900">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal direction="right">
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Seu Nome</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 bg-white"
                    placeholder="Digite seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone / WhatsApp</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 bg-white"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data do Evento</label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="date"
                    required
                    value={formState.date}
                    onChange={(e) => setFormState({ ...formState, date: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mensagem</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:border-primary-400 focus:ring-4 focus:ring-primary-100 outline-none transition-all duration-200 bg-white resize-none"
                    placeholder="Conte-nos sobre seu evento, quantos convidados, quais brinquedos gostaria..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-500/20 hover:shadow-primary-500/40 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  {submitted ? (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>Enviando para WhatsApp...</motion.span>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Solicitar Orçamento via WhatsApp
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
