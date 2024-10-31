import React from 'react';
import { Line } from 'react-chartjs-2';

const GraphComponent = ({ farmData }) => {
  if (!Array.isArray(farmData) || farmData.length === 0) {
    console.log("GraphComponent: No farmData available for graph.");
    return <p>Loading graph data...</p>;
  }

  // Define the cutoff time for the last 30 minutes
  const now = new Date();
  const cutoffTime = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutes ago

  // Filter farmData to include only data points from the last 30 minutes
  const recentData = farmData.filter(data => {
    const dataTime = new Date(data.timestamp);
    console.log(`Timestamp: ${data.timestamp}, Parsed: ${dataTime}, Cutoff: ${cutoffTime}`);
    return dataTime >= cutoffTime;
  });

  if (recentData.length === 0) {
    console.log("GraphComponent: No recent data available within the last 30 minutes.");
    return <p>No data available for the past 30 minutes.</p>;
  }

  // Process filtered data for the graph
  const timestamps = recentData.map(data => new Date(data.timestamp).toLocaleTimeString());
  const temperatures = recentData.map(data => data.temperature);
  const soilMoistures = recentData.map(data => data.soilMoisture);
  const humidities = recentData.map(data => data.humidity);

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Soil Moisture (%)',
        data: soilMoistures,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Humidity (%)',
        data: humidities,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <div>
      <h3>Farm Data Over Time (Last 30 Minutes)</h3>
      <Line data={data} />
    </div>
  );
};

export default GraphComponent;
