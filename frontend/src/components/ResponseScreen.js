import React from 'react';
import './ResponseScreen.css';

const ResponseScreen = ({ response, imagesResponse }) => {
    const imagesAvailable = imagesResponse && imagesResponse.finalResult;

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


        return (
            <div className="response-screen">
                <h2>Response</h2>
                {extractedText}
                <h2>File(s):</h2>
                {s3Urls.length > 0 && (
                    <div className="image-container">
                        {s3Urls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt="db element"
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }
};

export default ResponseScreen;
