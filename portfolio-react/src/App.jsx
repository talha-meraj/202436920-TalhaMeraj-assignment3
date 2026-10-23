import { useState, useEffect } from 'react';
import Hero from './components/layout/Hero';
import Navbar from './components/layout/Navbar';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Footer from './components/layout/Footer';

export default function App() {
  // 1. Global Theme State: dark by default or restored from localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme-v2') || 'dark';
  });

  // 2. Synchronize data-theme on <html> root element and persist in localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme-v2', theme);
  }, [theme]);

  // 3. Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="site-wrapper">
      <Hero />
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="main-card">
        <About />
        <Projects />
      </main>

      <Footer />
    </div>
  );
}
