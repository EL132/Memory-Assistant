import React from 'react';
import './ErrorScreen.css';
import { Link } from 'react-router-dom';

const ErrorScreen = () => {
    return (
        <div className="error-screen">
            <Link to="/" className="title-banner">
                <div >
                    <h6>Elix Devs</h6>
                </div>
            </Link>
            <div className="error-screen-container">
                <div className="error-container">
                    <img src="./assets/error.svg" alt="" className="error-img"></img>
                    <p style={{ color: 'black', fontSize: '.5em', marginBottom: '1vh'}}>Image from Storyset</p>
                    <p style={{ color: 'black', fontSize: '1.4em'}}>Looks like there are too many users testing the site right now 😮‍💨</p>
                    <p style={{ color: 'black', fontSize: '.9em'}}>Or our API key has been abused to obvilion...</p>
                    
                </div> 
            </div>
        </div>
    );
};

export default ErrorScreen;