# Technical Documentation: React Architecture & Component Engineering

**Author:** Talha Meraj  
**Student ID:** 202436920  
**Technology Stack:** React 19, Vite, CSS Modules, GitHub REST API v3  

---

## 1. Architectural Overview & System Design

The application is engineered as a modular, component-driven Single-Page Application (SPA) built with **React 19** and bundled with **Vite**. The primary architectural objective is delivering a high-performance, accessible, and responsive personal portfolio without relying on heavy third-party UI component libraries or CSS frameworks.

### Separation of Concerns
1. **Entry & Root:** `index.html` defines the semantic shell; `main.jsx` initializes React in Strict Mode; `App.jsx` orchestrates global theme state, local storage synchronization, and top-level layout composition.
2. **Layout Components (`src/components/layout/`):** Fixed structural wrappers including the identity hero banner, sticky navigation bar with time-aware greeting, and page footer.
3. **Section Components (`src/components/sections/`):** Autonomous sections (About, Projects, ProjectCard, ProjectModal, SortInfoModal, and Contact).
4. **Common UI Components (`src/components/common/`):** Shared visual components such as `LanguageBarChart.jsx` for codebase composition visualizations.
5. **Data & Service Layer (`src/data/` & `src/services/`):** 
   - `projectsData.js` supplies structured metadata and fallback values decoupled from rendering logic.
   - `githubService.js` manages asynchronous communication with the GitHub REST API, implementing two-tier caching and language color mappings.
6. **Style Architecture (`*.module.css`):** Scoped CSS Modules for component styling combined with global design tokens declared via CSS custom properties in `index.css`.

---

## 2. Directory Structure

```text
202436920-TalhaMeraj-assignment2/
├── docs/
│   ├── ai-usage-report.md          # AI workflow logs, prompts, and verification record
│   └── technical-documentation.md    # System architecture, API design, and performance audits
├── public/
│   ├── robots.txt                  # Search crawler policy
│   └── assets/
│       └── images/                 # Next-gen WebP diagrams, photos, and UI assets
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── LanguageBarChart.jsx        # Horizontal segmented language progress bar
│   │   │   └── LanguageBarChart.module.css
│   │   ├── layout/
│   │   │   ├── Hero.jsx                    # Header hero banner
│   │   │   ├── Navbar.jsx                  # Sticky navigation, greeting, and theme toggle
│   │   │   └── Footer.jsx                  # Page footer
│   │   └── sections/
│   │       ├── About.jsx                   # Biography, academic profile, and portrait card
│   │       ├── Projects.jsx                # Gallery, search filter, 4-way sort, and grid
│   │       ├── ProjectCard.jsx             # Interactive 3D hardcover book card
│   │       ├── ProjectModal.jsx            # Detailed modal with live GitHub repository stats
│   │       ├── SortInfoModal.jsx           # Accessible sort criteria explanation modal
│   │       └── Contact.jsx                 # Validated form with draft auto-save
│   ├── data/
│   │   └── projectsData.js                 # Centralized project dataset with ISO 8601 dates
│   ├── services/
│   │   └── githubService.js                # GitHub API client, two-tier cache, and palettes
│   ├── App.jsx                             # Root component with theme state and sync
│   ├── index.css                           # Global design tokens, resets, and typography
│   └── main.jsx                            # React root mount point
├── index.html                              # HTML5 base template
├── package.json                            # Dependencies, metadata, and run scripts
├── vite.config.js                          # Vite build pipeline configuration
└── README.md                               # Project overview and setup instructions
```

---

## 3. Component Hierarchy & Data Flow

### Component Tree
- **`App.jsx`** (Root Component)
  - `Hero.jsx` (Static header presentation)
  - `Navbar.jsx` (Receives `theme` and `toggleTheme`; manages scroll-spy and greeting)
  - `<main className="main-card">`
    - `About.jsx` (Academic background, core interests, and portrait)
    - `Projects.jsx` (Manages search query, 4-way sorting, live GitHub sync, and selection)
      - `ProjectCard.jsx` (Mapped for each project; handles 3D interactions and click dispatch)
      - `ProjectModal.jsx` (Conditionally rendered when selected; fetches repo stats and languages)
        - `LanguageBarChart.jsx` (Renders proportional language breakdown segments and legend)
      - `SortInfoModal.jsx` (Conditionally rendered help modal for sorting criteria)
    - `Contact.jsx` (Self-contained form management, validation rules, and draft persistence)
  - `Footer.jsx` (Static footer presentation)

### Data & Asynchronous Event Flow
- **Live GitHub Metrics Pipeline:** On mount, `Projects.jsx` triggers `githubService.getRepositories()`. This queries GitHub's public API to retrieve repository stars, forks, and `pushed_at` timestamps for all public repositories, storing them in component state.
- **On-Demand Language Breakdown:** When a project modal opens, `ProjectModal.jsx` passes the project's repository name to `githubService.getRepoLanguages()`. The calculated language byte distribution is passed down to `LanguageBarChart.jsx`.
- **Top-Down Props & State Delegation:** Filtered and sorted project arrays are calculated at the `Projects.jsx` level using a memoized pipeline, then mapped to individual `ProjectCard.jsx` instances.
- **Bottom-Up Callbacks:** Clicking a book card triggers `onOpen(project)` to mount `ProjectModal.jsx`. Dismissal calls `onClose()` to reset the selection state to `null`.

---

## 4. State Management & Subsystems

### 4.1 Global Theme Management (`App.jsx`)
- **Initialization:** Reads from `localStorage.getItem('portfolio-theme-v2')`, falling back to `'dark'`.
- **DOM Synchronization:** A `useEffect` hook synchronizes the `data-theme` attribute on the `<html>` root element, updating CSS custom property palettes instantly across all components.

### 4.2 Navigation & Scroll-Spy Subsystem (`Navbar.jsx`)
- **Passive Scroll Listener:** Uses `window.addEventListener('scroll', handleScroll, { passive: true })` to prevent main-thread jank during scrolling.
- **Offset Buffer:** Incorporates a 140px header offset buffer to match the active navigation link to the element currently in view.
- **Contextual Greeting:** Evaluates client system time (`new Date().getHours()`) to display personalized greetings (*"Good Morning!"*, *"Good Afternoon!"*, *"Good Evening!"*, *"Still up?"*).

### 4.3 GitHub REST API & Two-Tier Caching Subsystem (`githubService.js`)
To integrate live GitHub statistics while strictly honoring GitHub's unauthenticated rate limit (60 requests/hour), the service implements a robust two-tier caching architecture: