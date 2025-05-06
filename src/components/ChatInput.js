import { useState } from "react";

function ChatInput({onSendMessage, isLoading}) {
    const [inputText, setInputText] = useState("");
    
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };
    
    // Handle Enter key press to send message
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !isLoading) {
        event.preventDefault();
        handleSendMessage();
        }
    };
    
    const handleSendMessage = () => {
        if (inputText.trim() !== "") {
        onSendMessage(inputText);
        setInputText("");
        }
    };
    
    return (
        <div className="chat-input">
        <textarea
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
            Send
        </button>
        </div>
    );
}

export default ChatInput;