import './TryItButton.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import transition from '../transition';

const TryItButton = () => {
    const navigate = useNavigate();
    const redirectToOtherPage = () => {
        navigate('/try-it'); // This will navigate to the '/try-it' route
    };

    return (
        <div className="try-it-container">
            <button className="try-it-button" type="button" onClick={redirectToOtherPage}>Try it now &rarr;</button>
        </div>
    );
};

export default transition(TryItButton);
