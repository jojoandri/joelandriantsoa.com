'use client';
import Image from 'next/image';
import styles from './style.module.scss';
import { useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';


const Card = ({ i , title, description, src, video, link, color, range = [0, 1], targetScale = 1, isLastCard = false }) => {
  const container = useRef(null);
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0); // pour mémoriser le temps de pause
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Détecter la taille de l'écran
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth > 480 && window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  // Désactiver les animations de parallax pour un scroll précis
  // const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  // const scale = useTransform(
  //   scrollYProgress, 
  //   range, 
  //   [1, isMobile ? 0.95 : targetScale]
  // );
  
  // Garder les cartes statiques pour un scroll précis
  const imageScale = 1;
  const scale = 1;

  // ⚙️ Gérer l'affichage/lecture de la vidéo selon scroll
  useEffect(() => {
    if (!videoRef.current || !video) return;

    const currentVideo = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const vid = currentVideo;

        if (entry.isIntersecting) {
          // Reprendre là où on s'était arrêté
          vid.currentTime = lastTimeRef.current || 0;
          if (!isMobile) { // Éviter l'autoplay sur mobile pour économiser la batterie
            vid.play();
          }
        } else {
          // Sauvegarder le moment avant de sortir
          lastTimeRef.current = vid.currentTime;
          vid.pause();
        }
      },
      {
        threshold: isMobile ? 0.3 : 0.6, // Seuil plus bas sur mobile
      }
    );

    if (currentVideo) observer.observe(currentVideo);

    return () => {
      if (currentVideo) observer.unobserve(currentVideo);
    };
  }, [video, isMobile]);

  return (
    <div ref={container} className={`${styles.cardContainer} ${isLastCard ? styles.lastCard : ''}`}>
      <div 
        style={{ 
          backgroundColor: color,
          // Supprimer les animations de scale et de position pour un scroll précis
        }} 
        className={styles.card}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className={styles.linkSpan}>
                <span>Live site</span>
              </a>
            )}
          </div>

          <div className={styles.imageContainer}>
            <div 
              className={styles.inner}
              // Supprimer l'animation d'image pour un scroll précis
            >
              {video ? (
                <video
                  ref={videoRef}
                  src={`/videos/${video}`}
                  muted
                  playsInline
                  className={styles.video}
                  controls={isMobile} // Ajouter les contrôles sur mobile
                  preload={isMobile ? "metadata" : "auto"} // Charger moins de données sur mobile
                />
              ) : src ? (
                <Image
                  fill
                  src={`/images/${src}`}
                  alt={title}
                  sizes={isMobile ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
                  priority={i < 2} // Prioriser les premières images
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
