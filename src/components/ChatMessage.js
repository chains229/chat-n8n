import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Import GFM plugin
import rehypeRaw from 'rehype-raw';

// Render LLM's response with Markdown support, otherwise render user text directly
function ChatMessage({ message }) {
  const { sender, text } = message;
  const messageClass = sender === 'user' ? 'user' : 'bot';

  return (
    <div className={`message ${messageClass}`}>
      {sender === 'bot' ? (
        <ReactMarkdown remarkPlugins={[remarkGfm] } rehypePlugins={[rehypeRaw]} urlTransform={(uri) => uri}>
            {text}
        </ReactMarkdown>
      ) : (
        text // Render user text directly
      )}
    </div>
  );
}

export default ChatMessage;