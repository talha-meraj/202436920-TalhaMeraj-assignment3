import { FaUser, FaLocationDot, FaGraduationCap, FaLaptopCode } from 'react-icons/fa6';
import styles from './About.module.css';

export default function About() {
    return (
        <section id="about" className="portfolio-section">
            <div className="section-header">
                <h2 className="section-title">
                    <FaUser aria-hidden="true" /> About Me
                </h2>
            </div>

            <div className={styles.aboutGrid}>
                {/* Profile Portrait Card */}
                <div className={styles.profilePortraitWrap}>
                    <img
                        src="/assets/images/steveplaceholder.jpg"
                        alt="Portrait photo of steve as a placeholder"
                        width="320"
                        height="420"
                        className={styles.profilePortraitImg}
                    />
                    <p className={styles.pfpNote}>*placeholder pfp (steve from minecraft) :)</p>
                </div>

                {/* Introduction & Highlights */}
                <div className={styles.aboutContent}>
                    <h3 className={styles.aboutHeadline}>Hello &amp; Welcome!</h3>
                    <p className={styles.aboutIntro}>
                        I am an undergrad computer science student at <strong>King Fahd University of Petroleum and
                            Minerals (KFUPM)</strong>.
                        I have a passion for computer architecture, autonomous robotics, and embedded software
                        systems.
                    </p>
                    <p className={styles.aboutIntro}>
                        I aim to bridge the gap between high level algorithms and low level hardware implementation
                        to build robust, efficient, and innovative solutions that solve real world problems.
                    </p>

                    {/* Quick Highlights List */}
                    <ul className={styles.aboutBulletList}>
                        <li>
                            <span className={styles.listIcon}><FaLocationDot aria-hidden="true" /></span>
                            <span><strong>Location:</strong> Dhahran, Eastern Province, KSA</span>
                        </li>
                        <li>
                            <span className={styles.listIcon}><FaGraduationCap aria-hidden="true" /></span>
                            <span><strong>Education: </strong>B.S. in Computer Science at KFUPM (Expected Grad 2028)</span>
                        </li>
                        <li>
                            <span className={styles.listIcon}><FaLaptopCode aria-hidden="true" /></span>
                            <span><strong>Core Focus:</strong> Computer Systems, Artificial Intelligence, Python, Autonomous Systems</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
