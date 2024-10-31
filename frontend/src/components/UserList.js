import React, { useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'; // Import Navbar component
import AboutUs from './AboutUs'; // Import AboutUs component

const UserList = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate an API call to fetch users (update the URL to match your backend)
        await axios.get('/api/users');
        // Handle the response if needed in the future
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
      }
    };
    fetchUsers(); // Fetch the users when the component mounts
  }, []);

  return (
    <div>
      <Navbar /> {/* Render Navbar */}
      <AboutUs /> {/* Display About Us section */}
    </div>
  );
};

export default UserList;
