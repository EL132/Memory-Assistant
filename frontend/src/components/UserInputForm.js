import './UserInputForm.css';
import transition from '../transition';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserInputForm = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState('');
    const [index, setIndex] = useState(0);
    let example_images = ['./assets/example-image.jpg', './assets/example-image-1.jpg', './assets/example-image-2.jpg']


    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Call the onSubmit function from props and pass the input value
        onSubmit(inputValue);
    };

    const handleLeftArrowClick = () => {
        if (index === 0) {
            setIndex(example_images.length - 1); // Loop to the last image if at the beginning
        } else {
            setIndex(index - 1);
        }
    };

    const handleRightArrowClick = () => {
        if (index === example_images.length - 1) {
            setIndex(0); // Loop to the first image if at the end
        } else {
            setIndex(index + 1);
        }
    };
    

    return (
        <div className='input-form-container'>
            <Link to="/" className="title-banner">
                <div >
                    <h6>Elix Devs</h6>
                </div>
            </Link>
            <div className="example-blurbs">
                <div className="example-question">
                    What are linked lists?
                </div>
                <div className="example-response">
                <div className="example-answer-text">
                    Linked lists consists of nodes where each node contains a data field and a reference(link) to the next node in the list.
                    <br></br><br></br>
                    You have taken notes on them in the past. See related documents. Click along the arrows to see other related documents.
                </div>
                <div className="image-section">
                    <img src={example_images[index]} alt="notes-page" />
                    <div className="arrow-container">
                        <div className="arrow left-arrow" onClick={handleLeftArrowClick}>&larr;</div>
                        <div className="arrow right-arrow" onClick={handleRightArrowClick}>&rarr;</div>
                    </div>
                </div>
            </div>
            <div className='user-input-form'>
                <div className="title">Try it yourself :) </div>
                <form className="form" onSubmit={handleSubmit}>
                    <textarea className="prompt"
                        type="text"
                        placeholder="Enter your prompt and the LLM will return the most relevant documents..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button className="submit-button" type="submit">Submit</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default transition(UserInputForm);