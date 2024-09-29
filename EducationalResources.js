// src/components/EducationalResources.js

import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import './EducationalResources.css'; // Import CSS for styling
import { Link } from 'react-router-dom'; // Import Link for navigation


// Define the resources array to use in the component
const EducationalResources = ({ resources = [] }) => { // Default to an empty array
    return (
        <div className="resources-container">
            {resources.map((resource, index) => ( // Use index as a last resort for key
                <Card key={index} variant="outlined" className="resource-card">
                    <CardContent>
                        <Typography variant="h6">{resource.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {resource.description}
                        </Typography>
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="learn-more-link">
                            Learn More
                        </a>
                    </CardContent>
                </Card>
            ))}
            <Link to="/">
                    <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                        Return to Dashboard
                    </Button>
            </Link>
        </div>
    );
};

// You can pass the resources array as a prop when using this component
const resourcesData = [
    {
        id: 1,
        title: "Understanding Stock Market Basics",
        description: "Learn about the fundamental concepts of stock markets, including how they work and their importance in the economy.",
        link: "https://www.nerdwallet.com/article/investing/stock-market-basics-everything-beginner-investors-know?msockid=3409aa7e37cc622a114cbe3236e063c6"
    },
    {
        id: 2,
        title: "Investment Strategies",
        description: "Explore various investment strategies to maximize your returns and minimize risks.",
        link: "https://optionstradingreport.com/lp/otilp01aw.php?utm_source=bing&utm_medium=search&utm_campaign=otroxf&utm_term=NAS&msclkid=901c9b6a3d501d323bc4fd92ef9bcbd3&utm_content=General"
    },
    {
        id: 3,
        title: "Technical Analysis Techniques",
        description: "Discover technical analysis methods used to evaluate stocks and make informed investment decisions.",
        link: "https://www.fool.com/investing/stock-market/basics/?msockid=3409aa7e37cc622a114cbe3236e063c6"
    }
];

// Usage example
// <EducationalResources resources={resourcesData} />

export default EducationalResources;
