import './GalleryScreen.css';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import LoadingScreen from './LoadingScreen';

const GalleryScreen = () => {
    const [showGallery, setShowGallery] = useState(false);
    const [fevinImages, setFevinImages] = useState([]);
    const [eliasImages, setEliasImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(true); // Set loading to true initially

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fevinResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
                    tags: ["fevin"]
                });
                
                const fevImageObjects = fevinResponse.data.finalResult.slice(1, -1).split("}, {");

                // Extract s3_url values from each object and create an array
                const fevs3Urls = fevImageObjects.map(object => {
                    const s3UrlMatch = object.match(/'s3_url':\s*'([^']+)'/);
                    if (s3UrlMatch && s3UrlMatch.length > 1) {
                        return s3UrlMatch[1];
                    }
                    return null;
                }).filter(url => url !== null);
                setFevinImages(fevs3Urls);
                console.log('[DEBUG] Fevin images: ' + fevs3Urls)

                const eliasResponse = await axios.post('https://memoryassistant.onrender.com/tags', {
                    tags: ["elias"]
                });
                const eliasImageObjects = eliasResponse.data.finalResult.slice(1, -1).split("}, {");

                // Extract s3_url values from each object and create an array
                const eliass3Urls = eliasImageObjects.map(object => {
                    const s3UrlMatch = object.match(/'s3_url':\s*'([^']+)'/);
                    if (s3UrlMatch && s3UrlMatch.length > 1) {
                        return s3UrlMatch[1];
                    }
                    return null;
                }).filter(url => url !== null);
                setEliasImages(eliass3Urls);
                console.log('[DEBUG] Elias images: ' + eliass3Urls)

                setLoadingImages(false); // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching images:', error);
                setLoadingImages(false); // Set loading state to false in case of error
            }
        };

        fetchData(); // Call the fetchData function when the component mounts
    }, []);


    const handleShowGallery = async () => {
        if (showGallery) {
            setShowGallery(false);
            return;
        } else if (fevinImages.length > 0 && eliasImages.length > 0) {
            setShowGallery(true);
            return;
        }
    }

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
    
            {loadingImages ? (
                <LoadingScreen loadingText="Loading images..." />
            ) : (
                showGallery && (
                    <div className="gallery-content">
                        <div className="dev-images">
                            <h2>Fevin's Images</h2>
                            {fevinImages.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt="db element"
                                />
                            ))}
                        </div>
    
                        <div className="dev-images">
                            <h2>Elias's Images</h2>
                            {eliasImages.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt="db element"
                                />
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );    
};

export default GalleryScreen;
