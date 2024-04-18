import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
   <div className={styles.pageContainer}>
    <div className={styles.pageContent}>
      <div className={styles.heroSection}> {/* I want some sort of animated abstract background. dark grey against the page's black. either particles like here, https://www.youtube.com/watch?v=F20SxgG5MlM or some sort of animation on a mask over a graphic */}
      <div className={styles.heroHeadingTextContainer}> {/* going to need this to be a flex row */}
        <div className={styles.heroTextWhite}>Hi!</div> <div className={styles.heroTextWhite}>I'm</div> <div className={styles.heroTextColor}>Dean</div> {/* background clip gradient on my name */}
        </div>
        <div className={styles.heroSubText}>I'm your new</div>
        {/* this is where i'd put something like 'I'm your new... */}
        <div className={styles.heroAccentText}>Designer, Develop....</div>
        {/* text that rotates vertically between, Designer (some font), Developer (some mono font), Creative (some scripty font) */}
        {/* https://www.youtube.com/watch?v=f0qX-lkk8Y8 */}
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
        {/* Subheading: I know I'd make a great addition to your team, but in case you're not convinced */}  
        {/* Heading: Let's Chat */}  
          {/* EMAIL  */}  
        </div>      
      </div>
    </div>
  );
}
