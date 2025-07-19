import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import NewHeader from './components/NewHeader';
import HeroSection from './components/HeroSection';
import StarBackground from './components/StarBackground';
import FloatingNav from './components/FloatingNav';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import { debounce, shouldReduceMotion } from './utils/performance';
import './App.css';

// Lazy load heavy components
const AboutSection = lazy(() => import('./components/AboutSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const AchievementsSection = lazy(() => import('./components/AchievementsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const TimelineComponent = lazy(() => import('./components/TimelineComponent'));

// Loading component for lazy loaded sections
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(shouldReduceMotion());

  // Optimized scroll handler with debouncing
  const handleScroll = useCallback(() => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    
    const sections = ['hero', 'about', 'timeline', 'skills', 'projects', 'achievements', 'contact'];
    const scrollPosition = window.scrollY + 150;
    
    let currentSection = 'hero';
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const sectionTop = section.offsetTop;
        
        if (scrollPosition >= sectionTop) {
          currentSection = sections[i];
          break;
        }
      }
    }
    
    setActiveSection(currentSection);
    
    // Debounce scroll events
    setTimeout(() => {
      setIsScrolling(false);
    }, 100);
  }, [isScrolling]);

  // Debounced scroll handler
  const debouncedScrollHandler = useCallback(
    debounce(handleScroll, 16), // ~60fps
    [handleScroll]
  );

  useEffect(() => {
    // Initialize scroll spy
    scrollSpy.update();
    
    // Use passive scroll listener for better performance
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', debouncedScrollHandler);
    };
  }, [debouncedScrollHandler, handleScroll]);

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const scrollTo = (element) => {
    scroller.scrollTo(element, {
      duration: reduceMotion ? 400 : 800, // Faster on mobile/reduced motion
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  // Animation variants based on motion preference
  const sectionVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 20 : 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: reduceMotion ? 0.3 : 0.6,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <div className={`font-sans min-h-screen flex flex-col relative scroll-smooth`}>
      <StarBackground />
      <NewHeader activeSection={activeSection} setActiveSection={setActiveSection} darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-1 overflow-y-auto">
        <Element name="hero" className="element">
          <motion.section 
            id="hero"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroSection setActiveSection={setActiveSection} darkMode={darkMode} />
          </motion.section>
        </Element>
        
        <Element name="about" className="element">
          <Suspense fallback={<SectionLoader />}>
            <motion.section 
              id="about"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              onViewportEnter={() => {
                setActiveSection('about');
              }}
            >
              <AboutSection setActiveSection={setActiveSection} darkMode={darkMode} />
            </motion.section>
          </Suspense>
        </Element>
        
        {/* Timeline Section */}
        <Element name="timeline" className="element">
          <Suspense fallback={<SectionLoader />}>
            <motion.section 
              id="timeline"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <TimelineComponent />
            </motion.section>
          </Suspense>
        </Element>
        
        <Element name="skills" className="element">
          <Suspense fallback={<SectionLoader />}>
            <motion.section 
              id="skills"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SkillsSection setActiveSection={setActiveSection} darkMode={darkMode} />
            </motion.section>
          </Suspense>
        </Element>
        
        <Element name="projects" className="element">
          <Suspense fallback={<SectionLoader />}>
            <motion.section 
              id="projects"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ProjectsSection setActiveSection={setActiveSection} darkMode={darkMode} />
            </motion.section>
          </Suspense>
        </Element>
        
        <Element name="achievements" className="element">
          <Suspense fallback={<SectionLoader />}>
            <motion.section 
              id="achievements"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <AchievementsSection setActiveSection={setActiveSection} darkMode={darkMode} />
            </motion.section>
          </Suspense>
        </Element>
        
        <Element name="contact" className="element">
          <Suspense fallback={<SectionLoader />}>
            <motion.section 
              id="contact"
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <ContactSection setActiveSection={setActiveSection} darkMode={darkMode} />
            </motion.section>
          </Suspense>
        </Element>
      </main>
        
      <FloatingNav activeSection={activeSection} setActiveSection={setActiveSection} />
     
      <ChatBot />
    </div>
  );
}

export default App;
