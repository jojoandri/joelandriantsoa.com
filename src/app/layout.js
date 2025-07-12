// src/app/layout.js

import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Analytics from '../components/Analytics';
import AnalyticsDebug from '../components/AnalyticsDebug';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Portfolio Joël Andriantsoa',
  description: 'Portfolio personnel développé avec Next.js',
  verification: {
    msvalidate: 'E54951DA39732FC4A506C6860670BBC1',
    pinterest: 'cc162e0b3616302807ee21d48622921f'
  },
  viewport: 'width=device-width, initial-scale=1'
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Analytics />
        <AnalyticsDebug />
        <Header />
        {children}
      </body>
    </html>
  );
}
