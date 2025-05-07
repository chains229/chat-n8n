import { useState } from "react";

function ChatInput({onSendMessage, isLoading}) {
    const [inputText, setInputText] = useState("");
    
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };
    
    // Handle keydown events for message input
    const handleKeyDown = (event) => {
        // Check if Enter key was pressed
        if (event.key === "Enter") {
            // If Shift+Enter, allow default behavior (new line)
            if (event.shiftKey) {
                return; // Do nothing, let textarea add a new line naturally
            } 
            // If just Enter without Shift and not loading, send the message
            else if (!isLoading) {
                event.preventDefault(); // Prevent default to avoid adding a new line
                handleSendMessage();
            }
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