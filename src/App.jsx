import React, { useState, useEffect } from 'react';
import { useTheme } from './hooks/useTheme';
import { useTelemetry } from './hooks/useTelemetry';

import TelemetryHud from './components/TelemetryHud';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import TerminalModal from './components/TerminalModal';
import Toast from './components/Toast';
import Footer from './components/Footer';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const { uptimeText, pingText } = useTelemetry();

  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeSection, setActiveSection] = useState('overview');

  // Handle global shortcuts for Terminal (~, Ctrl+K, Escape)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === '`' || e.key === '~') {
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
          e.preventDefault();
          setIsTerminalOpen(prev => !prev);
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
      } else if (e.key === 'Escape' && isTerminalOpen) {
        setIsTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isTerminalOpen]);

  // Setup ScrollSpy with IntersectionObserver
  useEffect(() => {
    const sectionIds = ['overview', 'projects', 'arsenal', 'timeline', 'contact'];
    const elements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: '-10% 0px -50% 0px' }
    );

    elements.forEach(el => observer.observe(el));
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  return (
    <>
      <TelemetryHud
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        activeSection={activeSection}
      />

      <main id="main-content">
        <Hero uptimeText={uptimeText} pingText={pingText} />
        <Projects />
        <Skills />
        <Timeline />
        <Contact onShowToast={triggerToast} />
      </main>

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onToggleTheme={toggleTheme}
      />

      <Toast message={toastMessage} />

      <Footer />
    </>
  );
}
