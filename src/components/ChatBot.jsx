import React, { useState, useRef } from 'react';
import ChatBotUI from './ChatBotUI';
import ChatBotLogic from './ChatBotLogic';

const ChatBot = () => {
  const [chatBotLogic] = useState(() => new ChatBotLogic());

  // Handle bot response
  const handleSendMessage = async (userInput) => {
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get bot response using the logic component (await the async function)
      const botResponse = await chatBotLogic.getBotResponse(userInput);
      
      return botResponse;
    } catch (error) {
      console.error('Error in bot response:', error);
      return {
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        action: 'respond'
      };
    }
  };

  // Handle voice input (same as text input)
  const handleVoiceInput = async (transcript) => {
    return await handleSendMessage(transcript);
  };

  // Handle text-to-speech
  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      speechSynthesis.speak(utterance);
    }
  };

  // Handle chat close
  const handleCloseChat = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  return (
    <ChatBotUI
      onSendMessage={handleSendMessage}
      onVoiceInput={handleVoiceInput}
      onSpeak={handleSpeak}
      onClose={handleCloseChat}
    />
  );
};

export default ChatBot; 