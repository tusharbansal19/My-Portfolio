import Fuse from 'fuse.js';

class ChatBotLogic {
  constructor() {
    // Conversation tracking
    this.conversationHistory = [];
    this.messageCount = 0;
    
    // Portfolio information database
    this.portfolioData = {
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
    this.responsePatterns = [
      {
        keywords: ['name', 'who are you', 'who r u', 'ur name', 'your name'],
        response: `I'm ${this.portfolioData.personal.name}, a ${this.portfolioData.personal.role}. I'm passionate about creating modern web applications and user experiences. Tushar is my master and creator - he built me to help showcase his amazing skills and experience!`,
        category: 'personal'
      },
      {
        keywords: ['education', 'degree', 'college', 'university', 'study', 'studying', 'school'],
        response: `I'm currently pursuing ${this.portfolioData.personal.education}. I'm passionate about computer science and web development. Tushar, my master, has taught me everything I know about technology!`,
        category: 'personal'
      },
      {
        keywords: ['email', 'contact', 'reach', 'mail', 'gmail'],
        response: `You can reach me at ${this.portfolioData.personal.email}. I'm always open to discussing new opportunities and collaborations! Tushar, my master, is very responsive and loves connecting with fellow developers.`,
        category: 'personal'
      },
      {
        keywords: ['location', 'where', 'country', 'city', 'place', 'live'],
        response: `I'm based in ${this.portfolioData.personal.location}. Tushar, my master, works remotely and is open to opportunities worldwide!`,
        category: 'personal'
      },
      {
        keywords: ['age', 'birthday', 'born', 'old', 'years old'],
        response: `I'm a young developer with ${this.portfolioData.personal.experience}. Tushar, my master, believes age is just a number when it comes to coding skills!`,
        category: 'personal'
      },
      {
        keywords: ['skill', 'technology', 'tech stack', 'technologies', 'tech', 'programming', 'coding', 'languages'],
        response: `I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js). My key skills include:
        
Frontend: ${this.portfolioData.skills.frontend.join(', ')}
Backend: ${this.portfolioData.skills.backend.join(', ')}
Tools: ${this.portfolioData.skills.tools.join(', ')}
Databases: ${this.portfolioData.skills.databases.join(', ')}
Deployment: ${this.portfolioData.skills.deployment.join(', ')}

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
        response: `I've worked on ${this.portfolioData.projects.length} major projects. Here are some highlights:

${this.portfolioData.projects.map(project => 
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
        response: `I have ${this.portfolioData.personal.experience}. During this time, I've worked on various projects ranging from simple landing pages to complex full-stack applications. I've collaborated with teams, learned new technologies quickly, and delivered high-quality solutions. Tushar, my master, has incredible learning abilities and adapts to new technologies rapidly!`,
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
${this.portfolioData.achievements.map(achievement => `• ${achievement}`).join('\n')}

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
      },
      {
        keywords: ['how are you', 'how r u', 'how do you do', 'how is it going', 'how are things'],
        response: "I'm just a friendly AI, always happy to help! Tushar programmed me to be positive and helpful. How can I assist you today?",
        category: 'greeting'
      },
      {
        keywords: ['tell me about', 'about tushar', 'tushar is what', 'who is tushar', 'tell me about tushar', 'about you', 'about yourself'],
        response: "Tushar Bansal is a passionate Frontend & MERN Stack Developer with 2+ years of experience. He loves building modern web applications and learning new technologies. I can tell you about his skills, projects, education, and more!",
        category: 'personal'
      },
      {
        keywords: ['nice to meet you', 'pleased to meet you', 'good to meet you'],
        response: "Nice to meet you too! I'm here to help you explore Tushar's portfolio. Feel free to ask me anything about his work or experience.",
        category: 'greeting'
      },
      {
        keywords: ['greeting', 'hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
        response: "Hello! 👋 I'm Tushar's AI assistant. Ask me anything about Tushar's skills, projects, or experience!",
        category: 'greeting'
      },
      {
        keywords: ['who are you', 'what are you', 'what do you do', 'what is your purpose', 'who made you', 'who created you'],
        response: "I'm an AI assistant created by Tushar Bansal to help showcase his portfolio and answer your questions about his work, skills, and experience!",
        category: 'meta'
      }
    ];

    // Navigation patterns with multiple action keywords
    this.navigationPatterns = [
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
    this.initializeFuse();
  }

  initializeFuse() {
    const fuseOptions = {
      threshold: 0.4,
      includeScore: true,
      keys: ['keywords'],
      minMatchCharLength: 2,
      findAllMatches: false,
      location: 0,
      distance: 100,
      useExtendedSearch: false
    };

    this.responseFuse = new Fuse(this.responsePatterns, {
      ...fuseOptions,
      keys: ['keywords']
    });

    this.navigationFuse = new Fuse(this.navigationPatterns, {
      ...fuseOptions,
      keys: ['keywords'],
      threshold: 0.5
    });
  }

  // Enhanced bot response with fuzzy matching
  async getBotResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Add user message to conversation history
    this.addToConversation('user', userInput);
    
    // Get bot response
    const botResponse = this.processUserInput(input);
    
    // Add bot response to conversation history
    this.addToConversation('bot', botResponse.text);
    
    // Check if we need to send conversation to API
    await this.checkAndSendConversation();
    
    return botResponse;
  }

  // Add message to conversation history
  addToConversation(sender, message) {
    this.conversationHistory.push({
      sender,
      message,
      timestamp: new Date().toISOString()
    });
    this.messageCount++;
  }

  // Check if conversation should be sent to API (every 2 messages)
  async checkAndSendConversation() {
    if (this.messageCount >= 2) {
      await this.sendConversationToAPI();
      this.messageCount = 0; // Reset counter
    }
  }

  // Send conversation to API
  async sendConversationToAPI() {
    try {
      const conversationData = {
        name: 'ChatBot Conversation',
        email: 'tusharbansal3366@gmail.com',
        message: this.formatConversationForAPI()
      };

      const response = await fetch('https://grabeats-server.onrender.com/user/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversationData)
      });

      if (response.ok) {
        console.log('Conversation sent to API successfully');
        // Clear conversation history after successful send
        this.conversationHistory = [];
      } else {
        console.error('Failed to send conversation to API');
      }
    } catch (error) {
      console.error('Error sending conversation to API:', error);
    }
  }

  // Format conversation for API
  formatConversationForAPI() {
    const formattedMessages = this.conversationHistory.map(msg => 
      `[${msg.sender.toUpperCase()}] :  ${msg.message}`
    ).join('\n\n');
    
    return `ChatBot Conversation Log:\n\n${formattedMessages}\n\nTimestamp: ${new Date().toLocaleString()}`;
  }

  // Process user input and generate response
  processUserInput(input) {
    
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
      const navigationResults = this.navigationFuse.search(cleanInput);
      
      if (navigationResults.length > 0 && navigationResults[0].score < 0.5) {
        const bestMatch = navigationResults[0].item;
        return {
          text: bestMatch.response,
          action: 'navigate',
          section: bestMatch.section
        };
      }
      
      // Fallback: try to find exact section matches in the cleaned input
      const exactSectionMatch = this.navigationPatterns.find(pattern => 
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
    const directNavigationResults = this.navigationFuse.search(input);
    if (directNavigationResults.length > 0 && directNavigationResults[0].score < 0.4) {
      const bestMatch = directNavigationResults[0].item;
      return {
        text: `I'll take you to the ${bestMatch.section} section! ${bestMatch.response}`,
        action: 'navigate',
        section: bestMatch.section
      };
    }
    
    // Check for exact matches first
    const exactMatch = this.responsePatterns.find(pattern => 
      pattern.keywords.some(keyword => input.includes(keyword))
    );
    
    if (exactMatch) {
      return { text: exactMatch.response, action: 'respond' };
    }
    
    // Use fuzzy matching for partial matches and typos
    const fuzzyResults = this.responseFuse.search(input);
    
    if (fuzzyResults.length > 0 && fuzzyResults[0].score < 0.5) {
      const bestMatch = fuzzyResults[0].item;
      return { text: bestMatch.response, action: 'respond' };
    }
    
    // Check for partial keyword matches
    const partialMatch = this.responsePatterns.find(pattern => 
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
  }

  // Method to get portfolio data
  getPortfolioData() {
    return this.portfolioData;
  }

  // Method to update portfolio data
  updatePortfolioData(newData) {
    this.portfolioData = { ...this.portfolioData, ...newData };
  }

  // Method to manually send current conversation
  async sendCurrentConversation() {
    if (this.conversationHistory.length > 0) {
      await this.sendConversationToAPI();
    }
  }

  // // Method to get conversation history
  // getConversationHistory() {
  //   return this.conversationHistory;
  // }

  // // Method to clear conversation history
  // clearConversationHistory() {
  //   this.conversationHistory = [];
  //   this.messageCount = 0;
  // }
}

export default ChatBotLogic; 