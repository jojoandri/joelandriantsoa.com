'use client';
import styles from './style.module.scss';
import { useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import LazyMedia from '../LazyMedia';

const Card = ({ i , title, description, src, video, link, color, range = [0, 1], targetScale = 1, isLastCard = false }) => {
  const container = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isMediaLoaded, setIsMediaLoaded] = useState(false);

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

  // Garder les cartes statiques pour un scroll précis
  const imageScale = 1;
  const scale = 1;

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
            <LazyMedia
              src={src}
              video={video}
              title={title}
              isMobile={isMobile}
              isTablet={isTablet}
              priority={i < 2} // Prioriser les premières images
              className={styles.inner}
              onLoad={() => setIsMediaLoaded(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
