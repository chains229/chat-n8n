// ChatMessage.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

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
                  { !option.filePath && ( // In case no filepath
                  <img
                    src={`https://www.maatkussens.nl/assets/icons/apple-touch-icon.png?w=277&h=180&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3?text=${encodeURIComponent(option.title.substring(0,1))}`} // Placeholder image with first letter
                    alt={option.title}
                    className="option-image" // Add a class for easier styling
                  />)}

                  { option.filePath && (
                  <img
                    src={`http://maatkussens.acc2017.nofruit.nl/thumbnails/${option.filePath}?w=277&h=180&c=7&r=0&o=7&cb=iwp2&pid=1.7&rm=3?text=${encodeURIComponent(option.title.substring(0,1))}`} // Placeholder image with first letter
                    alt={option.title}
                    className="option-image" // Add a class for easier styling
                  />)}

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