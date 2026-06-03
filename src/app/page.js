'use client';
import styles from './page.module.scss'
import { useEffect } from 'react'
import dynamic from 'next/dynamic';

import Landing from '../components/Landing';
const CardsContainer = dynamic(() => import('../components/CardsContainer'), { ssr: false });
const Description = dynamic(() => import('../components/Description'), { ssr: false });
const Contact = dynamic(() => import('../components/Contact'), { ssr: false });
import { projects } from '../data';

export default function Home() {

  useEffect(() => {
    document.body.style.cursor = 'default';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.main}>
      <Landing />
      <Description />
      <CardsContainer projects={projects} />
      <Contact />
    </main>
  )
}
