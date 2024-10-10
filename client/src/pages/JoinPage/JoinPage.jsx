
//JoinPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import meeting from './meeting1.jpeg';
import './Joinpage.css';

function JoinPage() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (name) {
      // Navigate to call room, passing both roomCode and name as state
      navigate(`/call-room`, { state: { name } });
    } else {
      alert("Please enter your name");
    }
  };


  return (
    <div className="container">
      <div className="heading">
        <h1>VMeet</h1>
        {/* <img src={meeting} alt="nothing" /> */}
        <h3>Elevate Your Meetings </h3><br />
        <p>Transform virtual interactions into engaging experiences,
Empower your team to achieve more together.</p>
      </div>
      <div className="box">
        <div className="join">
          <input
            type="text"
            placeholder="    Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Fixed to setName
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
        
      </div>
    </div>
  );
}

export default JoinPage;

