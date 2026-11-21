import { useState, useMemo, useEffect } from 'react';
import {
    FaLaptopCode,
    FaArrowDownWideShort,
    FaStar,
    FaFont,
    FaCalendarDays,
    FaClockRotateLeft,
    FaCircleInfo,
    FaArrowDown,
    FaArrowUp,
    FaSort,
    FaMagnifyingGlass,
    FaXmark,
    FaMagnifyingGlassMinus,
    FaRotateLeft,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa6';
import { PROJECTS_DATA } from '../../data/projectsData';
import { fetchGitHubRepos, extractRepoName } from '../../services/githubService';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import SortInfoModal from './SortInfoModal';
import styles from './Projects.module.css';

// Available sort buttons configuration using react-icons
const SORT_CONFIG = [
    { field: 'featured', label: 'Featured', icon: FaStar },
    { field: 'title', label: 'Title', icon: FaFont },
    { field: 'date', label: 'Date', icon: FaCalendarDays },
    { field: 'updated', label: 'Updated', icon: FaClockRotateLeft }
];

// Helper to determine how many cards fit in one row based on window width
function getInitialItemsPerRow() {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 640) return 1;  // Mobile: 1 card per row
    if (window.innerWidth <= 960) return 2;  // Tablet: 2 cards per row
    return 3;                                // Desktop: 3 cards per row
}

export default function Projects() {
    // 1. Sort state persisted in localStorage
    const [sortField, setSortField] = useState(() => {
        return localStorage.getItem('portfolio-sort-field-v1') || 'featured';
    });
    const [sortDirection, setSortDirection] = useState(() => {
        return localStorage.getItem('portfolio-sort-dir-v1') || 'desc';
    });

    // 2. Search query text input
    const [searchQuery, setSearchQuery] = useState('');

    // 3. Show more / show less toggle
    const [isExpanded, setIsExpanded] = useState(false);

    // 4. Modal states
    const [selectedProject, setSelectedProject] = useState(null);
    const [isSortInfoOpen, setIsSortInfoOpen] = useState(false);

    // 5. GitHub Live API data state
    const [gitHubData, setGitHubData] = useState({
        reposMap: {},
        status: 'loading',
        lastFetched: null,
        error: null
    });

    // 6. Number of items per row (responsive)
    const [itemsPerRow, setItemsPerRow] = useState(getInitialItemsPerRow);

    // Sync sort settings to localStorage
    useEffect(() => {
        localStorage.setItem('portfolio-sort-field-v1', sortField);
        localStorage.setItem('portfolio-sort-dir-v1', sortDirection);
    }, [sortField, sortDirection]);

    // Fetch live GitHub repository data on load
    useEffect(() => {
        let isMounted = true;
        fetchGitHubRepos().then((result) => {
            if (isMounted && result) {
                setGitHubData(result);
            }
        }).catch((err) => {
            console.warn('Could not load GitHub data:', err);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    // Keep itemsPerRow updated when user resizes the browser window
    useEffect(() => {
        const updateItemsPerRow = () => setItemsPerRow(getInitialItemsPerRow());
        window.addEventListener('resize', updateItemsPerRow);
        return () => window.removeEventListener('resize', updateItemsPerRow);
    }, []);

    // Filter & Sort Pipeline: re-calculates only when search, sort, or gitHubData changes
    const sortedProjects = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        // 1. Filter: Match search text across title, description, category, and tags
        const filtered = PROJECTS_DATA.filter((project) => {
            if (!q) return true;
            return (
                project.title.toLowerCase().includes(q) ||
                project.desc.toLowerCase().includes(q) ||
                project.categoryLabel.toLowerCase().includes(q) ||
                project.tags.some((tag) => tag.toLowerCase().includes(q))
            );
        });

        // 2. Sort: Order the filtered results by the selected field and direction
        return filtered.sort((a, b) => {
            let diff;
            if (sortField === 'title') {
                diff = a.title.localeCompare(b.title);
            } else if (sortField === 'date') {
                // Reliable cross-browser date parsing via ISO strings (YYYY-MM-DD)
                diff = new Date(a.isoDate || a.date) - new Date(b.isoDate || b.date);
            } else if (sortField === 'updated') {
                // Dynamic sort by live GitHub pushed_at timestamp (or fallback to release date)
                const aRepo = gitHubData.reposMap[extractRepoName(a.repoUrl)];
                const bRepo = gitHubData.reposMap[extractRepoName(b.repoUrl)];
                const aTime = aRepo?.pushedAt
                    ? new Date(aRepo.pushedAt).getTime()
                    : new Date(a.isoDate || a.date).getTime();
                const bTime = bRepo?.pushedAt
                    ? new Date(bRepo.pushedAt).getTime()
                    : new Date(b.isoDate || b.date).getTime();
                diff = aTime - bTime;
            } else {
                // 'featured': numeric priority score, tiebreak with date
                diff = (a.featured || 0) - (b.featured || 0) ||
                    (new Date(a.isoDate || a.date) - new Date(b.isoDate || b.date));
            }
            return sortDirection === 'asc' ? diff : -diff;
        });
    }, [searchQuery, sortField, sortDirection, gitHubData]);

    // Handle sort button click: toggle direction if already active, or switch field
    const handleSortClick = (field) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('desc'); // Default to descending when picking a new field
        }
    };

    // Handle search input typing
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Reset search query
    const handleClearSearch = () => {
        setSearchQuery('');
    };

    // Handle show more / show less toggle
    const handleToggleExpand = () => {
        if (isExpanded) {
            const projectsEl = document.getElementById('projects');
            if (projectsEl) {
                const navOffset = 64;
                const targetY = projectsEl.getBoundingClientRect().top + window.scrollY - navOffset;
                window.scrollTo({ top: targetY, behavior: 'smooth' });
            }
            setIsExpanded(false);
        } else {
            setIsExpanded(true);
        }
    };

    // Determine how many projects to display
    const isSearching = searchQuery.trim().length > 0;
    const displayedProjects = useMemo(() => {
        if (isSearching || isExpanded) {
            return sortedProjects;
        }
        return sortedProjects.slice(0, itemsPerRow);
    }, [sortedProjects, isExpanded, itemsPerRow, isSearching]);

    // Whether there are more projects hidden under the "Show More" fold
    const hasHiddenProjects = !isSearching && sortedProjects.length > itemsPerRow;

    return (
        <section id="projects" className="portfolio-section">
            <div className="section-header">
                <h2 className="section-title">
                    <FaLaptopCode aria-hidden="true" /> My Projects
                </h2>
                <p className="section-subtitle">
                    Selected projects highlighting hardware design, autonomous systems, artificial intelligence, computer architecture and more.
                </p>
            </div>

            {/* Interactive Controls Toolbar */}
            <div className={styles.projectControls}>
                <div className={styles.sortGroup} role="region" aria-label="Sort projects">
                    <span className={styles.sortGroupLabel}>
                        <FaArrowDownWideShort aria-hidden="true" /> Sort:
                    </span>

                    {SORT_CONFIG.map(({ field, label, icon: IconComponent }) => {
                        const isActive = sortField === field;
                        return (
                            <button
                                key={field}
                                type="button"
                                className={`${styles.sortPill} ${isActive ? styles.active : ''}`}
                                onClick={() => handleSortClick(field)}
                                aria-label={`Sort by ${label} (${isActive && sortDirection === 'desc' ? 'Highest first' : 'Lowest first'})`}
                                title={`Sort by ${label} (${isActive && sortDirection === 'desc' ? 'Highest first' : 'Lowest first'})`}
                            >
                                <span className={styles.sortPillIcon}><IconComponent aria-hidden="true" /></span>
                                <span>{label}</span>
                                <span className={styles.sortDirectionIndicator}>
                                    {isActive ? (
                                        sortDirection === 'desc' ? <FaArrowDown aria-hidden="true" /> : <FaArrowUp aria-hidden="true" />
                                    ) : (
                                        <FaSort aria-hidden="true" />
                                    )}
                                </span>
                            </button>
                        );
                    })}

                    {/* Borderless Sort Info Guide Button */}
                    <button
                        type="button"
                        className={styles.btnSortInfo}
                        onClick={() => setIsSortInfoOpen(true)}
                        aria-label="View explanation for sorting criteria"
                        title="How sorting works"
                    >
                        <FaCircleInfo aria-hidden="true" />
                    </button>
                </div>

                {/* Real-Time Search Box */}
                <div className={styles.searchBoxWrap}>
                    <span className={styles.searchIcon}><FaMagnifyingGlass aria-hidden="true" /></span>
                    <input
                        type="text"
                        id="projectSearch"
                        className={styles.searchInput}
                        placeholder="Search projects..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        aria-label="Search projects by keyword"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            id="clearSearchBtn"
                            className={styles.clearSearchBtn}
                            onClick={handleClearSearch}
                            aria-label="Clear search query"
                            title="Clear search"
                        >
                            <FaXmark aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>

            {/* Empty Search Feedback State */}
            {sortedProjects.length === 0 && (
                <div id="noProjectsMessage" className={styles.emptyStateCard} role="status">
                    <span className={styles.emptyStateIcon}><FaMagnifyingGlassMinus aria-hidden="true" /></span>
                    <h3 className={styles.emptyStateTitle}>No matching projects found</h3>
                    <p className={styles.emptyStateText}>
                        No projects match "{searchQuery}". Try modifying your keyword or clearing the search.
                    </p>
                    <button type="button" className={styles.btnClearSearch} onClick={handleClearSearch}>
                        <FaRotateLeft aria-hidden="true" /> Clear Search
                    </button>
                </div>
            )}

            {/* 3D Book Cards Grid */}
            {displayedProjects.length > 0 && (
                <div className={styles.projectsGrid} id="projectsContainer">
                    {displayedProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onOpen={setSelectedProject}
                        />
                    ))}
                </div>
            )}

            {/* Show More / Show Less Controls */}
            {hasHiddenProjects && (
                <div className={styles.projectsBottomSection}>
                    <div className={styles.projectsCountSubtle}>
                        Showing <span className={styles.countNumber}>{displayedProjects.length}</span> of{' '}
                        <span className={styles.countNumber}>{sortedProjects.length}</span> projects
                    </div>
                    <div className={styles.expandProjectsContainer}>
                        <button
                            id="expandProjectsBtn"
                            className={styles.btnExpandProjects}
                            onClick={handleToggleExpand}
                            aria-expanded={isExpanded}
                        >
                            <span>{isExpanded ? 'Show Less' : 'Show More Projects'}</span>
                            {isExpanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
                        </button>
                    </div>
                </div>
            )}

            {/* Project Details Modal with Live GitHub Stats & Language Chart */}
            {selectedProject && (
                <ProjectModal
                    key={selectedProject.id}
                    project={selectedProject}
                    gitHubReposMap={gitHubData.reposMap}
                    gitHubStatus={gitHubData.status}
                    gitHubError={gitHubData.error}
                    onClose={() => setSelectedProject(null)}
                />
            )}

            {/* Sort Information Guide Modal */}
            <SortInfoModal
                isOpen={isSortInfoOpen}
                onClose={() => setIsSortInfoOpen(false)}
            />
        </section>
    );
}