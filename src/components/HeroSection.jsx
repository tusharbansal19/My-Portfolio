import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowDown, FaDownload } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const imageMyPhoto = '/Image/myphoto.jpg';

const  HeroSection = ({ setActiveSection, darkMode }) => {
  const handleResumeDownload = () => {
    // Replace with your actual resume file path
    window.open('/resume.pdf', '_blank');
  };

  const handleShowExperience = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) timelineSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-[90vh] flex flex-col md:flex-row items-center justify-center gap-12 px-6 py-12 relative overflow-hidden">
      {/* Cosmic Glow */}
      <div className="absolute -z-10 left-1/2 top-1/3 w-[600px] h-[600px] bg-cyan-400 opacity-20 rounded-full blur-3xl animate-pulse" />
      {/* Hero Card */}
      <div className="flex-1 flex flex-col items-start justify-center max-w-xl z-10">
        <h2 className="text-lg font-semibold text-[#a259ff] mb-2 tracking-widest uppercase" style={{fontFamily: 'Montserrat, Poppins, sans-serif', letterSpacing: '0.15em'}}>I am</h2>
        <div className="w-full flex flex-col items-start">
          <span className="sr-only">TUSHAR BANSAL</span>
          <h1 className="w-full text-2xl md:text-4xl font-extrabold mb-4 drop-shadow-lg" style={{fontFamily: 'Montserrat, Poppins, sans-serif', letterSpacing: '0.08em', textShadow: '0 4px 24px #a259ff88, 0 1px 0 #fff'}}> 
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-move">
              Tushar Bansal
            </span>
          </h1>
        </div>
        <div className="w-full text-1xl md:text-4xl font-extrabold mb-6" style={{fontFamily: 'Montserrat, Poppins, sans-serif', letterSpacing: '0.05em'}}>
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
        <p className="max-w-lg text-[#b18cff] mb-6 text-lg md:text-xl leading-relaxed" style={{fontFamily: 'Montserrat, Poppins, sans-serif'}}>I build modern, responsive, and beautiful web applications with a passion for cosmic design and industry-level quality. Let's create something amazing together!</p>
        <button onClick={handleContactMe} className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold shadow-lg hover:scale-105 transition-transform mb-8">
          Contact Me
        </button>
        {/* Stats */}
        
      </div>
      {/* Angled Image Card */}
      <div className="flex-shrink-0 z-10">
        <div className="w-72 h-80 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-6 hover:rotate-3 transition-transform duration-500 relative bg-gradient-to-br from-purple-800/60 via-cyan-400/20 to-blue-900/60 backdrop-blur-xl border-4 border-purple-400/60" style={{boxShadow:'0 0 40px 10px #a259ff55, 0 2px 32px 0 #0008'}}>
          <img src="/images/myphoto.jpg" alt="TUSHAR BANSAL" className="w-60 h-72 object-cover rounded-xl shadow-lg border-4 border-[#a259ff]" />
          <div className="absolute -inset-1 rounded-2xl border-2 border-[#a259ff] opacity-60 blur-lg"></div>
        </div>
      </div>
     
    </section>
  );
};

export default HeroSection;