import React, { useState } from 'react'
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../animation';
import Curve from './Curve';
// Removed unused Footer import

const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export default function Index() {

  const pathname = usePathname();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className={styles.menu}
    >
      <div className={styles.body}>
        <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {
            navItems.map((data, index) => (
              <div
                key={index}
                className={selectedIndicator === data.href ? styles.activeNavItem : styles.navItem}
                onMouseEnter={() => setSelectedIndicator(data.href)}
              >
                {data.title}
              </div>
            ))
          }
        </div>
      </div>
      <Curve />
    </motion.div>
  )
}