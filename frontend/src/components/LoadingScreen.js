import React from 'react';

const LoadingScreen = ({ loadingText }) => {
    return (
        <div className="loading-screen">
        <div className="loading-content">
            <img src="./assets/loadingImage.gif" alt="Loading" />
            <p>{loadingText}</p>
        </div>
        </div>
    );
};

export default LoadingScreen;
