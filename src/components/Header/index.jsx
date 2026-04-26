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

    // Navigation fiable sans temporisation (évite les blocages de transition)
    const fastNavigateToBackground = useCallback(async () => {
        if (isNavigating) return; // Prévient les double-clics
        
        setIsNavigating(true);
        setIsMobileNavOpen(false);
        router.push('/background');
        setTimeout(() => setIsNavigating(false), 250);
    }, [router, isNavigating]);

    const fastNavigateToContact = useCallback(async () => {
        if (isNavigating) return; // Prévient les double-clics
        
        setIsNavigating(true);
        setIsMobileNavOpen(false);
        router.push('/contact');
        setTimeout(() => setIsNavigating(false), 250);
    }, [router, isNavigating]);

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
