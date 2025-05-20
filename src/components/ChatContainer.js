// ChatContainer.js
import { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from './ChatInput';
import useChatbot from '../hooks/useChatbot'; // Ensure this path is correct

function ChatContainer() {
    const [messages, setMessages] = useState([
      {
        id: 1,
        text: "Hello! I am NoFruit chatbot. Are you ready to start our Selection Aid?",
        sender: "bot",
        options: [] // Add options array for consistency
      }
    ]);
    const { sendMessage, isLoading, inputRef } = useChatbot();

    const addMessageToList = (message) => {
      setMessages(prev => [...prev, message]);
    };
  
    // Handles messages typed by the user
    const handleSendMessage = async (text) => {
      if (!text.trim() || isLoading) return;
      
      const userMessage = { id: Date.now(), text, sender: "user" };
      addMessageToList(userMessage);
      
      try {
        const botResponseData = await sendMessage(text); // sendMessage now returns {text, options}
        const botMessage = {
          id: Date.now() + 1,
          text: botResponseData.text,
          sender: "bot",
          options: botResponseData.options || [] // Store options
        };
        addMessageToList(botMessage);
      } catch (error) {
        // This catch is more for unexpected errors from sendMessage itself,
        // though useChatbot now returns an error object for network/parsing issues.
        console.error("Error in handleSendMessage:", error);
        const errorMessage = { 
          id: Date.now() + 1, 
          text: "Sorry, I'm having trouble processing your request.", 
          sender: "bot",
          options: [],
          isError: true 
        };
        addMessageToList(errorMessage);
      }
    };

    // Handles clicks on option buttons
    const handleOptionClick = async (optionText) => {
      if (isLoading) return; // Prevent action if already loading

      // 1. Display the user's choice as a user message
      const userMessage = {
        id: Date.now(),
        text: optionText, // The text of the clicked option
        sender: "user"
      };
      addMessageToList(userMessage);

      // 2. Send this choice to the backend to get the next response
      try {
        const botResponseData = await sendMessage(optionText);
        const botMessage = {
          id: Date.now() + 1,
          text: botResponseData.text,
          sender: "bot",
          options: botResponseData.options || []
        };
        addMessageToList(botMessage);
      } catch (error) {
        console.error("Error in handleOptionClick:", error);
        const errorMessage = { 
          id: Date.now() + 1, 
          text: "Sorry, an error occurred while processing your choice.", 
          sender: "bot",
          options: [],
          isError: true 
        };
        addMessageToList(errorMessage);
      }
    };
  
    return (
      <div className="chat-container">
        <div>
          <h1>NoFruit Chatbot</h1>
        </div>
        
        <MessageList
          messages={messages}
          onOptionClick={handleOptionClick} // Pass the handler
          isLoading={isLoading}             // Pass loading state
        />
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          inputRef={inputRef}
        />
      </div>
    );
  }

  export default ChatContainer;