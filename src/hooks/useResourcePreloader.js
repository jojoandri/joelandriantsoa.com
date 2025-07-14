import { useEffect, useState, useRef } from 'react';

export const useResourcePreloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const preloadResources = async () => {
      // Créer un AbortController pour pouvoir annuler les requêtes
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      const criticalResources = [
        // Seulement les ressources vraiment critiques
        '/fonts/NeueMontreal_Medium.otf',
        '/images/background.jpg',
      ];

      let loadedCount = 0;
      const totalResources = criticalResources.length;

      const updateProgress = () => {
        if (signal.aborted) return;
        
        loadedCount++;
        const newProgress = (loadedCount / totalResources) * 100;
        setProgress(newProgress);
        
        if (loadedCount === totalResources) {
          setTimeout(() => {
            if (!signal.aborted) {
              setIsLoading(false);
            }
          }, 200);
        }
      };

      // Précharger avec timeout individuel pour chaque ressource
      const preloadPromises = criticalResources.map(src => {
        return new Promise((resolve) => {
          const timeoutId = setTimeout(() => {
            console.warn(`Timeout for resource: ${src}`);
            resolve(); // Résoudre même en cas de timeout
          }, 3000); // Timeout de 3 secondes par ressource

          if (src.includes('.otf') || src.includes('.woff')) {
            // Précharger les fonts
            const font = new FontFace('preload-font', `url(${src})`);
            font.load()
              .then(() => {
                if (!signal.aborted) {
                  clearTimeout(timeoutId);
                  resolve();
                }
              })
              .catch(() => {
                clearTimeout(timeoutId);
                resolve(); // Continuer même en cas d'erreur
              });
          } else {
            // Précharger les images
            const img = new Image();
            img.onload = () => {
              if (!signal.aborted) {
                clearTimeout(timeoutId);
                resolve();
              }
            };
            img.onerror = () => {
              clearTimeout(timeoutId);
              resolve(); // Continuer même en cas d'erreur
            };
            img.src = src;
          }
        });
      });

      // Attendre toutes les ressources avec un timeout global
      Promise.allSettled(preloadPromises).then(() => {
        if (!signal.aborted) {
          updateProgress();
        }
      });

      // Timeout de sécurité global plus court
      setTimeout(() => {
        if (!signal.aborted && isLoading) {
          console.warn('Global preloading timeout, continuing anyway');
          setIsLoading(false);
        }
      }, 4000); // Maximum 4 secondes au total
    };

    preloadResources();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // Retirer isLoading des dépendances pour éviter la boucle

  return { isLoading, progress };
};
