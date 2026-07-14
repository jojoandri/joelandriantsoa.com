import './globals.css';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Analytics from '../components/Analytics';
import SmoothScroll from '../components/SmoothScroll';

const Header = dynamic(() => import('../components/Header'), {
  ssr: false,
  loading: () => null,
});

const AnalyticsDebug = dynamic(() => import('../components/AnalyticsDebug'), {
  ssr: false,
  loading: () => null,
});

const ScrollMenuButton = dynamic(() => import('../components/ScrollMenuButton'), {
  ssr: false,
  loading: () => null,
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
        <Script id="gtm" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TGTRRMBB');`}
        </Script>
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
        {/* background image handled by next/image with priority and optimized sizes */}
      </head>

      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TGTRRMBB"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Analytics />
        {process.env.NODE_ENV !== 'production' && <AnalyticsDebug />}
        <Header />
        <ScrollMenuButton />

        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
