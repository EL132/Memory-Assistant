import React from 'react';
import './ResponseScreen.css';

const ResponseScreen = ({ response }) => {
  // Extract the result array from the response
    const results = response.result;

    return (
        <div className="response-screen">
        {results.map((result, index) => (
            <div key={index} className="result-item">
            <img src={result.s3_url} alt={result.name} />
            <div className="tags">
                {result.tags.map((tag, tagIndex) => (
                <span key={tagIndex} className="tag">
                    {tag}
                </span>
                ))}
            </div>
            </div>
        ))}
        </div>
    );
};

export default ResponseScreen;
