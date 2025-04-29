import React from 'react';

function Sidebar({ chatHistory, onNewChat, onSelectChat, currentChatId }) {
  return (
    <aside className="sidebar">
      <button onClick={onNewChat} className="new-chat-button">
        + New Chat
      </button>
      <h2>Chat History</h2>
      <ul className="chat-history-list">
        {chatHistory.map((chat) => (
          <li
            key={chat.id}
            className={`chat-history-item ${chat.id === currentChatId ? 'active' : ''}`}
            onClick={() => onSelectChat(chat.id)}
            title={chat.title || 'New Chat'} // Show full title on hover
          >
            {chat.title || 'New Chat'}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;