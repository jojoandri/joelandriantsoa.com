'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';

const LazyMedia = ({ 
  src, 
  video, 
  title, 
  isMobile, 
  isTablet,
  priority = false,
  className = '',
  onLoad
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0);
  const timeoutRef = useRef(null);

  // Intersection Observer pour lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px 50px 0px'
      }
    );

    if (mediaRef.current) {
      observer.observe(mediaRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Gérer la lecture vidéo optimisée
  useEffect(() => {
    if (!videoRef.current || !video || !isVisible) return;

    const currentVideo = videoRef.current;

    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        const vid = currentVideo;

        if (entry.isIntersecting) {
          vid.currentTime = lastTimeRef.current || 0;
          if (!isMobile) {
            // Utiliser AbortController pour les promesses de lecture
            const playPromise = vid.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                // Ignorer les erreurs d'autoplay ou d'abort
                if (error.name !== 'AbortError') {
                  console.warn('Video play failed:', error);
                }
              });
            }
          }
        } else {
          lastTimeRef.current = vid.currentTime;
          vid.pause();
        }
      },
      {
        threshold: isMobile ? 0.3 : 0.6,
      }
    );

    videoObserver.observe(currentVideo);

    return () => {
      if (currentVideo) videoObserver.unobserve(currentVideo);
    };
  }, [video, isMobile, isVisible]);

  // Timeout pour éviter le chargement infini
  useEffect(() => {
    if (isVisible && !isLoaded) {
      timeoutRef.current = setTimeout(() => {
        if (!isLoaded) {
          console.warn(`Media loading timeout: ${src || video}`);
          setHasError(true);
          setIsLoaded(true); // Marquer comme "chargé" pour arrêter le spinner
          onLoad?.();
        }
      }, 10000); // 10 secondes max
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, isLoaded, src, video, onLoad]);

  const handleLoadComplete = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setHasError(true);
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div ref={mediaRef} className={`${styles.mediaContainer} ${className}`}>
      {/* Placeholder pendant le chargement */}
      {(!isLoaded || hasError) && (
        <div className={`${styles.placeholder} ${hasError ? styles.error : ''}`}>
          {hasError ? (
            <div className={styles.errorMessage}>
              <span>⚠️</span>
              <p>Erreur de chargement</p>
            </div>
          ) : (
            <div className={styles.skeleton}></div>
          )}
        </div>
      )}

      {/* Media réel */}
      {isVisible && !hasError && (
        <>
          {video ? (
            <video
              ref={videoRef}
              src={`/videos/${video}`}
              muted
              playsInline
              className={styles.video}
              controls={isMobile}
              preload={isMobile ? "metadata" : "auto"}
              onLoadedData={handleLoadComplete}
              onError={handleError}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />
          ) : src ? (
            <Image
              fill
              src={`/images/${src}`}
              alt={title}
              sizes={isMobile ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
              priority={priority}
              onLoad={handleLoadComplete}
              onError={handleError}
              style={{ opacity: isLoaded ? 1 : 0 }}
              quality={85}
            />
          ) : null}
        </>
      )}
    </div>
  );
};

export default LazyMedia;
