import React, { useEffect, useState, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaTools, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiNextdotjs, SiExpress, SiTailwindcss, SiReact, SiRedux, SiBootstrap, SiPostman, SiMysql } from 'react-icons/si';

const allLeftSkills = [
  { name: 'HTML', icon: <FaHtml5 /> },
  { name: 'CSS', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'C/C++', icon: <FaTools /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Java', icon: <FaJava /> },
  { name: 'SQL', icon: <FaTools /> },
  { name: 'Redux', icon: <SiRedux /> },
  { name: 'Bootstrap', icon: <SiBootstrap /> },
  { name: 'Git & GitHub', icon: <FaGitAlt /> },
  { name: 'Postman', icon: <SiPostman /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'Mongoose', icon: <FaTools /> },
  { name: 'Axios', icon: <FaTools /> },
];

// Split skills into two columns
const mid = Math.ceil(allLeftSkills.length / 2);
const leftCol = allLeftSkills.slice(0, mid);
const rightCol = allLeftSkills.slice(mid);

const coreSkills = [
  { name: 'MongoDB', icon: <SiMongodb />, value: 75 },
  { name: 'React', icon: <SiReact />, value: 85 },
  { name: 'Next.js', icon: <SiNextdotjs />, value: 80 },
  { name: 'Express', icon: <SiExpress />, value: 80 },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, value: 85 },
];

const SkillsSection = () => {
  // Animated progress state
  const [progress, setProgress] = useState(coreSkills.map(() => 0));
  const sectionRef = useRef(null);

  useEffect(() => {
    let observer;
    let intervals = [];
    const animateBars = () => {
      setProgress(coreSkills.map(() => 0));
      intervals = coreSkills.map((skill, idx) => {
        return setInterval(() => {
          setProgress(prev => {
            const next = [...prev];
            if (next[idx] < skill.value) {
              next[idx] = Math.min(next[idx] + 1, skill.value);
            }
            return next;
          });
        }, 12);
      });
    };
    if (sectionRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            animateBars();
          } else {
            setProgress(coreSkills.map(() => 0));
            intervals.forEach(clearInterval);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(sectionRef.current);
    }
    return () => {
      if (observer && sectionRef.current) observer.disconnect();
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center gap-6 px-4 py-8 relative overflow-hidden">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Skills List in Two Columns */}
        <div className="rounded-2xl shadow-xl glass-effect border border-blue-900 bg-[#18122b] p-6 flex flex-col gap-6 min-h-[260px] animate-glow">
          <h3 className="text-xl font-bold text-white mb-2">Skills</h3>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
            <ul className="flex flex-col gap-3">
              {leftCol.map(skill => (
                <li key={skill.name} className="flex items-center gap-2 text-[#b18cff] text-lg">
                  <span className="text-2xl text-[#a259ff] drop-shadow-glow">{skill.icon}</span> {skill.name}
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {rightCol.map(skill => (
                <li key={skill.name} className="flex items-center gap-2 text-[#b18cff] text-lg">
                  <span className="text-2xl text-[#a259ff] drop-shadow-glow">{skill.icon}</span> {skill.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Right: Core Skills Ranges */}
        <div className="rounded-2xl shadow-xl glass-effect border border-blue-900 bg-[#18122b] p-6 flex flex-col gap-4 min-h-[260px] animate-glow">
          <h3 className="text-xl font-bold text-white mb-2">Core Skills</h3>
          <ul className="flex flex-col gap-5 mt-4">
            {coreSkills.map((skill, i) => (
              <li key={skill.name} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg text-[#a259ff] drop-shadow-glow">{skill.icon}</span>
                  <span className="text-[#b18cff] font-semibold">{skill.name}</span>
                  <span className="ml-auto text-xs text-[#b18cff]">{progress[i]}%</span>
                </div>
                <div className="w-full h-2 bg-[#2d1457] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#a259ff] to-[#b18cff] rounded-full transition-all duration-700 animate-progress-bar" style={{width: `${progress[i]}%`}} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 