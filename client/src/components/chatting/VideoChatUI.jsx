import React, { useState, useEffect } from 'react';
import socket from '../../services/socket'; // Import the socket instance
import './VideoChatUI.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


const VideoChatUI = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming chat messages from the server
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up the event listener on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { text: newMessage, sender: 'You' };
  
      // Emit the message to the server, but don't update local state manually
      socket.emit('sendMessage', message);
  
      setNewMessage(''); // Clear the input
    }
  };
  

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'You' ? 'outgoing' : 'incoming'}`}
          >
            <span className="message-sender">{message.sender}</span>
            <span className="message-text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
       <button onClick={handleSendMessage}>
  <FontAwesomeIcon icon={faArrowUp} />
</button>

      </div>
    </div>
  );
};

export default VideoChatUI;
