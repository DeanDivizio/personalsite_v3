'use client';
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import ParticleBG from "./components/ParticleBG";
import SkillCard from "./components/SkillCard";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ExampleModule from "./components/ExampleModule";
import Masonry from "react-masonry-css";

//content for the skill cards
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


const breakpointColumnsObj = { // defines breakpoints for masonry layout. used to display images
  default: 4,
  1200: 2,
  768: 1,
};
export default function Home() {
  // variables used accross all animations
  let delayFactor = 0.65;
  let startOffset = 0.25;
  let desktopThreshold = 0.4;
  let mobileThreshold = 0.3;

  const [loveStyle, setLoveStyle] = useState({ color: '#ffffff', fontWeight: '400' }); // state for the style of the word "Love" in the "I Love Learning" section. used to enable the fade to gradient effect
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768); // state for detecting screen width. used to determine if the media section should animate in

  const controls = useAnimation(); // animation controls for the images in the media section
  const heroControls = useAnimation(); // animation controls for hero section
  const siteControls = useAnimation(); // animation controls for sites section
  const appControls = useAnimation(); // animation controls for sites section
  const mediaControls = useAnimation(); // animation controls for sites section
  const skillsControls = useAnimation(); // animation controls for sites section
  const fromBottomVariants = { // animation states for animating in from the bottom
    hidden: { transition: { duration: 1 }, opacity: 0, y: 100 },
    visible: index => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: startOffset + index * delayFactor },
      ease: [0, 0.65, 0, 1]
    }),
    exit: { opacity: 0, transition: { duration: 1 } }
  };
  const fromLeftVariants = { // animation states for animating in from the left
    hidden: { opacity: 0, x: -100 },
    visible: index => ({
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: startOffset + index * delayFactor },
      ease: [0, 0.65, 0, 1]
    }),
  };
  const fromRightVariants = { // animation states for animating in from the right
    hidden: { opacity: 0, x: 100 },
    visible: index => ({
      opacity: 1,
      x: 0,
      transition: { duration: 1, delay: startOffset + index * delayFactor },
      ease: [0, 0.65, 0, 1]
    }),
  };
  const fromCenterVariants = { // animation states for animating in from center. starts invisible and smaller, grows and fades in.
    hidden: { transition: { duration: 1 }, opacity: 0, transform: 'scale(0.95)', },
    visible: index => ({
      opacity: 1,
      transform: 'scale(1)',
      transition: { duration: 1, delay: startOffset + index * delayFactor },
      ease: [0, 0.65, 0, 1]
    }),
    exit: { opacity: 0, transition: { duration: 1 } }
  };
  const variants = { // animation states for the images in the media section
    hidden: { opacity: 0, y: 200 },
    visible: index => ({
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: startOffset + index * delayFactor },
      ease: [0, 0.65, 0, 1]
    }),
    exit: { opacity: 0, transition: { duration: 1 } }
  };

  const { ref, inView } = useInView({ // intersection observer for the images in media secion
    triggerOnce: false,
    threshold: 0.4,
  });
  const { ref: heroRef, inView: heroInView } = useInView({ //Observer for the hero section
    triggerOnce: false,
    threshold: 0.3,
  });
  const { ref: sitesRef, inView: sitesInView } = useInView({ // Observer for the web sites section
    triggerOnce: false,
    threshold: isDesktop ? desktopThreshold : mobileThreshold,
  });
  const { ref: appsRef, inView: appsInView } = useInView({ // Observer for the web apps section
    triggerOnce: false,
    threshold: isDesktop ? desktopThreshold : mobileThreshold,
  });
  const { ref: mediaRef, inView: mediaInView } = useInView({ // Observer for the photo/video section
    triggerOnce: false,
    threshold: isDesktop ? desktopThreshold : mobileThreshold,
  });
  const { ref: skillsRef, inView: skillsInView } = useInView({ // Observer for the skill section
    triggerOnce: false,
    threshold: 0.3,
  });
  const { ref: ctaRef, inView: ctaInView } = useInView({ // Observer for the CTA section
    triggerOnce: false,
    threshold: isDesktop ? desktopThreshold : mobileThreshold,
  });

  useEffect(() => {// animate the word "Love" in the "I Love Learning" section
    setLoveStyle(skillsInView ? { color: 'rgba(255, 255, 255, 0)', fontWeight: '400', transition: 'all 3s ease 1s' } : { color: '#ffffff', fontWeight: '200' });
  }, [skillsInView]);
  useEffect(() => {// animate in the hero heading
    if (heroInView) {
      heroControls.start("visible");
    }
  }, [heroControls, heroInView]);
  useEffect(() => {// animate in the website examples
    if (sitesInView) {
      siteControls.start("visible");
    } else
      if (!sitesInView && !appsInView) {
        siteControls.start("hidden");
      } else { siteControls.start("exit") };
  }, [siteControls, sitesInView]);
  useEffect(() => {// animate in the web app examples
    if (appsInView) {
      appControls.start("visible");
    } else
      if (!appsInView && !mediaInView) {
        appControls.start("hidden");
      } else { appControls.start("exit") };
  }, [appControls, appsInView]);
  useEffect(() => {// animate in the photo video section
    if (mediaInView) {
      mediaControls.start("visible");
    } else
      if (!mediaInView && !skillsInView) {
        mediaControls.start("hidden");
      } else { mediaControls.start("exit") };
  }, [mediaControls, mediaInView]);
  useEffect(() => {// animate in the skill section
    if (skillsInView) {
      skillsControls.start("visible");
    } else if (!skillsInView && !ctaInView) {
      skillsControls.start('hidden');
    } else { skillsControls.start("exit") };
  }, [skillsControls, skillsInView]);
  useEffect(() => {// animate the images in media section when they come into view
    if (inView) {
      controls.start("visible");
    }
    else if (!inView && !skillsInView) {
      controls.start("hidden");
    }
    else { controls.start("exit") }
  }, [controls, inView]);

  useEffect(() => { // handles state changes for the isDesktop state during window resizing
    const handleResize = () => setIsDesktop(window.innerWidth > 645);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // States used for toggling between meddis sub-sections. there are three because the event is split into multiple stages that need to animate in sequence
  const [isToggled1, setToggle1] = useState(false);
  const [isToggled2, setToggle2] = useState(false);
  const [isToggled3, setToggle3] = useState(false);

  const handleClick = () => { // function to handle the toggling of the media sub-sections. #1 just handles the button. #2 handles styles for the photo section. #3 handles the sytles for the video section and the conditional rendering
    setToggle1(!isToggled1);
    if (isToggled1) {
      setToggle3(!isToggled3);
      setTimeout(() => {
        setToggle2(!isToggled2);
      }, 200);
    } else {
      setToggle2(!isToggled2);
      setTimeout(() => {
        setToggle3(!isToggled3);
      }, 200);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <div className={styles.heroSection} ref={heroRef}>
          <div className={styles.heroHeadingTextContainer}> {/* going to need this to be a flex row */}
            <motion.div className={styles.heroTextWhite} animate={heroControls} variants={fromBottomVariants} initial="hidden" exit="exit" custom={0}>Hi!</motion.div> <motion.div className={styles.heroTextWhite} animate={heroControls} variants={fromBottomVariants} initial="hidden" exit="exit" custom={0.2}>I'm</motion.div> <motion.div className={styles.heroTextColor} animate={heroControls} variants={fromBottomVariants} initial="hidden" exit="exit" custom={0.4}>Dean</motion.div> {/* background clip gradient on my name */}
          </div>
          <motion.div className={styles.heroSubText} animate={heroControls} variants={fromCenterVariants} initial="hidden" exit="exit" custom={2}>I'm your new...</motion.div>
          <motion.div className={styles.heroAccentText} animate={heroControls} variants={fromBottomVariants} initial="hidden" exit="exit" custom={3}>
            <span className={styles.developerText}>Developer</span>
            <span className={isDesktop ? styles.creativeText : styles.greenText}>Creative</span>
            <span className={styles.designerText}>Designer</span>
            <span className={styles.developerText}>Developer</span>
          </motion.div>
          <motion.div className={styles.heroCTA} animate={heroControls} variants={fromCenterVariants} initial="hidden" exit="exit" custom={7}>
            <p>Here's Why</p>
            <img
              src="https://api.deandivizio.com/wp-content/uploads/2024/04/expand_more_FILL0_wght400_GRAD0_opsz24.png"
              style={{ filter: 'invert(1)' }}
            />
          </motion.div>
        </div>
        <div className={styles.workOverviewSection}>
          <h2>I've Built...</h2>
          <div className={styles.webSection}>
            <div className={styles.siteSection} ref={sitesRef}>
              <motion.h3 className={styles.h3} ref={sitesRef} animate={siteControls} variants={fromLeftVariants} initial="hidden" exit="exit" custom={0}>Web Sites</motion.h3>
              <motion.div className={styles.siteList} >
                <motion.div animate={siteControls} initial="hidden" variants={fromBottomVariants} custom={0.5}><ExampleModule // ExampleModule displays a site/app example with an image, heading, body, and relevant links. default is to have the image on the left. include the 'reverse' prop to have the image on the right.
                  image='https://api.deandivizio.com/wp-content/uploads/2024/05/DeanDivizioV3.jpg'
                  heading='This Site!'
                  body='Built with Next.js with minimalism in mind, this site is an example of a simple but elegant design, developed with a modern tech stack.'
                  linkToCode='https://github.com/DeanDivizio/personalsite_v3' /></motion.div>
                <motion.div animate={siteControls} initial="hidden" variants={fromBottomVariants} custom={1}><ExampleModule
                  image='https://api.deandivizio.com/wp-content/uploads/2024/04/ovrtoneHP.jpg'
                  heading='OVRTONE Media Group'
                  body='Designed and developed by me on Next.js, this site executes our brand image and provides us a web presence while we build the rest of the site.'
                  linkToCode='https://github.com/DeanDivizio/ovrtonesite'
                  linkToExample='https://www.ovrtonemedia.com'
                  reverse /></motion.div>
                <motion.div animate={siteControls} initial="hidden" variants={fromBottomVariants} custom={1.5}><ExampleModule
                  image='https://api.deandivizio.com/wp-content/uploads/2024/03/Screenshot-2024-03-13-at-8.59.57 AM-Large.jpeg'
                  heading='Captital Podiatry'
                  body="Originally designed and developed by me using WordPress, this site is a great example of a modern 'less is more' approach. While no longer maintained by me, enough of my original design is still present to warrant checking it out if you're interested."
                  linkToExample='https://capitalfeet.com' /></motion.div>
              </motion.div>
            </div>
            <div className={styles.appSection} ref={appsRef}>
              <motion.h3 className={styles.h3} animate={appControls} initial="hidden" variants={fromBottomVariants} custom={0}>and Web Apps</motion.h3>
              <div className={styles.appList}>
                <motion.div animate={appControls} initial="hidden" variants={fromBottomVariants} custom={0.6}><ExampleModule image='https://api.deandivizio.com/wp-content/uploads/2024/05/betterteslabrowser.jpg'
                  heading='Better Tesla Browser'
                  body='A simple solution to a frustrating problem. This is a highly optimized, self-hostable link database that allows easy access to fullscreen sites and apps in the Tesla web browser. Built on Next.js.'
                  linkToCode='https://github.com/DeanDivizio/betterteslabrowser' /></motion.div>
                <motion.div animate={appControls} initial="hidden" variants={fromBottomVariants} custom={1.1}><ExampleModule image='https://api.deandivizio.com/wp-content/uploads/2024/05/gymtraxloginscreen.jpg'
                  heading='GymTrax'
                  body="This is my current project. I wanted a simplistic and routine based web app for tracking my workouts. Built with Next.js (because I clearly love it), the end goal is an open source, containerized app, with a public subscription for those who don't want to self-host."
                  linkToCode='https://github.com/DeanDivizio/gymtrax'
                  reverse /></motion.div>
              </div>
            </div>
          </div>
          <div ref={mediaRef}> {/* below components are animated in conditionally if not on mobile */}
            <motion.div className={styles.headingSection} animate={isDesktop ? mediaControls : undefined} variants={isDesktop ? fromBottomVariants : undefined} initial={isDesktop ? "hidden" : undefined} custom={0}>
              <h2>I'm a</h2>
              <div className={styles.toggleContainer} onClick={handleClick}>
                <div className={styles.label} style={{ color: isToggled1 ? '#000000' : '#0073ff', fontWeight: isToggled1 ? '200' : '200', opacity: isToggled1 ? '0.65' : '1' }}>Photo</div>
                <div className={`${styles.toggleButton} ${isToggled1 ? styles.active : ''}`}></div>
                <div className={styles.label} style={{ color: isToggled1 ? '#0073ff' : '#000000', fontWeight: isToggled1 ? '200' : '200', opacity: isToggled1 ? '1' : '0.65' }}>Video</div>
              </div>
              <h2>Pro</h2>
            </motion.div>
            <div className={styles.mediaContainer}>
              {!isToggled3 &&
                <div className={styles.photoSection} style={{ opacity: isToggled2 ? '0' : '1', transform: isToggled2 ? 'scale(0.9)' : 'scale(1)' }}>
                  <Masonry breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"> 
                    <motion.div ref={ref} animate={isDesktop ? controls : undefined} variants={isDesktop ? variants : undefined} initial={isDesktop ? "hidden" : undefined} exit={isDesktop ? "exit" : undefined} custom={0}>
                      <img src='https://api.deandivizio.com/wp-content/uploads/2024/02/IMG_6876-Large.jpeg' alt='An filmic modern portrait of a man in his late 20s' />
                    </motion.div>
                    <motion.div animate={isDesktop ? controls : undefined} variants={isDesktop ? variants : undefined} initial={isDesktop ? "hidden" : undefined} exit={isDesktop ? "exit" : undefined} custom={0.33}>
                      <img src='https://api.deandivizio.com/wp-content/uploads/2024/04/justinPortrait-cropped.jpg ' alt='An stylized portrait of a man in his mid 20s' />
                    </motion.div>
                    <motion.div animate={isDesktop ? controls : undefined} variants={isDesktop ? variants : undefined} initial={isDesktop ? "hidden" : undefined} exit={isDesktop ? "exit" : undefined} custom={0.66}>
                      <img src='https://api.deandivizio.com/wp-content/uploads/2024/02/IMG_6596-Edit-Large.jpeg' alt='An filmic modern portrait of a woman in her early 20s' />
                    </motion.div>
                    <motion.div animate={isDesktop ? controls : undefined} variants={isDesktop ? variants : undefined} initial={isDesktop ? "hidden" : undefined} exit={isDesktop ? "exit" : undefined} custom={1}>
                      <img src='https://api.deandivizio.com/wp-content/uploads/2024/02/DSC03521-scaled.jpg' alt='An filmic professional portrait of a woman in her late 20s' />
                    </motion.div>
                  </Masonry>
                </div>}
              {isToggled3 &&
                <div className={styles.videoSection} style={{ opacity: isToggled3 ? '1' : '0', transform: isToggled3 ? 'scale(1)' : 'scale(0.9)' }}>
                  <iframe
                    src="https://www.youtube.com/embed/qfta1fxUI7Q?si=iCKkEaUoYEOXeUW4?vq=1080"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                  </iframe>
                </div>}
            </div>
          </div>
          <motion.h2 id="loveText" animate={skillsControls} variants={fromBottomVariants} initial="hidden" custom={0} >I <span style={loveStyle} className={styles.heroTextColor}><em>Love</em></span> Learning...</motion.h2> {/* words are separated out to allow the word "Love" to fade to a gradient */}
          <div className={styles.skillCardContainer} ref={skillsRef} >
            <motion.div animate={skillsControls} variants={fromBottomVariants} initial="hidden" custom={0}>
              <SkillCard content={card1Content} /> {/* SkillCard is a component that displays a column of text with a title and a list of skills */}
            </motion.div>
            <motion.div animate={skillsControls} variants={fromBottomVariants} initial="hidden" custom={0.33}>
              <SkillCard content={card2Content} />
            </motion.div>
            <motion.div animate={skillsControls} variants={fromBottomVariants} initial="hidden" custom={0.66}>
              <SkillCard content={card3Content} />
            </motion.div>
            <motion.div animate={skillsControls} variants={fromBottomVariants} initial="hidden" custom={1}>
              <SkillCard content={card4Content} />
            </motion.div>
          </div>
          <motion.p animate={skillsControls} variants={fromCenterVariants} initial="hidden" exit="exit" custom={2}>...and I'm always looking for new ways to grow.</motion.p>
        </div>
        <div className={styles.CTASection} ref={ctaRef}>
          <h4>I think I'd make a great addition to your team.</h4>
          <h2>Let's Chat!</h2>
          <div className={styles.CTAButton}>
            <a href="mailto:contact@deandivizio.com">contact@deandivizio.com</a>
          </div>
        </div>
      </div>
      <ParticleBG id="particles" /> {/* ParticleBG is a component that creates a particle background */}
    </div>
  );
}
