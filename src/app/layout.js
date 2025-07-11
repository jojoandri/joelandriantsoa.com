// src/app/layout.js

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Analytics from '../components/Analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio Joël Andriantsoa',
  description: 'Portfolio personnel développé avec Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Balises de vérification pour les backlinks */}
        <meta name="msvalidate.01" content="E54951DA39732FC4A506C6860670BBC1" />
        <meta name="p:domain_verify" content="cc162e0b3616302807ee21d48622921f" />
      </head>

      <body className={inter.className}>
        <Analytics />
        <Header />
        {children}
      </body>
    </html>
  );
}
