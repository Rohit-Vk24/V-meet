import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Joinpage.css';

function JoinPage() {
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomCode && name) {
      // Navigate to call room, passing both roomCode and name as state
      navigate(`/call-room`, { state: { roomCode, name } });
    } else {
      alert("Please enter both a room code and your name");
    }
  };

  const handleCreateRoom = () => {
    // Logic to create room and navigate
    navigate('/call-room', { state: { roomCode: 'newRoom', name } }); // Example room creation
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>VMeet</h1>
        <h3>Your All in One Meeting platform</h3>
      </div>
      <div className="box">
        <div className="join">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Fixed to setName
          />
          <button onClick={handleJoinRoom}>Join Room</button>
        </div>
        <span>or</span>
        <div className="create">
          <button onClick={handleCreateRoom}>Create Room</button>
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
