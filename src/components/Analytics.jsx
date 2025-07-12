'use client';
import Script from 'next/script';

export default function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  // Debug: afficher l'ID dans la console
  if (typeof window !== 'undefined') {
    console.log('Analytics GA_ID:', GA_ID);
  }

  return (
    <>
      {/* Google Analytics (GA4) - Format exact de Google */}
      {GA_ID && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script
            id="gtag-init"
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
    </>
  );
}
