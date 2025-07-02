'use client'
import { motion } from 'framer-motion';
import styles from './page.module.scss';
import Contact from '../../components/Contact';

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

const stagger = {
  enter: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export default function ContactPage() {
  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.contact}>
      <div className={styles.container}>
        {/* Hero Section */}
        <motion.div variants={fadeIn} className={styles.hero}>
          <h1>Contact Me</h1>
          <p className={styles.subtitle}>Let&#39;s talk about your next project</p>
        </motion.div>

        {/* Contact Form */}
        <motion.section variants={stagger} initial="initial" animate="enter" className={styles.contactForm}>
          <motion.div variants={fadeIn} className={styles.formContainer}>
            <h2>Send Me a Message</h2>
            <form>
              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <input type="text" id="firstName" name="firstName" required />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className={styles.inputGroup}>
                  <input type="text" id="lastName" name="lastName" required />
                  <label htmlFor="lastName">Last Name</label>
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <input type="email" id="email" name="email" required />
                <label htmlFor="email">Email</label>
              </div>
              
              <div className={styles.inputGroup}>
                <input type="tel" id="phone" name="phone" />
                <label htmlFor="phone">Phone (optional)</label>
              </div>
              
              <div className={styles.inputGroup}>
                <select id="subject" name="subject" required>
                  <option value="">Choose a subject</option>
                  <option value="project">New Project</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="job">Job Opportunity</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="subject">Subject</label>
              </div>
              
              <div className={styles.inputGroup}>
                <textarea id="message" name="message" rows="6" required></textarea>
                <label htmlFor="message">Message</label>
              </div>
              
              <motion.button 
                type="submit" 
                className={styles.submitBtn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeIn} className={styles.contactInfo}>
            <h2>My Contact Details</h2>
            
            <div className={styles.infoCard}>
              <div className={styles.infoItem}>
                <div className={styles.icon}>
                  {/* Gmail SVG Icon */}
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <rect fill="#fff" width="24" height="24" rx="4"/>
                      <path fill="#EA4335" d="M3.6 6.6V17.4C3.6 18.28 4.32 19 5.2 19H7.2V12.12L12 15.6L16.8 12.12V19H18.8C19.68 19 20.4 18.28 20.4 17.4V6.6C20.4 5.72 19.68 5 18.8 5H5.2C4.32 5 3.6 5.72 3.6 6.6Z"/>
                      <path fill="#34A853" d="M16.8 19V12.12L12 15.6L7.2 12.12V19H16.8Z"/>
                      <path fill="#4285F4" d="M20.4 6.6V17.4C20.4 18.28 19.68 19 18.8 19H16.8V12.12L20.4 9.36V6.6Z"/>
                      <path fill="#FBBC05" d="M3.6 6.6V9.36L7.2 12.12V19H5.2C4.32 19 3.6 18.28 3.6 17.4V6.6Z"/>
                      <path fill="#EA4335" d="M12 13.08L3.6 6.6V6.6C3.6 5.72 4.32 5 5.2 5H18.8C19.68 5 20.4 5.72 20.4 6.6V6.6L12 13.08Z"/>
                    </g>
                  </svg>
                </div>
                <div>
                  <h3>Email</h3>
                  <a href="mailto:joel.andriantsoa@example.com">joel.andriantsoa@example.com</a>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.icon}>📱</div>
                <div>
                  <h3>Phone</h3>
                  <a href="tel:+261123456789">+261 12 345 67 89</a>
                </div>
              </div>
              
              <div className={styles.infoItem}>
                <div className={styles.icon}>📍</div>
                <div>
                  <h3>Location</h3>
                  <p>Antananarivo, Madagascar</p>
                </div>
              </div>
            </div>

            {/* Social Networks */}
                <div className={styles.socialLinks}>
                  <h3>Follow Me</h3>
                  <div className={styles.socialGrid}>
                  <motion.a 
                    href="https://www.facebook.com/joel.andriantsoa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.socialIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
                    </svg>
                    </span>
                    Facebook
                  </motion.a>
                  
                  <motion.a 
                    href="https://www.instagram.com/joel.andriantsoa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.socialIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.417 3.678 1.398c-.98.98-1.267 2.092-1.326 3.373C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.281.346 2.393 1.326 3.373.98.98 2.092 1.267 3.373 1.326C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.346 3.373-1.326.98-.98 1.267-2.092 1.326-3.373.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.281-.346-2.393-1.326-3.373-.98-.98-2.092-1.267-3.373-1.326C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                    </span>
                    Instagram
                  </motion.a>
                  
                  <motion.a 
                    href="https://www.linkedin.com/in/joel-andriantsoa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.socialIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.027-3.037-1.849-3.037-1.851 0-2.132 1.445-2.132 2.939v5.667H9.358V9h3.414v1.561h.049c.476-.899 1.637-1.849 3.369-1.849 3.602 0 4.267 2.368 4.267 5.455v6.285zM5.337 7.433c-1.144 0-2.069-.926-2.069-2.068 0-1.143.925-2.069 2.069-2.069 1.143 0 2.068.926 2.068 2.069 0 1.142-.925 2.068-2.068 2.068zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.723v20.549C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.723C24 .771 23.2 0 22.225 0z"/>
                    </svg>
                    </span>
                    LinkedIn
                  </motion.a>
                  
                  <motion.a 
                    href="https://github.com/joel-andriantsoa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.socialIcon}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    </span>
                    GitHub
                  </motion.a>
                  </div>
                </div>

                {/* Availability */}
            <div className={styles.availability}>
              <h3>Availability</h3>
              <div className={styles.statusIndicator}>
                <div className={styles.statusDot}></div>
                <span>Available for new projects</span>
              </div>
              <p>Average response time: 24h</p>
            </div>
          </motion.div>
        </motion.section>

        {/* Quick FAQ Section */}
        <motion.section variants={fadeIn} className={styles.faq}>
          <h2>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            <div className={styles.faqItem}>
              <h3>What types of projects do you accept?</h3>
              <p>I mainly work on modern web projects: showcase websites, React/Next.js apps, e-commerce, and custom portfolios.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>What are your delivery times?</h3>
              <p>It depends on the complexity of the project. A showcase website usually takes 1-2 weeks, a more complex app can take 4-8 weeks.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Do you offer maintenance?</h3>
              <p>Yes, I offer maintenance and technical support services for all the projects I develop.</p>
            </div>
            
            <div className={styles.faqItem}>
              <h3>Do you work remotely?</h3>
              <p>Absolutely! I mainly work remotely but can travel for important meetings in Antananarivo.</p>
            </div>
          </div>
        </motion.section>
      </div>
      
      {/* Section Contact - Composant réutilisable */}
      <Contact />
    </motion.main>
  );
}
