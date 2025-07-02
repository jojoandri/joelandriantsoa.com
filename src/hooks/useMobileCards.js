import { useState, useEffect, useCallback } from 'react';

export const useMobileCards = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');

  // Détection précise des appareils
  const detectDevice = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Classification des appareils
    const mobile = width <= 480;
    const tablet = width > 480 && width <= 1024;
    const desktop = width > 1024;

    setIsMobile(mobile);
    setIsTablet(tablet);
    setIsTouchDevice(hasTouch);

    // Déterminer la catégorie d'écran
    if (mobile) {
      setScreenSize(width <= 360 ? 'small-mobile' : 'mobile');
    } else if (tablet) {
      setScreenSize(height > width ? 'tablet-portrait' : 'tablet-landscape');
    } else {
      setScreenSize('desktop');
    }
  }, []);

  useEffect(() => {
    detectDevice();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(detectDevice, 150); // Debounce pour optimiser
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, [detectDevice]);

  // Configuration pour les animations selon l'appareil
  const getAnimationConfig = useCallback(() => {
    if (isMobile) {
      return {
        enableParallax: false,
        videoAutoplay: false,
        reducedMotion: true,
        scrollThreshold: 0.3,
        scaleEffect: 0.95
      };
    } else if (isTablet) {
      return {
        enableParallax: true,
        videoAutoplay: false,
        reducedMotion: false,
        scrollThreshold: 0.5,
        scaleEffect: 0.98
      };
    } else {
      return {
        enableParallax: true,
        videoAutoplay: true,
        reducedMotion: false,
        scrollThreshold: 0.6,
        scaleEffect: 1
      };
    }
  }, [isMobile, isTablet]);

  // Configuration des styles selon l'appareil
  const getStyleConfig = useCallback(() => {
    return {
      cardSpacing: isMobile ? 10 : 25,
      padding: isMobile ? '15px' : isTablet ? '25px' : '50px',
      borderRadius: isMobile ? '15px' : '25px',
      imageHeight: isMobile ? '200px' : isTablet ? '250px' : 'auto'
    };
  }, [isMobile, isTablet]);

  return {
    isMobile,
    isTablet,
    isTouchDevice,
    screenSize,
    getAnimationConfig,
    getStyleConfig
  };
};
