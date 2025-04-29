import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import './App.css';

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // --- Effects ---

  // Load chat history from local storage on initial load (optional persistence)
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    const savedCurrentId = localStorage.getItem('currentChatId');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setChatHistory(parsedHistory);
      // If there's a saved current ID and it exists in history, use it
      if (savedCurrentId && parsedHistory.some(chat => chat.id === savedCurrentId)) {
        setCurrentChatId(savedCurrentId);
      } else if (parsedHistory.length > 0) {
         // Otherwise, select the first chat if history is not empty
        setCurrentChatId(parsedHistory[0].id);
      } else {
          // If history is empty after loading, create a new chat
          handleNewChat();
      }
    } else {
      // If nothing in storage, start with a new chat
      handleNewChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount


  // Save chat history to local storage whenever it changes (optional persistence)
  useEffect(() => {
    if (chatHistory.length > 0) {
        localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
    if (currentChatId) {
        localStorage.setItem('currentChatId', currentChatId);
    }
  }, [chatHistory, currentChatId]);


  // --- Helper Functions ---

  // Find the currently active chat object
  const getCurrentChat = () => {
    return chatHistory.find(chat => chat.id === currentChatId);
  };

  // Simulate bot response (replace with actual API call)
  const getBotResponse = async (userMessage, setIsLoading) => {
    setIsLoading(true); // Show loading indicator

    // --- Configuration ---
    const API_ENDPOINT = '/api/chatbot'; // <-- REPLACE WITH YOUR ACTUAL API ENDPOINT
    const API_METHOD = 'POST';
    // Add any necessary headers, like Authorization for API keys
    const API_HEADERS = {
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer YOUR_API_KEY', // Example for authentication
    };
    // Adjust the body structure based on what your API expects
    const API_BODY = JSON.stringify({
      message: userMessage,
      // You might need to send chat history or other context here
      // history: getCurrentChat()?.messages || []
    });

    try {
      const response = await fetch(API_ENDPOINT, {
        method: API_METHOD,
        headers: API_HEADERS,
        body: API_BODY,
      });

      if (!response.ok) {
        // Handle non-successful responses (e.g., 4xx, 5xx)
        const errorData = await response.text(); // Try to get error details
        console.error(`API Error ${response.status}: ${errorData}`);
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      // --- Adjust Response Parsing ---
      // Modify 'data.reply' based on the actual structure of your API response
      const botReply = data.reply || data.text || data.message;

      if (!botReply) {
          console.error("API response did not contain a valid reply.", data);
          throw new Error("Invalid response structure from API.");
      }

      return botReply; // Return the bot's message text

    } catch (error) {
      console.error('Error fetching bot response:', error);
      // Return a user-friendly error message
      return "Sorry, I encountered an error trying to connect to the chatbot service. Please try again later.";

    } finally {
      setIsLoading(false); // Hide loading indicator regardless of success or failure
    }
  };

  // --- Event Handlers ---

  const handleNewChat = () => {
    const newChatId = uuidv4();
    const newChat = {
      id: newChatId,
      title: `New Chat ${chatHistory.length + 1}`, // Placeholder title
      messages: [],
    };
    // Add to the beginning of the history for better UX
    setChatHistory(prevHistory => [newChat, ...prevHistory]);
    setCurrentChatId(newChatId);
  };

  const handleSelectChat = (id) => {
    setCurrentChatId(id);
  };

  const handleSendMessage = async (userMessageText) => {
    if (!currentChatId || isLoading) return;

    const userMessage = {
      id: uuidv4(),
      sender: 'user',
      text: userMessageText,
    };

    // Update chat history with the user message immediately
    // Create a new history array with the updated chat
    setChatHistory(prevHistory => {
      return prevHistory.map(chat => {
        if (chat.id === currentChatId) {
          // Update title based on the first message if it's empty
          const newTitle = chat.messages.length === 0
            ? userMessageText.substring(0, 30) + (userMessageText.length > 30 ? '...' : '')
            : chat.title;

          return {
            ...chat,
            title: newTitle, // Update title here
            messages: [...chat.messages, userMessage],
          };
        }
        return chat;
      });
    });


    // Get bot response (asynchronously)
    const botResponseText = await getBotResponse(userMessageText);

    const botMessage = {
      id: uuidv4(),
      sender: 'bot',
      text: botResponseText,
    };

    // Update chat history with the bot message
     setChatHistory(prevHistory => {
        return prevHistory.map(chat =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, botMessage] }
            : chat
        );
      });
  };

  // --- Render ---

  const currentChat = getCurrentChat();

  return (
    <div className="app-container">
      <Sidebar
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />
      <ChatWindow
        currentChat={currentChat} // Pass the whole chat object or just messages
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;