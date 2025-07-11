'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
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

export default function Background() {
  return (
    <motion.main variants={slideUp} initial="initial" animate="enter" className={styles.background}>
      <div className={styles.container}>
        {/* Section Hero avec photo */}
        <motion.div variants={fadeIn} className={styles.hero}>
          <div className={styles.photoContainer}>
            <Image
              src="/images/background2.jpg"
              alt="Joel Andriantsoa - Graduate"
              fill
              className={styles.photo}
              priority
            />
          </div>
          <div className={styles.heroText}>
            <h1>My academic background</h1>
            <p className={styles.subtitle}>Education & Academic Experience</p>
          </div>
        </motion.div>

        {/* Section Formation */}
        <motion.section variants={fadeIn} className={styles.education}>
          <h2>University Education</h2>
          
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.year}>2025</div>
              <div className={styles.content}>
                <h3>Master 2 in IAE Poitiers</h3>
                <p className={styles.institution}>Institut d&apos;Administration des Entreprises (IAE) Poitiers</p>
                <p className={styles.description}>
                  Specialization in Digital Marketing and Data Analysis.
                  I am the <strong> First Vice Top Graduate</strong> (Valedictorian Runner-up) of the Master&apos;s program in Marketing Strategy.


                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.year}>2024</div>
              <div className={styles.content}>
                <h3>Undergraduate studies in ESTI</h3>
                <p className={styles.institution}>Ecole Supérieure de Technologie et d&apos;Informatique (ESTI)</p>
                <p className={styles.description}>
                  Two-year program in computer science with a focus on web development and digital marketing.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.year}>2023</div>
              <div className={styles.content}>
                <h3>Bachelor&apos;s Degree in Business Administration</h3>
                <p className={styles.institution}>INSCAE Madagascar</p>
                <p className={styles.description}>
                  Three-year undergraduate program with a strong focus on marketing strategy. Covers key concepts such as competitive advantage (Porter&apos;s Five Forces, Value Chain), market segmentation, positioning, and strategic brand management. Emphasizes analytical thinking and practical application through case studies and business simulations (e.g., Shadow manager case studies).
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section Compétences */}
        <motion.section variants={fadeIn} className={styles.skills}>
          <h2>Technical Skills</h2>
          
          <div className={styles.skillsGrid}>
            <div className={styles.skillCategory}>
              <h3>Frontend</h3>
              <ul>
                <li>React.js / Next.js</li>
                <li>HTML5 / CSS3 / SCSS</li>
                <li>WordPress/Framer/Figma</li>
              </ul>
            </div>

            <div className={styles.skillCategory}>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB / MySQL</li>
                <li>PHP / Laravel</li>
              </ul>
            </div>

            <div className={styles.skillCategory}>
              <h3>Tools</h3>
              <ul>
                <li>Git / GitHub</li>
                <li>VS Code</li>
                <li>Framer/Blender for 3D</li>
                <li>Pack Adobe (Photoshop, Illustrator)</li>
                <li>Deployment (Vercel)</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Section Philosophie */}
        <motion.section variants={fadeIn} className={styles.philosophy}>
          <h2>My Philosophy</h2>
          <div className={styles.quote}>
            <p>
              &quot;Do things seriously without taking yourself too seriously.&quot;
            </p>
            <span className={styles.author}>- Joël Andriantsoa</span>
          </div>
        </motion.section>
      </div>
      
      {/* Section Contact - Composant réutilisable */}
      <Contact />
    </motion.main>
  );
}
