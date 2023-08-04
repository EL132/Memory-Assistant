import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

import PictureCard from './PictureCard.js';
import './PictureGallery.css';

const PictureGallery = () => {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        // Fetch the pictures from your backend and update the state
        const fetchPictures = async () => {
            try {
                const requestBody = { name: 'grape' }; // Replace 'grape' with the name you want to query
                const response = await axios.post('localhost:8080/get', requestBody); // Make a POST request with axios
                setPictures(response.data);
            } catch (error) {
                console.error('Error fetching pictures:', error);
            }
        };

        fetchPictures();
    }, []);

    return (
        <div className="picture-gallery">
        {pictures.map((picture) => (
            <PictureCard key={picture._id} picture={picture} />
        ))}
        </div>
    );
};

export default PictureGallery;
