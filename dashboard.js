// src/App.js

import React, { useState, useEffect } from 'react';
import DateRangePicker from '../../components/common/DateRangePicker';
import StockPriceChart from '../../components/charts/StockPriceChart';
import Papa from 'papaparse';
import './dashboard.css';
import { Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';
import ChatBot from '../../components/chatbot/ChatBot';
import { Link } from 'react-router-dom'; // Import Link for navigation
import {
    
    UserButton
} from "@clerk/clerk-react";


function Dashboard() {
    const [startDate, setStartDate] = useState(new Date("2013-01-01")); // Set your start date
    const [endDate, setEndDate] = useState(new Date("2018-01-01")); // Set your end date
    const [stocks, setStocks] = useState([]);  // State for available stocks
    const [selectedStock, setSelectedStock] = useState('AAPL');  // Default stock
   
    

    // Load stock names from CSV
    useEffect(() => {
        Papa.parse("/data/processed/processed_data_with_predictions.csv", {
            download: true,
            header: true,
            complete: (result) => {
                const stockNames = Array.from(new Set(result.data.map(row => row.Name)));
                setStocks(stockNames); // Just keep stock names for simplicity
            }
        });
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Stock Prediction Dashboard</h1>
                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <Link to="/auth" style={{ textDecoration: 'none' }}>
                    <UserButton/>
                </Link>
                </div>

                <div className="stock-selection">
                    {/* Flex container for dropdown and date picker */}
                    <div className="flex-container">
                        <FormControl variant="outlined" style={{ width: '300px', marginRight: '20px', color: 'white' }}>
                            <InputLabel sx={{ color: 'white' }}>Select Stock</InputLabel>
                            <Select
                                value={selectedStock} // Set selected stock
                                onChange={(event) => setSelectedStock(event.target.value)} // Update selected stock
                                label="Select Stock"
                                sx={{
                                    color: 'white', // Text color of selected stock
                                    '.MuiSvgIcon-root': {
                                      color: 'white', // Arrow color
                                    },
                                    '& .MuiSelect-icon': {
                                      color: 'white', // Dropdown arrow color
                                    },
                                  }}
                            >
                                {stocks.map((stock) => (
                                    <MenuItem key={stock} value={stock}>
                                        {stock}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <DateRangePicker
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={setStartDate}
                            onEndDateChange={setEndDate}
                            className="date-range-picker"
                        />
                    </div>
                </div>
            </header>

            {/* Main content area with scrollable height */}
            <div className="main-content" style={{ overflowY: 'scroll', height: 'calc(100vh - 200px)', padding: '20px' }}>
                {/* Stock Price Chart */}
                <StockPriceChart
                    startDate={startDate}
                    endDate={endDate}
                    selectedStock={selectedStock}
                    graphOptions={["actual", "svr_predicted", "rf_predicted"]}
                />

                {/* Link to Educational Resources */}
                <Link to="/resources">
                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                        View Educational Resources
                    </Button>
                </Link>
                
             

                <ChatBot />
            </div>
        </div>
    );
}

export default Dashboard;
