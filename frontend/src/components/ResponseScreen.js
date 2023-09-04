import './ResponseScreen.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResponseScreen = ({ question, response, imagesResponse }) => {
    const imagesAvailable = imagesResponse && imagesResponse.finalResult;
    const [index, setIndex] = useState(0);

    if (imagesAvailable) {
        // Extract the result array from the response
        let result = response.result;
        result = String(result.llm_response);
        const fileIndex = result.indexOf("File(s):");
        const extractedText = result.substring(0, fileIndex).trim();
        const imagesResponseString = imagesResponse.finalResult;

        // Split the response string by the opening and closing brackets to separate objects
        const imageObjects = imagesResponseString.slice(1, -1).split("}, {");

        // Extract s3_url values from each object and create an array
        const s3Urls = imageObjects.map(object => {
            const s3UrlMatch = object.match(/'s3_url':\s*'([^']+)'/);
            if (s3UrlMatch && s3UrlMatch.length > 1) {
                return s3UrlMatch[1];
            }
            return null;
        }).filter(url => url !== null);

        console.log('Array of s3_urls:', s3Urls);

        const handleLeftArrowClick = () => {
            if (index === 0) {
                setIndex(s3Urls.length - 1); // Loop to the last image if at the beginning
            } else {
                setIndex(index - 1);
            }
        };

        const handleRightArrowClick = () => {
            if (index === s3Urls.length - 1) {
                setIndex(0); // Loop to the first image if at the end
            } else {
                setIndex(index + 1);
            }
        };

        return (
            <div className="response-screen">
                <Link to="/" className="title-banner">
                    <div >
                        <h6>Elix Devs</h6>
                    </div>
                </Link>
                <div className="example-blurbs">
                    <div className="example-question">{question}</div>
                    <div className="example-response">
                        <div className="example-answer-text">{extractedText}</div>
                        {s3Urls.length > 0 ? (
                            <div className="image-section">
                                <img
                                    id="response-image"
                                    src={s3Urls[index]}
                                    alt="db element"
                                />
                                <div className="arrow-container">
                                    <div className="arrow left-arrow" onClick={handleLeftArrowClick}>
                                        &larr;
                                    </div>
                                    <div className="arrow right-arrow" onClick={handleRightArrowClick}>
                                        &rarr;
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>There are no images in the database for that topic.</p>
                        )}
                    </div>
                </div>
                <div className="response-section">
                    {/* Display your response and images here */}
                    <button className="reload-button" onClick={() => window.location.reload()}>Ask Another Question</button>
                </div>
            </div>
        );
    }
};

export default ResponseScreen;
