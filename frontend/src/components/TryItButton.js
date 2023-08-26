import './TryItButton.css';
import React from 'react';
import { useNavigate } from 'react-router-dom'

const TryItButton = () => {
    const navigate = useNavigate();
    const redirectToOtherPage = () => {
        navigate('/try-it'); // This will navigate to the '/try-it' route
      };

    return (
        <div class="try-it-container">
            <button class="try-it-button" type="button" onClick={redirectToOtherPage}>Try It Yourself!</button>
        </div>
    );
};

export default TryItButton;
