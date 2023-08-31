import React from 'react';
import './Footer.css'; // Import the associated CSS file for styling

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
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
                
            </div>
        </footer>
    );
};

export default Footer;
