import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

function ChatWindow({ currentChat, onSendMessage, isLoading }) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null); // Ref for scrolling

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages change or component mounts for a new chat
  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages, isLoading]); // Dependency on messages and loading state

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    if (inputText.trim() && !isLoading) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { // Send on Enter, allow Shift+Enter for newline
      e.preventDefault(); // Prevent default newline behavior
      handleSend();
    }
  };

  if (!currentChat) {
    return (
        <div className="chat-window">
            <div className="no-chat-selected">
                Select a chat or start a new one!
            </div>
        </div>
    );
  }

  return (
    <main className="chat-window">
      <div className="chat-messages">
        {currentChat.messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && <div className="loading-indicator">Bot is thinking...</div>}
        {/* Dummy div to help scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input-area">
        <textarea
          className="chat-input"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows="1" // Start with one row, CSS can handle expansion if needed
          disabled={isLoading} // Disable input while bot is thinking
        />
        <button
            className="send-button"
            onClick={handleSend}
            disabled={isLoading || !inputText.trim()} // Disable if loading or input is empty
        >
          Send
        </button>
      </div>
    </main>
  );
}

export default ChatWindow;