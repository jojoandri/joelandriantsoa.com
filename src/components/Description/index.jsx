import styles from './style.module.scss';
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Index() {
    const phrase = "Together, we’ll make your company fits with digital era. No fluff — just smart strategy, bold creativity, and data-driven impact.";
    const description = useRef(null);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const context = gsap.context(() => {
            const words = description.current?.querySelectorAll('p:first-of-type span span') ?? [];
            const copy = description.current?.querySelector('.description-copy');

            gsap.set(words, {
                y: 24,
                autoAlpha: 0
            });

            if (copy) {
                gsap.set(copy, {
                    y: 24,
                    autoAlpha: 0
                });
            }

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: description.current,
                    start: 'top 78%',
                    toggleActions: 'play none none reverse'
                },
                defaults: {
                    ease: 'power3.out'
                }
            });

            timeline.to(words, {
                y: 0,
                autoAlpha: 1,
                duration: 0.75,
                stagger: 0.03
            });

            timeline.to(copy, {
                y: 0,
                autoAlpha: 1,
                duration: 0.7
            }, '-=0.35');
        }, description);

        return () => context.revert();
    }, []);

    return (
        <div ref={description} className={styles.description}>
            <div className={styles.body}>
                <p>
                {
                    phrase.split(" ").map((word, index) => {
                        return <span key={index} className={styles.mask}><span>{word}</span></span>
                    })
                }
                </p>
                <p className="description-copy">Data is the new oil of the 21st century — and I turn it into strategic fuel. With a passion for analytics and a strong academic foundation, I uncover deep insights to drive smarter marketing decisions and impactful business growth.
                </p>
                
            </div>
        </div>
    )
}
