'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import { useResponsiveScroll } from '../../hooks/useResponsiveScroll';

export default function Home() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const xPercent = useRef(0);
  const direction = useRef(-1);
  const animationFrameId = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const { isMobile, isTablet, isTouchDevice, getScrollConfig } = useResponsiveScroll();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    xPercent.current = 0;
    direction.current = -1;

    if (firstText.current && secondText.current) {
      gsap.set(firstText.current, { xPercent: 0 });
      gsap.set(secondText.current, { xPercent: 0 });
    }
  }, [isClient, isMobile, isTablet, isTouchDevice]);

  const animate = useCallback(() => {
    if (!isClient || !firstText.current || !secondText.current) return;

    if (xPercent.current < -100) {
      xPercent.current = 0;
    } else if (xPercent.current > 0) {
      xPercent.current = -100;
    }

    gsap.set(firstText.current, { xPercent: xPercent.current });
    gsap.set(secondText.current, { xPercent: xPercent.current });

    const scrollConfig = getScrollConfig();
    xPercent.current += scrollConfig.animationSpeed * direction.current;

    animationFrameId.current = requestAnimationFrame(animate);
  }, [isClient, getScrollConfig]);

  useEffect(() => {
    if (!isClient) return;

    gsap.registerPlugin(ScrollTrigger);

    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    xPercent.current = 0;
    direction.current = -1;

    const scrollConfig = getScrollConfig();
    const scrollTriggerConfig = {
      trigger: document.documentElement,
      scrub: scrollConfig.scrub,
      start: 0,
      end: window.innerHeight,
      onUpdate: e => direction.current = e.direction * -1,
      ...(isTouchDevice && {
        invalidateOnRefresh: true,
        refreshPriority: -1
      })
    };

    ScrollTrigger.create(scrollTriggerConfig);

    setTimeout(() => {
      animationFrameId.current = requestAnimationFrame(animate);
    }, 100);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animate, isClient, isMobile, isTouchDevice, getScrollConfig]);
  
  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image 
        src="/images/background.webp"
        fill={true}
        alt="background"
        priority={true}
        sizes="100vw"
        quality={80}
        style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
      />
      <div className={styles.sliderContainer}>
        <div className={styles.slider}>
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
