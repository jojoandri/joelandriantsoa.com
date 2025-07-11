'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import CardsContainer from '../components/CardsContainer';
import { projects } from '../data';
import Description from '../components/Description';
import Contact from '../components/Contact';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Désactiver LocomotiveScroll pour préserver le scroll naturel
    // et éviter les conflits avec le scroll snap des cartes
    setTimeout(() => {
      if (isMounted) {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }
    }, 2000);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <CardsContainer projects={projects} />
      <Contact />
    </main>
  )
}
