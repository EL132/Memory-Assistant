import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import WhyCard from './components/WhyCard';
import Triangles from './components/Triangles';
import TitleCard from './components/TitleCard';
import UserInputForm from './components/UserInputForm';
import LoadingScreen from './components/LoadingScreen';
import GalleryScreen from './components/GalleryScreen';
import ResponseScreen from './components/ResponseScreen'; 
import TechnologiesCard from './components/TechnologiesCard';

function App() {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [response, setResponse] = useState('');

    const handleFormSubmit = async (inputValue) => {
      console.log('[DEBUG] Handling form submission...');

      // Show loading screen
      setLoading(true);
      setLoadingText("Loading response..."); // Replace with your function to get a random loading phrase

      try {
        // NOTE: THIS IS CURRENTLY QUERYING THE NAME AND NOT THE LLM
        console.log('[DEBUG] Making request to llm...')
        const requestData = {
          name: inputValue
        };
        console.log('[DEBUG] Input value: ' + requestData.name)

        // Make the Axios POST request
        const response = await axios.post('https://memoryassistant.onrender.com/llm/', requestData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('[DEBUG] Successfully made request');
        setResponse(response.data); // Update state with the response data
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

        <GalleryScreen />
      </div>
    );
}

export default App;