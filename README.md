# Personal Portfolio Website

**Student Name:** Talha Meraj  
**Student ID:** 202436920  

---

## 1. About the Project

This is my personal portfolio website built with React and Vite. It serves as an interactive resume and showcase for my academic and personal projects, which focus on computer architecture, hardware design, and software development.

The goal of this project was to build a clean, responsive single-page web app from scratch. Instead of using heavy UI libraries or pre-made component packages, all the styling and animations are written using custom CSS Modules.

---

## 2. Main Features

### Interactive 3D Book Cards
- **Hardcover Book Effect:** Each project card is styled to look like an actual hardcover book with a front cover, page stack, and back cover.
- **Hover & Focus Animations:** When you hover over or focus on a card, the front cover swings open to the side, clicking it reveals more details.
- **Quick Links:** Each book cover has tags showing the main technologies used, plus a direct link to the GitHub repository.

### Project Details Popup
- Clicking on any project book opens up a full details window with a larger image, a summary of what the project does, key topics, and a repository button.
- The popup locks the background page so it does not scroll while open, and it can be closed by clicking outside, clicking the close button, or pressing the Escape key.

### Search and Sort
- **Instant Search:** A search bar lets you quickly find projects by typing any keyword from the title, description, category, or tech tags.
- **Flexible Sorting:** You can sort projects by date, title (A to Z), or by featured priority. You can also flip the sort direction between ascending and descending.
- **Show More / Show Less:** To keep the page tidy, only the top row of projects is shown initially. Clicking "Show More" reveals the rest.

### Dark and Light Theme Toggle
- A switch in the navigation bar lets visitors toggle between dark mode and light mode.
- Your chosen theme is saved to your browser's local storage, so the site remembers your preference the next time you visit.

### Sticky Navigation & Greeting
- The navbar sticks to the top of the screen as you scroll.
- **Scroll-Spy:** As you scroll through the page, the active tab automatically updates to show which section you are currently viewing.
- **Time-Based Greeting:** The navbar checks your local time and shows a friendly greeting, such as "Good Morning!" or "Good Evening!".

### Contact Form with Validation
- Includes fields for your name, email address, and message.
- Checks user inputs in real time: validates email format, makes sure the name only contains valid characters, and counts your characters so messages stay between 10 and 500 characters.
- Shows clear error messages if a field is missed, and displays a success notification once the message is submitted.

---

## 3. Tech Stack

- **React 19:** For building modular and reusable components.
- **Vite:** For fast local development and building the production files.
- **CSS Modules:** For scoped, component-level styling without class name conflicts.
- **React Icons (FontAwesome 6):** For lightweight, clean vector icons.
- **Google Fonts:** Using Inter and Outfit for clean typography.

---

## 4. Project Structure

```text
202436920-TalhaMeraj-assignment2/
├── docs/
│   ├── ai-usage-report.md       # AI logs, prompts, and declaration
│   └── technical-documentation.md # Architecture and system details
├── public/
│   └── assets/
│       └── images/              # project, background and other images
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Hero.jsx         # Header banner with name and subtitle
│   │   │   ├── Navbar.jsx       # Sticky navigation, greeting, and theme switch
│   │   │   └── Footer.jsx       # Page footer with copyright
│   │   └── sections/
│   │       ├── About.jsx        # Bio, education details, and photo
│   │       ├── Projects.jsx     # Search bar, sort options, and project list
│   │       ├── ProjectCard.jsx  # Individual 3D book component
│   │       ├── ProjectModal.jsx # Detailed project popup window
│   │       └── Contact.jsx      # Contact form and contact info sidebar
│   ├── data/
│   │   └── projectsData.js      # List of all project details and links
│   ├── App.jsx                  # Main component handling theme state
│   ├── index.css                # Global colors, typography, and page layout
│   └── main.jsx                 # Entry file that mounts React
├── index.html                   # HTML base file
├── package.json                 # Project dependencies and run commands
├── vite.config.js               # Vite configuration
└── README.md                    # Project documentation
```

---

## 5. How to Run Locally

### Prerequisites
Make sure you have Node.js installed on your computer (version 18 or newer).

### Steps

1. Open your terminal and go into the project folder:
   ```bash
   cd 202436920-TalhaMeraj-assignment2
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open the link shown in your terminal (usually `http://localhost:5173/`) in your browser.

### Other Useful Commands

- **Build for production:**
  ```bash
  npm run build
  ```
- **Preview production build:**
  ```bash
  npm run preview
  ```
---

## 6. Accessibility & Responsiveness

- **Keyboard Friendly:** You can tab through all interactive parts of the site, open and close project popups using `Enter`, `Space`, and `Escape`, and access all links without a mouse.
- **Mobile Friendly:** The layout adjusts automatically for phones, tablets, and desktop screens so content is readable on any device size.
- **Accessible Elements:** Forms and buttons include clear labels and screen-reader tags (`aria-label`, `role="dialog"`).

---

## 7. AI Usage Summary

During the development of this project, I used AI tools (Antigravity IDE) to help with:
- Debugging errors
- Generating code
- Structuring and drafting documentation.

I personally tested, reviewed, and adjusted all AI-generated code to make sure it worked properly, had good visual contrast in both light and dark modes. You can read the full breakdown in the [AI Usage Report](docs/ai-usage-report.md).
