import React, { useState, useEffect, useRef } from 'react';
import { FaGraduationCap, FaUniversity, FaEnvelope, FaLinkedin, FaGithub, FaDownload } from 'react-icons/fa';
import TimelineComponent from './TimelineComponent';

const imageMyPhoto = import.meta.env.BASE_URL + 'Image/myphoto.jpg';

const AboutSection = ({ setActiveSection, darkMode = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Mouse tracking for subtle interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Intersection Observer for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
    >
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-20 transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(162, 89, 255, 0.1) 0%, transparent 60%)`
        }}
      />

      {/* Floating particles - minimal and subtle */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 10}%`,
              top: `${15 + i * 8}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className={`w-full max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Professional Card */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-white/20 group">
          
          {/* Unified Content Layout */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 p-8 lg:p-12">
            
            {/* Profile Image Section */}
            <div className="flex-shrink-0 relative">
              <div className="w-48 h-48 lg:w-56 lg:h-56 relative group/image">
                {/* Image container with unified background */}
                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-xl relative">
                  <img 
                    src={imageMyPhoto} 
                    alt="Tushar Bansal" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Subtle overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Professional status indicator */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full border-2 border-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-white text-transparent bg-clip-text">
                  Tushar Bansal
                </h2>
                <p className="text-lg lg:text-xl text-purple-300 font-medium mb-2">
                  Frontend & MERN Stack Developer
                </p>
                <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto lg:mx-0 rounded-full" />
              </div>

              {/* Professional Description */}
              <p className="text-slate-300 leading-relaxed mb-6 max-w-2xl">
                Passionate web developer specializing in modern, responsive applications with the MERN stack. 
                I create seamless user experiences through clean code, innovative design, and performance optimization.
              </p>

              {/* Professional Info Grid */}
              <div className="grid gap-3 mb-6">
                {[
                  { icon: FaGraduationCap, text: "B.Tech Computer Science (2026)" },
                  { icon: FaUniversity, text: "AKGEC, Ghaziabad" },
                  { icon: FaEnvelope, text: "tusharbansal3366@gmail.com" }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm lg:text-base text-slate-300 hover:text-white transition-colors duration-300 justify-center lg:justify-start"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                      <item.icon className="text-sm" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  onClick={() => {
                    const skillsSection = document.getElementById('skills');
                    if (skillsSection) skillsSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl font-semibold text-white text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Skills
                    <FaDownload className="text-xs group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <a href="https://www.linkedin.com/in/tushar-bansal-79aa6828b/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-white/20 rounded-xl font-semibold text-slate-300 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-105 text-sm flex items-center gap-2">
                  <FaLinkedin className="text-xs" />
                  Connect
                </a>
                
                <button
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 border border-white/20 rounded-xl font-semibold text-slate-300 hover:text-white hover:border-white/40 transition-all duration-300 hover:scale-105 text-sm flex items-center gap-2">
                  <FaGithub className="text-xs" />
                  Projects
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <div className="border-t border-white/10 bg-white/[0.02] px-8 lg:px-12 py-6">
            <div className="grid grid-cols-3 gap-6">
              {[
                { number: "50+", label: "Projects" },
                { number: "2+", label: "Years Exp." },
                { number: "100%", label: "Dedication" }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-xs lg:text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Skills Preview */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript'].map((skill, index) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .group:hover .group\/image img {
          transform: scale(1.02);
        }
      `}</style>
    </section>
    <TimelineComponent/>
    </>
  );
};

export default AboutSection;