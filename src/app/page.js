'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';

// Dynamic imports to reduce initial JS bundle
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false });
const Preloader = dynamic(() => import('../components/Preloader'), { ssr: false });
const Landing = dynamic(() => import('../components/Landing'), { ssr: false });
const CardsContainer = dynamic(() => import('../components/CardsContainer'), { ssr: false });
const Description = dynamic(() => import('../components/Description'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
import { projects } from '../data';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);
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
