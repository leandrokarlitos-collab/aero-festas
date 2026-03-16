'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Início', href: '#inicio' },
  { name: 'Brinquedos', href: '#catalogo' },
  { name: 'Sobre', href: '#sobre' },
  { name: 'Como Funciona', href: '#como-funciona' },
  { name: 'Galeria', href: '#galeria' },
  { name: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-primary-500/5 border-b border-white/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#inicio"
              className="flex items-center gap-3 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center drop-shadow-md group-hover:drop-shadow-xl transition-all duration-300">
                <img src="/images/logo.png" alt="Logo Aero Festas" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className={`text-xl font-bold font-heading transition-colors duration-300 ${
                  scrolled ? 'text-primary-800' : 'text-white'
                }`}>
                  Aero
                </span>
                <span className={`text-xl font-bold font-heading transition-colors duration-300 ${
                  scrolled ? 'text-secondary-500' : 'text-secondary-300'
                }`}>
                  {' '}Festas
                </span>
              </div>
            </motion.a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
                    scrolled
                      ? activeSection === link.href
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                      : activeSection === link.href
                        ? 'text-white'
                        : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  {/* Active indicator dot */}
                  {activeSection === link.href ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:w-3/4 transition-all duration-300" />
                  )}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/5562985545046?text=Ol%C3%A1%21%20Vim%20pelo%20site.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20brinquedos%20para%20a%20minha%20festa%21%20%F0%9F%8E%89"
                target="_blank"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`ml-4 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl text-sm font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 ${
                  scrolled ? 'pulse-glow' : ''
                }`}
              >
                Orçamento Grátis
              </motion.a>
            </div>

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-xl ${scrolled ? 'text-primary-800' : 'text-white'}`}
            >
              {mobileOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-2xl md:hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeSection === link.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/5562985545046?text=Ol%C3%A1%21%20Vim%20pelo%20site.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20loca%C3%A7%C3%A3o%20de%20brinquedos%20para%20a%20minha%20festa%21%20%F0%9F%8E%89"
                target="_blank"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl text-center font-semibold shadow-lg"
              >
                Orçamento Grátis
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
