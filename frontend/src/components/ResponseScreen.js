import React from 'react';
import './ResponseScreen.css';
// import UserInputForm from './UserInputForm';

const ResponseScreen = ({ question, response, imagesResponse }) => {
    console.log('[DEBUG] props: ' + response + imagesResponse)
    const imagesAvailable = imagesResponse && imagesResponse.finalResult;

    if (imagesAvailable) {
        // Extract the result array from the response
        let result = response.result;
        result = String(result.llm_response)
        // console.log('[DEBUG] Result: ' + result)
        const fileIndex = result.indexOf("File(s):");
        const extractedText = result.substring(0, fileIndex).trim();
        // console.log('[DEBUG] Extracted text: ' + extractedText)
        console.log('[DEBUG] Images response inside response screen component: ')
        console.log(imagesResponse)
        console.log('[DEBUG] Images response string: ' + imagesResponse.finalResult)

        const imagesResponseString = imagesResponse.finalResult;

        // Split the response string by the opening and closing brackets to separate objects
        const imageObjects = imagesResponseString.slice(1, -1).split("}, {");

        // // Extract s3_url values from each object and create an array
        const s3Urls = imageObjects.map(object => {
            const s3UrlMatch = object.match(/'s3_url':\s*'([^']+)'/);
            if (s3UrlMatch && s3UrlMatch.length > 1) {
                return s3UrlMatch[1];
            }
            return null;
        }).filter(url => url !== null);

        console.log('Array of s3_urls:', s3Urls);


        return (
            <div className="response-screen">
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
                            {s3Urls.map((url, index) => (
                                <img
                                    id="response-image"
                                    key={index}
                                    src={url}
                                    alt="db element"
                                />
                            ))}
                        </div>
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
