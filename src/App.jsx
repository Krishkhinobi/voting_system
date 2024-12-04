// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import VotingSystem from './components/VotingSystem';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VotingSystem />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
