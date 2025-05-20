// MessageList.js
import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from 'react';

function MessageList({ messages, onOptionClick, isLoading }) { // Added onOptionClick, isLoading

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <ChatMessage
                    key={message.id} // Assuming message.id is unique
                    message={message}
                    onOptionClick={onOptionClick}
                    isLoading={isLoading}
                    // Options are active only if this message is a bot message,
                    // has options, and is the very last message in the chat.
                    areOptionsActive={
                        message.sender === 'bot' &&
                        message.options &&
                        message.options.length > 0 &&
                        index === messages.length - 1
                    }
                />
            ))}
            <div ref={messagesEndRef}/>
        </div >
    );
}

export default MessageList;