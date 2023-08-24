import React from 'react';
import './ResponseScreen.css';

const ResponseScreen = ({ response }) => {
    // Extract the result array from the response
    let result = response.result;
    result = String(result.llm_response)
    // console.log('[DEBUG] Result: ' + result)
    const fileIndex = result.indexOf("File(s):");
    const extractedText = result.substring(0, fileIndex).trim();
    // console.log('[DEBUG] Extracted text: ' + extractedText)

    return (
        <div className="response-screen">
            <h2>Response</h2>
            {extractedText}
            <h2>File(s):</h2>
        </div>
    );
};

export default ResponseScreen;
