import React, { useState, useEffect } from 'react';
import PictureCard from './PictureCard.js';
import './PictureGallery.css';

const PictureGallery = () => {
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        // Fetch the pictures from your backend and update the state
        const fetchPictures = async () => {
            try {
                const response = await fetch('/api/pictures'); // Replace '/api/pictures' with the appropriate API endpoint to fetch pictures from your backend
                const data = await response.json();
                setPictures(data);
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
