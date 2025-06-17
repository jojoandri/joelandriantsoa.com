'use client';
import styles from './style.module.scss'
import { useState, useEffect, useRef } from 'react';
import Project from './components/project';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Image from 'next/image';
import Rounded from '../../common/RoundedButton';
import Link from 'next/link';

const projects = [
  {
    title: "My blog ",
    src: "c2montreal.png",
    description: "Blogger",
    color: "#000000",
    link:  "https://c2montreal.com"
  },
  {
    title: "Mora Market - Ecommerce & marketplace",
    src: "moramarket.png",
    description: "Digital marketer & Performance manager",
    color: "#ffffff",
    link:"https://moramarket.mg/"
  },
  {
    title: "Pharmaspecific - Clinical research",
    src: "locomotive.png",
    description: "Webmarketer & Designer",
    color: "#EFE8D3",
    link:  "https://c2montreal.com"
  
  },
  {
    title: "FIARO - Venture capital",
    src: "silencio.png",
    description: "Data Analyst",
    color: "#706D63",
    link:  "https://c2montreal.com"
  }
]

const scaleAnimation = {
    initial: {scale: 0, x:"-50%", y:"-50%"},
    enter: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}
}

export default function Home() {

  const [modal, setModal] = useState({active: false, index: 0})
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect( () => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {duration: 0.8, ease: "power3"})
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {duration: 0.8, ease: "power3"})
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {duration: 0.5, ease: "power3"})
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {duration: 0.5, ease: "power3"})
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"})
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"})
  }, [])

  useEffect(() => {
    const handleClick = () => {
      if (active && projects[index]?.link) {
        window.open(projects[index].link, "_blank");
      }
    };
  
    const container = modalContainer.current;
    if (container) {
      container.addEventListener("click", handleClick);
    }
  
    return () => {
      if (container) {
        container.removeEventListener("click", handleClick);
      }
    };
  }, [active, index]);
  
  



  const moveItems = (x, y) => {
    xMoveContainer.current(x)
    yMoveContainer.current(y)
    xMoveCursor.current(x)
    yMoveCursor.current(y)
    xMoveCursorLabel.current(x)
    yMoveCursorLabel.current(y)
  }
  const manageModal = (active, index, x, y) => {
    moveItems(x, y)
    setModal({active, index})
  }

  return (
  <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
    <div className={styles.body}>
      {
        projects.map( (project, index) => {
          return <Project index={index} title={project.title} description={project.description} manageModal={manageModal} key={index}/>
        })
      }
    </div>
    <Rounded>
      <p>More work</p>
    </Rounded>
    <>
      <motion.div ref={modalContainer} variants={scaleAnimation} initial="initial" animate={active ? "enter" : "closed"} className={`${styles.modalContainer} ${active ? styles.clickable : ''}`}>
      <div style={{top: index * -100 + "%"}} className={styles.modalSlider}>
      {
        projects.map((project, index) => {
          const { src, color,link ,title} = project;
          return (
            <Link legacyBehavior href={link || "#"} key={`modal_${index}`} passHref>
              <a className={styles.modalLink} target="_blank" rel="noopener noreferrer">
                <div className={styles.modal} style={{backgroundColor: color}}>
                  <Image 
                    src={src.startsWith('/') ? src : `/images/${src}`}
                    width={300}
                    height={200}
                    alt={title || "Project image"}
                    onError={(e) => { e.target.src = '/images/default.png'; }}
                  />
                </div>
              </a>
            </Link>
          );
        })
      }
    </div>
        </motion.div>
       
    </>
  </main>
  )
}
