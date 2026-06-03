'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';

import Landing from '../components/Landing';
const CardsContainer = dynamic(() => import('../components/CardsContainer'), { ssr: false });
const Description = dynamic(() => import('../components/Description'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
import { projects } from '../data';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 3000);

    return () => clearTimeout(timeoutId);
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
