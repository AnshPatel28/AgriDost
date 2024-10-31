import React from 'react';
import './Card.css';

function Card() {
  return (
    <div id="sensors" className="sensor-container"> {/* Added id="sensors" */}
      <h1 className="sensor-heading">Sensors</h1>
      <div className="card-list">
        <a href="https://en.wikipedia.org/wiki/Soil_moisture_sensor" className="card-item" target="_blank" rel="noopener noreferrer">
          <div className="card-image soil-moisture-image"></div>
          <div className="card-content">
            <span className="sensor-name">Soil Moisture Sensor</span>
            <h3>A soil moisture sensor measures the volumetric water content in soil.</h3>
          </div>
          {/* <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div> */}
        </a>
        <a href="https://en.wikipedia.org/wiki/Thermo-hygrograph" className="card-item" target="_blank" rel="noopener noreferrer">
          <div className="card-image temperature-humidity-image"></div>
          <div className="card-content">
            <span className="sensor-name">Temperature and Humidity Sensor</span>
            <h3>A temperature and humidity sensor measures temperature and relative humidity.</h3>
          </div>
          {/* <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div> */}
        </a>
        <a href="https://en.wikipedia.org/wiki/Passive_infrared_sensor" className="card-item" target="_blank" rel="noopener noreferrer">
          <div className="card-image motion-detector-image"></div>
          <div className="card-content">
            <span className="sensor-name">Motion Detector</span>
            <h3>A motion detector detects movement in an area, often used for security purposes.</h3>
          </div>
          {/* <div className="arrow">
            <i className="fas fa-arrow-right card-icon"></i>
          </div> */}
        </a>
      </div>
    </div>
  );
}

export default Card;
