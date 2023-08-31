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

                </div>
                <div class="fevin-content">

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
