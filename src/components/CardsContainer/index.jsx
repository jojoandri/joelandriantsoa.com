'use client';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Card from '../Cards';
import styles from './style.module.scss';

const CardsContainer = ({ projects }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('[data-gsap-card]') ?? [];

      gsap.fromTo(cards, {
        y: 36
      }, {
        y: 0,
        duration: 0.7,
        force3D: true,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 72%',
          once: true,
          toggleActions: 'play none none none'
        }
      });
    }, containerRef);

    return () => context.revert();
  }, []);

  // Plus besoin de calculs d'animation pour un scroll précis
  return (
    <div ref={containerRef} id="cards" className={styles.cardsWrapper}>
      {projects.map((project, index) => {
        // Appliquer la classe lastCard à la dernière carte
        const isLastCard = index === projects.length - 1;
        
        return (
          <Card 
            key={`p_${index}`}
            i={index}
            title={project.title}
            description={project.description}
            src={project.src}
            video={project.video}
            link={project.link}
            color={project.color}
            isLastCard={isLastCard} // Passer l'information à la carte
            // Plus besoin de range et targetScale pour un scroll simple
            range={[0, 1]}
            targetScale={1}
          />
        );
      })}
    </div>
  );
};

export default CardsContainer;
