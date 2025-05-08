import { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from './ChatInput';
import useChatbot from '../hooks/useChatbot';

function ChatContainer() {
    const [messages, setMessages] = useState([
      { id: 1, text: "Hello! How can I help you today?", sender: "bot" }
    ]);
    const { sendMessage, isLoading, inputRef } = useChatbot();
  
    const handleSendMessage = async (text) => {
      if (!text.trim()) return;
      
      // Add user message
      const userMessage = { id: Date.now(), text, sender: "user" };
      setMessages(prev => [...prev, userMessage]);
      
      // Get bot response
      try {
        const botResponse = await sendMessage(text);
        const botMessage = { id: Date.now() + 1, text: botResponse, sender: "bot" };
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage = { 
          id: Date.now() + 1, 
          text: "Sorry, I'm having trouble processing your request.", 
          sender: "bot", 
          isError: true 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    };
  
    return (
      <div className="chat-container">
        <div>
          <h1>Chatbot</h1>
        </div>
        
        <MessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} inputRef={inputRef} />
      </div>
    );
  }

  export default ChatContainer