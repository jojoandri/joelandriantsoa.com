
import styles from './style.module.scss';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../common/Magnetic';

export default function Contact() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
    return (
        <motion.div style={{y}} ref={container} id="contact" className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                            fill={true}
                            alt={"image"}
                            src={`/images/miniprofil.png`}
                            />
                        </div>
                        <h2>Let&apos;s work</h2>
                    </span>
                    <h2>together</h2>
                   
                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <a href="mailto:hello@joelandriantsoa.com" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>hello@joelandriantsoa.com</p>
                            </a>
                        </Rounded>
                        <Rounded>
                            <a href="tel:+261349410608" style={{textDecoration: 'none', color: 'inherit'}}>
                                <p>+261 34 94 106 08</p>
                            </a>
                        </Rounded>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>Version</h3>
                            <p>2025 © Edition</p>
                        </span>
                       
                    </div>
                    <div>
                        <span>
                            <h3>Socials</h3>
                            <div>
                                <a href="https://www.facebook.com/synyster.joel?locale=fr_FR" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <Magnetic>
                                        <p>Facebook</p>
                                    </Magnetic>
                                </a>
                                <a href="https://www.instagram.com/jolandriantsoa/" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <Magnetic>
                                        <p>Instagram</p>
                                    </Magnetic>
                                </a>
                                <a href="https://mg.linkedin.com/in/joel-andriantsoa-304b21317" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
                                    <Magnetic>
                                        <p>Linkedin</p>
                                    </Magnetic>
                                </a>
                            </div>
                        </span>
                       
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
