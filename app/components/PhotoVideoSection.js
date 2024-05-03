"use client";
import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from './photoVideoSection.module.css';

const breakpointColumnsObj = { // defines breakpoints for masonry layout. used to display images
    default: 4,
    1200: 2,
    768: 1,
};

const PhotoVideoSection = () => {
    // animation variables
    let delayFactor = 0.85;
    let startOffset = 0.1;
    
    // States used for toggling between photo and video sections. there are three because the event is split into multiple stages that need to animate in sequence
    const [isToggled1, setToggle1] = useState(false);
    const [isToggled2, setToggle2] = useState(false);
    const [isToggled3, setToggle3] = useState(false);
    
    const handleClick = () => { // function to handle the toggling of the sections. #1 just handles the button. #2 handles styles for the photo section. #3 handles the sytles for the video section and the conditional rendering
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
        }, 200);}
    };
    const controls = useAnimation(); // framer motion controls for the images

    const { ref, inView } = useInView({ // intersection observer for the images for initial animation
        triggerOnce: false,
        threshold: 0.4, 
    });
   
    const variants = { // animation states
        hidden: { opacity: 0, y: 200 },
        visible: index => ({
            opacity: 1,
            y: 0,
            transition: { duration: 1, delay: startOffset + index * delayFactor },
            ease: [0,0.65,0,1]
        }),
    };

    useEffect(() => {// animate the images when they come into view
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <div className={styles.container}>
            <div className={styles.headingSection}>
                <h2>I'm a</h2>
                <div className={styles.toggleContainer} onClick={handleClick}>
                    <div className={styles.label} style={{ color: isToggled1 ? '#000000' : '#0073ff', fontWeight: isToggled1 ? '200' : '200', opacity: isToggled1 ? '0.65' : '1' }}>Photo</div>
                    <div className={`${styles.toggleButton} ${isToggled1 ? styles.active : ''}`}></div>
                    <div className={styles.label} style={{ color: isToggled1 ? '#0073ff' : '#000000', fontWeight: isToggled1 ? '200' : '200', opacity: isToggled1 ? '1' : '0.65' }}>Video</div>
                </div>
                <h2>Pro</h2>
            </div>
            <div className={styles.mediaContainer}>
                {!isToggled3 &&
                <div className={styles.photoSection} style={{ opacity: isToggled2 ? '0' : '1', transform: isToggled2 ? 'scale(0.9)' : 'scale(1)' }}>
                    <Masonry breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                         <motion.div ref={ref} animate={controls} variants={variants} initial="hidden" exit="exit" custom={0}>
                        <img src='https://api.deandivizio.com/wp-content/uploads/2024/02/IMG_6876-Large.jpeg' alt='An filmic modern portrait of a man in his late 20s' />
                        </motion.div>  
                        <motion.div animate={controls} variants={variants} initial="hidden" exit="exit" custom={0.33}> 
                        <img src='https://api.deandivizio.com/wp-content/uploads/2024/04/justinPortrait-cropped.jpg ' alt='An stylized portrait of a man in his mid 20s' />
                        </motion.div>
                        <motion.div animate={controls} variants={variants} initial="hidden" exit="exit" custom={0.66}>
                        <img src='https://api.deandivizio.com/wp-content/uploads/2024/02/IMG_6596-Edit-Large.jpeg' alt='An filmic modern portrait of a woman in her early 20s' />
                        </motion.div>
                        <motion.div animate={controls} variants={variants} initial="hidden" exit="exit" custom={1}>
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
    );
}

export default PhotoVideoSection;