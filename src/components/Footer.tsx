'use client';

import { motion } from 'framer-motion';
import { FaWhatsapp, FaInstagram, FaFacebook, FaHeart } from 'react-icons/fa';

const links = [
  { name: 'Início', href: '#inicio' },
  { name: 'Brinquedos', href: '#catalogo' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Galeria', href: '#galeria' },
  { name: 'Contato', href: '#contato' },
];

const social = [
  { icon: FaWhatsapp, href: 'https://wa.me/5562985545046?text=Ol%C3%A1%21%20Vim%20pelo%20site.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20brinquedos%20para%20a%20minha%20festa%21%20%F0%9F%8E%89', label: 'WhatsApp' },
  { icon: FaInstagram, href: '#', label: 'Instagram' },
  { icon: FaFacebook, href: '#', label: 'Facebook' },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Animated Wave SVG */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[98%] overflow-hidden">
        <div className="w-[200%] animate-wave">
          <svg viewBox="0 0 2880 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 C1680,120 1920,0 2160,60 C2400,120 2640,0 2880,60 L2880,120 L0,120 Z"
              fill="#111827"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center drop-shadow-md">
                <img src="/images/logo.png" alt="Logo Aero Festas" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-bold font-heading">
                Aero <span className="text-secondary-400">Festas</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transformando festas em momentos inesquecíveis com brinquedos de qualidade e segurança garantida.
            </p>
            <div className="flex gap-3">
              {social.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-10 h-10 bg-white/10 hover:bg-primary-500 rounded-xl flex items-center justify-center transition-colors duration-300"
                >
                  <s.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.name}>
                  <motion.a
                    href={l.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                    {l.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-bold text-lg mb-4">Faça seu Orçamento</h3>
            <p className="text-gray-400 text-sm mb-4">
              Entre em contato agora mesmo e garanta a diversão para sua próxima festa!
            </p>
            <motion.a
              href="https://wa.me/5562985545046?text=Ol%C3%A1%21%20Vim%20pelo%20site.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20brinquedos%20para%20a%20minha%20festa%21%20%F0%9F%8E%89"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl font-semibold text-sm shadow-lg"
            >
              <FaWhatsapp size={18} />
              Chamar no WhatsApp
            </motion.a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Aero Festas. Todos os direitos reservados.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Feito com <FaHeart className="text-secondary-500" size={12} /> para sua diversão
          </p>
        </div>
      </div>
    </footer>
  );
}
