import React from 'react';
import './ErrorScreen.css'

const ErrorScreen = () => {
    return (
        <div className="error-screen">
            <div className="title-banner">
                <h6>Elix Devs</h6>   
            </div>
            <div className="error-screen-container">
                <div className="error-container">
                    <img src="./assets/error.svg" alt="" className="error-img"></img>
                    <p style={{ color: 'black', fontSize: '1.2em'}}>Looks like there are too many users testing the site right now 😮‍💨</p>
                    <p style={{ color: 'black', fontSize: '.7em'}}>Or our API key has been abused to obvilion...</p>
                </div> 
            </div>
        </div>
    );
};

export default ErrorScreen;