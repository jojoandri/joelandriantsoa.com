'use client';
import { useEffect } from 'react';

export default function AnalyticsDebug() {
  useEffect(() => {
    // Debug pour vérifier si gtag est chargé
    const checkGtag = () => {
      if (typeof window !== 'undefined') {
        console.log('🔍 Analytics Debug:');
        console.log('- window.gtag:', typeof window.gtag);
        console.log('- window.dataLayer:', window.dataLayer);
        console.log('- GA_ID depuis env:', process.env.NEXT_PUBLIC_GA_ID);
        
        if (window.gtag) {
          console.log('✅ Google Analytics est chargé');
        } else {
          console.log('❌ Google Analytics n\'est pas chargé');
        }
      }
    };

    // Vérifier immédiatement
    checkGtag();
    
    // Vérifier après 3 secondes
    setTimeout(checkGtag, 3000);
  }, []);

  return null;
}
