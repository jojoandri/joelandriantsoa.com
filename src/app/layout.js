import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Analytics from '../components/Analytics';
import AnalyticsDebug from '../components/AnalyticsDebug';
import ScrollMenuButton from '../components/ScrollMenuButton';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Améliorer le rendu des fonts
  preload: true
});

export const metadata = {
  title: 'Portfolio Joël Andriantsoa',
  description: 'Portfolio personnel développé avec Next.js',
  keywords: ['portfolio', 'développeur', 'web', 'react', 'next.js'],
  authors: [{ name: 'Joël Andriantsoa' }],
  verification: {
    msvalidate: 'E54951DA39732FC4A506C6860670BBC1',
    pinterest: 'cc162e0b3616302807ee21d48622921f'
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Preload critical resources pour améliorer les performances */}
        <link
          rel="preload"
          href="/fonts/NeueMontreal_Medium.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/Neglige.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/images/background.jpg"
          as="image"
        />
      </head>

      <body className={inter.className}>
        {/* Composants Analytics de la branche main */}
        <Analytics />
        <AnalyticsDebug />
        
        {/* Header */}
        <Header />
        
        {/* ScrollMenuButton de la branche main */}
        <ScrollMenuButton />
        
        {/* Contenu principal */}
        {children}
      </body>
    </html>
  );
}
