'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import ScrollReveal from './animations/ScrollReveal';
import TextReveal from './animations/TextReveal';

const faqs = [
  {
    q: 'Qual a antecedência necessária para reservar?',
    a: 'Recomendamos reservar com pelo menos 7 dias de antecedência para garantir a disponibilidade dos brinquedos desejados. Em períodos de alta demanda, como feriados, sugerimos antecedência de 15 dias.',
  },
  {
    q: 'Vocês fazem entrega e montagem?',
    a: 'Sim! Nossa equipe realiza a entrega, montagem e retirada de todos os brinquedos. Você não precisa se preocupar com nada, apenas aproveitar a festa!',
  },
  {
    q: 'Os brinquedos são seguros?',
    a: 'Absolutamente! Todos os nossos brinquedos passam por rigorosa manutenção e são certificados. Além disso, oferecemos monitores treinados para acompanhar as crianças durante o uso.',
  },
  {
    q: 'Qual a área necessária para instalação?',
    a: 'Depende do brinquedo escolhido. Na hora do orçamento, informamos as dimensões necessárias. Em geral, precisamos de um espaço plano e livre de obstáculos.',
  },
  {
    q: 'Vocês atendem em quais regiões?',
    a: 'Atendemos em toda a região metropolitana. Para localidades mais distantes, consulte-nos sobre a disponibilidade e possíveis taxas de deslocamento.',
  },
  {
    q: 'Qual a forma de pagamento?',
    a: 'Aceitamos PIX, cartão de crédito (em até 3x sem juros), débito e dinheiro. O pagamento pode ser feito na entrega ou antecipadamente.',
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={0.08 * index}>
      <motion.div
        className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
          open ? 'border-primary-200 bg-primary-50/50 shadow-lg' : 'border-gray-200 bg-white hover:border-primary-100'
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-6 text-left"
        >
          <span className={`font-semibold text-lg transition-colors ${open ? 'text-primary-700' : 'text-gray-900'}`}>
            {faq.q}
          </span>
          <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <FaChevronDown className={`transition-colors ${open ? 'text-primary-500' : 'text-gray-400'}`} />
          </motion.div>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ScrollReveal>
  );
}

export default function FAQ() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-primary-50/20 to-white">
      <div className="max-w-3xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
              Dúvidas
            </span>
            <TextReveal className="text-4xl sm:text-5xl font-bold font-heading text-gray-900 mb-4">Perguntas Frequentes</TextReveal>
            <p className="text-gray-500 text-lg">
              Tire suas dúvidas sobre nossos serviços
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
