import React, { useState } from 'react';
import NewHeader from './components/NewHeader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import StarBackground from './components/StarBackground';
import './App.css';


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  
  return (
    <div className={`font-sans min-h-screen flex flex-col relative`}>
      <StarBackground />
      <NewHeader activeSection={activeSection} setActiveSection={setActiveSection} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 overflow-y-auto">
        <section id="hero"><HeroSection setActiveSection={setActiveSection} darkMode={darkMode} /></section>
        <section id="about"><AboutSection setActiveSection={setActiveSection} darkMode={darkMode} /></section>
        <section id="skills"><SkillsSection setActiveSection={setActiveSection} darkMode={darkMode} /></section>
        <section id="projects"><ProjectsSection setActiveSection={setActiveSection} darkMode={darkMode} /></section>
        <section id="achievements"><AchievementsSection setActiveSection={setActiveSection} darkMode={darkMode} /></section>
        <section id="contact"><ContactSection setActiveSection={setActiveSection} darkMode={darkMode} /></section>
      </main>
    </div>
  );
}

export default App;
