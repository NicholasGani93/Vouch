import React, { useState } from 'react';

const ChatFooter = (socket) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('username')) {
      const roomID = localStorage.getItem('roomid')
      socket.broadcast.to(roomID).emit('message', {
        text: message,
        name: localStorage.getItem('username'),
        roomid: roomID,
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };
  return (
    <div className="chat-footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;