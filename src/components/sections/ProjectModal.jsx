import { useState, useEffect, useCallback, useRef } from 'react';
import {
    FaXmark,
    FaGithub,
    FaStar,
    FaCodeFork,
    FaClock,
    FaCode,
    FaTriangleExclamation
} from 'react-icons/fa6';
import { extractRepoName, fetchRepoLanguages } from '../../services/githubService';
import LanguageBarChart from '../common/LanguageBarChart';
import styles from './ProjectModal.module.css';

export default function ProjectModal({
    project,
    gitHubReposMap = {},
    gitHubStatus = 'idle',
    gitHubError = null,
    onClose
}) {
    // Track if modal is currently playing its closing animation
    const [isClosing, setIsClosing] = useState(false);
    // Ref prevents triggering the close function multiple times while animation plays
    const closingRef = useRef(false);

    // Language breakdown state
    const [languages, setLanguages] = useState([]);
    const [isLoadingLanguages, setIsLoadingLanguages] = useState(true);

    // Trigger exit animation, then call parent onClose after 220ms
    const handleClose = useCallback(() => {
        if (closingRef.current) return;
        closingRef.current = true;
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 220);
    }, [onClose]);

    // Extract repo details for this project
    const repoName = project ? extractRepoName(project.repoUrl) : null;
    const hasRepo = Boolean(project?.repoUrl || project?.githubUrl);
    const repoStats = repoName && gitHubReposMap ? gitHubReposMap[repoName] : null;

    useEffect(() => {
        if (!project) return;

        // Close modal when user presses Escape
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                handleClose();
            }
        };

        // Lock page scrolling while modal is open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);

        // Fetch detailed languages breakdown if a repository exists
        let isSubscribed = true;

        if (repoStats) {
            const primaryLang = repoStats.primaryLanguage || (project.chips && project.chips[0]);
            fetchRepoLanguages(repoName, primaryLang)
                .then((data) => {
                    if (isSubscribed) {
                        setLanguages(data || []);
                        setIsLoadingLanguages(false);
                    }
                })
                .catch(() => {
                    if (isSubscribed) {
                        setLanguages([]);
                        setIsLoadingLanguages(false);
                    }
                });
        }

        return () => {
            isSubscribed = false;
            document.body.style.overflow = originalOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [project, repoName, repoStats, handleClose]);

    if (!project) return null;

    // Format GitHub pushed date
    const formattedPushedDate = repoStats?.pushedAt
        ? new Date(repoStats.pushedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
        : null;

    return (
        <div
            className={`${styles.simpleModalBackdrop} ${isClosing ? styles.isClosing : ''}`}
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalProjectTitle"
        >
            <div
                className={`${styles.simpleModalWrapper} ${isClosing ? styles.isClosing : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button on top, outside the scrollable card */}
                <button
                    type="button"
                    className={styles.simpleModalClose}
                    onClick={handleClose}
                    aria-label="Close project modal"
                >
                    <FaXmark aria-hidden="true" />
                </button>

                {/* Scrollable Modal Card */}
                <div className={styles.simpleModalCard}>
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

                    {/* Description & Topics */}
                    <div className={styles.simpleModalBody}>
                        <p className={styles.simpleModalDesc}>{project.desc}</p>

                        <div className={styles.simpleModalTechSection}>
                            <h4 className={styles.simpleModalTechTitle}>Key Topics</h4>
                            <div className={styles.simpleModalTags}>
                                {project.tags.map((tag) => (
                                    <span key={tag} className={styles.simpleModalChip}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Live GitHub Repository Stats Section */}
                        {hasRepo && (
                            <div className={styles.githubStatsSection}>
                                <div className={styles.githubSectionHeader}>
                                    <div className={styles.githubSectionTitle}>
                                        <FaGithub aria-hidden="true" />
                                        <span>GitHub Repository Stats</span>
                                    </div>
                                    {formattedPushedDate && repoStats && (
                                        <span className={styles.githubLastUpdated}>
                                            Updated {formattedPushedDate}
                                        </span>
                                    )}
                                </div>

                                {repoStats ? (
                                    <>
                                        {/* Stats Metrics Row */}
                                        <div className={styles.githubMetricsGrid}>
                                            <div className={styles.metricCard}>
                                                <div className={styles.metricIconWrap}>
                                                    <FaStar className={styles.starIcon} aria-hidden="true" />
                                                </div>
                                                <div className={styles.metricTextWrap}>
                                                    <span className={styles.metricValue}>{repoStats.stars}</span>
                                                    <span className={styles.metricLabel}>Stars</span>
                                                </div>
                                            </div>

                                            <div className={styles.metricCard}>
                                                <div className={styles.metricIconWrap}>
                                                    <FaCodeFork className={styles.forkIcon} aria-hidden="true" />
                                                </div>
                                                <div className={styles.metricTextWrap}>
                                                    <span className={styles.metricValue}>{repoStats.forks}</span>
                                                    <span className={styles.metricLabel}>Forks</span>
                                                </div>
                                            </div>

                                            <div className={styles.metricCard}>
                                                <div className={styles.metricIconWrap}>
                                                    <FaClock className={styles.clockIcon} aria-hidden="true" />
                                                </div>
                                                <div className={styles.metricTextWrap}>
                                                    <span className={styles.metricValue}>{formattedPushedDate || 'Recent'}</span>
                                                    <span className={styles.metricLabel}>Last Push</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Codebase Language Breakdown (Horizontal Bar Chart) */}
                                        <div className={styles.languageBreakdownBlock}>
                                            <div className={styles.languageHeader}>
                                                <FaCode className={styles.langIcon} aria-hidden="true" />
                                                <span className={styles.languageTitle}>Codebase Composition</span>
                                            </div>
                                            <LanguageBarChart
                                                languages={languages}
                                                isLoading={isLoadingLanguages}
                                            />
                                        </div>
                                    </>
                                ) : gitHubStatus === 'loading' ? (
                                    <div className={styles.githubStatusNotice} role="status">
                                        <span className={styles.githubSpinner} aria-hidden="true" />
                                        <span>Connecting to GitHub API...</span>
                                    </div>
                                ) : (
                                    <div className={styles.githubErrorNotice} role="status">
                                        <FaTriangleExclamation className={styles.githubErrorIcon} aria-hidden="true" />
                                        <div className={styles.githubErrorText}>
                                            <strong>The GitHub API cannot be reached at the moment. Please check your Internet Connection.</strong>
                                            <span>
                                                {gitHubError || 'Live repository metrics and codebase composition are temporarily unavailable. You can still view the project directly on GitHub below.'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.simpleModalFooter}>
                        <a
                            href={project.repoUrl || project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.simpleModalBtn} ${styles.primary}`}
                        >
                            <FaGithub aria-hidden="true" /> View on GitHub
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}