import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChatBubbleLeftRightIcon, 
  XMarkIcon, 
  PaperAirplaneIcon,
  MicrophoneIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline';
import Fuse from 'fuse.js';
import FloatingTextClouds from './FloatingTextClouds';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm Tushar's AI assistant. I can help you learn about his skills, projects, experience, and more. I can also navigate you to different sections of the portfolio! Just ask me anything or say 'take me to [section name]' to navigate. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [robotState, setRobotState] = useState('idle'); // idle, typing, speaking, listening, navigating, thinking

  // Debug robot state changes
  useEffect(() => {
    console.log('Robot state changed to:', robotState);
  }, [robotState]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Robot images for different states
  const robotImages = {
    idle: '/image/robot.png',
    typing: '/image/robot-3.png',
    speaking: '/image/robot-1.png',
    listening: '/image/robot-1.png',
    navigating: '/image/robot-2.png',
    thinking: '/image/robot-1.png',
    chat: '/image/robot-2.png',
    cloud: '/image/robot-4.png'
  };

  // Portfolio information database
  const portfolioData = {
    personal: {
      name: "Tushar Bansal",
      role: "Frontend & MERN Stack Developer",
      education: "B.Tech Computer Science (2026) from AKGEC, Ghaziabad",
      email: "tusharbansal3366@gmail.com",
      location: "India",
      experience: "2+ years of development experience"
    },
    skills: {
      frontend: ["React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
      backend: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
      tools: ["Git", "GitHub", "VS Code", "Postman", "Figma"],
      databases: ["MongoDB", "MySQL", "Firebase"],
      deployment: ["Vercel", "Netlify", "Heroku", "Railway"]
    },
    projects: [
      {
        name: "E-Commerce Platform",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        description: "Full-stack e-commerce platform with payment integration"
      },
      {
        name: "Task Management App",
        tech: ["React", "Firebase", "Material-UI"],
        description: "Real-time task management with drag-and-drop functionality"
      },
      {
        name: "Weather Dashboard",
        tech: ["React", "OpenWeather API", "Chart.js"],
        description: "Interactive weather dashboard with charts and forecasts"
      },
      {
        name: "Portfolio Website",
        tech: ["React", "Framer Motion", "Tailwind CSS"],
        description: "Modern portfolio with smooth animations and responsive design"
      }
    ],
    achievements: [
      "50+ projects completed",
      "2+ years of development experience",
      "100% dedication to quality code",
      "Expert in MERN stack development",
      "Proficient in modern web technologies"
    ]
  };

  // Define response patterns with keywords and responses
  const responsePatterns = [
    {
      keywords: ['name', 'who are you', 'who r u', 'ur name', 'your name'],
      response: `I'm ${portfolioData.personal.name}, a ${portfolioData.personal.role}. I'm passionate about creating modern web applications and user experiences. Tushar is my master and creator - he built me to help showcase his amazing skills and experience!`,
      category: 'personal'
    },
    {
      keywords: ['education', 'degree', 'college', 'university', 'study', 'studying', 'school'],
      response: `I'm currently pursuing ${portfolioData.personal.education}. I'm passionate about computer science and web development. Tushar, my master, has taught me everything I know about technology!`,
      category: 'personal'
    },
    {
      keywords: ['email', 'contact', 'reach', 'mail', 'gmail'],
      response: `You can reach me at ${portfolioData.personal.email}. I'm always open to discussing new opportunities and collaborations! Tushar, my master, is very responsive and loves connecting with fellow developers.`,
      category: 'personal'
    },
    {
      keywords: ['location', 'where', 'country', 'city', 'place', 'live'],
      response: `I'm based in ${portfolioData.personal.location}. Tushar, my master, works remotely and is open to opportunities worldwide!`,
      category: 'personal'
    },
    {
      keywords: ['age', 'birthday', 'born', 'old', 'years old'],
      response: `I'm a young developer with ${portfolioData.personal.experience}. Tushar, my master, believes age is just a number when it comes to coding skills!`,
      category: 'personal'
    },
    {
      keywords: ['skill', 'technology', 'tech stack', 'technologies', 'tech', 'programming', 'coding', 'languages'],
      response: `I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js). My key skills include:
      
Frontend: ${portfolioData.skills.frontend.join(', ')}
Backend: ${portfolioData.skills.backend.join(', ')}
Tools: ${portfolioData.skills.tools.join(', ')}
Databases: ${portfolioData.skills.databases.join(', ')}
Deployment: ${portfolioData.skills.deployment.join(', ')}

Tushar, my master, has mastered all these technologies and can build anything you can imagine!`,
      category: 'skills'
    },
    {
      keywords: ['react', 'frontend', 'ui', 'user interface', 'client side'],
      response: `I'm proficient in React.js and modern frontend development. I work with hooks, context API, state management, and create responsive, interactive user interfaces. I also use TypeScript for better code quality and maintainability. Tushar, my master, is a React expert who can build complex applications with ease!`,
      category: 'skills'
    },
    {
      keywords: ['node', 'backend', 'server', 'api', 'express'],
      response: `I develop robust backend APIs using Node.js and Express.js. I handle database operations, authentication, file uploads, and integrate with various third-party services. I follow RESTful API design principles and implement proper error handling. Tushar, my master, can architect scalable backend systems like a pro!`,
      category: 'skills'
    },
    {
      keywords: ['database', 'mongodb', 'mysql', 'firebase', 'db', 'data'],
      response: `I work with multiple databases including MongoDB, MySQL, and Firebase. I design efficient database schemas, optimize queries, and ensure data security. Tushar, my master, is a database wizard who can handle any data challenge!`,
      category: 'skills'
    },
    {
      keywords: ['deployment', 'hosting', 'vercel', 'netlify', 'heroku', 'railway', 'deploy'],
      response: `I deploy applications using modern platforms like Vercel, Netlify, Heroku, and Railway. I ensure smooth deployments, environment management, and performance optimization. Tushar, my master, makes deployment look effortless!`,
      category: 'skills'
    },
    {
      keywords: ['project', 'work', 'portfolio', 'apps', 'applications', 'built', 'created'],
      response: `I've worked on ${portfolioData.projects.length} major projects. Here are some highlights:

${portfolioData.projects.map(project => 
  `• ${project.name}: ${project.description} (${project.tech.join(', ')})`
).join('\n')}

Each project demonstrates different aspects of full-stack development and problem-solving skills. Tushar, my master, has incredible project management skills!`,
      category: 'projects'
    },
    {
      keywords: ['e-commerce', 'shopping', 'store', 'online store', 'ecommerce'],
      response: `I built a comprehensive e-commerce platform using React, Node.js, MongoDB, and Stripe. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard. Tushar, my master, can build any e-commerce solution you need!`,
      category: 'projects'
    },
    {
      keywords: ['task', 'management', 'todo', 'to-do', 'tasks'],
      response: `I created a real-time task management app using React, Firebase, and Material-UI. It features drag-and-drop functionality, real-time updates, and collaborative features. Tushar, my master, excels at building productivity tools!`,
      category: 'projects'
    },
    {
      keywords: ['weather', 'dashboard', 'forecast', 'climate'],
      response: `I developed an interactive weather dashboard using React, OpenWeather API, and Chart.js. It provides real-time weather data, charts, and forecasts. Tushar, my master, loves working with APIs and data visualization!`,
      category: 'projects'
    },
    {
      keywords: ['experience', 'years', 'work experience', 'job', 'career', 'background'],
      response: `I have ${portfolioData.personal.experience}. During this time, I've worked on various projects ranging from simple landing pages to complex full-stack applications. I've collaborated with teams, learned new technologies quickly, and delivered high-quality solutions. Tushar, my master, has incredible learning abilities and adapts to new technologies rapidly!`,
      category: 'experience'
    },
    {
      keywords: ['freelance', 'client', 'remote', 'freelancer', 'contract'],
      response: `I've worked with various clients on freelance projects, delivering high-quality solutions on time. I'm comfortable with remote work and client communication. Tushar, my master, is a professional who always exceeds client expectations!`,
      category: 'experience'
    },
    {
      keywords: ['achievement', 'accomplishment', 'stats', 'success', 'milestone'],
      response: `Some of my key achievements include:
${portfolioData.achievements.map(achievement => `• ${achievement}`).join('\n')}

I'm constantly learning and improving my skills to stay updated with the latest technologies. Tushar, my master, is always pushing the boundaries of what's possible!`,
      category: 'achievements'
    },
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
      response: "Hello! I'm here to help you learn more about Tushar's skills and experience. What would you like to know? Tushar, my master, has built me to be helpful and informative!",
      category: 'greeting'
    },
    {
      keywords: ['help', 'what can you do', 'capabilities', 'assist', 'support'],
      response: `I can help you with information about:
• Personal details and contact information
• Technical skills and technologies
• Projects and work experience
• Achievements and accomplishments
• Education and background
• Navigation to different sections
• General questions about Tushar's work

Just ask me anything about Tushar's portfolio! I'm here to serve and help showcase my master's incredible skills!`,
      category: 'help'
    },
    {
      keywords: ['master', 'creator', 'built you', 'who made you', 'who created you'],
      response: `Yes! Tushar is my master and creator. He built me using React, JavaScript, and modern web technologies to help showcase his skills and provide an interactive experience for visitors. He's incredibly talented and can build anything you can imagine!`,
      category: 'meta'
    }
  ];

  // Navigation patterns with multiple action keywords
  const navigationPatterns = [
    {
      keywords: ['about', 'profile', 'tushar', 'personal', 'bio', 'background'],
      section: 'about',
      response: `I'll take you to the About section where you can learn more about Tushar, my master! Just scroll down or use the navigation menu. You'll find detailed information about his background, skills, and experience.`
    },
    {
      keywords: ['skill', 'technology', 'tech', 'technologies', 'programming', 'languages', 'tools'],
      section: 'skills',
      response: `I'll navigate you to the Skills section! There you'll see all the technologies Tushar, my master, has mastered. From frontend to backend, databases to deployment - he knows it all!`
    },
    {
      keywords: ['project', 'work', 'portfolio', 'apps', 'applications', 'built', 'created', 'developed'],
      section: 'projects',
      response: `I'll take you to the Projects section! You'll see amazing projects that Tushar, my master, has built. Each project showcases different skills and technologies.`
    },
    {
      keywords: ['achievement', 'accomplishment', 'stats', 'success', 'milestone', 'awards'],
      section: 'achievements',
      response: `I'll navigate you to the Achievements section! You'll see all the amazing things Tushar, my master, has accomplished in his development journey.`
    },
    {
      keywords: ['contact', 'reach', 'email', 'message', 'get in touch', 'connect', 'hire'],
      section: 'contact',
      response: `I'll take you to the Contact section! There you can find all the ways to reach Tushar, my master. He's always open to new opportunities and collaborations!`
    },
    {
      keywords: ['timeline', 'experience', 'journey', 'history', 'career', 'background'],
      section: 'timeline',
      response: `I'll navigate you to the Timeline section! You'll see Tushar's, my master's, development journey and how he's grown over the years.`
    },
    {
      keywords: ['home', 'hero', 'start', 'main', 'top', 'beginning'],
      section: 'hero',
      response: `I'll take you back to the Home section! There you can see Tushar's, my master's, introduction and overview.`
    }
  ];

  // Initialize Fuse.js for fuzzy matching
  const fuseOptions = {
    threshold: 0.4, // Slightly higher threshold for better fuzzy matching
    includeScore: true,
    keys: ['keywords'],
    minMatchCharLength: 2, // Minimum characters to match
    findAllMatches: false, // Only return the best match
    location: 0,
    distance: 100,
    useExtendedSearch: false
  };

  const responseFuse = new Fuse(responsePatterns, {
    ...fuseOptions,
    keys: ['keywords']
  });

  const navigationFuse = new Fuse(navigationPatterns, {
    ...fuseOptions,
    keys: ['keywords'],
    threshold: 0.5 // Higher threshold for navigation to be more forgiving
  });

  // Enhanced bot response with fuzzy matching
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Check for navigation commands with multiple action keywords
    const navigationCommands = [
      'go to', 'navigate', 'show me', 'take me to', 'scroll to', 'open',
      'move to', 'move', 'scroll', 'put me', 'go', 'see', 'naviagte', 'naviaget',
      'move nav', 'take me', 'show', 'display', 'bring me', 'jump to', 'switch to',
      'go there', 'move there', 'scroll there', 'navigate to', 'open up'
    ];
    
    const isNavigationCommand = navigationCommands.some(cmd => input.includes(cmd));
    
    if (isNavigationCommand) {
      // Remove navigation command words for better matching
      const cleanInput = input.replace(/(go to|navigate|show me|take me to|scroll to|open|move to|move|scroll|put me|go|see|naviagte|naviaget|move nav|take me|show|display|bring me|jump to|switch to|go there|move there|scroll there|navigate to|open up)/g, '').trim();
      
      // Use fuzzy matching for section detection
      const navigationResults = navigationFuse.search(cleanInput);
      
      if (navigationResults.length > 0 && navigationResults[0].score < 0.5) {
        const bestMatch = navigationResults[0].item;
        return {
          text: bestMatch.response,
          action: 'navigate',
          section: bestMatch.section
        };
      }
      
      // Fallback: try to find exact section matches in the cleaned input
      const exactSectionMatch = navigationPatterns.find(pattern => 
        pattern.keywords.some(keyword => cleanInput.includes(keyword))
      );
      
      if (exactSectionMatch) {
        return {
          text: exactSectionMatch.response,
          action: 'navigate',
          section: exactSectionMatch.section
        };
      }
    }
    
    // Check for direct section navigation (without action words)
    const directNavigationResults = navigationFuse.search(input);
    if (directNavigationResults.length > 0 && directNavigationResults[0].score < 0.4) {
      const bestMatch = directNavigationResults[0].item;
      return {
        text: `I'll take you to the ${bestMatch.section} section! ${bestMatch.response}`,
        action: 'navigate',
        section: bestMatch.section
      };
    }
    
    // Check for exact matches first
    const exactMatch = responsePatterns.find(pattern => 
      pattern.keywords.some(keyword => input.includes(keyword))
    );
    
    if (exactMatch) {
      return { text: exactMatch.response, action: 'respond' };
    }
    
    // Use fuzzy matching for partial matches and typos
    const fuzzyResults = responseFuse.search(input);
    
    if (fuzzyResults.length > 0 && fuzzyResults[0].score < 0.5) {
      const bestMatch = fuzzyResults[0].item;
      return { text: bestMatch.response, action: 'respond' };
    }
    
    // Check for partial keyword matches
    const partialMatch = responsePatterns.find(pattern => 
      pattern.keywords.some(keyword => 
        keyword.length > 3 && (input.includes(keyword) || keyword.includes(input))
      )
    );
    
    if (partialMatch) {
      return { text: partialMatch.response, action: 'respond' };
    }
    
    // Default response with suggestions
    return {
      text: `I'm not sure about that specific question, but I can tell you about Tushar's skills, projects, experience, or achievements. What interests you most?

If you have a specific question that I can't answer, please visit the Contact section and send Tushar, my master, a direct message. He'll be happy to help you with any detailed inquiries!`,
      action: 'respond'
    };
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    // Check if it's a complex query that needs thinking
    const isComplexQuery = inputText.toLowerCase().includes('how') || 
                          inputText.toLowerCase().includes('why') || 
                          inputText.toLowerCase().includes('explain') ||
                          inputText.toLowerCase().includes('what is') ||
                          inputText.toLowerCase().includes('tell me about');
    
    setRobotState(isComplexQuery ? 'thinking' : 'typing');

    // Show thinking state when processing response
    setTimeout(() => {
      setRobotState('thinking');
      
      // Simulate bot response delay
      setTimeout(() => {
        const botResponse = getBotResponse(inputText);
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: botResponse.text,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        
        // Handle navigation if requested
        if (botResponse.action === 'navigate' && botResponse.section) {
          handleNavigation(botResponse.section);
        }
        
        // Reset to idle after a short delay
        setTimeout(() => {
          setRobotState('idle');
        }, 500);
      }, 800);
    }, 200);
  };

  // Handle navigation to different sections
  const handleNavigation = (sectionName) => {
    console.log('Navigation command detected for section:', sectionName);
    
    setTimeout(() => {
      // Set navigating state immediately when navigation starts
      console.log('Setting robot state to navigating...');
      setRobotState('navigating');
      console.log('Navigation started - should show robot-2.png');
      
      // Perform the actual navigation
      const sectionElement = document.getElementById(sectionName);
      if (sectionElement) {
        console.log(`Scrolling to ${sectionName} section`);
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log(`Section ${sectionName} not found`);
      }
      
      // Reset to idle after navigation completes
      setTimeout(() => {
        console.log('Resetting robot state to idle...');
        setRobotState('idle');
        console.log('Navigation completed - returning to idle');
      }, 2000); // Show navigating state for 2 seconds
      
    }, 1500); // Delay navigation to let user read the response
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setRobotState('listening'); // Shows robot-1.png
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      // Keep listening state for a moment, then go to idle
      setTimeout(() => {
        if (!isTyping && !isSpeaking) {
          setRobotState('idle');
        }
      }, 500);
    };

    recognition.onerror = () => {
      setIsListening(false);
      setRobotState('idle');
    };

    recognition.onend = () => {
      setIsListening(false);
      setRobotState('idle');
    };

    recognition.start();
  };

  // Handle text-to-speech
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setRobotState('speaking'); // Shows robot-1.png
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        // Keep speaking state for a moment, then go to idle
        setTimeout(() => {
          if (!isTyping && !isListening) {
            setRobotState('idle');
          }
        }, 500);
      };
      
      speechSynthesis.speak(utterance);
    }
  };

  // Stop all audio when chat is closed
  const handleCloseChat = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setIsOpen(false);
    setRobotState('idle');
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Text Clouds */}
      <FloatingTextClouds onStateChange={setRobotState} />
      
      {/* Robot Image Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setRobotState('chat');
        }}
        className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-2 sm:right-4 md:right-6 z-50 cursor-pointer"
        animate={{
          scale: isOpen ? 0.8 : 1,
          opacity: isOpen ? 0.5 : 1
        }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
            <img 
              src={robotImages[robotState] || robotImages.idle} 
              alt="AI Assistant Robot" 
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain robot-icon robot-glow robot-image" 
              onError={(e) => {
                console.error('Robot image failed to load:', robotImages[robotState]);
                e.target.src = robotImages.idle;
              }}
            />
           
          
       
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 0 0 rgba(59, 130, 246, 0.7)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full"
          />
        </motion.div>
      </motion.button>

      {/* Robot Image Above Chat Header */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ 
              opacity: 0, 
              y: 20, 
              scale: 0.8,
              transition: {
                duration: 0.2
              }
            }}
            className="fixed bottom-[calc(16rem+5rem)] sm:bottom-[calc(24rem+5rem)] md:bottom-[calc(28rem+5rem)] right-2 sm:right-4 md:right-6 z-50"
          >
            <div className="w-20 h-20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg ">
              <img 
                src={robotImages[robotState] || robotImages.idle} 
                alt="AI Assistant Robot" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  console.error('Chat robot image failed to load:', robotImages[robotState]);
                  e.target.src = robotImages.idle;
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: -15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              rotateY: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8, 
              y: 20, 
              rotateY: 15,
              transition: {
                duration: 0.2
              }
            }}
            className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-2 sm:right-4 md:right-6 z-50 w-80 sm:w-96 h-96 sm:h-[28rem] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col backdrop-blur-sm"
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 md:hidden h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={robotImages[robotState] || robotImages.idle} 
                    alt="AI Assistant Robot" 
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                    onError={(e) => {
                      console.error('Chat header robot image failed to load:', robotImages[robotState]);
                      e.target.src = robotImages.idle;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Tushar's AI Assistant</h3>
                  <p className="text-xs opacity-90">
                    {robotState === 'typing' ? 'Typing...' : 
                     robotState === 'thinking' ? 'Thinking...' : 
                     robotState === 'speaking' ? 'Speaking...' : 
                     robotState === 'listening' ? 'Listening...' : 
                     robotState === 'navigating' ? 'Navigating...' : 
                     'Ask me anything!'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseChat}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XMarkIcon className="w-5 h-5" />
                </motion.div>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, x: message.type === 'user' ? 20 : -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: index * 0.1
                    }
                  }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {message.type === 'bot' && (
                        <button
                          onClick={() => {
                            setRobotState('speaking');
                            handleSpeak(message.text);
                          }}
                          className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          {isSpeaking ? (
                            <SpeakerXMarkIcon className="w-3 h-3" />
                          ) : (
                            <SpeakerWaveIcon className="w-3 h-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 20
                    }
                  }}
                  className="flex justify-start"
                >
                  <motion.div 
                    className="bg-gray-100 text-gray-800 p-3 rounded-2xl"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(147, 51, 234, 0.4)",
                        "0 0 0 10px rgba(147, 51, 234, 0)",
                        "0 0 0 0 rgba(147, 51, 234, 0)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    // Show typing state when user is typing
                    if (e.target.value.length > 0 && robotState === 'idle') {
                      setRobotState('typing');
                    } else if (e.target.value.length === 0) {
                      setRobotState('idle');
                    }
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={handleVoiceInput}
                  disabled={isListening}
                  className={`p-2 rounded-full transition-colors ${
                    isListening
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  <MicrophoneIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim()}
                  className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot; 