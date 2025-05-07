import ChatMessage from "./ChatMessage";
import { useEffect, useRef } from 'react';

function MessageList({ messages }) {

    // Create a ref for the end of message list
    const messagesEndRef = useRef(null);

    // Function to scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // Automatically scroll down when messages change (new message added)
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
            <div ref={messagesEndRef}/>
        </div >
    );
}

export default MessageList