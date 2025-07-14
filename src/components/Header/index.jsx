'use client';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import styles from './style.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import Magnetic from '../../common/Magnetic';


export default function Index() {
    const header = useRef(null);
    const pathname = usePathname();
    const router = useRouter();
    const [isMobile, setIsMobile] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsMobileNavOpen(false);
        setIsNavigating(false); // Reset navigation state
    }, [pathname]);

    // Optimisation majeure : detection mobile avec useCallback et throttling
    const checkIsMobile = useCallback(() => {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            setIsMobile(newIsMobile);
        }
    }, [isMobile]);

    useEffect(() => {
        // Throttle au lieu de debounce pour une réponse plus rapide
        let throttleTimer = null;
        const throttledResize = () => {
            if (throttleTimer === null) {
                throttleTimer = setTimeout(() => {
                    checkIsMobile();
                    throttleTimer = null;
                }, 50); // Réduit de 100ms à 50ms
            }
        };
        
        checkIsMobile(); // Check initial
        window.addEventListener('resize', throttledResize, { passive: true });
        
        return () => {
            window.removeEventListener('resize', throttledResize);
            if (throttleTimer) clearTimeout(throttleTimer);
        };
    }, [checkIsMobile]);

    // 🚀 FONCTION UTILITAIRE POUR CRÉER L'OVERLAY RESPONSIVE
    const createResponsiveOverlay = useCallback((text) => {
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
            font-weight: 300;
            letter-spacing: 0.1em;
            padding: 20px;
            text-align: center;
        `;
        
        // Déterminer la taille de police responsive
        const getFontSize = () => {
            const width = window.innerWidth;
            if (width <= 360) return '2rem';      // Très petits écrans
            if (width <= 480) return '2.5rem';   // Mobile portrait
            if (width <= 768) return '3rem';     // Mobile landscape / petites tablettes
            if (width <= 1024) return '3.5rem';  // Tablettes
            return '4rem';                       // Desktop
        };
        
        // Ajouter le texte de transition avec taille responsive
        overlay.innerHTML = `<div style="opacity: 0; transform: translateY(20px); transition: all 0.3s ease 0.3s; font-size: ${getFontSize()}; max-width: 100%; word-wrap: break-word;">${text}</div>`;
        
        return overlay;
    }, []);

    // 🚀 OPTIMISATION MAJEURE : Navigation ultra-rapide avec animation slideUp
    const fastNavigateToBackground = useCallback(async () => {
        if (isNavigating) return; // Prévient les double-clics
        
        setIsNavigating(true);
        setIsMobileNavOpen(false);
        
        // Utiliser la fonction utilitaire pour créer l'overlay responsive
        const overlay = createResponsiveOverlay('Background');
        document.body.appendChild(overlay);
        
        // Désactiver le scroll
        document.body.style.overflow = 'hidden';
        
        // Déclencher l'animation slideUp
        requestAnimationFrame(() => {
            overlay.style.transform = 'translateY(0)';
            // Animer le texte
            setTimeout(() => {
                const textElement = overlay.querySelector('div');
                if (textElement) {
                    textElement.style.opacity = '1';
                    textElement.style.transform = 'translateY(0)';
                }
            }, 300);
        });
        
        // Naviguer après l'animation
        setTimeout(() => {
            router.push('/background');
            
            // Nettoyer après la navigation
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
    }, [router, isNavigating, createResponsiveOverlay]);

    const fastNavigateToContact = useCallback(async () => {
        if (isNavigating) return; // Prévient les double-clics
        
        setIsNavigating(true);
        setIsMobileNavOpen(false);
        
        // Utiliser la fonction utilitaire pour créer l'overlay responsive
        const overlay = createResponsiveOverlay('Contact');
        document.body.appendChild(overlay);
        
        // Désactiver le scroll
        document.body.style.overflow = 'hidden';
        
        // Déclencher l'animation slideUp
        requestAnimationFrame(() => {
            overlay.style.transform = 'translateY(0)';
            // Animer le texte
            setTimeout(() => {
                const textElement = overlay.querySelector('div');
                if (textElement) {
                    textElement.style.opacity = '1';
                    textElement.style.transform = 'translateY(0)';
                }
            }, 300);
        });
        
        // Naviguer après l'animation
        setTimeout(() => {
            router.push('/contact');
            
            // Nettoyer après la navigation
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
    }, [router, isNavigating, createResponsiveOverlay]);

    // Fonction scroll optimisée avec useCallback
    const fastScrollToSection = useCallback((sectionId) => {
        setIsMobileNavOpen(false);
        
        if ((pathname === '/background' || pathname === '/contact') && sectionId === 'cards') {
            router.push(`/#${sectionId}`);
            return;
        }
        
        // Optimisation du scroll avec requestAnimationFrame
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

    // Gestionnaires d'événements optimisés avec useCallback
    const handleWorkClick = useCallback(() => fastScrollToSection('cards'), [fastScrollToSection]);
    const handleBackgroundClick = useCallback(() => fastNavigateToBackground(), [fastNavigateToBackground]);
    const handleContactClick = useCallback(() => fastNavigateToContact(), [fastNavigateToContact]);
    const handleLogoClick = useCallback(() => router.push('/'), [router]);

    // 🚀 PREFETCH AUTOMATIQUE pour améliorer les performances
    useEffect(() => {
        // Prefetch les pages en arrière-plan pour une navigation instantanée
        const prefetchPages = async () => {
            try {
                await Promise.all([
                    router.prefetch('/background'),
                    router.prefetch('/contact')
                ]);
            } catch (error) {
                console.error('Prefetch error:', error);
            }
        };
        
        // Délai de 1 seconde pour permettre au composant de se charger d'abord
        const timeoutId = setTimeout(prefetchPages, 1000);
        
        return () => clearTimeout(timeoutId);
    }, [router]);

    const toggleMobileNav = useCallback(() => {
        setIsMobileNavOpen(prev => !prev);
    }, []);

    // Memoization du contenu de navigation pour éviter les re-renders inutiles
    const desktopNavigation = useMemo(() => (
        <>
            <Magnetic>
                <div className={styles.el}>
                    <a onClick={handleWorkClick} style={{ pointerEvents: isNavigating ? 'none' : 'auto' }}>
                        Work
                    </a>
                    <div className={styles.indicator}></div>
                </div>
            </Magnetic>
            <Magnetic>
                <div className={styles.el}>
                    <a onClick={handleBackgroundClick} style={{ 
                        pointerEvents: isNavigating ? 'none' : 'auto',
                        opacity: isNavigating ? 0.7 : 1,
                        transition: 'opacity 0.1s ease'
                    }}>
                        Background
                    </a>
                    <div className={styles.indicator}></div>
                </div>
            </Magnetic>
            <Magnetic>
                <div className={styles.el}>
                    <a onClick={handleContactClick} style={{ 
                        pointerEvents: isNavigating ? 'none' : 'auto',
                        opacity: isNavigating ? 0.7 : 1,
                        transition: 'opacity 0.1s ease'
                    }}>
                        Contact
                    </a>
                    <div className={styles.indicator}></div>
                </div>
            </Magnetic>
        </>
    ), [handleWorkClick, handleBackgroundClick, handleContactClick, isNavigating]);

    const mobileNavigation = useMemo(() => (
        <div className={styles.mobileNav}>
            <button 
                className={styles.mobileNavToggle}
                onClick={toggleMobileNav}
                style={{ pointerEvents: isNavigating ? 'none' : 'auto' }}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            {isMobileNavOpen && (
                <div className={styles.mobileNavDropdown}>
                    <a onClick={handleWorkClick} style={{ pointerEvents: isNavigating ? 'none' : 'auto' }}>
                        Work
                    </a>
                    <a onClick={handleBackgroundClick} style={{ 
                        pointerEvents: isNavigating ? 'none' : 'auto',
                        opacity: isNavigating ? 0.7 : 1 
                    }}>
                        Background
                    </a>
                    <a onClick={handleContactClick} style={{ 
                        pointerEvents: isNavigating ? 'none' : 'auto',
                        opacity: isNavigating ? 0.7 : 1 
                    }}>
                        Contact
                    </a>
                </div>
            )}
        </div>
    ), [isMobileNavOpen, toggleMobileNav, handleWorkClick, handleBackgroundClick, handleContactClick, isNavigating]);

    return (
        <>
        <div ref={header} className={styles.header}>
            <div className={styles.logo} onClick={handleLogoClick}>
                <p className={styles.copyright}>©</p>
                <div className={styles.name}>
                    <p className={styles.codeBy}>Code by</p>
                    <p className={styles.joel}>Joël</p>
                    <p className={styles.andriantsoa}>Andriantsoa</p>
                </div>
            </div>
            <div className={styles.nav}>
                {!isMobile ? desktopNavigation : mobileNavigation}
            </div>
        </div>
        </>
    )
}
