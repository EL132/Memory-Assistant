import React from 'react';
import './Footer.css'; // Import the associated CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="elias-content">
                    <h3 className="elias name">Elias</h3>
                    <div className="link-container">
                        <div className="website-image">
                            <img src="./assets/website.png" alt="" className="icon"></img>
                        </div>
                        <div className="website-link"><a target="_blank" href="https://www.elias-lind.com" rel="noreferrer">Personal Website</a></div>
                    </div>
                    <div className="link-container">
                        <div className="linkedin-image">
                            <img src="./assets/linkedin.png" alt="" className="icon"></img>
                        </div>
                        <div className="linkedin-link"><a target="_blank" href="https://www.linkedin.com/in/elias-lind-431546221/" rel="noreferrer">LinkedIn</a></div>
                    </div>
                    <div className="link-container">
                        <div className="github-image">
                            <img src="./assets/github.png" alt="" className="icon"></img>
                        </div>
                        <div className="github-link"><a target="_blank" href="https://github.com/EL132" rel="noreferrer">GitHub</a></div>
                    </div>
                </div>
                <div className="documentation-container">
                    <div className="doc-image">
                        <img src="./assets/documentation-icon.png" alt="" className="doc-png"></img>
                    </div>
                    <div className="doc-link">
                        <h3 className="doc-text"> <a target="_blank" href="https://docs.google.com/document/d/1gYWHpejV6yz6YuLOveEU1rSg2IGPG1xlvesaJoj1Pnw/edit?usp=sharing" rel="noreferrer">Documentation</a></h3> 
                    </div>
                </div>
                <div className="fevin-content">
                    <h3 className="fevin name">Fevin</h3>
                    <div className="link-container">
                        <div className="website-image">
                            <img src="./assets/website.png" alt="" className="icon"></img>
                        </div>
                        <div className="website-link"><a target="_blank" href="https://www.linkedin.com/in/fevinfelix/" rel="noreferrer">Personal Website</a></div>
                    </div>
                    <div className="link-container">
                        <div className="linkedin-image">
                            <img src="./assets/linkedin.png" alt="" className="icon"></img>
                        </div>
                        <div className="linkedin-link"><a target="_blank" href="https://www.linkedin.com/in/fevinfelix/" rel="noreferrer">LinkedIn</a></div>
                    </div>
                    <div className="link-container">
                        <div className="github-image">
                            <img src="./assets/github.png" alt="" className="icon"></img>
                        </div>
                        <div className="github-link"><a target="_blank" href="https://github.com/FevinFelix" rel="noreferrer">GitHub</a></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
