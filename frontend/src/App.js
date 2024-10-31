import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import FarmDashboard from './components/FarmDashboard';

function App() {
  useEffect(() => {
    // Set the new ObjectId for testing
    localStorage.setItem('userId', '6510f9bcf5a1a527b56a23e7'); // New ObjectId
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/farm-dashboard" element={<FarmDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
