import ChatMessage from "./ChatMessage";

function MessageList({ messages }) {
    return (
        <div className="message-list">
            {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
            ))}
        </div>
    );
}

export default MessageList