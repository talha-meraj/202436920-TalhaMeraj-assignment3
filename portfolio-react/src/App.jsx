import { useState, useEffect } from 'react';
import Hero from './components/layout/Hero';
import Navbar from './components/layout/Navbar';
import About from './components/sections/About';
import Footer from './components/layout/Footer';

export default function App() {
  // 1. Theme State: default to dark, or retrieve saved preference
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme-v2') || 'dark';
  });

  // 2. Sync theme attribute on document root and persist in localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme-v2', theme);
  }, [theme]);

  // 3. Toggle between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="site-wrapper">
      <Hero />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-card">
        <About />
      </main>
      <Footer />
    </div>
  );
}
