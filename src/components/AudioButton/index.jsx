'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';

export default function AudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setTimeout(() => {
        audio.play()
          .then(() => {
            setIsPlaying(true);
            console.log('Musique Vivaldi démarrée automatiquement');
          })
          .catch(err => {
            console.log('Lecture automatique bloquée:', err.message);
          });
      }, 3000);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsScrolled(scrollPosition > viewportHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);

    const handleFirstInteraction = () => {
      if (!isPlaying && isLoaded) {
        audio.play()
          .then(() => setIsPlaying(true))
          .catch(console.error);
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isLoaded, isPlaying]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(console.error);
    }
  };

  return (
    <>
      <audio ref={audioRef} preload="auto">
        <source src="/audio/vivaldi-storm.mp3" type="audio/mpeg" />
      </audio>

      <button
        className={`${styles.audioButton} ${
          isScrolled ? styles.scrolledPosition : styles.headerPosition
        }`}
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mettre la musique en pause' : 'Reprendre la musique'}
      >
        <div className={`${styles.audioText} ${isPlaying ? styles.playing : ''}`}>
          hear me
        </div>
      </button>
    </>
  );
}
