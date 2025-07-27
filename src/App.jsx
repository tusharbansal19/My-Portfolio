import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import NewHeader from './components/NewHeader';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import StarBackground from './components/StarBackground';
import FloatingNav from './components/FloatingNav';
import ScrollToTop from './components/ScrollToTop';
import TimelineComponent from './components/TimelineComponent';
import ChatBot from './components/ChatBot';
import './App.css';


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // Initialize scroll spy
    scrollSpy.update();
    
    // Add scroll event listener for section detection
    const handleScroll = () => {
      const sections = ['hero', 'about', 'timeline', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for header
      
      let currentSection = 'hero';
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop) {
            currentSection = sections[i];
            break;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollTo = (element) => {
    scroller.scrollTo(element, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };
  
  return (
    <div className={`font-sans min-' flex flex-col relative scroll-smooth`}>
      <StarBackground />
      <NewHeader activeSection={activeSection} setActiveSection={setActiveSection} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 overflow-y-auto">
        <Element name="hero" className="element">
          <motion.section 
            id="hero"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection setActiveSection={setActiveSection} darkMode={darkMode} />
          </motion.section>
        </Element>
        
        <Element name="about" className="element">
          <motion.section 
            id="about"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
            onViewportEnter={() => {
              console.log('About section entered viewport');
              setActiveSection('about');
            }}
          >

            <AboutSection setActiveSection={setActiveSection} darkMode={darkMode} />
          </motion.section>
        </Element>
        
        {/* Timeline Section */}
        <Element name="timeline" className="element">
          <motion.section 
            id="timeline"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <TimelineComponent />
          </motion.section>
        </Element>
        
        <Element name="skills" className="element">
          <motion.section 
            id="skills"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <SkillsSection setActiveSection={setActiveSection} darkMode={darkMode} />
          </motion.section>
        </Element>
        
        <Element name="projects" className="element">
          <motion.section 
            id="projects"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProjectsSection setActiveSection={setActiveSection} darkMode={darkMode} />
          </motion.section>
        </Element>
        
        <Element name="achievements" className="element">
          <motion.section 
            id="achievements"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <AchievementsSection setActiveSection={setActiveSection} darkMode={darkMode} />
          </motion.section>
        </Element>
        
        <Element name="contact" className="element">
          <motion.section 
            id="contact"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <ContactSection setActiveSection={setActiveSection} darkMode={darkMode} />
          </motion.section>
        </Element>
      </main>
        
      <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />
     
      <ChatBot />
    </div>
  );
}

export default App;
