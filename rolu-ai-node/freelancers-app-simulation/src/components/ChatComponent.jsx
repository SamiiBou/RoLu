// src/components/ChatComponent.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatComponent.css';

const ChatComponent = () => {
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  const [sessionId] = useState('default'); // Customize as needed
  const conversationEndRef = useRef(null);

  // Initialize conversation on component mount.
  useEffect(() => {
    async function initConversation() {
      try {
        // Send an empty message to trigger initialization.
        const response = await axios.post('/chat', {
          session_id: sessionId,
          message: "",
        });
        console.log("Initial conversation response:", response.data);
        if (response && response.data && response.data.reply) {
          // Set the conversation state with the initial greeting.
          setConversation([
            { role: 'assistant', content: response.data.reply },
          ]);
        }
      } catch (error) {
        console.error("Error initializing conversation:", error);
      }
    }
    // Only initialize if conversation is empty.
    if (conversation.length === 0) {
      initConversation();
    }
  }, [sessionId, conversation.length]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage(''); // Clear input field immediately
    // Append user's message to conversation
    setConversation(prev => [...prev, { role: 'user', content: userMessage }]);
    console.log("User message sent:", userMessage);

    try {
      const response = await axios.post('/chat', {
        session_id: sessionId,
        message: userMessage,
      });
      console.log("Response from /chat endpoint:", response.data);
      if (response && response.data && response.data.reply) {
        const botReply = response.data.reply;
        setConversation(prev => [...prev, { role: 'assistant', content: botReply }]);
      } else {
        console.error('No reply found in the response:', response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Scroll to the bottom when conversation updates.
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log("Conversation updated:", conversation);
  }, [conversation]);

  // Filter out system messages for display.
  const displayedConversation = conversation.filter(msg => msg.role !== 'system');

  return (
    <div className="chat-container">
      <h2>Chat with Our RoLu Assistant</h2>
      <div className="conversation">
        {displayedConversation.length === 0 ? (
          <div className="placeholder">Your conversation will appear here.</div>
        ) : (
          displayedConversation.map((msg, index) => (
            <div key={index} className={`message ${msg.role}`}>
              <div className="message-content">{msg.content}</div>
            </div>
          ))
        )}
        <div ref={conversationEndRef} />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;