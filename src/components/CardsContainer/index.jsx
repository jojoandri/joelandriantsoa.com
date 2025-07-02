'use client';
import { useMobileCards } from '../../hooks/useMobileCards';
import Card from '../Cards';
import styles from './style.module.scss';

const CardsContainer = ({ projects }) => {
  const { isMobile, isTablet } = useMobileCards();

  // Plus besoin de calculs d'animation pour un scroll précis
  return (
    <div id="cards" className={styles.cardsWrapper}>
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
