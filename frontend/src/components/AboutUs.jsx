import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling
import Card from './Card'; // Import the Card component
import { Link } from 'react-router-dom'; // Import Link for navigation

const AboutUs = () => {
  return (
    <>
      <div className="about-us-container">
        {/* Video Background */}
        <video className="background-video" autoPlay loop muted>
          <source src="/images/2758322-uhd_3840_2160_30fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Text Content on top of video */}
        <div className="content-overlay">
          <h1>Welcome to AgriDost</h1>
          <p>Empowering Farms with Real-time Sensor Insights for Smarter Agriculture</p>
        </div>
      </div>

      {/* About Us Section */}
      <section id="about" className="about-us"> {/* Added id="about" */}
        <div className="about">
          <img src="/assets/images/aboutus.jpg" alt="About Us" className="pic" />
          <div className="text">
            <h2>About Us</h2>
            <h5>What is AgriDost?</h5>
            <p>AgriDost is an innovative project that integrates a hardware module equipped with temperature, humidity, soil moisture, and motion detection sensors to monitor farm conditions. The app fetches real-time data from these sensors, providing farmers with valuable insights on a dedicated farm data page. By empowering users with crucial environmental information, AgriDost aims to enhance decision-making and optimize farming practices for smarter, more efficient agriculture.</p>
            <div className="data">
              <Link to="/farm-dashboard" className="hire">Farm Data</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="articles">
        <Card />
      </section>
    </>
  );
};

export default AboutUs;
