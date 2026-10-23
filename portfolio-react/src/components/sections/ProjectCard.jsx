import { FaBookOpen, FaLayerGroup, FaGithub } from 'react-icons/fa6';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, onOpen }) {
    // Open details modal when card is clicked (unless the user clicked the GitHub icon)
    const handleCardClick = (e) => {
        if (!e.target.closest(`.${styles.coverGithubBtn}`)) {
            onOpen(project);
        }
    };

    // Keyboard accessibility: open modal if user presses Enter or Space while card is focused
    const handleKeyDown = (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest(`.${styles.coverGithubBtn}`)) {
            e.preventDefault(); // Prevents page from scrolling down when pressing Space
            onOpen(project);
        }
    };

    return (
        <article className={styles.projectBookWrapper} data-book-id={project.id}>
            <div
                className={styles.book3dCard}
                tabIndex={0}
                role="button"
                aria-label={`Open ${project.title} details`}
                onClick={handleCardClick}
                onKeyDown={handleKeyDown}
            >
                {/* Layer 1: Back Cover (underneath the pages) */}
                <div className={`${styles.bookBackCover} ${styles[project.theme] || ''}`}></div>

                {/* Layer 2: 3D Stack of Pages (gives depth to the book) */}
                <div className={styles.bookPagesStack}>
                    <div className={styles.pagesRightEdge}></div>
                </div>

                {/* Layer 3: Front Hardcover (swings open to the left on hover) */}
                <div className={`${styles.bookCover} ${styles[project.theme] || ''}`}>
                    {/* Vertical spine ribbon with date */}
                    <div className={styles.coverSpineStrip}>
                        <span className={styles.spineStripDate}>{project.date}</span>
                        <div className={styles.spineCreaseShadow}></div>
                    </div>

                    {/* Book front face content */}
                    <div className={styles.coverBody}>
                        {/* Project thumbnail image */}
                        <div className={styles.coverPictureFrame}>
                            <img
                                src={project.image}
                                alt={project.imageAlt || project.title}
                                className={styles.coverPictureImg}
                                loading="lazy"
                            />
                            {/* Hover hint cue */}
                            <div className={styles.coverHoverHint} aria-hidden="true">
                                <span className={styles.hoverHintText}>
                                    <FaBookOpen aria-hidden="true" /> Click for details
                                </span>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className={styles.coverTitle}>{project.title}</h3>

                        {/* Bottom Info Row */}
                        <div className={styles.coverBottomRow}>
                            <div className={styles.coverChipsGroup}>
                                <span className={styles.coverChipsLabel}>
                                    <FaLayerGroup aria-hidden="true" /> Core Tech:
                                </span>
                                <div className={styles.coverChips}>
                                    {project.chips.slice(0, 3).map((chip, idx) => (
                                        <span key={idx} className={styles.techChip}>
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* GitHub Link */}
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.coverGithubBtn}
                                title={`Open ${project.title} on GitHub`}
                                aria-label={`Open ${project.title} source code on GitHub`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <FaGithub aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
