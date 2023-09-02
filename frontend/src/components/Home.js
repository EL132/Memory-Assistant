import React from 'react';
import Footer from './Footer';
import './Home.css';
import transition from '../transition';
import TryItButton from './TryItButton';



const Home= () => {
    return (
        <>
            <div className="home-container">
                <img className="brain-image" src="./assets/brain(1).png" alt="brain"></img>
                <div className="left-side">
                    <div className="left-content">
                        <h1>Introducing Memory Assistant</h1>
                        <p>An AI-powered search tool built by training a LLM on our own notes.</p>
                        <div className="image-container">
                            <div className="image-rect">
                                <img src="./assets/express.png" alt="express logo"></img>
                            </div>
                            <div className="image-rect">
                                <img className="python" src="./assets/python.png" alt="python logo"></img>
                            </div>
                            <div className="image-rect">
                                <img src="./assets/vercel.png" alt="vercel logo"></img>
                            </div>
                            <div className="image-rect">
                                <img src="./assets/react.png" alt="react logo"></img>
                            </div>
                            <div className="image-rect">
                                <img src="./assets/render.png" alt="render logo"></img>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-side">
                    <div className="right-content">
                        <h2>A New Way to Study</h2>
                        <p>
                            After countless hours of technical interview preparation, we found it difficult to remember all of the little things that matter.
                            <br></br><br></br>
                            <span className="mem-assist-words">Memory Assistant</span> helps us comb through our notes to help us find exactly what we're looking for.
                        </p>
                        <TryItButton />
                    </div>
                </div>
            </div>
            
            <Footer />
        </>
    );
};

export default transition(Home);
