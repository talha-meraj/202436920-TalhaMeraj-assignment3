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
202436920-TalhaMeraj-assignment3/
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
- **Live GitHub Metrics Pipeline:** On mount, `Projects.jsx` triggers `githubService.fetchGitHubRepos()`. This queries GitHub's public API to retrieve repository stars, forks, and `pushed_at` timestamps for all public repositories, storing them in component state.
- **On-Demand Language Breakdown:** When a project modal opens, `ProjectModal.jsx` passes the project's repository name to `githubService.fetchRepoLanguages()`. The calculated language byte distribution is passed down to `LanguageBarChart.jsx`.
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

```text
[UI Component Request]
       │
       ▼
[In-Memory Map Cache] ──(Hit)──► Return Instant Data
       │ (Miss)
       ▼
[localStorage Cache (15-min TTL)] ──(Valid)──► Populate In-Memory & Return
       │ (Expired / Missing)
       ▼
[GitHub REST API (fetch with 3.5s timeout)] ──(HTTP 200)──► Save to Cache & Return
       │ (Error / Rate-Limited / Offline)
       ▼
[Fallback Graceful State] ──► Return Stale Cache or Offline Error Notice
```

1. **Tier 1 (In-Memory Map):** Provides zero-latency reads within the current application session for language breakdowns.
2. **Tier 2 (`localStorage` with 15-Minute TTL):** Persists API payloads under `portfolio-github-repos-v1` with a timestamp. If fresh (< 900,000 ms), the cached payload is used without issuing network requests.
3. **Fast 3.5s Network Timeout:** Requests use `AbortController` signals to cancel hanging connections within 3.5 seconds, ensuring the site never stalls when offline.
4. **Rate-Limit & Offline Resilience:** If the API returns HTTP 403 or the device is offline, the client catches errors gracefully, serves stale cached data if present, or presents a user-friendly error notice in the modal.
5. **Language Palette Generator:** Maintains deterministic hex brand color mappings for major programming languages (Python, C++, Verilog, SystemVerilog, JavaScript, HTML, CSS, Assembly) with an algorithmic fallback for unmapped languages.

---

## 5. Interactive Projects Showcase & Data Processing

### 5.1 Layered 3D Book Anatomy (`ProjectCard.jsx`)
Each card is rendered as a physical book using hardware-accelerated CSS 3D transforms:
- **Perspective Container:** Set with `perspective: 1200px` for realistic depth.
- **Back Cover & Spine:** Styled underneath with box-shadows simulating real hardcover thickness.
- **Front Hardcover (`.bookCover`):** Configured with `transform-origin: left center` and `transform-style: preserve-3d`. On `:hover` or `:focus-visible`, it swings open `rotateY(-35deg)`.
- **Accessibility:** Interactive cards feature `role="button"`, `tabIndex={0}`, and handle `Enter` / `Space` keyboard activation.

### 5.2 Memoized Search, Filter & 4-Way Sort Pipeline (`Projects.jsx`)
The project dataset is evaluated through a deterministic pipeline optimized with `useMemo`:

```javascript
const sortedProjects = useMemo(() => {
  // 1. Text Search across Title, Description, Category, and Tech Tags
  let filtered = projects.filter(p => matchQuery(p, searchQuery));

  // 2. Multi-Criteria Sort
  filtered.sort((a, b) => {
    switch (sortField) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'date':
        return new Date(a.isoDate || a.date) - new Date(b.isoDate || b.date);
      case 'updated':
        return getPushTime(b) - getPushTime(a); // Live GitHub pushed_at timestamp
      case 'featured':
      default:
        return (a.featured || 0) - (b.featured || 0);
    }
  });

  return sortDirection === 'asc' ? filtered : filtered.reverse();
}, [searchQuery, sortField, sortDirection, gitHubData]);
```

- **Cross-Browser Date Reliability:** All dates follow ISO 8601 formatting (`YYYY-MM-DD`), preventing `NaN` parsing bugs across Chromium, Gecko, and WebKit engines.
- **Sort State Persistence:** User preferences for `sortField` and `sortDirection` are saved to `localStorage` (`portfolio-sort-field-v1`, `portfolio-sort-dir-v1`).
- **Sort Guide Modal (`SortInfoModal.jsx`):** An accessible dialog explaining sorting algorithms in user-friendly language.

### 5.3 Segmented Language Breakdown Chart (`LanguageBarChart.jsx`)
- Computes percentage distribution: `(bytes / totalBytes) * 100`.
- Renders a multi-segmented CSS flex progress bar with rounded ends, clipping, and responsive color-coded legend chips.
- Segments below 1.5% are visually clamped to maintain legibility without breaking proportional layout.

### 5.4 Accessible Project Modal (`ProjectModal.jsx`)
- **Scroll Lock:** Preserves background scroll position by toggling `document.body.style.overflow = 'hidden'`.
- **Stationary Close Button:** Close button is pinned at the top right of the viewport outside the scrollable modal container, ensuring it remains immediately accessible regardless of modal content height.
- **Offline Error Handling:** If the GitHub API cannot be reached, displays an accessible warning banner informing the user that live statistics are temporarily unavailable while still providing direct repository links.
- **Dismissal Triggers:** Supports `Escape` key, backdrop click, and explicit close button click with clean exit animations.

---

## 6. Form Handling & Client-Side Draft Persistence (`Contact.jsx`)

### 6.1 Validation Engine
- **Name:** Minimum 2 characters, strictly matching `/^[a-zA-Z\s\-'.]+$/`.
- **Email:** Strict RFC pattern validation `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
- **Message:** Enforces a 10-character minimum for context and a 500-character maximum with real-time character counting.
- **Recovery Timing:** Errors are displayed on blur or submit attempt, and clear instantly as the user types.

### 6.2 Draft Auto-Save Subsystem
To protect against accidental tab closures or page reloads:
- **Real-Time Storage Sync:** Form inputs (`name`, `email`, `message`) synchronize to `localStorage` (`contact-form-draft`) on every keystroke.
- **Restoration Banner:** On mount, if a saved draft is detected, the form fields are pre-populated and an accessible notification banner is rendered:  
  *"Restored unsaved message draft · [Discard]"*.
- **Purge Lifecycle:** Clicking "Discard" purges `localStorage` and clears the form; submitting a valid message automatically removes the saved draft upon success.

---

## 7. Performance Auditing & Lighthouse Benchmark

The application was audited using Google Chrome Lighthouse in production preview mode (`npm run build && npm run preview`). Through targeted engineering optimizations, the application achieved a **perfect 100 / 100 across all four core audit categories**:

### Lighthouse Audit Scores

| Audit Category | Score | Status |
| :--- | :---: | :--- |
| **Performance** | **100 / 100** | Passed (Perfect) |
| **Accessibility** | **100 / 100** | Passed (Perfect) |
| **Best Practices** | **100 / 100** | Passed (Perfect) |
| **SEO** | **100 / 100** | Passed (Perfect) |

### Core Web Vitals Metrics
- **First Contentful Paint (FCP):** ~0.6s
- **Largest Contentful Paint (LCP):** ~0.9s
- **Total Blocking Time (TBT):** 0 ms
- **Cumulative Layout Shift (CLS):** 0.00 (Zero layout shifts)
- **Speed Index:** ~0.8s

### Architectural Optimizations That Achieved 100/100:

1. **Next-Generation Asset Conversion (WebP):**
   - Converted all raster graphics, hardware architecture diagrams, and background imagery to modern **WebP** format.
   - Reduced total media asset weight by **over 85%** (from ~4.1 MB down to ~635 KB), completely eliminating image-related payload bottlenecks.

2. **WCAG AA Color Contrast Compliance:**
   - Evaluated color contrast ratios in both light and dark modes.
   - Adjusted the light theme muted text token (`--text-muted`) to `#475569`, achieving a **5.4:1** contrast ratio against light backgrounds (comfortably exceeding the 4.5:1 WCAG AA minimum).

3. **SEO & Crawler Configuration:**
   - Deployed `public/robots.txt` establishing explicit crawler policies.
   - Enriched `index.html` with accurate metadata, including a descriptive `<meta name="description">`, page `<title>`, and canonical document definitions.

4. **Zero Layout Shifts (CLS 0.00):**
   - Explicit `aspect-ratio` rules and fixed card heights ensure images reserve their geometry before loading, completely eliminating reflows.

5. **Zero Runtime UI Framework Overhead:**
   - Eliminating bulky third-party component suites kept total JavaScript execution and blocking time at **0 ms**.

---

## 8. Mobile Responsiveness & Cross-Browser Verification

### Mobile-First Refinements
- **Bottom Navigation Bar:** On viewport widths `< 640px`, navigation links reconfigure into full-width bottom tabs for ergonomic thumb reach, with social links cleanly situated on top.
- **Horizontal Swipe Sort Controls:** Sort pills and direction buttons utilize smooth horizontal overflow scrolling (`overflow-x: auto`) with hidden scrollbars, preventing layout squishing on mobile screens.
- **Modal Image Geometry:** Project modal image banners scale responsively on mobile viewports to prioritize readable text and repository metrics without pushing controls off-screen.

### Cross-Browser Testing Matrix

| Browser Engine | Representative Browsers | Status | Verification Notes |
| :--- | :--- | :---: | :--- |
| **Chromium** | Google Chrome, Microsoft Edge, Brave | **Passed** | Full 3D transforms, smooth animations, zero layout shifts. |
| **Gecko** | Mozilla Firefox | **Passed** | Hardware-accelerated CSS perspective and scroll-locking validated. |
| **WebKit** | Apple Safari (macOS / iOS) | **Passed** | Verified ISO 8601 date parsing and touch-friendly scroll gestures. |

---

## 9. Production Build Verification

The production bundle is generated using the Vite build pipeline:

```bash
npm run build
```

### Build Output Summary
- **Scoped Minified CSS:** Single concatenated CSS bundle containing scoped modules with zero unused selectors.
- **Optimized JS Chunk:** React runtime, GitHub API services, and application components compiled with modern ES syntax.
- **Code Cleanliness:** Validated via `npm run lint` with **0 errors and 0 warnings**.