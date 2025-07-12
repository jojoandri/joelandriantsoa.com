'use client';
import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './style.module.scss';

const ScrollMenuButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isOnWhiteSection, setIsOnWhiteSection] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Détecter le scroll pour afficher/masquer le bouton et détecter les sections blanches
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(scrolled);

      // Détecter si on est sur une section blanche (Description ou Cards)
      const descriptionSection = document.querySelector('[class*="description"]') || 
                                document.querySelector('[id*="description"]') ||
                                document.querySelector('.description');
      const cardsSection = document.getElementById('cards') || 
                          document.querySelector('[class*="cards"]') ||
                          document.querySelector('.cards');
      
      let onWhiteSection = false;
      
      // Position du bouton (top: 30px, right: 30px)
      const buttonRect = {
        top: 30,
        right: 30,
        bottom: 30 + 50, // hauteur du bouton
        left: window.innerWidth - 30 - 50 // largeur du bouton
      };

      // Vérifier si le bouton est au-dessus de la section Description
      if (descriptionSection) {
        const descRect = descriptionSection.getBoundingClientRect();
        if (descRect.top <= buttonRect.bottom && descRect.bottom >= buttonRect.top) {
          onWhiteSection = true;
        }
      }

      // Vérifier si le bouton est au-dessus de la section Cards
      if (cardsSection) {
        const cardsRect = cardsSection.getBoundingClientRect();
        if (cardsRect.top <= buttonRect.bottom && cardsRect.bottom >= buttonRect.top) {
          onWhiteSection = true;
        }
      }

      // Alternative : détecter par la couleur de fond de la page
      const bodyStyles = window.getComputedStyle(document.body);
      const currentBgColor = bodyStyles.backgroundColor;
      
      // Si le background est blanc ou très clair
      if (currentBgColor.includes('255, 255, 255') || 
          currentBgColor.includes('rgb(255, 255, 255)') ||
          currentBgColor === 'white' ||
          scrolled > 200) { // Après un certain scroll, considérer qu'on est sur les sections blanches
        onWhiteSection = true;
      }

      setIsOnWhiteSection(onWhiteSection);
    };

    // Throttle pour optimiser les performances
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Vérification initiale

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Fermer le menu lors du changement de page
  useEffect(() => {
    setIsMenuOpen(false);
    setIsNavigating(false);
  }, [pathname]);

  // Navigation rapide avec animation
  const fastNavigateToBackground = useCallback(async () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    setIsMenuOpen(false);
    
    // Animation d'overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      z-index: 9999;
      transform: translateY(100%);
      transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 4rem;
      font-weight: 300;
      letter-spacing: 0.1em;
    `;
    
    overlay.innerHTML = '<div style="opacity: 0; transform: translateY(20px); transition: all 0.3s ease 0.3s;">Background</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
      overlay.style.transform = 'translateY(0)';
      setTimeout(() => {
        const textElement = overlay.querySelector('div');
        if (textElement) {
          textElement.style.opacity = '1';
          textElement.style.transform = 'translateY(0)';
        }
      }, 300);
    });
    
    setTimeout(() => {
      router.push('/background');
      setTimeout(() => {
        overlay.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          document.body.style.overflow = 'auto';
          setIsNavigating(false);
        }, 600);
      }, 100);
    }, 800);
  }, [router, isNavigating]);

  const fastNavigateToContact = useCallback(async () => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    setIsMenuOpen(false);
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
      z-index: 9999;
      transform: translateY(100%);
      transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 4rem;
      font-weight: 300;
      letter-spacing: 0.1em;
    `;
    
    overlay.innerHTML = '<div style="opacity: 0; transform: translateY(20px); transition: all 0.3s ease 0.3s;">Contact</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    
    requestAnimationFrame(() => {
      overlay.style.transform = 'translateY(0)';
      setTimeout(() => {
        const textElement = overlay.querySelector('div');
        if (textElement) {
          textElement.style.opacity = '1';
          textElement.style.transform = 'translateY(0)';
        }
      }, 300);
    });
    
    setTimeout(() => {
      router.push('/contact');
      setTimeout(() => {
        overlay.style.transform = 'translateY(-100%)';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
          document.body.style.overflow = 'auto';
          setIsNavigating(false);
        }, 600);
      }, 100);
    }, 800);
  }, [router, isNavigating]);

  // Scroll vers une section
  const fastScrollToSection = useCallback((sectionId) => {
    setIsMenuOpen(false);
    
    if ((pathname === '/background' || pathname === '/contact') && sectionId === 'cards') {
      router.push(`/#${sectionId}`);
      return;
    }
    
    requestAnimationFrame(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  }, [router, pathname]);

  const handleWorkClick = useCallback(() => fastScrollToSection('cards'), [fastScrollToSection]);
  const handleBackgroundClick = useCallback(() => fastNavigateToBackground(), [fastNavigateToBackground]);
  const handleContactClick = useCallback(() => fastNavigateToContact(), [fastNavigateToContact]);
  const handleLogoClick = useCallback(() => {
    setIsMenuOpen(false);
    router.push('/');
  }, [router]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <div className={`${styles.scrollMenuButton} ${isVisible ? styles.visible : ''} ${isOnWhiteSection ? styles.onWhiteSection : ''}`}>
      {/* Bouton hamburger */}
      <button 
        className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
        disabled={isNavigating}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menu déroulant */}
      {isMenuOpen && (
        <div className={styles.menuDropdown}>
          <div className={styles.menuHeader}>
            <div className={styles.logo} onClick={handleLogoClick}>
              <span className={styles.copyright}>©</span>
              <span className={styles.name}>Joël Andriantsoa</span>
            </div>
          </div>
          
          <nav className={styles.menuNav}>
            <a 
              onClick={handleWorkClick} 
              className={styles.menuItem}
              style={{ pointerEvents: isNavigating ? 'none' : 'auto' }}
            >
              Work
            </a>
            <a 
              onClick={handleBackgroundClick} 
              className={styles.menuItem}
              style={{ 
                pointerEvents: isNavigating ? 'none' : 'auto',
                opacity: isNavigating ? 0.7 : 1 
              }}
            >
              Background
            </a>
            <a 
              onClick={handleContactClick} 
              className={styles.menuItem}
              style={{ 
                pointerEvents: isNavigating ? 'none' : 'auto',
                opacity: isNavigating ? 0.7 : 1 
              }}
            >
              Contact
            </a>
          </nav>
        </div>
      )}

      {/* Overlay pour fermer le menu en cliquant à côté */}
      {isMenuOpen && (
        <div 
          className={styles.menuOverlay} 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default ScrollMenuButton;
