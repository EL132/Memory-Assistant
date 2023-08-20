import './App.css';
import React, { useState } from 'react';
import Triangles from './components/Triangles';
import TitleCard from './components/TitleCard';
import WhyCard from './components/WhyCard';
import TechnologiesCard from './components/TechnologiesCard';
import UserInputForm from './components/UserInputForm';
import LoadingScreen from './components/LoadingScreen';
import ResponseScreen from './components/ResponseScreen'; // Import the ResponseScreen component

function App() {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [response, setResponse] = useState('');

    const handleFormSubmit = async (inputValue) => {
      // Show loading screen
      setLoading(true);
      setLoadingText(getRandomLoadingPhrase()); // Replace with your function to get a random loading phrase

      try {
        // Make API request here using inputValue
        const response = await fetch('https://memoryassistant.onrender.com/llm', {
          method: 'POST', 
          body: JSON.stringify({ question: inputValue }), // Adjust the payload as needed
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setResponse(data); // Update state with the response data
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // Hide loading screen
        setLoading(false);
        setLoadingText('');
      }
    };

    return (
      <div>
        <Triangles />
        <TitleCard />
        <WhyCard />
        <TechnologiesCard />

        <UserInputForm onSubmit={handleFormSubmit} />

        {loading && <LoadingScreen loadingText={loadingText} />}

        {/* Render response data using the ResponseScreen component */}
        {response && <ResponseScreen response={response} />}
      </div>
    );
}

export default App;