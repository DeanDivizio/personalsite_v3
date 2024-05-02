'use client';
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ParticleBG from "./components/ParticleBG";
import PhotoVideoSection from "./components/PhotoVideoSection";
import SkillCard from "./components/SkillCard";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

let card1Content = (`<h3>Creative</h3>
<p>Composition</p>
<p>UI & UX Design</p>
<p>Color & Type Theory</p>
<p>Content Writing</p>
<p>Branding</p>
<p>Visual Storytelling</p>`);

let card2Content = (`<h3>Technical</h3>
<p>HTML, CSS, JavaScript</p>
<p>React & Next.js</p>
<p>WordPress</p>
<p>Google Analytics</p>
<p>Generative AI</p>
<p>Git/Source Control</p>`);

let card3Content = (`<h3>Logistic</h3>
<p>Microsoft 365</p>
<p>Google Workspace</p>
<p>The Adobe Suite</p>
<p>Davinci Resolve</p>
<p>Figma</p>
<p>MacOS, Windows, Linux</p>`);

let card4Content = (`<h3>Media</h3>
<p>Video Production</p>
<p>Photography</p>
<p>Color Processing</p>
<p>3D Rendering</p>
<p>Basic Animation</p>
<p>Audio Engineering</p>`);

export default function Home() {
  const [sectionOpacity, setSectionOpacity] = useState(1);
  const [loveStyle, setLoveStyle] = useState({color: '#ffffff', fontWeight: '400'});

  const controls = useAnimation(); // framer motion animation controls
  const variants = { // framer motion animation states
      hidden: { opacity: 0, y: 100 },
      visible: index => ({
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: startOffset + index * delayFactor },
          ease: [0,0.65,0,1]
      }),
  };

  const { ref: ctaRef, inView: ctaInView } = useInView({ // This is the intersection observer for the CTA section
    triggerOnce: false,
    threshold: 0.4,
});
  
  const { ref, inView } = useInView({ // This is the intersection observer for the skill cards
      triggerOnce: true,
      threshold: 0.1, 
  });
  

  useEffect(() => { // fade out the skill cards when the CTA section is in view
    setSectionOpacity(ctaInView ? 0 : 1);
}, [ctaInView]);

  useEffect(() => {// animate the word "Love" in the "I Love Learning" section
   setLoveStyle(inView ? {color: 'rgba(255, 255, 255, 0)', fontWeight: '400', transition: 'all 3s ease'} : {color: '#ffffff', fontWeight: '200'});
}
, [inView]);

  useEffect(() => {// animate the skill cards
      if (inView) {
          controls.start("visible");
      }
  }, [controls, inView]);

  let delayFactor = 0.65;
  let startOffset = 0.25;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <div className={styles.heroSection}> {/* I want some sort of animated abstract background. dark grey against the page's black. either particles like here, https://www.youtube.com/watch?v=F20SxgG5MlM or some sort of animation on a mask over a graphic */}
          <div className={styles.heroHeadingTextContainer}> {/* going to need this to be a flex row */}
            <div className={styles.heroTextWhite}>Hi!</div> <div className={styles.heroTextWhite}>I'm</div> <div className={styles.heroTextColor}>Dean</div> {/* background clip gradient on my name */}
          </div>
          <div className={styles.heroSubText}>I'm your new...</div>
          <div className={styles.heroAccentText}>
            <span className={styles.designerText}>Designer</span>
            <span className={styles.developerText}>Developer</span>
            <span className={styles.creativeText}>Creative</span>
            <span className={styles.designerText}>Designer</span>
          </div>
          <div className={styles.heroCTA}>
            <p>Here's Why</p>
            <img
              src="https://api.deandivizio.com/wp-content/uploads/2024/04/expand_more_FILL0_wght400_GRAD0_opsz24.png"
              style={{ filter: 'invert(1)' }}
            />
          </div>
        </div>
        <div className={styles.workOverviewSection}>
          <h2>I've Built...</h2>
          <div className={styles.webSection}>
          <div className={styles.siteSection}>
            <h3>Web Sites</h3>
            <div className={styles.siteList}>
              <p>This one</p>
              <p>OVRTONE</p>
              <p>Capital Podiatry</p>
            </div>
          </div>
          <div className={styles.appSection}>
            <h3>Web Apps</h3>
            <div className={styles.appList}>
              <p>Tesla Browser</p>
              <p>GymTrax</p>
            </div>
          </div>
          </div>
          <PhotoVideoSection />
          <h2 id="loveText">I <span style={loveStyle} className={styles.heroTextColor}><em>Love</em></span> Learning...</h2>
          <div className={styles.skillCardContainer} style={{opacity: sectionOpacity}}> {/* These skill cards need SSR */}
            <motion.div ref={ref} animate={controls} variants={variants} initial="hidden" exit="exit" custom={0}>
              <SkillCard color="greenBG" content={card1Content} />
            </motion.div>
            <motion.div ref={ref} animate={controls} variants={variants} initial="hidden" exit="exit" custom={0.33}>
              <SkillCard color="greenBG" content={card2Content} />
            </motion.div>
            <motion.div ref={ref} animate={controls} variants={variants} initial="hidden" exit="exit" custom={0.66}>
              <SkillCard color="greenBG" content={card3Content} />
            </motion.div>
            <motion.div ref={ref} animate={controls} variants={variants} initial="hidden" exit="exit" custom={1}>
              <SkillCard color="greenBG" content={card4Content} />
            </motion.div>
          </div>
            <p>...and I'm always looking for new ways to grow.</p>
          </div>
          <div className={styles.CTASection} ref={ctaRef}> {/* This section can be SSR */}
            <h4>I think I'd make a great addition to your team.</h4>
            <h2>Let's Chat</h2>
            <div className={styles.CTAButton}>
              <a href="mailto:contact@deandivizio.com">contact@deandivizio.com</a>
            </div>
          </div>
        </div>
        {/* <CursorCanvas /> */}
        <ParticleBG id="particles" />
      </div>
      );
}
