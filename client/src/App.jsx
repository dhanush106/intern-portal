import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard.jsx';
import Rewards from './components/Rewards';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard/:userId" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/rewards/:userId" element={<Rewards />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;