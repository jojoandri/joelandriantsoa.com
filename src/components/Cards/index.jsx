'use client';
import Image from 'next/image';
import styles from './style.module.scss';
import { useTransform, motion, useScroll } from 'framer-motion';
import { useRef, useEffect } from 'react';

const Card = ({ i, title, description, src, video, link, color, range = [0, 1], targetScale = 1 }) => {
  const container = useRef(null);
  const videoRef = useRef(null);
  const lastTimeRef = useRef(0); // pour mémoriser le temps de pause

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  // ⚙️ Gérer l'affichage/lecture de la vidéo selon scroll
  useEffect(() => {
    if (!videoRef.current || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const vid = videoRef.current;

        if (entry.isIntersecting) {
          // Reprendre là où on s'était arrêté
          vid.currentTime = lastTimeRef.current || 0;
          vid.play();
        } else {
          // Sauvegarder le moment avant de sortir
          lastTimeRef.current = vid.currentTime;
          vid.pause();
        }
      },
      {
        threshold: 0.6, // visible à 60% minimum
      }
    );

    observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, [video]);

  return (
    <div ref={container} className={styles.cardContainer}>
      <motion.div 
        style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }} 
        className={styles.card}
      >
        <h2>{title}</h2>
        <div className={styles.body}>
          <div className={styles.description}>
            <p>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className={styles.linkSpan}>
              <span>See more</span>
            </a>
          </div>

          <div className={styles.imageContainer}>
            <motion.div className={styles.inner} style={{ scale: imageScale }}>
              {video ? (
                <video
                  ref={videoRef}
                  src={`/videos/${video}`}
                  muted
                  playsInline
                  className={styles.video}
                />
              ) : src ? (
                <Image
                  fill
                  src={`/images/${src}`}
                  alt={title}
                />
              ) : null}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
