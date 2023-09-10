import React, { useEffect, useState }  from 'react';
import './Chat.css';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);
    const fetchMessageData = () => {
      fetch("http://localhost:3001/messages",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RoomID : roomid
        }),
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
            setMessages(data)
        })
    }
    socket.join(localStorage.getItem("roomid"));
    useEffect(() => {
        fetchMessageData()
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);
    return (
        <div className="chat">
            <div className="chat-main">
                <ChatBody messages={messages} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;