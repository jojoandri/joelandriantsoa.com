'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect, useCallback, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';

export default function Home() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);
  const [isClient, setIsClient] = useState(false);
  const { isMobile, isTablet, isTouchDevice, getScrollConfig } = useResponsiveScroll();

  // S'assurer que le composant est monté côté client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const animate = useCallback(() => {
    if (!isClient || !firstText.current || !secondText.current) return;
    
    if (xPercent.current < -100) {
      xPercent.current = 0;
    } else if (xPercent.current > 0) {
      xPercent.current = -100;
    }
    
    gsap.set(firstText.current, { xPercent: xPercent.current });
    gsap.set(secondText.current, { xPercent: xPercent.current });
    requestAnimationFrame(animate);
    
    const scrollConfig = getScrollConfig();
    xPercent.current += scrollConfig.animationSpeed * direction.current;
  }, [isClient, getScrollConfig]);

  useLayoutEffect(() => {
    if (!isClient) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    const scrollConfig = getScrollConfig();
    
    // Configuration optimisée selon le type d'appareil
    const scrollTriggerConfig = {
      trigger: document.documentElement,
      scrub: scrollConfig.scrub,
      start: 0,
      end: window.innerHeight,
      onUpdate: e => direction.current = e.direction * -1,
      // Améliorer les performances sur mobile
      ...(isTouchDevice && {
        invalidateOnRefresh: true,
        refreshPriority: -1
      })
    };
    
    gsap.to(slider.current, {
      scrollTrigger: scrollTriggerConfig,
      x: scrollConfig.slideDistance,
      ease: isMobile ? "power2.out" : "none"
    });
    
    requestAnimationFrame(animate);
    
    // Cleanup pour éviter les fuites mémoire
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animate, isClient, isMobile, isTouchDevice, getScrollConfig]);
  
  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image 
        src="/images/background.jpg"
        fill={true}
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Digital Marketer - Performance Manager -</p>
          <p ref={secondText}>Digital Marketer - Performance Manager -</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.08} className={styles.description}>
        <svg width="20" height="30" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
        </svg>
        <div className={styles.textContainer}>
          <p>Digital Marketer</p>
          <p>Performance Manager</p>
        </div>
      </div>
    </motion.main>
  );
}
