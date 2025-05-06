import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  

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