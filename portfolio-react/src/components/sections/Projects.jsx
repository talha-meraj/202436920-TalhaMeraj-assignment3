import { useState, useMemo, useEffect } from 'react';
import {
    FaLaptopCode,
    FaArrowDownWideShort,
    FaStar,
    FaFont,
    FaCalendarDays,
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
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

// Available sort buttons configuration using react-icons
const SORT_CONFIG = [
    { field: 'featured', label: 'Featured', icon: FaStar },
    { field: 'title', label: 'Title', icon: FaFont },
    { field: 'date', label: 'Date', icon: FaCalendarDays }
];

// Helper to determine how many cards fit in one row based on window width
function getInitialItemsPerRow() {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 640) return 1;  // Mobile: 1 card per row
    if (window.innerWidth <= 960) return 2;  // Tablet: 2 cards per row
    return 3;                                // Desktop: 3 cards per row
}

export default function Projects() {
    // Sort state: which field and ascending/descending
    const [sortField, setSortField] = useState('featured');
    const [sortDirection, setSortDirection] = useState('desc');

    // Search query text input
    const [searchQuery, setSearchQuery] = useState('');

    // Show more / show less toggle
    const [isExpanded, setIsExpanded] = useState(false);

    // Holds currently selected project for modal popup
    const [selectedProject, setSelectedProject] = useState(null);

    // Number of items per row (responsive)
    const [itemsPerRow, setItemsPerRow] = useState(getInitialItemsPerRow);

    // Keep itemsPerRow updated when user resizes the browser window
    useEffect(() => {
        const updateItemsPerRow = () => setItemsPerRow(getInitialItemsPerRow());
        window.addEventListener('resize', updateItemsPerRow);
        return () => window.removeEventListener('resize', updateItemsPerRow);
    }, []);

    // Filter & Sort Pipeline: re-calculates only when search or sort options change
    const sortedProjects = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        // 1. Filter: Match search text across title, description, category, and tags
        const filtered = PROJECTS_DATA.filter((project) => {
            if (!q) return true; // Show all if search box is empty
            return (
                project.title.toLowerCase().includes(q) ||
                project.desc.toLowerCase().includes(q) ||
                project.categoryLabel.toLowerCase().includes(q) ||
                project.tags.some((tag) => tag.toLowerCase().includes(q))
            );
        });

        // 2. Sort: Order the filtered results by the selected field and direction
        return filtered.sort((a, b) => {
            let diff = 0;
            if (sortField === 'title') {
                diff = a.title.localeCompare(b.title);
            } else if (sortField === 'date') {
                diff = new Date(a.date) - new Date(b.date);
            } else {
                // 'featured': featured items first, then tiebreak by date
                const aFeatured = a.featured ? 1 : 0;
                const bFeatured = b.featured ? 1 : 0;
                diff = (a.featured || 0) - (b.featured || 0) || new Date('1 ' + a.date) - new Date('1 ' + b.date);
            }
            return sortDirection === 'asc' ? diff : -diff;
        });
    }, [searchQuery, sortField, sortDirection]);

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
            // When collapsing, scroll smoothly back up to the top of the projects section
            const projectsEl = document.getElementById('projects');
            if (projectsEl) {
                const navOffset = 64; // Height of sticky navbar
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
        // If actively searching or expanded, display all matching projects
        if (isSearching || isExpanded) {
            return sortedProjects;
        }
        // Otherwise, collapse and show only one row
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

            {/* Empty Search Feedback State (shown when no projects match the query) */}
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

            {/* 3D Book Cards Grid: maps over sorted/filtered projects */}
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

            {/* Show More / Show Less Controls (only shown if cards exceed one row and not searching) */}
            {hasHiddenProjects && (
                <div className={styles.projectsBottomSection}>
                    {/* Subtle item counter */}
                    <div className={styles.projectsCountSubtle}>
                        Showing <span className={styles.countNumber}>{displayedProjects.length}</span> of{' '}
                        <span className={styles.countNumber}>{sortedProjects.length}</span> projects
                    </div>
                    {/* Expand/Collapse Toggle Button */}
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

            {/* Project Details Modal (opens when a book card is clicked) */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}
