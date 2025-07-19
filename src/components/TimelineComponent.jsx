import React, { useState, useEffect, useRef } from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaGraduationCap, FaSchool, FaUniversity, FaBriefcase, FaCode, FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const TimelineComponent = ({ darkMode = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredElement, setHoveredElement] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef(null);

  // Debug logging
  useEffect(() => {
    setIsLoaded(true);
    
    // Fallback: Force visibility after 2 seconds if not visible
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        setIsVisible(true);
      }
    }, 2000);
    
    return () => clearTimeout(fallbackTimer);
  }, [isVisible]);

  // Mouse tracking for interactive effects
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
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' // Trigger when 100px from bottom
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const timelineData = [
    {
      id: 1,
      date: '2020',
      title: 'Class 10th Completion',
      subtitle: 'Sunrise Public School',
      description: 'Successfully completed secondary education with strong foundation in mathematics and science.',
      icon: FaSchool,
      iconBg: 'from-blue-500 to-cyan-500',
      cardBg: 'from-blue-500/10 to-cyan-500/10',
      type: 'education',
      achievement: 'Academic Excellence'
    },
    {
      id: 2,
      date: '2022',
      title: 'Class 12th Completion',
      subtitle: 'Sunrise Public School',
      description: 'Completed higher secondary education with focus on PCM (Physics, Chemistry, Mathematics).',
      icon: FaGraduationCap,
      iconBg: 'from-green-500 to-emerald-500',
      cardBg: 'from-green-500/10 to-emerald-500/10',
      type: 'education',
      achievement: 'Science Stream'
    },
    {
      id: 3,
      date: '2022 - Present',
      title: 'B.Tech Computer Science',
      subtitle: 'Ajay Kumar Garg Engineering College',
      description: 'Currently pursuing Bachelor of Technology in Computer Science & Engineering with specialization in modern web technologies.',
      icon: FaUniversity,
      iconBg: 'from-purple-500 to-violet-500',
      cardBg: 'from-purple-500/10 to-violet-500/10',
      type: 'education',
      achievement: 'Engineering Student'
    },
    {
      id: 4,
      date: '2024',
      title: 'Typing Web App Internship',
      subtitle: 'AKGEC - College Project',
      description: 'Developed a comprehensive typing speed test application using React.js with real-time analytics and user progress tracking.',
      icon: FaCode,
      iconBg: 'from-orange-500 to-red-500',
      cardBg: 'from-orange-500/10 to-red-500/10',
      type: 'internship',
      achievement: 'First Internship',
      skills: ['React.js', 'JavaScript', 'CSS3', 'Local Storage']
    },
    {
      id: 5,
      date: '2025',
      title: 'SaathPhereAsWorldwide Internship',
      subtitle: 'The Heion Group',
      description: 'Working on full-stack development projects with modern technologies, contributing to real-world applications and gaining industry experience.',
      icon: FaBriefcase,
      iconBg: 'from-pink-500 to-rose-500',
      cardBg: 'from-pink-500/10 to-rose-500/10',
      type: 'internship',
      achievement: 'Industry Experience',
      skills: ['MERN Stack', 'Node.js', 'MongoDB', 'Express.js', 'React.js']
    }
  ];

  const getTypeColor = (type) => {
    switch(type) {
      case 'education': return 'text-blue-400';
      case 'internship': return 'text-green-400';
      default: return 'text-purple-400';
    }
  };

  // Fallback if component fails to load
  if (!isLoaded) {
    return (
      <section className="min-h-screen py-16 px-4 relative overflow-hidden flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Loading Timeline...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="timeline"
      className="min-h-screen py-16 px-4 relative overflow-hidden"
      style={{
        background: 'transparent',
        zIndex: 1,
        position: 'relative'
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 text-transparent bg-clip-text">
          My Journey
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          From academic foundations to professional growth - exploring my educational and career milestones
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mt-6 rounded-full" />
      </div>

      {/* Timeline */}
      <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <VerticalTimeline
          animate={true}
          lineColor="rgba(162, 89, 255, 0.3)"
          className="vertical-timeline"
        >
          {timelineData.map((item, index) => (
            <VerticalTimelineElement
              key={item.id}
              className="vertical-timeline-element"
              contentStyle={{
                background: 'rgba(30, 30, 60, 0.25)',
                border: hoveredElement === item.id 
                  ? '2px solid rgba(162, 89, 255, 0.7)'
                  : '1.5px solid rgba(255,255,255,0.15)',
                borderRadius: '20px',
                boxShadow: hoveredElement === item.id 
                  ? '0 0 32px 8px rgba(162, 89, 255, 0.4), 0 2px 32px 0 rgba(0,0,0,0.25)'
                  : '0 2px 24px 0 rgba(0,0,0,0.18)',
                backdropFilter: 'blur(18px) saturate(160%)',
                WebkitBackdropFilter: 'blur(18px) saturate(160%)',
                color: '#fff',
                transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
                width: '45%',
                margin: '0 auto'
              }}
              contentArrowStyle={{
                borderRight: '7px solid rgba(162, 89, 255, 0.25)'
              }}
              date=""
              iconStyle={{
                background: hoveredElement === item.id
                  ? 'radial-gradient(circle, rgba(162,89,255,0.7) 0%, rgba(56,178,172,0.5) 100%)'
                  : 'radial-gradient(circle, rgba(162,89,255,0.4) 0%, rgba(56,178,172,0.2) 100%)',
                border: hoveredElement === item.id
                  ? '3px solid rgba(162, 89, 255, 0.7)'
                  : '3px solid rgba(255,255,255,0.18)',
                boxShadow:
                  item.type === 'education'
                    ? '0 0 24px 6px #38bdf8, 0 0 8px 2px #a259ff'
                  : item.type === 'internship'
                    ? '0 0 24px 6px #34d399, 0 0 8px 2px #f472b6'
                  : '0 0 24px 6px #a259ff, 0 0 8px 2px #fff',
                transition: 'all 0.3s cubic-bezier(.4,2,.3,1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                color: 'white',
                fontSize: '20px'
              }}
              icon={<item.icon />}
              onMouseEnter={() => setHoveredElement(item.id)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <div className="relative">
                {/* Achievement Badge */}
                <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-black text-xs font-bold rounded-full flex items-center gap-1">
                  <FaStar className="text-xs" />
                  {item.achievement}
                </div>

                {/* Type Badge */}
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium mb-3 ${getTypeColor(item.type)} bg-white/10`}>
                  {item.type === 'education' ? <FaGraduationCap /> : <FaBriefcase />}
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </div>

                {/* Date Card */}
                <div className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold mb-3 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/20 text-purple-300 hover:bg-white/10 transition-all duration-300">
                  <FaCalendarAlt className="text-sm" />
                  {item.date}
                </div>

                {/* Title and Subtitle */}
                <h3 className="text-xl font-bold mb-2 text-white">
                  {item.title}
                </h3>
                
                <div className="flex items-center gap-2 mb-3 text-purple-300">
                  <FaMapMarkerAlt className="text-sm" />
                  <h4 className="text-base font-semibold">
                    {item.subtitle}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-slate-300 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Skills (for internships) */}
                {item.skills && (
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-cyan-300 mb-2 flex items-center gap-1">
                      <FaCode className="text-xs" />
                      Technologies Used:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Interactive Elements */}
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    {item.type === 'internship' ? 'Professional Experience' : 'Academic Achievement'}
                  </div>
                  
                  {hoveredElement === item.id && (
                    <div className="text-xs text-purple-300 animate-pulse">
                      ✨ Hover for details
                    </div>
                  )}
                </div>
              </div>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      {/* Stats Summary */}
      <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 shadow-2xl" style={{background:'rgba(30,30,60,0.25)', boxShadow:'0 0 32px 8px rgba(162, 89, 255, 0.18)'}}>
            <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 to-cyan-300 text-transparent bg-clip-text">
              Journey Highlights
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "5", label: "Milestones", icon: FaStar },
                { number: "2", label: "Internships", icon: FaBriefcase },
                { number: "3", label: "Institutions", icon: FaUniversity },
                { number: "2025", label: "Current Year", icon: FaCalendarAlt }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/20 rounded-xl flex items-center justify-center text-purple-300 group-hover:text-white transition-colors duration-300">
                    <stat.icon />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineComponent;