# Technical Documentation: React Architecture & Component Engineering

**Student Name:** Talha Meraj  
**Student ID:** 202436920  
**Technology Stack:** React 19, Vite 8, CSS Modules 

---

## 1. Architectural Overview & System Design

The application is structured as a modular, component-driven Single-Page Application (SPA) built with **React 19** and bundled with **Vite 8**. The primary design objective was to build a clean, responsive, and accessible personal portfolio from the ground up without relying on third-party UI component frameworks.

### Separation of Concerns
1. **Entry & Root:** `index.html` loads the root DOM node; `main.jsx` initializes React in Strict Mode; `App.jsx` orchestrates global theme state and top-level layout composition.
2. **Layout Components (`src/components/layout/`):** Fixed structural wrappers including the top identity hero, sticky navigation bar, and footer.
3. **Section Components (`src/components/sections/`):** Self-contained, feature-specific sections (About, Projects, ProjectCard, ProjectModal, and Contact).
4. **Data Layer (`src/data/projectsData.js`):** Centralized data store containing structured project metadata, decoupling content from UI rendering.
5. **Style Architecture (`*.module.css`):** Scoped CSS Modules for component-level styles combined with global design tokens defined via CSS custom properties in `index.css`.

---

## 2. Directory Structure

```text
202436920-TalhaMeraj-assignment2/
├── docs/
│   ├── ai-usage-report.md       # AI usage log and mandatory declaration
│   └── technical-documentation.md # System architecture and component details
├── public/
│   └── assets/
│       └── images/              # Project diagrams, hardware photos, and avatars
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Hero.jsx         # Header banner with title and academic affiliation
│   │   │   ├── Hero.module.css
│   │   │   ├── Navbar.jsx       # Sticky nav with scroll-spy, time-greeting, and theme toggle
│   │   │   ├── Navbar.module.css
│   │   │   ├── Footer.jsx       # Dynamic copyright footer
│   │   │   └── Footer.module.css
│   │   └── sections/
│   │       ├── About.jsx        # Biography, academic profile, and portrait card
│   │       ├── About.module.css
│   │       ├── Projects.jsx     # Project gallery, search filter, sort controls, and grid
│   │       ├── Projects.module.css
│   │       ├── ProjectCard.jsx  # Interactive 3D hardcover book card
│   │       ├── ProjectCard.module.css
│   │       ├── ProjectModal.jsx # Accessible detail modal with scroll-lock
│   │       ├── ProjectModal.module.css
│   │       ├── Contact.jsx      # Controlled contact form and details sidebar
│   │       └── Contact.module.css
│   ├── data/
│   │   └── projectsData.js      # Structured array of project objects
│   ├── App.jsx                  # Root state (theme management) and layout assembly
│   ├── index.css                # Global design tokens, typography, and base resets
│   └── main.jsx                 # React root mount point
├── index.html                   # HTML5 template
├── package.json                 # Dependency definitions and scripts
├── vite.config.js               # Vite build configuration
└── README.md                    # Project overview and setup instructions
```

---

## 3. Component Hierarchy & Data Flow

### Component Tree
- **`App.jsx`** (Root Component)
  - `Hero.jsx` (Static banner display)
  - `Navbar.jsx` (Receives `theme` and `toggleTheme` props; manages scroll-spy and greeting)
  - `<main className="main-card">`
    - `About.jsx` (Bio, education highlights, and portrait card)
    - `Projects.jsx` (Manages search, sort, and modal states)
      - `ProjectCard.jsx` (Repeated for each project; passes `onOpen` callback)
      - `ProjectModal.jsx` (Conditionally rendered when a project is selected; receives `onClose`)
    - `Contact.jsx` (Autonomous form handling, validation rules, and async feedback)
  - `Footer.jsx` (Static footer display)

### Data & Event Flow
- **Top-Down Props:** Theme state and the toggle handler are managed in `App.jsx` and passed down to `Navbar.jsx`. In the project catalog, the filtered and sorted list of projects is calculated in `Projects.jsx` and mapped into individual `ProjectCard.jsx` components via props.
- **Bottom-Up Callbacks:** When a user selects a project card, `ProjectCard.jsx` invokes the `onOpen(project)` callback, which updates the `selectedProject` state in `Projects.jsx` to render `ProjectModal.jsx`. Closing the modal triggers the `onClose` callback to reset the selection to `null`.
- **Autonomous Component State:** Sections like `Contact.jsx` maintain self-contained state for form data, validation errors, and loading statuses, keeping parent components unburdened by localized interactions.

---

## 4. State Management & Subsystems

### 4.1 Global Theme Management (`App.jsx`)
The application implements persistent light and dark theming through the following mechanism:
- **Initialization:** Uses a lazy state initializer reading from `localStorage.getItem('portfolio-theme-v2')`, defaulting to `'dark'`.
- **DOM Synchronization:** A `useEffect` hook synchronizes the `data-theme` attribute on the `<html>` root element whenever `theme` changes, persisting the latest value to `localStorage`.
- **Tokenized CSS:** Variables declared in `index.css` adapt automatically:
  - `:root` defines default dark palette variables (`--bg-primary`, `--card-bg`, `--text-main`, `--accent-blue`).
  - `[data-theme='light']` overrides those tokens for the light theme with high contrast ratios.

### 4.2 Navigation & Scroll-Spy Subsystem (`Navbar.jsx`)
- **Passive Scroll Listener:** Uses `window.addEventListener('scroll', handleScroll, { passive: true })` to eliminate main-thread blocking during scrolling.
- **Dynamic Offset Detection:** Applies a 140px header offset buffer (`window.scrollY + 140`) to calculate the active section tab relative to element `offsetTop`.
- **Bottom-of-Page Edge Case:** Includes a boundary check (`window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 70`) ensuring the `#contact` tab correctly activates on shorter viewports.
- **Contextual Greeting:** Computes local system hour (`new Date().getHours()`) on initial render:
  - `05:00 - 11:59`: "Good Morning!"
  - `12:00 - 16:59`: "Good Afternoon!"
  - `17:00 - 22:59`: "Good Evening!"
  - `23:00 - 04:59`: "Still up?"

---

## 5. Interactive 3D Projects Showcase

### 5.1 Layered 3D Book Anatomy (`ProjectCard.jsx`)
Each project card is rendered as a physical book utilizing hardware-accelerated CSS 3D transforms:
- **Back Cover (`.bookBackCover`):** Positioned underneath to provide base depth.
- **Page Thickness Stack (`.bookPagesStack`):** Multi-layered gradient pseudo-elements simulating paper thickness (`.pagesRightEdge`).
- **Front Hardcover (`.bookCover`):** Configured with `transform-origin: left center`. On hover or keyboard focus, it executes `transform: rotateY(-35deg)` to swing open, revealing card details.
- **Visual Details:** Includes a vertical spine strip date badge, realistic spine crease shadow, core tech chips, and an external GitHub repository button.
- **Keyboard Access:** Implements `role="button"`, `tabIndex={0}`, and handles `Enter` / `Space` keys to open project details.

### 5.2 Memoized Search, Filter & Sort Pipeline (`Projects.jsx`)
The project dataset is processed through a deterministic pipeline optimized with React's `useMemo` hook:
1. **Multi-Field Text Search:** Matches search input against project titles, descriptions, categories, and technology tags.
2. **Multi-Criteria Sorting:**
   - **Featured:** Sorts by assigned numerical priority score, with chronological date tiebreaking.
   - **Title:** Alphabetical comparison via `localeCompare()`.
   - **Date:** Chronological comparison using parsed date objects.
   - **Direction:** Dynamic Ascending / Descending order toggle.

### 5.3 Accessible Modal Dialog (`ProjectModal.jsx`)
- **Scroll Lock:** Locks parent page scrolling upon mount (`document.body.style.overflow = 'hidden'`) and restores previous overflow on unmount.
- **Synchronized Exit Animation:** Manages an internal `isClosing` state to play a 220ms smooth exit transition before unmounting from parent state.
- **Dismissal Triggers:** Closes on `Escape` keypress, background backdrop click (with `e.stopPropagation()` on card content), or explicit close button click.
- **ARIA Semantics:** Configured with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="modalProjectTitle"`.

---

## 6. Form Handling & Multi-Tier Validation (`Contact.jsx`)

The contact section implements a controlled form interface with real-time feedback and asynchronous submission simulation.

### 6.1 Validation Engine
- **Name Field:** Validates that input is not empty, meets a minimum length of 2 characters, and matches `/^[a-zA-Z\s\-'.]+$/` to restrict invalid symbols.
- **Email Field:** Validates against standard RFC pattern `/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/`.
- **Message Field:** Requires a minimum of 10 characters for adequate context, enforces a maximum length of 500 characters, and updates a live character counter `(current / 500)`.

### 6.2 Interaction Flow & Accessibility
- **Timing:** Errors appear only after input blur or form submission attempt, avoiding premature error states while the user is actively typing.
- **Immediate Recovery:** Errors clear immediately as the user modifies the invalid field.
- **Auto-Focus:** Submitting an invalid form automatically moves DOM focus to the first invalid field.
- **Async Simulation:** Disables form controls, displays a loading spinner (`FaSpinner`), simulates network latency, presents an accessible success banner, resets form state, and auto-dismisses the alert after 5 seconds.

---

## 7. Performance Auditing & Lighthouse Benchmark

The application was audited using Google Chrome Lighthouse in production preview mode to verify compliance with performance, accessibility, best practices, and SEO standards.

### Lighthouse Audit Scores

| Category | Score | Status |
| :--- | :--- | :--- |
| **Performance** | **91 / 100** | Passed (Green) |
| **Accessibility** | **96 / 100** | Passed (Green) |
| **Best Practices** | **100 / 100** | Passed (Green) |
| **SEO** | **100 / 100** | Passed (Green) |

### Key Performance Metrics
- **First Contentful Paint (FCP):** ~0.9s
- **Total Blocking Time (TBT):** ~30ms
- **Cumulative Layout Shift (CLS):** 0.00 (Zero layout shifts due to explicit image aspect-ratios)
- **Speed Index:** ~1.4s

### Performance Analysis & Future Optimization Roadmap
While the current score of **91** demonstrates strong performance, the audit highlighted opportunities for future releases:
1. **Next-Generation Image Formats:** Several project screenshot assets currently use standard PNG/JPG formats. Future iterations will convert all media assets to modern **WebP** and **AVIF** formats, reducing image payload sizes by an estimated 40–60%.
2. **Library Loading & Dynamic Code Splitting:** Currently, font and icon bundles (`react-icons/fa6`) are packaged in the main vendor chunk. Future updates will introduce dynamic code-splitting (`React.lazy` and `Suspense`) for the modal dialog and heavy components, ensuring users only download assets as needed and improving the First Contentful Paint.
3. **Responsive Image Delivery:** Incorporating HTML5 `<picture>` elements with `srcset` attributes to deliver appropriately scaled images based on client viewport density.

---

## 8. Build & Production Verification

The project compiles into an optimized production bundle via the Vite build pipeline (`npm run build`):

```text
vite v8.3.5 building client environment for production...
✓ 38 modules transformed.
dist/index.html                   0.79 kB │ gzip:  0.44 kB
dist/assets/index-htOfz76o.css   27.01 kB │ gzip:  6.34 kB
dist/assets/index-BS2d-lt_.js   267.89 kB │ gzip: 83.93 kB
✓ built in 1.25s
```

- **CSS Optimization:** All CSS Modules are concatenated, minified, and scoped with zero runtime CSS overhead.
- **Dead-Code Elimination:** Unused icon glyphs and code paths are stripped during compilation.
- **Browser Compatibility:** Verified across current versions of Google Chrome, Microsoft Edge, Mozilla Firefox, and Apple Safari.
