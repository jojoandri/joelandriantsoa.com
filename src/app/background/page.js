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
                <h3>Master in Computer Science</h3>
                <p className={styles.institution}>École Supérieure de Technologie et d&#39;Innovation (ESTI)</p>
                <p className={styles.description}>
                  Specialization in modern web development, React/Next.js technologies,
                  and full-stack application architecture. Focus on technological innovation
                  and agile methodologies.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.year}>2023</div>
              <div className={styles.content}>
                <h3>Bachelor in Computer Science</h3>
                <p className={styles.institution}>Université de Madagascar</p>
                <p className={styles.description}>
                  Comprehensive training in programming, algorithms, databases,
                  and information systems. Final project on developing responsive web applications.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.year}>2020</div>
              <div className={styles.content}>
                <h3>Scientific Baccalaureate</h3>
                <p className={styles.institution}>Lycée Technique Antananarivo</p>
                <p className={styles.description}>
                  Specialization in mathematics and physics.
                  Honors. First introduction to programming and computer science.
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
                <li>JavaScript ES6+</li>
                <li>HTML5 / CSS3 / SCSS</li>
                <li>Responsive Design</li>
                <li>Framer Motion</li>
              </ul>
            </div>

            <div className={styles.skillCategory}>
              <h3>Backend</h3>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>REST API</li>
                <li>Databases</li>
                <li>MongoDB / MySQL</li>
              </ul>
            </div>

            <div className={styles.skillCategory}>
              <h3>Tools</h3>
              <ul>
                <li>Git / GitHub</li>
                <li>VS Code</li>
                <li>Figma</li>
                <li>Photoshop</li>
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
              &quot;Innovation is born from curiosity, grows through continuous learning,
              and flourishes in creating solutions that positively impact users&#39; lives.&quot;
            </p>
            <span className={styles.author}>- Joel Andriantsoa</span>
          </div>
        </motion.section>
      </div>
      
      {/* Section Contact - Composant réutilisable */}
      <Contact />
    </motion.main>
  );
}
