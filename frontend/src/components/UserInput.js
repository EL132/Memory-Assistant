import React, { useState } from 'react';
import './UserInput.css';

const UserInput = () => {
    const [userInput, setUserInput] = useState('');
    const [output, setOutput] = useState('');

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = 'http://localhost:8080/post/'
        const data = { chat_prompt: userInput };
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        
            // Handle the response data here
            const responseData = await response.json();
            setOutput(responseData.processed_data);
            // Update the state or perform other actions with the response data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
        

    return (
        <div>
            <textarea
                value={userInput}
                onChange={handleInputChange}
                placeholder="Type your question here..."
                rows="4"
                cols="50"
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <div>{output}</div>
        </div>
    );
};

export default UserInput;
