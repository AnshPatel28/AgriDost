import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GraphComponent from './GraphComponent'; // Import the GraphComponent
import './FarmDashboard.css'; // Import CSS for styling

const FarmDashboard = () => {
  const [farmData, setFarmData] = useState(null); // Changed to null
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('Ansh Patel'); // Default username

  // Latest data state for each sensor
  const [latestTemperature, setLatestTemperature] = useState(null);
  const [latestSoilMoisture, setLatestSoilMoisture] = useState(null);
  const [latestHumidity, setLatestHumidity] = useState(null);
  const [latestMotionDetected, setLatestMotionDetected] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    const userId = localStorage.getItem('userId'); // Retrieve the userId from localStorage
    const storedUsername = localStorage.getItem('username');

    if (token && userId) {
      setIsLoggedIn(true);
      setUsername(storedUsername || 'Ansh Patel'); // Set the username if available
    } else {
      // If no token or userId exists, simulate a default user
      localStorage.setItem('token', 'default-token'); // Set a default token
      localStorage.setItem('username', 'Ansh Patel');
      localStorage.setItem('userId', 'default-user-id'); // Set a default user ID
      setIsLoggedIn(true);
      setUsername('Ansh Patel');
    }

    const fetchFarmData = async () => {
      try {
        if (!token || !userId) {
          console.error('No token or userId found');
          return;
        }

        // Validate that userId is a proper MongoDB ObjectId (24 hex characters)
        if (userId.length !== 24) {
          console.error('Invalid User ID format');
          return;
        }

        const response = await axios.get(`/api/farm/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = response.data;
        setFarmData(data);

        // Debugging: Log the fetched data
        console.log('Fetched Farm Data:', data);

        // Set latest sensor data
        if (Array.isArray(data) && data.length > 0) {
          const latestData = data[data.length - 1]; // Assume last item is the latest
          setLatestTemperature(latestData.temperature);
          setLatestSoilMoisture(latestData.soilMoisture);
          setLatestHumidity(latestData.humidity);
          setLatestMotionDetected(latestData.motionDetected);

          // Debugging: Log the latest data
          console.log('Latest Data:', latestData);
        } else if (data) {
          // Handle case where data is a single object
          setLatestTemperature(data.temperature);
          setLatestSoilMoisture(data.soilMoisture);
          setLatestHumidity(data.humidity);
          setLatestMotionDetected(data.motionDetected);

          // Debugging: Log the single data object
          console.log('Single Data Object:', data);
        }
      } catch (error) {
        console.error('Error fetching farm data', error);
      }
    };

    fetchFarmData();

    // Set interval to fetch the latest data every minute (60000ms)
    const interval = setInterval(fetchFarmData, 60000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div>
      {/* Navbar implementation */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">
            <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
          </Link>
        </div>
        <ul className="navbar-center">
          <li><Link to="/">About Us</Link></li>
          <li><Link to="/">Sensors</Link></li>
          <li><Link to="/farm-dashboard">Farm Data</Link></li> {/* Farm Data link */}
        </ul>
        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <span className="navbar-username">{username}</span> {/* Display username */}
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>

      {/* Cards Section */}
      <div className="row">
        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                <img src="/assets/images/tempicon.png" alt="Temperature Icon" className="card-icon" /> {/* Custom icon */}
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Latest Temperature Data</p>
                <h4 className="mb-0">{latestTemperature !== null ? `${latestTemperature} °C` : 'Loading...'}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Temperature</p>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                <img src="/assets/images/soilicon.png" alt="Soil Icon" className="card-icon" /> {/* Custom icon */}
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Latest Soil Moisture Data</p>
                <h4 className="mb-0">{latestSoilMoisture !== null ? `${latestSoilMoisture} %` : 'Loading...'}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Soil Moisture</p>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape shadow-success text-center border-radius-xl mt-n4 position-absolute">
                <img src="/assets/images/humidicon.png" alt="Humidity Icon" className="card-icon" /> {/* Custom icon */}
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Latest Humidity Data</p>
                <h4 className="mb-0">{latestHumidity !== null ? `${latestHumidity} %` : 'Loading...'}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-danger text-sm font-weight-bolder"></span>Humidity</p>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6">
          <div className="card">
            <div className="card-header p-3 pt-2">
              <div className="icon icon-lg icon-shape shadow-info text-center border-radius-xl mt-n4 position-absolute">
                <img src="/assets/images/motionicon.png" alt="Motion Icon" className="card-icon" /> {/* Custom icon */}
              </div>
              <div className="text-end pt-1">
                <p className="text-sm mb-0 text-capitalize">Latest Motion Detection Data</p>
                <h4 className="mb-0">{latestMotionDetected !== null ? (latestMotionDetected ? 'Detected' : 'None') : 'Loading...'}</h4>
              </div>
            </div>
            <hr className="dark horizontal my-0" />
            <div className="card-footer p-3">
              <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Motion Detection</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table to display raw data */}
      <div className="raw-data-table">
        <h2>Farm Data Dashboard</h2>
        <ul>
          {farmData ? (
            Array.isArray(farmData) ? (
              farmData.map((data, index) => (
                <li key={index}>
                  <strong>Date:</strong> {new Date(data.timestamp).toLocaleString()} | 
                  <strong> Temperature:</strong> {data.temperature} °C | 
                  <strong> Soil Moisture:</strong> {data.soilMoisture} % | 
                  <strong> Humidity:</strong> {data.humidity} % | 
                  <strong> Motion Detected:</strong> {data.motionDetected ? 'Yes' : 'No'}
                </li>
              ))
            ) : (
              <li>
                <strong>Date:</strong> {new Date(farmData.timestamp).toLocaleString()} | 
                <strong> Temperature:</strong> {farmData.temperature} °C | 
                <strong> Soil Moisture:</strong> {farmData.soilMoisture} % | 
                <strong> Humidity:</strong> {farmData.humidity} % | 
                <strong> Motion Detected:</strong> {farmData.motionDetected ? 'Yes' : 'No'}
              </li>
            )
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FarmDashboard;
