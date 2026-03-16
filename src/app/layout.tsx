import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import LenisProvider from '@/components/animations/LenisProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aero Festas | Locação de Brinquedos para Festas e Eventos',
  description:
    'Aluguel de pula-pula, tobogã, cama elástica, infláveis e muito mais para sua festa. Entrega, montagem e segurança garantida. Faça seu orçamento!',
  keywords: 'locação de brinquedos, aluguel pula-pula, brinquedos para festa, infláveis, tobogã, cama elástica, festa infantil',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
