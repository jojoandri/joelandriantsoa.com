'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const smootherRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.75,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });
    }

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      const smoother = ScrollSmoother.get();

      if (smoother) {
        smoother.scrollTo(0, false);
        smoother.refresh();
      } else {
        window.scrollTo(0, 0);
      }

      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}