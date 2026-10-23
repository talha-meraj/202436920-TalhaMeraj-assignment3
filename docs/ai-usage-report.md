# AI Usage & Collaborative Engineering Report

**Assignment:** Assignment 2 – Interactive Features  
**Student Name:** Talha Meraj  
**Student ID:** 202436920  

---

## 1. Mandatory Declaration

> I declare that this report and the attached evidence document all of my AI use in this assignment, with complete and unedited conversations, and that I understand and can explain all the code I submitted. I understand that undeclared AI use or a false declaration will be treated as plagiarism according to KFUPM regulations.

**Student Name:** Talha Meraj  
**Student ID:** 202436920  
**Date:** October 23, 2026  
**Signature:** *Talha Meraj*  

---

## 2. AI Usage Log

| ID | Tool (model) | Date | Purpose | Files affected | What you changed and how you verified it |
|:---|:---|:---|:---|:---|:---|
| **C01** | Antigravity IDE (Gemini 3.8 Flash) | 22-Oct-2026 | Assist in migrating vanilla HTML/CSS/JS portfolio into a Vite React App. | `index.html`, `vite.config.js`, `src/App.jsx`, `src/main.jsx`, `src/index.css`, `package.json` | Changed recommended tsx format to jsx. Structured component folders into `layout/` and `sections/`. Ported some code from assignment-1 to this new folder. Verified the final code by running `npm run dev` and confirming the base app displays in the browser. |
| **C02** | Antigravity IDE (Gemini 3.8 Flash) | 22-Oct-2026 | Help in porting layout components (Hero, Navbar, Footer) and about section from assignment 1 vanilla HTML/CSS/JS to modular React, and configuring theme switching and storage in localStorage. | `src/App.jsx`, `src/index.css`, `src/components/layout/Hero.jsx`, `src/components/layout/Hero.module.css`, `src/components/layout/Navbar.jsx`, `src/components/layout/Navbar.module.css`, `src/components/layout/Footer.jsx`, `src/components/layout/Footer.module.css`, `src/components/sections/About.jsx`, `src/components/sections/About.module.css` | Refactored assignment-1 `styles.css` into individual CSS Modules for Hero, Navbar, Footer, and About, and reduced `index.css` to global design tokens and layout shells. Implemented dark/light theme toggling with localStorage sync in `App.jsx`. Replaced CDN FontAwesome with `react-icons/fa6`. Resolved a Vite build crash by moving images from `src/assets` to `public/assets/images` and updating image paths. Verified in Chrome and confirmed zero console errors, tested day/night background switching, and verified sticky navbar active section highlighting during scroll in the browser. |
| **C03** | Antigravity IDE (Gemini 3.8 Flash) | 23-Oct-2026 | Assist in designing and implementing the Projects section with 3D perspective hardcover book cards, stacked paper page edges, search filtering, sorting with reversible directions, row collapse with smooth scrolling, and a project details modal. | `src/data/projectsData.js`, `src/components/sections/ProjectCard.jsx`, `src/components/sections/ProjectCard.module.css`, `src/components/sections/ProjectModal.jsx`, `src/components/sections/ProjectModal.module.css`, `src/components/sections/Projects.jsx`, `src/components/sections/Projects.module.css`, `src/App.jsx` | Extracted seven projects from GitHub with metadata and tags. Created a three-layer 3D book component using CSS perspective and cubic-bezier swing physics. Resolved a modal backdrop click-interception bug by resetting closing state on project change and implementing conditional mounting. Built a search and multi-sort pipeline. Verified functionality in the browser by testing live search queries, sort direction toggles, and modal dialog open, close, and keyboard input responses. |
| **C04** | Antigravity IDE (Gemini 3.8 Flash) | 23-Oct-2026 | Assisting in the implementation of the website contact section with a contact form, real-time input validation, 500-character counter, simulated asynchronous submission. | `src/components/sections/Contact.jsx`, `src/components/sections/Contact.module.css`, `src/App.jsx` | Built a contact section for my react app with name, email and message inputs. Ported some of the css and html codes from assignment-1's vanilla HTML/CSS/JS website and modified it to fit the react app. Applied dark mode themes to the ported designs. Tested all newly added features by running `npm run dev` and interacting with the new elements, finally fixed any bugs that came to light during testing. |
| **C05** | Antigravity IDE (Gemini 3.8 Flash) | 23-Oct-2026 | Assisting in writing the documentation for the project. | `README.md`, `docs/technical-documentation.md`, `docs/ai-usage-report.md` | Added readme, technical documentation and ai usage report. All documentation generated was proofread and edited wherever necessary. |

---

## 3. Overview of AI Integration

Artificial intelligence (Antigravity IDE powered by Gemini 3.8 Flash) was used as an interactive pair-programming assistant throughout the development of Assignment 2:
1. **Migration & Component Architecture:** Scaffolding the initial Vite setup, defining folder structures (`layout/`, `sections/`, `data/`), and converting vanilla elements into reusable React components.
2. **CSS 3D Transforms & Animations:** Assisting with the perspective math and rotation parameters for the 3D book cover tilt and page stack illusion.
3. **State Management & Pipelines:** Assisting in structuring client-side filter and sorting logic with React hooks (`useMemo`, `useState`, `useEffect`).
4. **Form Handling & Validation:** Writing input validation logic (email regex, name character constraints, and 500-character boundary tracking).
5. **Documentation Support:** Structuring the technical documentation and formatting development logs into clear Markdown files.

---

## 4. Critical Evaluation: Benefits, Challenges & Human Adjustments

### Observed Benefits
- **Faster Architectural Transitions:** Accelerated porting legacy code from Assignment 1 into modern React 19 components and CSS Modules.
- **Creative UI Engineering:** Quickly prototyped 3D CSS transform ideas that transformed flat project tiles into interactive books.
- **Immediate Bug Isolation:** Accelerated diagnosing build issues, such as static asset bundling errors in Vite.

### Challenges Encountered & How They Were Resolved
1. **Asset Path Failures in Vite:**
   - *Problem:* AI initially recommended keeping project images in `src/assets/`, which caused broken image links in Vite production builds.
   - *Resolution:* Moved all images to `public/assets/images/` and updated reference paths to absolute URLs (`/assets/images/...`).
2. **CSS 3D Perspective & Stacking Contexts:**
   - *Problem:* Initial CSS 3D transforms caused the swinging front cover of the book to clip through adjacent grid elements on tablet viewports.
   - *Resolution:* Added `transform-style: preserve-3d` to the book container, set explicit `perspective: 1200px` on parent containers, and adjusted z-index layering.
3. **Modal Backdrop Interception:**
   - *Problem:* Fast consecutive clicks on different project cards occasionally trapped the modal in an `isClosing` state, preventing new modals from opening.
   - *Resolution:* Re-engineered `ProjectModal.jsx` to reset closing state variables on project change and properly synchronize exit transitions with unmounting.
4. **Scroll-Spy Accuracy:**
   - *Problem:* Sticky navbar height caused section detection to trigger prematurely during scrolling.
   - *Resolution:* Tuned scroll offset calculation (+140px) and added a bottom-of-page condition to ensure the Contact tab highlights properly.

---

## 5. Verification & Code Comprehension Methodology

In accordance with KFUPM academic integrity standards:
- **Independent Testing:** Every component, hook, and CSS module was reviewed and tested manually using `npm run dev` and `npm run preview`.
- **Accessibility & Keyboard Testing:** Verified that all interactive features (theme toggle, 3D book opening, modal popup, contact form) are fully operable via keyboard (`Tab`, `Space`, `Enter`, `Escape`).
- **Audit Logging:** All raw conversation transcripts (`C01.md`, `C02.md`, `C03.md`, `C04.md`, and `C05.md`) are archived in the required evidence archive (`202436920-TalhaMeraj-assignment2-ai-evidence.zip`) for submission on Blackboard.

---

## 6. Learning Outcomes & Professional Reflection

Working collaboratively with AI tools during Assignment 2 enhanced my technical knowledge:
- Gained a solid understanding of React 19 state management, controlled inputs, and performance optimization with `useMemo`.
- Mastered component-scoped styling using CSS Modules, preventing style leakage.
- Learned to approach AI outputs critically: recognizing that AI code serves as an initial draft that requires human review, validation, and debugging to meet professional standards.

