'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }) {
  const smootherRef = useRef(null);
  const pathname = usePathname();
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(hasTouch);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    if (isTouchDevice) {
      return undefined;
    }

    if (!smootherRef.current) {
      smootherRef.current = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.75,
        effects: true,
        normalizeScroll: true,
        ignoreMobileResize: true,
      });
    }

    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) {
      window.scrollTo(0, 0);
      return undefined;
    }

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
  }, [pathname, isTouchDevice]);

  if (isTouchDevice) {
    return children;
  }

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}