// src/components/charts/StockPriceChart.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Papa from 'papaparse';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components needed for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function StockPriceChart({ selectedStock, startDate, endDate, graphOptions }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Load the CSV file using papaparse
    Papa.parse("/data/processed/processed_data_with_predictions.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const data = result.data;

        // Filter data based on the selected stock, date range, and graph options
        const filteredData = data.filter(
          (row) =>
            row.Name === selectedStock &&
            new Date(row.date) >= new Date(startDate) &&
            new Date(row.date) <= new Date(endDate)
        );

        // Prepare data for the chart
        const labels = filteredData.map((row) => row.date);
        const datasets = [];

        if (graphOptions.includes("actual")) {
          datasets.push({
            label: "Actual Values",
            data: filteredData.map((row) => parseFloat(row.close)),
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
            tension: 0.3,            // Enable smooth curves
            pointRadius: 0,          // Disable points at each data value
            borderWidth: 2,          // Line thickness
          });
        }
        if (graphOptions.includes("svr_predicted")) {
          datasets.push({
            label: "SVR Predicted",
            data: filteredData.map((row) => parseFloat(row.svr_predicted)),
            borderColor: 'rgba(153, 102, 255, 1)',
            fill: false,
            tension: 0.3,            // Enable smooth curves
            pointRadius: 0,          // Disable points at each data value
            borderWidth: 2,          // Line thickness
          });
        }
        if (graphOptions.includes("rf_predicted")) {
          datasets.push({
            label: "RF Predicted",
            data: filteredData.map((row) => parseFloat(row.rf_predicted)),
            borderColor: 'rgba(255, 159, 64, 1)',
            fill: false,
            tension: 0.3,            // Enable smooth curves
            pointRadius: 0,          // Disable points at each data value
            borderWidth: 2,          // Line thickness
          });
        }

        // Set the chart data
        setChartData({
          labels,
          datasets,
        });
      },
    });
  }, [selectedStock, startDate, endDate, graphOptions]);

  return (
    <div style={{ width: '80vw', height: '70vh', margin: 'auto' }}> {/* Adjust width and height as needed */}
      {chartData ? (
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,  // Allows resizing of the chart
            plugins: {
              legend: {
                display: true,
                position: 'top',
              },
              title: {
                display: true,
                text: `Stock Price Predictions for ${selectedStock}`,
                font: { size: 24 },     // Adjust title font size
              },
            },
            scales: {
              x: { title: { display: true, text: "Date" } },
              y: { title: { display: true, text: "Stock Price" } },
            },
            elements: {
              line: {
                tension: 0.3,          // Smooth curves
              },
              point: {
                radius: 0,             // Disable points to get straight lines
              },
            },
          }}
          width={1000}  // Width of the chart
          height={600}  // Height of the chart
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
}
export default StockPriceChart;