import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RedirectHandler from './components/RedirectHandler';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:shortCode" element={<RedirectHandler />} />
    </Routes>
  );
};

export default App;