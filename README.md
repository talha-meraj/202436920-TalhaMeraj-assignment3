# Personal Portfolio Website

**Author:** Talha Meraj  
**Student ID:** 202436920  

---

## 1. About the Project

This is my personal portfolio website built with React and Vite. It serves as an interactive resume and engineering showcase for my academic and personal projects, focusing on computer architecture, hardware design, and software development.

The site is built from scratch as a clean, responsive single-page application. Rather than relying on heavy third-party UI component suites, all styling and interactive animations are written using custom CSS Modules. The application features real-time GitHub REST API integration, 3D interactive card designs, dynamic repository language visualizations, multi-criteria sorting, and client-side contact form draft persistence.

---

## 2. Main Features

### Interactive 3D Book Cards
- **Hardcover Book Effect:** Each project card is styled to resemble a physical hardcover book with a front cover, page stack, and back cover using CSS 3D perspective transforms.
- **Hover & Focus Animations:** Hovering or focusing on a card swings the front cover smoothly to reveal a stack of pages and clicking the card opens up a details modal.
- **Quick Links:** Cards display primary technologies used along with direct links to the source code repository.

### Project Details Popup & Live GitHub Stats
- **Comprehensive Overview:** Clicking any project opens a full modal window with a high-resolution preview banner, an architectural summary, and key topic tags.
- **Live GitHub Metrics:** Integrates directly with the GitHub REST API to fetch live repository stars, forks, and last commit dates for linked projects.
- **Codebase Language Breakdown:** Displays a custom horizontal segmented progress bar visualizing the exact percentage distribution of languages in the repository, paired with an interactive color-coded legend.
- **Focus & Scroll Lock:** The modal locks background scrolling while active and can be dismissed via an overlay click, an accessible close button, or the `Escape` key.

### Live Data Integration & Caching
- **GitHub REST API (v3):** Asynchronously fetches repository statistics and language compositions.
- **Rate-Limit Resilience:** Implements a two-tier caching strategy using browser `localStorage` (15-minute TTL) and in-memory caches. This prevents unauthenticated GitHub API rate limiting (60 requests/hr) and guarantees instant loads on subsequent visits.
- **Graceful Fallbacks:** Projects without public repositories or during offline/rate-limited states display clean fallback interfaces without layout shifts or broken states.

### Search and Multi-Criteria Sorting
- **Instant Search:** Real-time filtering matching queries across project titles, descriptions, categories, and technology tags.
- **Flexible 4-Way Sorting:** Sort projects dynamically by:
  - **Featured:** Orders projects based on my personal favourites.
  - **Title:** Alphabetical ordering (A–Z / Z–A).
  - **Date:** Chronological milestone release order.
  - **Recently Updated:** Live ordering based on the latest GitHub push timestamp.
- **Sort Guide Modal:** An interactive `(i)` button opens a compact modal explaining each sorting mode.
- **Preference Persistence:** Active sort criteria and direction are saved to `localStorage` across page visits.
- **Show More / Show Less:** Displays the top row of projects initially to maintain a clean layout, with a toggle to reveal the complete catalog.

### Dark and Light Theme Toggle
- A navigation bar toggle switches between light and dark themes.
- Preferences are saved in `localStorage` to persist across browser reloads.

### Sticky Navigation & Dynamic Greeting
- The navbar remains fixed at the top of the viewport during scrolling.
- **Scroll-Spy:** Highlights the active navigation link based on the currently visible section.
- **Time-Based Greeting:** Detects the visitor's local system time to display a personalized greeting (*"Good Morning"*, *"Good Afternoon"*, or *"Good Evening"*).

### Contact Form with Validation & Draft Auto-Save
- Fields for visitor name, email address, and message with real-time validation (email format, valid name characters, and a 10–500 character boundary counter).
- **Draft Auto-Save:** Form inputs automatically synchronize to `localStorage` as you type. If the browser is refreshed or closed unexpectedly, an alert banner allows the visitor to restore their drafted message or discard it.
- **Status Feedback:** Clear inline validation messages and submission confirmation alerts.

---

## 3. Tech Stack

- **React 19:** Component architecture, custom hooks, and reactive UI state.
- **Vite:** High-speed modern frontend tooling and asset bundling.
- **CSS Modules:** Custom, conflict-free styling with design tokens.
- **GitHub REST API v3:** Real-time repository metrics and language breakdowns.
- **React Icons (FontAwesome 6):** Vector iconography.
- **Google Fonts:** Montserrat (display headers) and Open Sans (body text).

---

## 4. Project Structure

```text
202436920-TalhaMeraj-assignment2/
├── docs/
│   ├── ai-usage-report.md          # AI development logs and prompts
│   └── technical-documentation.md    # System architecture and technical reference
├── public/
│   ├── robots.txt                  # Search crawler configuration
│   └── assets/
│       └── images/                 # Optimized WebP project and background media
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── LanguageBarChart.jsx        # Horizontal segmented language bar
│   │   │   └── LanguageBarChart.module.css
│   │   ├── layout/
│   │   │   ├── Hero.jsx                    # Header hero banner
│   │   │   ├── Navbar.jsx                  # Sticky navigation, greeting, and theme toggle
│   │   │   └── Footer.jsx                  # Page footer with copyright and links
│   │   └── sections/
│   │       ├── About.jsx                   # Bio, background, and profile showcase
│   │       ├── Projects.jsx                # Search, multi-criteria sort, and project list
│   │       ├── ProjectCard.jsx             # 3D interactive book component
│   │       ├── ProjectModal.jsx            # Project modal with live GitHub statistics
│   │       ├── SortInfoModal.jsx           # Sort criteria explanation modal
│   │       └── Contact.jsx                 # Validated contact form with draft auto-save
│   ├── data/
│   │   └── projectsData.js                 # Project catalog and metadata
│   ├── services/
│   │   └── githubService.js                # GitHub API client, caching, and language colors
│   ├── App.jsx                             # Root component and theme management
│   ├── index.css                           # Global design tokens and reset styles
│   └── main.jsx                            # Application entry point
├── index.html                              # Base HTML document
├── package.json                            # Dependencies and scripts
├── vite.config.js                          # Vite build configuration
└── README.md                               # Project documentation
```

---

## 5. Getting Started

### Prerequisites
- Node.js (v18.0.0 or newer)
- npm (v9.0.0 or newer)

### Installation & Development

1. Navigate to the project directory:
   ```bash
   cd 202436920-TalhaMeraj-assignment3
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open the development URL in your browser (typically `http://localhost:5173/`).

### Verification & Production Scripts

- **Lint Codebase:**
  ```bash
  npm run lint
  ```
- **Build Production Bundle:**
  ```bash
  npm run build
  ```
- **Preview Production Build:**
  ```bash
  npm run preview
  ```

---

## 6. Accessibility & Performance

- **Lighthouse & Standards Compliance:** Optimized against Google Lighthouse guidelines, resolving asset payloads with modern WebP compression, ensuring WCAG AA color contrast ratios, providing robots.txt crawler policies, and maintaining responsive layout stability across viewports.
- **Keyboard Navigation:** Full focus trap and keyboard control (`Enter`, `Space`, `Escape`) across all modals and interactive cards.
- **Asset Optimization:** All project graphics, diagrams, and backgrounds are compressed in WebP format, achieving an 85%+ payload reduction (~635 KB total).
- **Responsive Design:** Mobile-first layout adjustments including bottom navigation tabs, touch-friendly horizontal sort scrolling, and responsive modals.
- **Screen Reader Support:** Semantic HTML5 landmarks, ARIA live regions, and descriptive attributes (`aria-label`, `role="dialog"`, `role="status"`).

---

## 7. AI Assistance & Engineering Workflow

During the development of this project, AI tooling (Antigravity IDE) was leveraged for code scaffolding, API integration design, mobile responsive tuning, and automated verification.

All AI-suggested implementations were manually reviewed, debugged, and optimized to ensure architectural integrity, performance standards, and cross-browser consistency. Comprehensive prompts and engineering workflows are documented in the [AI Usage Report](docs/ai-usage-report.md).