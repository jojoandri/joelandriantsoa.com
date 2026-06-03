'use client'
import Image from 'next/image'
import styles from './style.module.scss'

export default function Home() {
  
  return (
    <main className={styles.landing}>
      <Image 
        src="/images/background.webp"
        fill={true}
        alt="background"
        priority={true}
        sizes="100vw"
        quality={80}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
          <p>Digital Marketer - Performance Manager -</p>
          <p>Digital Marketer - Performance Manager -</p>
        </div>
      </div>
      <div className={styles.description}>
        <svg width="20" height="30" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
        </svg>
        <div className={styles.textContainer}>
          <p>Digital Marketer</p>
          <p>Performance Manager</p>
        </div>
      </div>
    </main>
  );
}
