import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RaiseComplaint from './pages/RaiseComplaint';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route - No Sidebar */}
        <Route path="/raise-complaint" element={<RaiseComplaint />} />

        {/* Owner/Admin Routes - With Sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/raise-complaint" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
