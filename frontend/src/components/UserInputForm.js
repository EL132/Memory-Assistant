import './UserInputForm.css';
import transition from '../transition';
import React, { useState } from 'react';

const UserInputForm = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('[DEBUG] className info: ' + document.getElementsByClassName('input-form-container')[0].classList)
        document.getElementsByClassName('user-input-form')[0].classList.add('hidden');
        // Call the onSubmit function from props and pass the input value
        onSubmit(inputValue);
    };

    return (
        <div className='input-form-container'>
            <div className="title-banner">
                <h1>Memory Assistant</h1>   
            </div>
            <div className='user-input-form'>
                <div className="title">Ask away!</div>
                <form onSubmit={handleSubmit}>
                    <textarea className="prompt"
                        type="text"
                        placeholder="Enter your prompt..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button className="submit-button" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default transition(UserInputForm);