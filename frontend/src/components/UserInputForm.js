import React, { useState, useEffect, useRef } from 'react';
import './UserInputForm.css';

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

    const hiddenElementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const { target, isIntersecting } = entry;
                if (isIntersecting) {
                    target.classList.add('show');
                    observer.unobserve(target);
                }
            });
        });

        observer.observe(hiddenElementRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="user-input-form hidden" ref={hiddenElementRef}>
            <div>
                testing text for input form
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your prompt..."
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UserInputForm;