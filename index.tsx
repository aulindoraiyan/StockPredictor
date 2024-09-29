import React from 'react';
import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
    UserButton
} from "@clerk/clerk-react";
import "./Auth.css";

const Auth = () => {
    return (
        <div className="sign-in-container">
            <h1>Welcome to Stock Predictor</h1>
            <p>Sign in or sign up to access personalized stock predictions and investment recommendations.</p>
            <SignedOut>
                <div className="auth-buttons">
                    <SignUpButton mode="modal" />
                    <SignInButton mode="modal" />
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};

export default Auth;
