import React from 'react';

const ResponseScreen = ({ response }) => {
    return (
        <div className="response-screen">
            {/* Render your response data here */}
            <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
    );
};

export default ResponseScreen;
