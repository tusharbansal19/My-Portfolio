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
import FloatingTextClouds from './FloatingTextClouds';

const ChatBotUI = ({ onSendMessage, onVoiceInput, onSpeak, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [robotState, setRobotState] = useState('idle');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm Tushar's AI assistant. I can help you learn about his skills, projects, experience, and more. I can also navigate you to different sections of the portfolio! Just ask me anything or say 'take me to [section name]' to navigate. What would you like to know?",
      timestamp: new Date()
    }
  ]);

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

  // Debug robot state changes


  // Handle sending message
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    // Immediately clear input and add user message to chat
    setInputText('');
    setMessages(prev => [...prev, userMessage]);
    
    // Focus back on input field
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Check if it's a complex query
    const isComplexQuery = inputText.toLowerCase().includes('how') || 
                          inputText.toLowerCase().includes('why') || 
                          inputText.toLowerCase().includes('explain') ||
                          inputText.toLowerCase().includes('what is') ||
                          inputText.toLowerCase().includes('tell me about');
    
    setRobotState(isComplexQuery ? 'thinking' : 'typing');

    try {
      // Call the bot response handler
      const botResponse = await onSendMessage(inputText);
      
      if (botResponse) {
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
        
        setTimeout(() => {
          setRobotState('idle');
        }, 500);
      }
    } catch (error) {
      console.error('Error processing bot response:', error);
      setIsTyping(false);
      setRobotState('idle');
    }
  };

  // Handle navigation to different sections
  const handleNavigation = (sectionName) => {
    console.log('Navigation command detected for section:', sectionName);
    
    setTimeout(() => {
      console.log('Setting robot state to navigating...');
      setRobotState('navigating');
      console.log('Navigation started - should show robot-2.png');
      
      const sectionElement = document.getElementById(sectionName);
      if (sectionElement) {
        console.log(`Scrolling to ${sectionName} section`);
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log(`Section ${sectionName} not found`);
      }
      
      setTimeout(() => {
        console.log('Resetting robot state to idle...');
        setRobotState('idle');
        console.log('Navigation completed - returning to idle');
      }, 2000);
      
    }, 1500);
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
      setRobotState('listening');
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
      setRobotState('idle');
      
      // Automatically send the message after voice input
      setTimeout(async () => {
        if (transcript.trim()) {
          const voiceInputText = transcript;
          
          const userMessage = {
            id: Date.now(),
            type: 'user',
            text: voiceInputText,
            timestamp: new Date()
          };

          setInputText('');
          setMessages(prev => [...prev, userMessage]);
          
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
          
          setIsTyping(true);
          
          const isComplexQuery = voiceInputText.toLowerCase().includes('how') || 
                                voiceInputText.toLowerCase().includes('why') || 
                                voiceInputText.toLowerCase().includes('explain') ||
                                voiceInputText.toLowerCase().includes('what is') ||
                                voiceInputText.toLowerCase().includes('tell me about');
          
          setRobotState(isComplexQuery ? 'thinking' : 'typing');

          try {
            const botResponse = await onSendMessage(voiceInputText);
            
            if (botResponse) {
              const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                text: botResponse.text,
                timestamp: new Date()
              };

              setMessages(prev => [...prev, botMessage]);
              setIsTyping(false);
              
              if (botResponse.action === 'navigate' && botResponse.section) {
                handleNavigation(botResponse.section);
              }
              
              setTimeout(() => {
                setRobotState('idle');
              }, 500);
            }
          } catch (error) {
            console.error('Error processing bot response:', error);
            setIsTyping(false);
            setRobotState('idle');
          }
        }
      }, 100);
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
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        setRobotState('speaking');
      };
      utterance.onend = () => {
        setIsSpeaking(false);
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
    if (onClose) onClose();
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

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
            className="absolute inset-0 rounded-full animate-pulse-ring"
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
            <div className="w-20 h-20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
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
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {/* Robot image for bot messages */}
                  {message.type === 'bot' && (
                    <div className="flex-shrink-0 w-8 h-8">
                      <img 
                        src="/image/robot-2.png" 
                        alt="AI Assistant" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  
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
                  initial={{ opacity: 0, y: 20, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    x: 0,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }
                  }}
                  className="flex justify-start items-end gap-2"
                >
                  {/* Robot image for typing indicator */}
                  <div className="flex-shrink-0 w-8 h-8">
                    <img 
                      src="/image/robot-3.png" 
                      alt="AI Assistant Typing" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <motion.div 
                    className="bg-gray-100 text-gray-800 p-3 rounded-2xl max-w-[80%] animate-typing-glow"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 mr-2">AI is typing</span>
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

export default ChatBotUI; 