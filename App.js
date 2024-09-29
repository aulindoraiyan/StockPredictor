// src/App.js

import React, { useState } from 'react';
import Dashboard from './pages/dashboard/dashboard';
import "./App.css";
import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Auth from '../src/pages/auth/index.tsx';
import EducationalResources from './pages/resources/EducationalResources.js';

// Define the resources array to pass as props
const resourcesData = [
  {
      id: 1,
      title: "Understanding Stock Market Basics",
      description: "Learn about the fundamental concepts of stock markets, including how they work and their importance in the economy.",
      link: "#"
  },
  {
      id: 2,
      title: "Investment Strategies",
      description: "Explore various investment strategies to maximize your returns and minimize risks.",
      link: "#"
  },
  {
      id: 3,
      title: "Technical Analysis Techniques",
      description: "Discover technical analysis methods used to evaluate stocks and make informed investment decisions.",
      link: "#"
  }
];


function App() {
  

  return (
    <Router>
    <div className="App">
      {/* App Navbar as Header */}
      <Routes>
          <Route path = "/" element = {<Dashboard/>} />
          <Route path = "/auth" element = {<Auth/>} />
          <Route path="/resources" element={<EducationalResources resources={resourcesData} />} />

      </Routes>
      

     
      
    </div>
    </Router>
  );
}

export default App;
