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

  // This is where you would connect to your backend API
  const sendMessage = async (message) => {
    setIsLoading(true);
    
    try {
      // Replace this with your actual API call
      const response = await fetch('http://localhost:5678/webhook/92c3920c-1bef-4ea6-995f-a536e1f145af/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "chatInput": message,
            "chatId": getChatId(),
        })
      });
      const data = await response.json();
      // message format? markdown
      // please return question/options using this format
      // **Question**
      // - Option 1 ![Option 1](option_image_url1)
      // - Option 2 ![Option 2](option_image_url2)
      // - Option 3 ![Option 3](option_image_url3)
      let mes = data.output.message;
      mes += "![image](data:image/webp;base64,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)";
      return mes;
      
      // Simulating API delay
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      // return getSimulatedResponse(message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, inputRef };
}

export default useChatbot;