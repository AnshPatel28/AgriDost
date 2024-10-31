import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Navbar.css'; // Import Navbar CSS

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Ansh Patel'); // Default username

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userId');

    if (token && storedUsername && storedUserId) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    } else {
      // Default login if no token exists
      localStorage.setItem('token', 'default-token'); // Set a default token
      localStorage.setItem('username', 'Ansh Patel');
      localStorage.setItem('userId', 'default-user-id'); // Set a default user ID
      setIsLoggedIn(true);
      setUsername('Ansh Patel');
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Wrap the logo in a Link component to navigate to the main page */}
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
        </Link>
      </div>
      <ul className="navbar-center">
        <li><a href="#about">About Us</a></li> {/* Scroll to About Us */}
        <li><a href="#sensors">Sensors</a></li> {/* Scroll to Sensors */}
        <li><Link to="/farm-dashboard">Farm Data</Link></li> {/* Navigate to Farm Data page */}
      </ul>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span className="navbar-username">{username}</span> {/* Display username */}
          </>
        ) : (
          <></> // No Sign Up or Logout button
        )}
      </div>
    </nav>
  );
};

export default Navbar;
