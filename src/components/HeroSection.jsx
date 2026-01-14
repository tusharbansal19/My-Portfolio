import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
// import { useNavigate } from 'react-router-dom';

const imageMyPhoto = '/Image/myphoto.png';

const HeroSection = ({ setActiveSection, darkMode }) => {
  // const navigate = useNavigate();

  const handleShowExperience = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) timelineSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactMe = () => {
    window.open('https://drive.google.com/file/d/1kvvsuX5znWMxQ7gZTNU5fvlqVxzLIPLi/view?usp=sharing', '_blank');
    // const contactSection = document.getElementById('contact');
    // if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 pt-8 md:pt-6 pb-4 relative overflow-visible min-h-[600px]">
      {/* Cosmic Glow */}
      <div className="absolute -z-10 left-1/2 top-[250px] w-[600px] bg-blue-800 opacity-20 rounded-full blur-3xl animate-pulse" />

      {/* Hero Card */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-xl z-10 py-10 md:py-32">
        <h2 className="text-lg font-semibold text-[#a259ff] mb-2 tracking-widest uppercase" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', letterSpacing: '0.15em' }}>I am</h2>
        <div className="w-full flex flex-col items-start">
          {/* <span className="sr-only">TUSHAR BANSAL</span> */}
          <h1 className="w-full text-2xl md:text-4xl font-extrabold mb-4  drop-shadow-lg" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', letterSpacing: '0.08em', textShadow: '0 4px 24px #a259ff88, 0 1px 0 #fff' }}>
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-move">
              Tushar Bansal
            </span>
          </h1>
        </div>
        <div className="w-full text-1xl md:text-4xl font-extrabold mb-6" style={{ fontFamily: 'Montserrat, Poppins, sans-serif', letterSpacing: '0.05em' }}>
          <span className="text-lg font-semibold text-[#a259ff] mb-2 uppercase tracking-wider">a passionate</span> <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-move">
            <Typewriter
              words={['Web Developer', 'Frontend Developer', 'Backend Developer']}
              loop
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1200}
            />
          </span>
        </div>
        <p className="max-w-lg text-[#b18cff] mb-6 text-lg md:text-xl leading-relaxed" style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}>I build modern, responsive, and beautiful web applications with a passion for cosmic design and industry-level quality. Let's create something amazing together!</p>
        <button onClick={handleContactMe} className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition-transform mb-8">
          Contact Me
        </button>
      </div>

      {/* Circular Image with Cosmic Blue Rings */}
      <div className="flex-shrink-0 z-10 relative flex items-center justify-center w-[400px] h-[400px]">
        {/* Ring 1: Fast Spin, Inner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border-[3px] border-transparent border-t-cyan-500 border-r-blue-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          style={{ width: '310px', height: '310px' }}
        />

        {/* Ring 2: Medium Spin, Middle, split into 3 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border-[2px] border-transparent border-t-purple-500/60 border-b-cyan-500/60"
          style={{ width: '340px', height: '340px' }}
        />

        {/* Ring 3: Slow Spin, Outer, faint */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full border-[1px] border-transparent border-l-blue-500/30 border-r-purple-500/30"
          style={{ width: '380px', height: '380px' }}
        />

        {/* Main Image Container */}
        <div className="relative w-72 h-72 rounded-full p-2 bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-sm z-20">
          {/* Inner Glow Circle */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl animate-pulse"></div>

          <div className="w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.3)] relative z-10">
            <img
              src="/image/myphoto.png"
              alt="Tushar Bansal"
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;