import './GalleryScreen.css'
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Import Axios

const GalleryScreen = () => {
    const [showGallery, setShowGallery] = useState(false);
    const [fevinImages, setFevinImages] = useState([]);
    const [eliasImages, setEliasImages] = useState([]);

    const handleShowGallery = async () => {
        try {
            const fevinResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
                tags: ["fevin", "grape"]
            });
            setFevinImages(fevinResponse.data.result);
            console.log("[DEBUG] Fevin's images: " + fevinImages)
            // setFevinImages([0, 1]);

            const eliasResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
                tags: ["elias", "test"]
            });
            setEliasImages(eliasResponse.finalResult);
            console.log("[DEBUG] Elias's images data : ")
            console.log(eliasResponse.data)
            console.log("[DEBUG] Elias's images: " + eliasImages)
            // setEliasImages([0, 1]);

            setShowGallery(!showGallery);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
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
        <div className="gallery-screen hidden" ref={hiddenElementRef}>
            <button onClick={handleShowGallery}>
                {showGallery ? 'Hide the gallery' : 'Show me the gallery'}
            </button>

            {showGallery && (
                <div className="gallery-content">
                    <div className="dev-images">
                        <h2>Fevin's Images</h2>
                        {/* {fevinImages.map((image) => (
                            <img src={image.s3_url} alt={image.name} />
                        ))} */}
                    </div>

                    <div className="dev-images">
                        <h2>Elias's Images</h2>
                        {/* {eliasImages.map((image, index) => (
                            <img src={image.s3_url} alt={image.name} />
                        ))} */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GalleryScreen;
