import './GalleryScreen.css'
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const GalleryScreen = () => {
    const [showGallery, setShowGallery] = useState(false);
    const [devOneImages, setDevOneImages] = useState([]);
    const [devTwoImages, setDevTwoImages] = useState([]);

    const handleShowGallery = async () => {
        try {
            // const devOneResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
            //     tags: ['devOne']
            // });
            // // setDevOneImages(devOneResponse.data.result);
            setDevOneImages([0, 1]);

            // const devTwoResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
            //     tags: ['devTwo']
            // });
            // setDevTwoImages(devTwoResponse.data.result);
            setDevTwoImages([0, 1]);

            setShowGallery(!showGallery);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    return (
        <div className="gallery-screen">
            <button onClick={handleShowGallery}>
                {showGallery ? 'Hide the gallery' : 'Show me the gallery'}
            </button>

            {showGallery && (
                <div className="gallery-content">
                    <div className="dev-images">
                        <h2>Developer One's Images</h2>
                        {devOneImages.map((image, index) => (
                            <img key={index} src={image.s3_url} alt={image.name} />
                        ))}
                    </div>

                    <div className="dev-images">
                        <h2>Developer Two's Images</h2>
                        {devTwoImages.map((image, index) => (
                            <img key={index} src={image.s3_url} alt={image.name} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryScreen;
