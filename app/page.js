import Image from "next/image";
import styles from "./page.module.css";
import ParticleBG from "./components/ParticleBG";
import CursorCanvas from "./components/CursorCanvas";

export default function Home() {
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
        {/* Heading: I've Worked On...  */}
          {/* Websites - Give 3 examples */}
          {/* Web Apps - Give 3 examples */}
        {/* Heading: I'm a toggle[Photo/Video] pro  */}
          {/* Small Image Gallery/Demo reel based on toggle  */}
        {/* Heading: And I've got some great skills in other areas*/}
        {/* Subheading: (even if they dont get their own sections*/}
          {/* Skills boxes */}
        </div>
      <div className={styles.CTASection}>
        <h4>I think I'd make a great addition to your team.</h4>
        <h2>Let's Chat</h2> 
        <div className={styles.CTAButton}>
        <a href="mailto:contact@deandivizio.com">contact@deandivizio.com</a>
        </div>
        </div>   
        
      </div>
      <CursorCanvas />   
    <ParticleBG id="particles"/>
    </div>
  );
}
