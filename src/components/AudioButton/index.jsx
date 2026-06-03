'use client'
import { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';

export default function AudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      setIsScrolled(scrollPosition > viewportHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      <audio ref={audioRef} preload="none">
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
