import { useState, useEffect, useCallback, useRef } from 'react';
import { FaXmark, FaGithub } from 'react-icons/fa6';
import styles from './ProjectModal.module.css';

export default function ProjectModal({ project, onClose }) {
    // Track if modal is currently playing its closing animation
    const [isClosing, setIsClosing] = useState(false);
    // Ref prevents triggering the close function multiple times while animation plays
    const closingRef = useRef(false);

    // Trigger exit animation, then call parent onClose after 220ms (matches CSS animation)
    const handleClose = useCallback(() => {
        if (closingRef.current) return;
        closingRef.current = true;
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 220);
    }, [onClose]);

    useEffect(() => {
        if (!project) return;

        // Reset closing states whenever a new project is loaded
        setIsClosing(false);
        closingRef.current = false;

        // Close modal when user presses the Escape key
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        // Lock page scrolling while modal is open so background doesn't scroll
        const originalOverflow = document.body.style.overflow;  /*store original behaviour*/
        document.body.style.overflow = 'hidden';    /*disables scroll for the main webpage when modal is open*/
        window.addEventListener('keydown', handleKeyDown);

        // Restore page scroll and clean up keydown listener on close
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [project, handleClose]);

    // Don't render anything if no project is selected
    if (!project) return null;

    return (
        <div
            className={`${styles.simpleModalBackdrop} ${isClosing ? styles.isClosing : ''}`}
            onClick={handleClose}
            /*Accessibility attributes */
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalProjectTitle"
        >
            <div
                className={`${styles.simpleModalCard} ${isClosing ? styles.isClosing : ''}`}
                onClick={(e) => e.stopPropagation()} // Clicking inside card should not close modal
            >
                {/* Close Button */}
                <button
                    type="button"
                    className={styles.simpleModalClose}
                    onClick={handleClose}
                    aria-label="Close project modal"
                >
                    <FaXmark aria-hidden="true" />
                </button>

                {/* Project Image Banner */}
                {project.image && (
                    <div className={styles.simpleModalImageWrap}>
                        <img
                            src={project.image}
                            alt={project.imageAlt || project.title}
                            className={styles.simpleModalImage}
                        />
                    </div>
                )}

                {/* Title & Right-Aligned Date */}
                <div className={styles.simpleModalHeader}>
                    <div className={styles.simpleModalTitleRow}>
                        <h2 id="modalProjectTitle" className={styles.simpleModalTitle}>
                            {project.title}
                        </h2>
                        <span className={styles.simpleModalDate}>{project.date}</span>
                    </div>
                </div>

                {/* Description & Key Topics */}
                <div className={styles.simpleModalBody}>
                    <p className={styles.simpleModalDesc}>{project.desc}</p>

                    <div className={styles.simpleModalTechSection}>
                        <h4 className={styles.simpleModalTechTitle}>Key topics</h4>
                        <div className={styles.simpleModalTags}>
                            {project.tags.map((tag) => (
                                <span key={tag} className={styles.simpleModalChip}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.simpleModalFooter}>
                    <a
                        href={project.githubUrl || project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.simpleModalBtn} ${styles.primary}`}
                    >
                        <FaGithub aria-hidden="true" /> View on GitHub
                    </a>
                </div>
            </div>
        </div>
    );
}
