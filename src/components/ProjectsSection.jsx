import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ExternalLink, Github, Calendar, User, Code, Award, Eye, Heart, Star } from 'lucide-react';

const projects = [
  {
    id: 'niyukti-setu',
    title: 'DRDO Project: Niyukti Setu',
    subtitle: 'Official Interview Platform',
    description: 'A web application for online official interviews, built for DRDO. Features secure authentication, real-time scheduling, and robust admin controls.',
    detailedDescription: 'Developed for DRDO, Niyukti Setu streamlines the official interview process with OTP authentication, user validation, and multi-role access. Built with a modern stack for reliability and scalability.',
    image: '/Image/niyukti.png',
    category: 'Government',
    status: '',
    timeline: '2 months',
    teamSize: '5 developers',
    technologies: [
      { name: 'React 18', category: 'Frontend', color: 'blue' },
      { name: 'Node.js', category: 'Backend', color: 'green' },
      { name: 'MongoDB', category: 'Database', color: 'purple' },
      { name: 'Express.js', category: 'Backend', color: 'green' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' },
      { name: 'Redux', category: 'State', color: 'purple' }
    ],
    metrics: {
      users: '10K+',
      performance: '98%',
      uptime: '99.9%'
    },
    features: [
      'OTP Authentication & User Validation',
      'Role-based Access Control',
      'Real-time Interview Scheduling',
      'Comprehensive Admin Dashboard',
      'Multi-user Video Conferencing',
      'Secure Data Management'
    ],
    challenges: [
      'Ensuring data security',
      'Scalable video conferencing',
      'Role management'
    ],
    achievements: [],
    links: {
      live: '',
      github: 'https://github.com/PrajjwalVajpayee/niyuktisetu',
      case_study: ''
    },
    meta: [
      { label: 'Role', value: 'Full Stack Lead', icon: User },
      { label: 'Duration', value: '2 months', icon: Calendar },
      { label: 'Team', value: '5 developers', icon: User },
      { label: 'Status', value: 'Completed', icon: Award }
    ]
  },
  {
    id: 'task-manager',
    title: 'Task Manager Web App',
    subtitle: 'Full-Stack Task Management',
    description: 'A full-stack web app for managing tasks, with real-time synchronization, CRUD operations, and user authentication.',
    detailedDescription: 'Designed for productivity, this app allows users to create, update, and track tasks in real time. Features include collaborative task boards, notifications, and a responsive UI.',
    image: '/Image/weather.png',
    category: 'Productivity',
    status: '',
    timeline: '2 months',
    teamSize: '4 developers',
    technologies: [
      { name: 'React', category: 'Frontend', color: 'blue' },
      { name: 'Node.js', category: 'Backend', color: 'green' },
      { name: 'Express.js', category: 'Backend', color: 'green' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' }
    ],
    metrics: {
      users: '2K+',
      performance: '90%',
      uptime: '99%'
    },
    features: [
      'Real-time Task Synchronization',
      'Collaborative Task Boards',
      'CRUD Operations',
      'User Authentication',
      'Responsive UI/UX',
      'Notifications System'
    ],
    challenges: [
      'Real-time data sync',
      'User management',
      'Cross-device compatibility'
    ],
    achievements: [
      'Enabled team collaboration',
      'Improved productivity by 30%'
    ],
    links: {
      live: '',
      github: 'https://github.com/tusharbansal19/TaskManagement',
      case_study: ''
    },
    meta: [
      { label: 'Role', value: 'Frontend Lead', icon: User },
      { label: 'Duration', value: '2 months', icon: Calendar },
      { label: 'Team', value: '4 developers', icon: User },
      { label: 'Status', value: 'Completed', icon: Award }
    ]
  },
  {
    id: 'grabeats',
    title: 'E-commerce Platform – GrabEats',
    subtitle: 'Real-time Food Ordering System',
    description: 'A real-time food ordering platform with OTP authentication, user validation, and multi-image support. Features RESTful APIs, responsive UI/UX, and cross-device compatibility.',
    detailedDescription: 'Built for seamless food ordering, GrabEats supports real-time order tracking, secure payments, and a scalable backend. Utilizes modern web technologies for a fast, reliable experience.',
    image: '/Image/niyukti.png',
    category: 'E-commerce',
    status: '',
    timeline: '1 month',
    teamSize: '3 developers',
    technologies: [
      { name: 'React', category: 'Frontend', color: 'blue' },
      { name: 'Next.js', category: 'Frontend', color: 'purple' },
      { name: 'Node.js', category: 'Backend', color: 'green' },
      { name: 'MongoDB', category: 'Database', color: 'green' },
      { name: 'D3.js', category: 'Visualization', color: 'orange' },
      { name: 'WebRTC', category: 'Real-time', color: 'red' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' }
    ],
    metrics: {
      users: '5K+',
      performance: '93%',
      uptime: '99.5%'
    },
    features: [
      'OTP Authentication',
      'Real-time Order Tracking',
      'Multi-image Product Support',
      'RESTful APIs',
      'Responsive UI/UX',
      'Cross-device Compatibility',
      'Secure Payments',
      'Scalable Backend'
    ],
    challenges: [
      'Real-time order updates',
      'Payment integration',
      'Image optimization'
    ],
    achievements: [
      'Launched in 1 month',
      'Handled 5K+ users at launch'
    ],
    links: {
      live: '',
      github: 'https://github.com/tusharbansal19/GrabEats',
      case_study: ''
    },
    meta: [
      { label: 'Role', value: 'Backend Lead', icon: User },
      { label: 'Duration', value: '1 month', icon: Calendar },
      { label: 'Team', value: '3 developers', icon: User },
      { label: 'Status', value: 'Completed', icon: Award }
    ]
  },
  {
    id: 'tushar-automobiles',
    title: 'Tushar Automobiles – Auto Parts E-commerce Website',
    subtitle: 'Auto Parts E-commerce',
    description: 'A commercial automobile parts web platform using Next.js and Prisma, featuring dynamic product filtering, server-side rendering, and a mobile-first responsive layout.',
    detailedDescription: 'Developed a robust auto parts e-commerce site with advanced filtering, SSR, and seamless mobile experience. Built with Next.js, Prisma, and modern UI libraries.',
    image: '/Image/niyukti.png',
    category: 'E-commerce',
    status: '',
    timeline: '1 month',
    teamSize: '2 developers',
    technologies: [
      { name: 'Next.js', category: 'Frontend', color: 'purple' },
      { name: 'Prisma', category: 'ORM', color: 'blue' },
      { name: 'React', category: 'Frontend', color: 'blue' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' }
    ],
    metrics: {
      users: '1K+',
      performance: '90%',
      uptime: '99%'
    },
    features: [
      'Dynamic Product Filtering',
      'Server-side Rendering (SSR)',
      'Mobile-first Responsive Layout',
      'Modern UI/UX',
      'Secure Checkout',
      'Admin Dashboard'
    ],
    challenges: [
      'SSR optimization',
      'Product data management',
      'Mobile UX'
    ],
    achievements: [
      'Launched in 1 month',
      'Positive client feedback'
    ],
    links: {
      live: '',
      github: 'https://github.com/tusharbansal19/automobiles-next',
      case_study: ''
    },
    meta: [
      { label: 'Role', value: 'Full Stack', icon: User },
      { label: 'Duration', value: '1 month', icon: Calendar },
      { label: 'Team', value: '2 developers', icon: User },
      { label: 'Status', value: 'Completed', icon: Award }
    ]
  }
];

function ProjectCard({ project, reverse, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getTechColor = (color) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/30 border-blue-400/30 text-blue-200',
      green: 'from-green-500/20 to-green-600/30 border-green-400/30 text-green-200',
      purple: 'from-purple-500/20 to-purple-600/30 border-purple-400/30 text-purple-200',
      red: 'from-red-500/20 to-red-600/30 border-red-400/30 text-red-200',
      orange: 'from-orange-500/20 to-orange-600/30 border-orange-400/30 text-orange-200',
      cyan: 'from-cyan-500/20 to-cyan-600/30 border-cyan-400/30 text-cyan-200',
      yellow: 'from-yellow-500/20 to-yellow-600/30 border-yellow-400/30 text-yellow-200'
    };
    return colors[color] || colors.blue;
  };

  const getStatusColor = (status) => {
    const colors = {
      Live: 'bg-green-500/20 text-green-400 border-green-500/30',
      Beta: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      Development: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    };
    return colors[status] || colors.Development;
  };

  return (
    <div 
      ref={cardRef}
      className={`w-full flex justify-center mb-8 lg:mb-10 transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div
        className={`w-full max-w-5xl flex flex-col md:flex-row ${
          reverse ? 'xl:flex-row-reverse' : ''
        } gap-0 rounded-2xl backdrop-blur-xl border border-purple-500/20 overflow-hidden shadow-2xl group hover:shadow-purple-500/10 transition-all duration-700 hover:scale-[1.01] relative`}
        style={{
          background: 'linear-gradient(135deg, rgba(15,15,35,0.95) 0%, rgba(25,15,45,0.95) 50%, rgba(35,20,55,0.95) 100%)',
          boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-64 h-64 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-64 h-64 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 w-full h-48 xl:h-auto min-h-[250px] xl:min-h-[280px] relative overflow-hidden group/image">
          {/* Image Container */}
          <div className="relative w-full h-full">
            <img
              src={project.image}
              alt={project.title}
              className={`object-cover w-full h-full transition-all duration-1000 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>

          {/* Floating Status Badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold ${getStatusColor(project.status)}`}>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></div>
                {project.status}
              </div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
              {project.category}
            </div>
          </div>


          {/* Decorative Elements */}
          <div className="absolute top-1/4 right-6 w-3 h-3 border-2 border-cyan-400/50 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/3 left-6 w-4 h-4 border border-purple-400/30 rounded-full animate-pulse"></div>
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-between p-4 lg:p-5 relative z-10">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs font-medium text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                #{(index + 1).toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-gray-400">{project.timeline}</div>
            </div>
            <h3 className="text-lg lg:text-xl xl:text-2xl font-bold text-white mb-1.5 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-500">
              {project.title}
            </h3>
            <p className="text-sm lg:text-base text-purple-300 font-medium mb-1.5">
              {project.subtitle}
            </p>
            <p className="text-gray-300 text-xs lg:text-sm leading-relaxed mb-3">
              {isExpanded ? project.detailedDescription : project.description}
            </p>

            <div className="flex  gap-3">

            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gray-800/50 border border-gray-600/50 text-white text-sm font-medium hover:bg-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-105 group/btn backdrop-blur-sm"
              >
              <Github className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              <span>Source</span>
            </a>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-cyan-400 hover:text-cyan-300 text-xs font-medium flex items-center gap-1 transition-colors duration-300"
              >
              {isExpanded ? 'Show Less' : 'Read More'}
              <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
              </div>
          </div>

         

          {/* Technologies */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Code className="w-4 h-4 text-purple-400" />
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech, i) => (
                <div
                  key={i}
                  className={`group/tech px-2 py-1.5 rounded-md bg-gradient-to-r border backdrop-blur-sm transition-all duration-300 hover:scale-105 ${getTechColor(tech.color)}`}
                >
                  <div className="text-xs font-medium">{tech.name}</div>
                  <div className="text-xs opacity-70">{tech.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {isExpanded && (
            <div className="mb-5 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  Key Features
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5">
                  {project.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1 h-1 rounded-full bg-cyan-400"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-400" />
                  Key Achievements
                </h4>
                <div className="space-y-1.5">
                  {project.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1 h-1 rounded-full bg-green-400"></div>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-auto">
           
            
            

          </div>
        </div>
      </div>
    </div>
  );
}

const ProjectsSection = ({ setActiveSection }) => {
  const [visibleProjects, setVisibleProjects] = useState(2);
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 py-12 lg:py-16 relative">
      {/* Header */}
      <div className="text-center mb-8 lg:mb-12 z-10 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4">
          <Code className="w-4 h-4" />
          Portfolio Showcase
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 text-transparent bg-clip-text mb-4 leading-tight">
          Featured Projects
        </h2>
        
        <div className="w-20 lg:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full mb-4"></div>
        
        <p className="text-gray-300 text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
          Explore my journey through innovative solutions, cutting-edge technologies, and impactful digital experiences that drive business growth and user engagement.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="w-full max-w-7xl mx-auto z-10">
        {filteredProjects.slice(0, visibleProjects).map((project, idx) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            reverse={idx % 2 === 1} 
            index={idx}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleProjects < filteredProjects.length && (
        <button
          onClick={() => setVisibleProjects(prev => Math.min(prev + 2, filteredProjects.length))}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 text-white text-sm font-medium hover:from-gray-600 hover:to-gray-500 transition-all duration-300 hover:scale-105 border border-gray-500/30"
        >
          Load More Projects ({filteredProjects.length - visibleProjects} remaining)
        </button>
      )}

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 w-full max-w-4xl">
        {[{label: 'dedicated hours', value: '1000+', icon: Award },
          { label: 'Projects Completed', value: '25+', icon: Award },
          { label: 'Technology Expertise', value: '9+', icon: Code },
          { label: 'Code Commits', value: '200+', icon: Github }
        ].map((stat, i) => (
          <div key={i} className="text-center p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
            <stat.icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
            <div className="text-xl lg:text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
      

      {/* CTA Button */}
      {setActiveSection && (
        <button 
          onClick={() => setActiveSection('achievements')} 
          className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base relative overflow-hidden group"
        >
          <span className="relative z-10">Explore My Achievements</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      )}
    </section>
  );
};

export default ProjectsSection;