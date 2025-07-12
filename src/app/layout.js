import './globals.css';
import { Inter } from 'next/font/google';
import Header from '../components/Header';
import Script from 'next/script';

// Lecture des IDs via les variables d'environnement
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX';
const ADS_ID = process.env.NEXT_PUBLIC_ADS_ID;

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
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* Preload critical resources */}
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
        
        {/* Balises de vérification pour les backlinks */}
        <meta name="msvalidate.01" content="E54951DA39732FC4A506C6860670BBC1" />
        <meta name="p:domain_verify" content="cc162e0b3616302807ee21d48622921f" />

        {/* Google Analytics */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        )}

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');
              `,
            }}
          />
        )}

        {/* Google Ads */}
        {ADS_ID && (
          <Script
            id="google-ads"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,g,js,fs){
                  g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f)}};
                  js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
                  js.src='https://www.googletagmanager.com/gtag/js?id=${ADS_ID}';
                  fs.parentNode.insertBefore(js,fs);
                }(window,document,'script'));
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ADS_ID}');
              `,
            }}
          />
        )}
      </head>

      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
