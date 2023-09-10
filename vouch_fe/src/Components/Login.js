import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Login.css';


function Login() {
  const navigate = useNavigate();

  const [errorMessages, setError] = useState('');
  const [username, setUsername] = useState('');
  const [roomid, setRoomID] = useState('');
  const renderErrorMessage = () =>
  errorMessages.appear && (
    <div className="error">{errorMessages.message}</div>
  );
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const currUser = username;
    const currRoom = roomid;
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username : username,
          RoomID : roomid
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError({ appear: true, message: errorData.message });
      } else {
        localStorage.setItem("username", currUser)
        localStorage.setItem("roomid", currRoom)
        navigate('/chat');
      }
    } catch (error) {
      setError({ appear: true, message: error.message });
    }
  };
  const renderForm = (
    <div className="form">
      {renderErrorMessage()}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} placeholder="Username" required />
        </div>
        <div className="input-container">
          <input type="text" name="roomid" onChange={(e)=>setRoomID(e.target.value)} placeholder="RoomID" required />
        </div>
        <div className="button-container">
          <button type="submit">JOIN</button>
        </div>
      </form>
    </div>
  );
  return (
    <div className="login-form">
        <div className="title">JOIN CHATROOM</div>
        {renderForm}
    </div>
  );
}

export default Login;
