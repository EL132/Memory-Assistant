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
  const [index, setIndex] = useState(0);

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

  let example_images = ['./assets/example-image.jpg', './assets/example-image-1.jpg', './assets/example-image-2.jpg']

  const handleFormSubmit = async (inputValue) => {
    console.log('[DEBUG] Handling form submission...');

    // Show loading screen
    setLoading(true);

    // Store the question that was asked
    setQuestion(inputValue)

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

      // Extract the tags from the llm response and make the API request for images
      const result = (response.data.result.llm_response);
      console.log("---------------------------------")
      console.log(result)
      console.log('[DEBUG] Result in App.js llm response: ' + result)
      const topicIndex = result.indexOf("Topic(s):");

      if (topicIndex !== -1) {
          const topics = result.substring(topicIndex).split(":")[1].trim();
          const tags = topics.split(",").map(tag => tag.trim());

          console.log('[DEBUG] Tags: ' + tags)
          console.log("[DEBUG] Tags :")
          console.log(tags)
          console.log('[DEBUG] Tags type: ' + typeof(tags))
          // Make the API request to get images
          const imagesResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
              tags: tags
          });

          console.log('[DEBUG] Images response: ')
          console.log(imagesResponse)

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
                <div className="try-it-screen">
                  <div className="title-banner">
                    <h6>Elix Devs</h6>   
                  </div>
                  <div className="example-blurbs">
                    <div className="example-question">
                      What are linked lists and have I taken any notes on them?
                    </div>
                    <div className="example-response">
                        <div className="example-answer-text">
                            Linked lists consists of nodes where each node contains a data field and a reference(link) to the next node in the list.
                            <br></br><br></br>
                            Yes, you have taken notes on them in the past. See related documents. Click along the arrows to see other related documents.
                        </div>
                        <div className="image-section">
                            <img src={example_images[index]} alt="notes-page" />
                            <div className="arrow-container">
                                <div className="arrow left-arrow" onClick={handleLeftArrowClick}>&larr;</div>
                                <div className="arrow right-arrow" onClick={handleRightArrowClick}>&rarr;</div>
                            </div>
                        </div>
                    </div>
                  </div>
                  <UserInputForm className="input-form" onSubmit={handleFormSubmit} />
                </ div>
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