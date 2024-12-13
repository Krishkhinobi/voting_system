// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Candidate from './pages/Candidates';
import VotingSystem from './components/VotingSystem';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/vote" element={<VotingSystem />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path='/candidates' element={<Candidate />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
