'use client'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './page.module.scss';
import Rounded from '../../../common/RoundedButton';

const slideUp = {
  initial: {
    y: 300
  },
  enter: {
    y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
  }
};

const fadeIn = {
  initial: {
    opacity: 0,
    y: 50
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }
  }
};

const checkmarkAnimation = {
  initial: {
    scale: 0,
    rotate: -180
  },
  enter: {
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.8, 
      delay: 0.5,
      ease: [0.33, 1, 0.68, 1],
      type: "spring",
      stiffness: 100
    }
  }
};

export default function SuccessPage() {
  const router = useRouter();

  // Rediriger vers la page contact après 5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/contact');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleBackToContact = () => {
    router.push('/contact');
  };

  return (
    <motion.main 
      variants={slideUp} 
      initial="initial" 
      animate="enter" 
      className={styles.success}
    >
      <div className={styles.container}>
        <motion.div variants={fadeIn} className={styles.content}>
          {/* Checkmark animé */}
          <motion.div 
            variants={checkmarkAnimation}
            className={styles.checkmark}
          >
            <svg 
              width="80" 
              height="80" 
              viewBox="0 0 80 80" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle 
                cx="40" 
                cy="40" 
                r="38" 
                stroke="url(#gradient)" 
                strokeWidth="4"
                fill="rgba(79, 172, 254, 0.1)"
              />
              <motion.path 
                d="M25 40L35 50L55 30" 
                stroke="url(#gradient)" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4facfe" />
                  <stop offset="100%" stopColor="#00f2fe" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Titre principal */}
          <motion.h1 
            variants={fadeIn}
            className={styles.title}
          >
            Success.
          </motion.h1>

          {/* Sous-titre */}
          <motion.h2 
            variants={fadeIn}
            className={styles.subtitle}
          >
            Message sent!
          </motion.h2>

          {/* Message de confirmation */}
          <motion.p 
            variants={fadeIn}
            className={styles.message}
          >
            I will contact you as soon as possible.
          </motion.p>

          {/* Bouton de retour */}
          <motion.div
            variants={fadeIn}
            className={styles.buttonContainer}
          >
            <Rounded onClick={handleBackToContact}>
              <p>Back to contact</p>
            </Rounded>
          </motion.div>

          {/* Informations footer */}
          <motion.div 
            variants={fadeIn}
            className={styles.footer}
          >
            <div className={styles.footerSection}>
              <span className={styles.label}>VERSION</span>
              <span className={styles.value}>2022 © Edition</span>
            </div>
            
            <div className={styles.footerSection}>
              <span className={styles.label}>LOCAL TIME</span>
              <span className={styles.value}>
                {new Date().toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </span>
            </div>
            
            <div className={styles.footerSection}>
              <span className={styles.label}>SOCIALS</span>
              <div className={styles.socialLinks}>
                <a href="https://www.awwwards.com" target="_blank" rel="noopener noreferrer">
                  Awwwards
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  Linkedin
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.main>
  );
}
