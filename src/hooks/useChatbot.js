// useChatbot.js
import { useState, useRef, useEffect } from 'react';

function useChatbot() {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const shouldFocus =  !isLoading && inputRef.current;
    if (shouldFocus) {
      inputRef.current.focus();
    }
  }, [isLoading]);

  const getChatId = () => {
    let chatId = sessionStorage.getItem("chatId");
    if (!chatId) {
      chatId = "chat_" + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem("chatId", chatId);
    }
    return chatId;
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5678/webhook/92c3920c-1bef-4ea6-995f-a536e1f145af/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "chatInput": message,
            "chatId": getChatId(),
        })
      });
      const data = await response.json();

      if (data && data.output) { // Fallback for a direct object response
        return {
          is_finished: data.output.is_finished || false,
          text: data.output.message,
          options: data.output.options || []
        };
      }
      // Handle unexpected structure
      console.error("Unexpected backend response structure:", data);
      return { text: "Error: Could not parse bot response.", options: [] };
      
    } catch (error) {
      console.error("Error sending message to backend:", error);
      return { text: "Sorry, an error occurred while connecting to the server.", options: [] };
    }
    finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, inputRef };
}

export default useChatbot;