import React from 'react';
import './ResponseScreen.css';

const ResponseScreen = ({ response }) => {
  // Extract the result array from the response
    const results = response.result;

    return (
        <div className="response-screen">
            <h2>Response</h2>
                {results[0].s3_url}
        </div>
    );
};

export default ResponseScreen;
