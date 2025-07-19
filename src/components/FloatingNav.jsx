import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { 
  HomeIcon, 
  UserIcon, 
  CodeBracketIcon, 
  FolderIcon, 
  TrophyIcon, 
  EnvelopeIcon,
  PlusIcon,
  XMarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const FloatingNav = ({ activeSection, setActiveSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', icon: HomeIcon, label: 'Home' },
    { id: 'about', icon: UserIcon, label: 'About' },
    { id: 'timeline', icon: ClockIcon, label: 'Timeline' },
    { id: 'skills', icon: CodeBracketIcon, label: 'Skills' },
    { id: 'projects', icon: FolderIcon, label: 'Projects' },
    { id: 'achievements', icon: TrophyIcon, label: 'Achievements' },
    { id: 'contact', icon: EnvelopeIcon, label: 'Contact' }
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 floating-nav">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 left-0 space-y-2 sm:space-y-3"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, scale: 0.8 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: -20, 
                  scale: 0.8,
                  transition: { delay: (navItems.length - index - 1) * 0.05 }
                }}
              >
                <Link
                  to={item.id}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={800}
                  onClick={() => handleNavClick(item.id)}
                  className={`block p-2 sm:p-3 rounded-full shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-110 relative group ${
                    activeSection === item.id
                      ? 'bg-blue-500 text-white shadow-blue-500/50 nav-active'
                      : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-blue-100'
                  }`}
                  title={item.label}
                >
                  <item.icon className="w-4 h-4 sm:w-6 sm:h-6" />
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs sm:text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`p-3 sm:p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500 text-white shadow-red-500/50' 
            : 'bg-blue-500 text-white shadow-blue-500/50 hover:bg-blue-600'
        }`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <XMarkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <PlusIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

export default FloatingNav; 