import React from 'react';
import './Footer.css'; // Import the associated CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">

            <div class="footer-container">
                <div class="documentation-container">
                    <div class="doc-image">
                        <img src="./assets/documentation-icon.png" alt="" class="doc-png"></img>
                    </div>
                    <div class="doc-link">
                        <h3 class="doc-text"> <a href="https://docs.google.com/document/d/1gYWHpejV6yz6YuLOveEU1rSg2IGPG1xlvesaJoj1Pnw/edit?usp=sharing">Documentation</a></h3> 
                    </div>
                </div>
                <div class="elias-content">
                    <h3 class="elias name">Elias</h3>
                    <div class="link-container">
                        <div class="website-image">
                            <img src="./assets/website.png" alt="" class="icon"></img>
                        </div>
                        <div class="website-link"><a href="https://el132.github.io/PersonalWebsite/">Personal Website</a></div>
                    </div>
                    <div class="link-container">
                        <div class="linkedin-image">
                            <img src="./assets/linkedin.png" alt="" class="icon"></img>
                        </div>
                        <div class="linkedin-link"><a href="https://www.linkedin.com/in/elias-lind-431546221/">LinkedIn</a></div>
                    </div>
                    <div class="link-container">
                        <div class="github-image">
                            <img src="./assets/github.png" alt="" class="icon"></img>
                        </div>
                        <div class="github-link"><a href="https://github.com/EL132">GitHub</a></div>
                    </div>
                </div>
                <div class="fevin-content">
                    <h3 class="fevin name">Fevin</h3>
                </div>
            </div>



            {/* <div className="footer-content">
                <div className="top-footer">
                    <div className="footer-element">
                        <h3> <a href="https://el132.github.io/PersonalWebsite/">Elias Lind</a></h3>
                    </div>
                    <div className="footer-element">
                        <h3> <a href="google.com">Fevin Felix</a></h3>
                    </div>
                    <div className="footer-element">
                        <h3><a href="google.com">Documentation</a></h3>
                    </div>
                </div>
                <div className="bottom-footer">
                    <p>&copy; {new Date().getFullYear()} Memory Assistant. All rights reserved.</p>
                </div>
                
            </div> */}
        </footer>
    );
};

export default Footer;
