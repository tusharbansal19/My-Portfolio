import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingTextClouds = ({ onStateChange }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const messages = [
    "I can help you navigate!",
    "Ask me about Tushar's skills!",
    "I'm Tushar's AI assistant!",
    "Want to see projects?",
    "I can show you the timeline!",
    "Ask about achievements!",
    "Need contact info?",
    "I'm here to help!",
    "Tushar is my master!",
    "Let's explore together!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % messages.length);
      // Trigger cloud state when text changes
      if (onStateChange) {
        onStateChange('cloud');
        // Reset to idle after 1 second
        setTimeout(() => {
          onStateChange('idle');
        }, 1000);
      }
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [messages.length, onStateChange]);

  return (
    <div className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-2 sm:right-4 md:right-6 pointer-events-none z-50">
      {/* Single floating cloud on the left side of the robot image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTextIndex}
          initial={{ opacity: 0, x: -20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-12 sm:bottom-16 md:bottom-20 right-full transform translate-x-1 sm:translate-x-2 -translate-y-1/2"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-4 py-3 sm:py-2 max-w-[80px] sm:max-w-[120px] md:max-w-full shadow-lg border border-gray-200 floating-cloud">
            <p className="text-xs sm:text-sm font-medium text-gray-700 leading-tight text-center">
              {messages[currentTextIndex]}
            </p>
          </div>
          {/* Cloud tail pointing right to the robot */}
          <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-l-6 border-transparent border-l-white/90 cloud-tail"></div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FloatingTextClouds; 