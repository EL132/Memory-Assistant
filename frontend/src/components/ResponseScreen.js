import React, { useState } from 'react';
import './ResponseScreen.css';
import UserInputForm from './UserInputForm';

const ResponseScreen = ({ question, response, imagesResponse }) => {
    const imagesAvailable = imagesResponse && imagesResponse.finalResult;
    const [index, setIndex] = useState(0);
    const [imageArray, setImageArray] = useState([]);

    const handleLeftArrowClick = () => {
        if (index === 0) {
            setIndex(imageArray.length - 1); // Loop to the last image if at the beginning
        } else {
            setIndex(index - 1);
        }
    };

    const handleRightArrowClick = () => {
        if (index === imageArray.length - 1) {
            setIndex(0); // Loop to the first image if at the end
        } else {
            setIndex(index + 1);
        }
    };

    if (imagesAvailable) {
        // Extract the result array from the response
        let result = response.result;
        result = String(result.llm_response)
        // console.log('[DEBUG] Result: ' + result)
        const fileIndex = result.indexOf("File(s):");
        const extractedText = result.substring(0, fileIndex).trim();
        // console.log('[DEBUG] Extracted text: ' + extractedText)
        console.log('[DEBUG] Images response: ')
        console.log(imagesResponse)
        console.log('[DEBUG] Images response string: ' + imagesResponse.finalResult)

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
        setImageArray(s3Urls);


        // return (
        //     <div className="response-screen">
        //         <h2>Response</h2>
        //         {extractedText}
        //         <h2>File(s):</h2>
        //         {s3Urls.length > 0 && (
        //             <div className="image-container">
        //                 {s3Urls.map((url, index) => (
        //                     <img
        //                         key={index}
        //                         src={url}
        //                         alt="db element"
        //                     />
        //                 ))}
        //             </div>
        //         )}
        //         <div className="response-section">
        //             {/* Display your response and images here */}
        //             <button onClick={() => window.location.reload()}>Ask Another Question</button>
        //         </div>
        //     </div>
        // );

        return (
            <div className='input-form-container'>
                <div className="title-banner">
                    <h6>Elix Devs</h6>   
                </div>
                <div className="example-blurbs">
                    <div className="example-question">
                        {question}
                    </div>
                    <div className="example-response">
                        <div className="example-answer-text">
                            {extractedText}
                        </div>
                        <div className="image-section">
                            <img src={imageArray[index]} alt="notes-page" />
                            <div className="arrow-container">
                                <div className="arrow left-arrow" onClick={() => handleLeftArrowClick}>&larr;</div>
                                <div className="arrow right-arrow" onClick={() => handleRightArrowClick}>&rarr;</div>
                            </div>
                        </div>
                    </div>
                </div>
    
                <UserInputForm />
            </div>
        );
    }
};

export default ResponseScreen;
