import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { ClerkProvider } from "@clerk/clerk-react";

// Use quotation marks for the publishable key
const PUBLISHABLE_KEY = "pk_test_cHJpbWUtbW9uc3Rlci01Mi5jbGVyay5hY2NvdW50cy5kZXYk";

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}> 
            <App />
        </ClerkProvider>
    </React.StrictMode>
);
