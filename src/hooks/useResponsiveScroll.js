import { useEffect, useState, useCallback } from 'react';

export const useResponsiveScroll = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    isTouchDevice: false
  });

  const updateDeviceInfo = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    setDeviceInfo({
      isMobile: width <= 768,
      isTablet: width > 768 && width <= 1024,
      isDesktop: width > 1024,
      screenWidth: width,
      screenHeight: height,
      isTouchDevice
    });
  }, []);

  useEffect(() => {
    updateDeviceInfo();
    
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDeviceInfo, 150);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, [updateDeviceInfo]);

  // Configuration optimisée pour le scroll selon l'appareil
  const getScrollConfig = useCallback(() => {
    if (deviceInfo.isMobile) {
      return {
        scrub: 0.8,
        animationSpeed: 0.0075, // Réduit à 25% de la vitesse originale (0.03 * 0.25)
        slideDistance: "-250px"
      };
    } else if (deviceInfo.isTablet) {
      return {
        scrub: 0.5,
        animationSpeed: 0.0125, // Réduit à 25% de la vitesse originale (0.05 * 0.25)
        slideDistance: "-350px"
      };
    } else {
      return {
        scrub: 0.25,
        animationSpeed: 0.025, // Réduit à 25% de la vitesse originale (0.1 * 0.25)
        slideDistance: "-500px"
      };
    }
  }, [deviceInfo]);

  return {
    ...deviceInfo,
    getScrollConfig
  };
};
