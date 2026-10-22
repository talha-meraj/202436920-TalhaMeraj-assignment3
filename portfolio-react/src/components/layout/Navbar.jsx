import { useState, useEffect } from 'react';
import { FaSun, FaMoon, FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa6';
import styles from './Navbar.module.css';

const NAV_ITEMS = [
    { id: 'about', label: 'About Me' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
];

/* Section IDs used to detect active section on scroll */
const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

/* Generates Greeting based on time of day */
function getGreeting() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning!';
    if (hour >= 12 && hour < 17) return 'Good Afternoon!';
    if (hour >= 17 && hour < 23) return 'Good Evening!';
    return 'Still up?';
}

export default function Navbar({ theme, toggleTheme }) {
    // Lazy initializer: runs once on mount
    const [greeting] = useState(getGreeting);
    const [activeSection, setActiveSection] = useState('about');

    // Automatically highlight active section tab during scrolling
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 140; // Offset for sticky navbar

            // When reaching the bottom of the page, make sure Contact is highlighted
            const isAtBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70;
            if (isAtBottom) {
                setActiveSection('contact');
                return;
            }

            // Iterate backwards to find section to highlight
            for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
                const el = document.getElementById(SECTION_IDS[i]);
                if (el) {
                    const top = el.offsetTop;
                    if (scrollPosition >= top) {
                        setActiveSection(SECTION_IDS[i]);
                        break;
                    }
                }
            }
        };

        // Attach event listener for scroll events, {passive: true} improves performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll with offset for sticky header
    const handleNavClick = (e, id) => {
        e.preventDefault();
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const navOffset = 58;
            const top = element.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    };

    return (
        <nav className={styles.navTabContainer}>
            <div className={styles.navBar}>
                {/* Navigation Links */}
                <ul className={styles.navLinks}>
                    {NAV_ITEMS.map((item) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={`${styles.navItem} ${activeSection === item.id ? styles.active : ''}`}
                                onClick={(e) => handleNavClick(e, item.id)}
                                aria-current={activeSection === item.id ? 'page' : undefined}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right-side controls: greeting, theme toggle, and social links */}
                <div className={styles.navSocials}>
                    {/* Time-based greeting badge */}
                    <span className={styles.greetingBadge} id="timeGreeting">{greeting}</span>

                    {/* Dark/Light mode toggle button */}
                    <button
                        type="button"
                        className={styles.themeToggleBtn}
                        id="themeToggle"
                        onClick={toggleTheme}
                        aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
                    </button>

                    {/* External profile and contact links */}
                    <a
                        href="https://www.linkedin.com/in/talha-meraj"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn Profile"
                        aria-label="LinkedIn Profile"
                    >
                        <FaLinkedinIn aria-hidden="true" />
                    </a>
                    <a
                        href="https://github.com/merajtalha"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub Profile"
                        aria-label="GitHub Profile"
                    >
                        <FaGithub aria-hidden="true" />
                    </a>
                    <a
                        href="mailto:m.talhameraj@gmail.com"
                        title="Direct Email"
                        aria-label="Direct Email"
                    >
                        <FaEnvelope aria-hidden="true" />
                    </a>
                </div>
            </div>
        </nav>
    );
}
