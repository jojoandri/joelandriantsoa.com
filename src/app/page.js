'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Card from '../components/Cards';
import { projects } from '../data';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  return (
    <main className={styles.main}>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <div className={styles.cardContainer}>
        {projects.map((project, index) => (
          <Card 
            key={`p_${index}`} 
            title={project.title}
            description={project.description}
            src={project.src}
            video={project.video}
            link={project.link}
            color={project.color}
            range={project.range || [0, 1]}
            targetScale={project.targetScale || 1}
          />
        ))}
      </div>
      <SlidingImages />
      <Contact />
    </main>
  )
}
