import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './components/Welcome';
import Tickets from './components/Tickets';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/tickets" element={<Tickets />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 