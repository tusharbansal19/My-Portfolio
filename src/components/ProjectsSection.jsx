import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, Star, Award, ChevronRight, User, Calendar, ArrowRight } from 'lucide-react';

// Image constants
const imageTypingApp = '/image/typing.png';
const imageWeather = '/image/dashboard.png';
const imageGrabeats = '/image/grabeats.png';
const imageAutomobiles = '/image/automobiles.png';

const projects = [
  {
  id: 'saatpherash-worldwide',
  title: 'SaatPheras Worldwide',
  subtitle: 'Global Matrimonial & Matchmaking Platform for NRIs',
  description: 'A scalable, real-time matrimonial web platform designed for global users and NRIs, offering secure matchmaking, real-time chat & calling, subscriptions, and smart profile discovery.',
  detailedDescription: 'SaatPheras Worldwide is a full-scale matrimonial ecosystem built to connect users across countries with speed, security, and reliability. The platform supports intelligent matchmaking, real-time chat and calling using WebSockets, push notifications, and subscription-based premium features. It focuses heavily on performance, accessibility, and SEO, achieving a 95+ Lighthouse score. The system includes advanced user controls such as block/unblock, role-based permissions, and secure token-based authentication with refresh cycles using HTTP-only cookies.',
  image: '/image/SaatPherasWordWide.png', // add your project banner image
  category: 'Social Tech / Matrimonial',
  status: 'In Progress',
  timeline: '2+ months',
  teamSize: '3 developers',
  technologies: [
    { name: 'React.js', category: 'Frontend', color: 'blue' },
    { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' },
    { name: 'Node.js', category: 'Backend', color: 'green' },
    { name: 'Express.js', category: 'Backend', color: 'green' },
    { name: 'MongoDB', category: 'Database', color: 'purple' },
    { name: 'Socket.IO', category: 'Real-time', color: 'yellow' },
    { name: 'JWT', category: 'Authentication', color: 'red' },
    { name: 'AWS EC2 & S3', category: 'Cloud', color: 'orange' }
  ],
  features: [
    'Global NRI Matchmaking System',
    'Real-time Chat & Calling (Socket.IO)',
    'Advanced User Profile Discovery',
    'Block / Unblock & Privacy Controls',
    'Subscription & Premium Plans',
    'Push Notifications & Email Verification',
    'Role-Based Access Control (RBAC)',
    'SEO-Optimized & Performance-First UI'
  ],
  achievements: [
    'Achieved 95+ Lighthouse performance & SEO score',
    'Designed secure JWT access/refresh token lifecycle',
    'Built scalable real-time communication architecture',
    'Reduced initial load time by ~35%',
    'Maintained near-zero CLS (layout shift)'
  ],
  links: {
    live: 'https://dev.saatpherasworldwide.com', // replace if different
    // replace if private
  }
}
,
  {
    id: 'dynamic-typing-webapp',
    title: 'Dynamic Typing Web App',
    subtitle: 'Real-time Typing Practice & Competition Platform',
    description: 'A high-performance web app built for real-time typing practice, collaborative sessions, and global typing competitions. Features an interactive UI, live socket-based tracking, and animated keyboard interface.',
    detailedDescription: 'The Dynamic Typing Web App enhances typing skills through real-time practice and competitions. It features a keyboard layout with animated key highlights, typewriter-style hero sections, and responsive design. Built using the MERN stack with Socket.IO for real-time communication and Redux for state management, it offers analytics, leaderboard tracking, and user authentication.',
    image: imageTypingApp,
    category: 'EdTech',
    status: 'In Progress',
    timeline: '1.5 months',
    teamSize: '3 developers',
    technologies: [
      { name: 'React 18', category: 'Frontend', color: 'blue' },
      { name: 'Node.js', category: 'Backend', color: 'green' },
      { name: 'MongoDB', category: 'Database', color: 'purple' },
      { name: 'Express.js', category: 'Backend', color: 'green' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' },
      { name: 'Redux', category: 'State', color: 'purple' },
      { name: 'Socket.IO', category: 'Real-time', color: 'yellow' }
    ],
    features: [
      'Real-time Typing Competition',
      'Interactive Keyboard with Animated Keys',
      'Typewriter-Style Hero Section',
      'Leaderboard & Progress Tracker',
      'Socket-based Typing Sync',
      'Responsive & Mobile Friendly UI'
    ],
    achievements: [
      'Built advanced keyboard animation system',
      'Achieved <100ms socket lag in multiplayer mode',
      'Designed visually engaging UI with Tailwind'
    ],
    links: {
      live: 'https://typing-webapp-frountend.onrender.com/',
      github: 'https://github.com/tusharbansal00/dynamic-typing-webapp'
    }
  },
  {
    id: 'task-manager',
    title: 'Task Manager Web App',
    subtitle: 'Full-Stack Task Management',
    description: 'A full-stack web app for managing tasks, with real-time synchronization, CRUD operations, and user authentication.',
    detailedDescription: 'Designed for productivity, this app allows users to create, update, and track tasks in real time. Features include collaborative task boards, notifications, and a responsive UI.',
    image: imageWeather,
    category: 'Productivity',
    status: 'Completed',
    timeline: '2 months',
    technologies: [
      { name: 'React', category: 'Frontend', color: 'blue' },
      { name: 'Node.js', category: 'Backend', color: 'green' },
      { name: 'Express.js', category: 'Backend', color: 'green' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' }
    ],
    features: [
      'Real-time Task Synchronization',
      'Collaborative Task Boards',
      'CRUD Operations',
      'User Authentication',
      'Responsive UI/UX',
      'Notifications System'
    ],
    achievements: [
      'Enabled team collaboration',
      'Improved productivity by 30%'
    ],
    links: {
      live: 'https://t-task-management.onrender.com/',
      github: 'https://github.com/tusharbansal19/TaskManagement'
    }
  },
  {
    id: 'grabeats',
    title: 'E-commerce Platform – GrabEats',
    subtitle: 'Real-time Food Ordering System',
    description: 'A real-time food ordering platform with OTP authentication, user validation, and multi-image support. Features RESTful APIs, responsive UI/UX, and cross-device compatibility.',
    detailedDescription: 'Built for seamless food ordering, GrabEats supports real-time order tracking, secure payments, and a scalable backend. Utilizes modern web technologies for a fast, reliable experience.',
    image: imageGrabeats,
    category: 'E-commerce',
    status: 'Completed',
    timeline: '1 month',
    technologies: [
      { name: 'React', category: 'Frontend', color: 'blue' },
      { name: 'Next.js', category: 'Frontend', color: 'purple' },
      { name: 'Node.js', category: 'Backend', color: 'green' },
      { name: 'MongoDB', category: 'Database', color: 'green' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' }
    ],
    features: [
      'OTP Authentication',
      'Real-time Order Tracking',
      'Multi-image Product Support',
      'RESTful APIs',
      'Responsive UI/UX',
      'Secure Payments'
    ],
    achievements: [
      'Launched in 1 month',
      'Handled 5K+ users at launch'
    ],
    links: {
      live: 'https://grabeats.onrender.com/',
      github: 'https://github.com/tusharbansal19/GrabEats'
    }
  },
  {
    id: 'tushar-automobiles',
    title: 'Tushar Automobiles',
    subtitle: 'Auto Parts E-commerce',
    description: 'A commercial automobile parts web platform using Next.js and Prisma, featuring dynamic product filtering, server-side rendering, and a mobile-first responsive layout.',
    detailedDescription: 'Developed a robust auto parts e-commerce site with advanced filtering, SSR, and seamless mobile experience. Built with Next.js, Prisma, and modern UI libraries.',
    image: imageAutomobiles,
    category: 'E-commerce',
    status: 'Completed',
    timeline: '1 month',
    technologies: [
      { name: 'Next.js', category: 'Frontend', color: 'purple' },
      { name: 'Prisma', category: 'ORM', color: 'blue' },
      { name: 'React', category: 'Frontend', color: 'blue' },
      { name: 'Tailwind CSS', category: 'Styling', color: 'cyan' }
    ],
    features: [
      'Dynamic Product Filtering',
      'Server-side Rendering (SSR)',
      'Mobile-first Responsive Layout',
      'Modern UI/UX',
      'Secure Checkout',
      'Admin Dashboard'
    ],
    achievements: [
      'Launched in 1 month',
      'Positive client feedback'
    ],
    links: {
      live: 'https://automobiles-next.onrender.com',
      github: 'https://github.com/tusharbansal19/automobiles-next'
    }
  }
];

const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const duration = 5000; // 5 seconds
  const intervalRef = React.useRef(null);

  // Auto-switch logic
  useEffect(() => {
    if (isPaused) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / duration) * 100;

      if (newProgress >= 100) {
        setActiveIndex((prev) => (prev + 1) % projects.length);
        setProgress(0);
      } else {
        setProgress(newProgress);
        intervalRef.current = requestAnimationFrame(animate);
      }
    };

    intervalRef.current = requestAnimationFrame(animate);

    return () => {
      if (intervalRef.current) cancelAnimationFrame(intervalRef.current);
    };
  }, [activeIndex, isPaused]);

  // Description Auto-Drop Logic
  useEffect(() => {
    // Open immediately when project changes
    setIsDescriptionOpen(true);

    // Close after 1 second (1000ms)
    // Using a slightly longer timeout to account for initial transition
    const timer = setTimeout(() => {
      setIsDescriptionOpen(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Color helper
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

  return (
    <section className="py-20 px-4 md:px-8 lg:px-12 w-full relative min-h-screen flex flex-col items-center justify-center">

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] opacity-50" />
      </div>

      <div className="max-w-7xl w-full z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium mb-4"
          >
            <Code className="w-4 h-4" />
            Portfolio Showcase
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-cyan-200 text-transparent bg-clip-text mb-4"
          >
            Featured Projects
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mb-6"
          />
        </div>

        {/* Main Content Area */}
        <div
          className="flex flex-col lg:flex-row gap-8 lg:gap-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Sidebar - Project List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveIndex(index);
                  setProgress(0);
                }}
                className={`group relative p-4 rounded-xl text-left transition-all duration-300 border backdrop-blur-sm overflow-hidden ${activeIndex === index
                    ? 'bg-white/10 border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
              >
                {/* Progress Bar for Active Item */}
                {activeIndex === index && (
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }} />
                )}

                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-base font-bold mb-1 truncate transition-colors ${activeIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                      }`}>
                      {project.title}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">{project.category}</p>
                  </div>
                  {activeIndex === index && (
                    <ChevronRight className="w-5 h-5 text-purple-400 animate-pulse" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Right Panel - Detailed View */}
          <div className="w-full lg:w-2/3 relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6 h-full"
              >
                {/* Upper Part - Image Card */}
                <div className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden group border border-white/10 shadow-2xl bg-white/5">
                  <img
                    src={projects[activeIndex].image}
                    alt={projects[activeIndex].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1016] via-transparent to-transparent opacity-60" />

                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-semibold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      {projects[activeIndex].status}
                    </span>
                  </div>
                </div>

                {/* Lower Part - Details Card */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl flex flex-col shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {projects[activeIndex].title}
                      </h3>
                      <p className="text-purple-300 font-medium">
                        {projects[activeIndex].subtitle}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={projects[activeIndex].links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300 border border-cyan-500/20 hover:scale-110"
                        title="View Live"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <a
                        href={projects[activeIndex].links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 border border-purple-500/20 hover:scale-110"
                        title="View Source"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <div className="mb-8 group/desc">
                    <motion.div
                      initial={{ height: "auto" }}
                      animate={{ height: isDescriptionOpen ? "auto" : "60px" }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden relative"
                    >
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {projects[activeIndex].detailedDescription}
                      </p>

                      {/* Gradient fade for collapsed state */}
                      <AnimatePresence>
                        {!isDescriptionOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#151525]/90 to-transparent"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <button
                      onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                      className="mt-3 text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors group-hover/desc:text-cyan-300"
                    >
                      {isDescriptionOpen ? 'Show Less' : 'Read More'}
                      <ChevronRight className={`w-3 h-3 transition-transform duration-300 ${isDescriptionOpen ? '-rotate-90' : 'rotate-90'}`} />
                    </button>
                  </div>

                  {/* Grid Features & Tech */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                        <Code className="w-4 h-4" /> Technologies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {projects[activeIndex].technologies.map((tech, i) => (
                          <span
                            key={i}
                            className={`px-3 py-1 rounded-md text-xs font-medium border bg-gradient-to-r backdrop-blur-sm ${getTechColor(tech.color)}`}
                          >
                            {tech.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                        <Star className="w-4 h-4" /> Key Features
                      </h4>
                      <ul className="space-y-2">
                        {projects[activeIndex].features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                            <ArrowRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Stats/Achievements Footer */}
                  <div className="mt-auto pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4 text-cyan-400" />
                      {projects[activeIndex].timeline}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <User className="w-4 h-4 text-purple-400" />
                      {projects[activeIndex].teamSize || 'Solo Project'}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Award className="w-4 h-4 text-yellow-400" />
                      {projects[activeIndex].achievements.length} Achievements
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;