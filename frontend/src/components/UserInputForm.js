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
        // Call the onSubmit function from props and pass the input value
        onSubmit(inputValue);
    };
    

    return (
        <div className='input-form-container'>
            <div className='user-input-form'>
                <div className="title">Try it yourself :) </div>
                <form className="form" onSubmit={handleSubmit}>
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