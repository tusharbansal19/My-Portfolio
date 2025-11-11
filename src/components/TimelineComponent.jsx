import { FaSchool, FaGraduationCap, FaUniversity, FaCode, FaBriefcase, FaCalendarAlt } from "react-icons/fa";

const TimelineComponent = () => {
  const timelineData = [
    {
      year: "2020",
      title: "Class 10th Completion",
      subtitle: "Sunrise Public School",
      description: "Successfully completed secondary education with strong foundation in mathematics and science.",
      icon: FaSchool,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      year: "2022",
      title: "Class 12th Completion",
      subtitle: "Sunrise Public School",
      description: "Completed higher secondary education with focus on PCM (Physics, Chemistry, Mathematics).",
      icon: FaGraduationCap,
      iconColor: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      year: "2022 - Present",
      title: "B.Tech Computer Science",
      subtitle: "Ajay Kumar Garg Engineering College",
      description: "Currently pursuing Bachelor of Technology in Computer Science & Engineering with specialization in modern web technologies.",
      icon: FaUniversity,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      year: "2024",
      title: "Typing Web App Internship",
      subtitle: "AKGEC - College Project",
      description: "Developed a comprehensive typing speed test application using React.js with real-time analytics and user progress tracking.",
      icon: FaCode,
      iconColor: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      skills: ["React.js", "JavaScript", "CSS3", "Local Storage"]
    },
    {
      year: "2025",
      title: "SaathPhereAsWorldwide Internship",
      subtitle: "The Heion Group",
      description: "Working on full-stack development projects with modern technologies, contributing to real-world applications and gaining industry experience.",
      icon: FaBriefcase,
      iconColor: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
      skills: ["MERN Stack", "Node.js", "MongoDB", "Express.js", "React.js"]
    }
  ];

  return (
    <section className="py-8 px-4 relative overflow-hidden bg-transparent">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 text-transparent bg-clip-text">
          My Journey
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          From academic foundations to professional growth - exploring my educational and career milestones
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mt-6 rounded-full" />
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {timelineData.map((item, index) => (
            <div key={index} className="mb-8 flex items-start gap-6">
              {/* Custom Timeline Icon */}
              <div className="flex flex-col items-center">
                <div className={`p-3 ${item.bgColor} ${item.borderColor} border-2 rounded-full flex items-center justify-center`}>
                  <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                </div>
                {index < timelineData.length - 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-purple-400 to-cyan-400 mt-4"></div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="mb-4">
                  <div className="text-purple-300 font-semibold flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="text-sm" />
                    {item.year}
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {item.title}
                  </h3>
                </div>
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 shadow-2xl">
                  <div className="flex items-center gap-2 mb-3 text-purple-300">
                    <h4 className="text-base font-semibold">
                      {item.subtitle}
                    </h4>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  {/* Skills for internships */}
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
                            className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-white/20 rounded-full text-white hover:bg-white/10 transition-all duration-300 cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-8">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-500 shadow-2xl">
            <h3 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-purple-300 to-cyan-300 text-transparent bg-clip-text">
              Journey Highlights
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "5", label: "Milestones", icon: FaSchool },
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