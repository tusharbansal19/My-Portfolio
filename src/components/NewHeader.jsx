import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import "../index.css"

const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

const NewHeader = ({ activeSection, setActiveSection, darkMode, setDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setShowGoTop(currentScrollY > 200);
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setShowHeader(false);
          } else {
            setShowHeader(true);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 z-30 w-full bg-[#12002f] border-0 md:bg-opacity-0 md:shadow-lg border-b md:border-b-0 md:border-[#2d1457] transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`} style={{marginTop: '0px'}}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 min-w-[150px]">
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-move">
              TUSHAR BANSAL
            </span>
          </div>
          {/* Centered Nav Links in a pill container (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex gap-2 px-2 py-1 bg-[#1a1040] rounded-full shadow-inner">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-6 py-2 rounded-full font-semibold text-lg transition-all duration-200 relative
                    ${activeSection === link.id ? 'bg-[#a259ff] text-white shadow-md' : 'text-[#b18cff] hover:bg-[#2d1457] hover:text-white'}`}
                  style={{fontWeight: activeSection === link.id ? 700 : 500}}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          {/* Right-aligned icons/theme toggle */}
          <div className="flex items-center gap-4 min-w-[150px] justify-end">
            <a href="https://github.com/tusharbansal19" target="_blank" rel="noopener noreferrer" className="text-[#b18cff] hover:text-white text-xl"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/tushar-bansal-79aa6828b/" target="_blank" rel="noopener noreferrer" className="text-[#b18cff] hover:text-white text-xl"><FaLinkedin /></a>
           
            {/* Hamburger for mobile */}
            <button className="md:hidden text-[#b18cff] text-2xl ml-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
        {/* Mobile Nav Dropdown */}
        {mobileOpen && (
          <nav className="md:hidden bg-[#12002f] px-4 pb-4 pt-2 flex flex-col gap-2 shadow-lg border-b border-[#2d1457] animate-fade-in-down">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full text-left px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200
                  ${activeSection === link.id ? 'bg-[#a259ff] text-white shadow-md' : 'text-[#b18cff] hover:bg-[#2d1457] hover:text-white'}`}
                style={{fontWeight: activeSection === link.id ? 700 : 500}}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>
      {/* Go to Top Button */}
      {showGoTop && (
        <button
          onClick={handleGoTop}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce flex items-center justify-center"
          aria-label="Go to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

export default NewHeader; 