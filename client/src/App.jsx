import './App.css';
import './index.css'; 



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CallRoom from './pages/CallRoom/CallRoom';
import JoinPage from './pages/JoinPage/JoinPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/call-room" element={<CallRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
