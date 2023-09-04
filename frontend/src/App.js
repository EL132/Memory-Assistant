import './App.css';
import axios from 'axios';
import Home from './components/Home';
import Footer from './components/Footer';
import React, { useState } from 'react';
import { AnimatePresence } from "framer-motion";
import ScrollToTop from './components/ScrollToTop';
import ErrorScreen from './components/ErrorScreen';
import UserInputForm from './components/UserInputForm';
import LoadingScreen from './components/LoadingScreen';
import ResponseScreen from './components/ResponseScreen';
import {Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState('')
  const [response, setResponse] = useState('');
  const [errorPage, setErrorPage] = useState(false); 
  const [imagesResponse, setImagesResponse] = useState('');

  const handleFormSubmit = async (inputValue) => {
    console.log('[DEBUG] Handling form submission...');

    // Show loading screen
    setLoading(true);

    // Store the question that was asked
    setQuestion(inputValue)
    console.log("[DEBUG] question value: " + question)

    try {
      console.log('[DEBUG] Making request to llm...')
      const requestData = {
        question: inputValue
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

      // Extract the tags from the llm response and make the API request for images
      const result = (response.data.result.llm_response);
      console.log("---------------------------------")
      console.log(result)
      console.log('[DEBUG] Result in App.js llm response: ' + result)
      const topicIndex = result.indexOf("Topic(s):");

      if (topicIndex !== -1) {
          const topics = result.substring(topicIndex).split(":")[1].trim();
          const tags = topics.split(",").map(tag => tag.trim());

          console.log("[DEBUG] Tags:");
          console.log(tags);

          const sanitizedTags = tags.map(tag => tag.replace(/\./g, ''));

          console.log("[DEBUG] Sanitized Tags:");
          console.log(sanitizedTags);

          // Make the API request to get images with sanitized tags
          const imagesResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
              tags: sanitizedTags
          });

          console.log('[DEBUG] Images response: ')
          console.log(imagesResponse.data)

          // Update state with the image data
          setImagesResponse(imagesResponse.data);
      }
    } catch (error) {
      console.error('Error:', error);
      // Update errorPage state using a callback function
      setErrorPage(true);
    } finally {
      // Hide loading screen
      setLoading(false);
    }
  };

  return (
    <div>
      <ScrollToTop />
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/try-it" element={
          <div>
            {
              loading ? (
                <LoadingScreen />
              ) : errorPage ? (
                <ErrorScreen />
              ) : response ? (
                <ResponseScreen question={question} response={response} imagesResponse={imagesResponse} />
              ) : (
                <UserInputForm className="input-form" onSubmit={handleFormSubmit} />
              )
            }
            <Footer />
          </div>} />
      </Routes>

      </AnimatePresence>
    </div>  
  );
}

export default App;