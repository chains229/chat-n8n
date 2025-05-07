import { useState } from 'react';

function useChatbot() {
  const [isLoading, setIsLoading] = useState(false);

  // This is where you would connect to your backend API
  const sendMessage = async (message) => {
    setIsLoading(true);
    
    try {
      // Replace this with your actual API call
      const response = await fetch('http://localhost:5678/webhook/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      const data = await response.json();
      return data.output;
      
      // Simulating API delay
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      // return getSimulatedResponse(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading };
}

// Helper function to simulate responses
function getSimulatedResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello there! How can I assist you today?";
    } else if (lowerMessage.includes('help')) {
      return "I'm here to help! What do you need assistance with?";
    } else if (lowerMessage.includes('bye')) {
      return "Goodbye! Have a great day!";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Anything else I can help with?";
    } else {
      return "I understand you said something about '" + 
        message.slice(0, 20) + (message.length > 20 ? '...' : '') + 
        "'. How can I assist you with that?";
    }
  }

export default useChatbot;