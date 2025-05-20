// ChatMessage.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

// You can add/update styling for the options in your CSS file
// For example:
// .options-container button { display: flex; align-items: center; gap: 8px; /* For image and text */ }
// .options-container button img { width: 40px; height: 40px; object-fit: cover; border-radius: 4px; }

function ChatMessage({ message, onOptionClick, isLoading, areOptionsActive }) {
  const { sender, text, options } = message;
  const messageClass = sender === 'user' ? 'user' : 'bot';

  const handleOptionButtonClick = (optionTitle) => {
    if (onOptionClick) {
      onOptionClick(optionTitle);
    }
  };

  return (
    <div className={`message ${messageClass}`}>
      {sender === 'bot' ? (
        <>
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} urlTransform={(uri) => uri}>
            {text}
          </ReactMarkdown>
          {options && options.length > 0 && (
            <div className="options-container">
              {options.map(option => (
                <button
                  key={option.id}
                  onClick={() => handleOptionButtonClick(option.title)}
                  disabled={isLoading || !areOptionsActive}
                  className="option-button" // Add a class for easier styling
                >
                  {/* Mock Image - replace with option.imageUrl if available */}
                  <img
                    src={`https://th.bing.com/th/id/OIP.m5qsck3Bp2oZzi5MoZtz_AHaEa?w=277&h=180&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3?text=${encodeURIComponent(option.title.substring(0,1))}`} // Placeholder image with first letter
                    alt={option.title}
                    className="option-image" // Add a class for easier styling
                  />
                  <span className="option-title">{option.title}</span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        text
      )}
    </div>
  );
}

export default ChatMessage;