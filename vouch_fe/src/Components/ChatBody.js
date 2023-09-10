import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('roomid');
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat-mainHeader">
        <p>{localStorage.getItem('roomid')}</p>
        <button className="leaveChat-btn" onClick={handleLeaveChat}>
          Exit
        </button>
      </header>

      <div className="message-container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message-chats" key={message.id}>
              <p className="sender-name">You</p>
              <div className="message-sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message-chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message-recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message-status">
          <p>Someone is typing...</p>
        </div>
      </div>
    </>
  );
};

export default ChatBody;