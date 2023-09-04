import './LoadingScreen.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
    const loadingPhrases = [
        "Summoning digital hamsters to power the loading bar...",
        "Adding a pinch of magic dust to speed up the servers...",
        "Untangling the virtual spaghetti wires for a speedy loading feast...",
        "Counting to a million – twice – for that extra loading charm...",
        "Assembling a team of cyber-ants to carry your data. They're a bit slow.",
        "Loading pixels one by one – our digital minions need their exercise.",
        "Consulting the loading bar psychologist for its performance anxiety...",
        "Training caffeine-infused squirrels to boost loading speed...",
        "Applying turbo boosters to the loading rockets...",
        "Convincing the server hamsters to sprint instead of stroll...",
        "Polishing the loading gemstones for that ultimate shine...",
        "Putting on a loading speed seminar for 1s and 0s...",
        "Charging loading speed with a dose of virtual espresso...",
        "Sending loading bar on a world tour while we gather your data...",
        "Upgrading the loading snail to a slightly faster loading snail...",
        "Encouraging loading bar with motivational quotes for peak performance...",
        "Spinning up the hamster wheel for some serious loading action...",
        "Loading fairies are tap-dancing their way to your request...",
        "Whispering sweet nothings to coax the loading bar into action...",
        "Attempting to break the world record for loading bar Olympics..."
    ];

    const [loadingText, setLoadingText] = useState(loadingPhrases[3]);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            let randomIndex = currentPhraseIndex;
            while (randomIndex === currentPhraseIndex) {
                randomIndex = Math.floor(Math.random() * loadingPhrases.length);
            }

            setLoadingText(loadingPhrases[randomIndex]);
            setCurrentPhraseIndex(randomIndex);
        }, 10000);

        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line
    }, [currentPhraseIndex]);

    return (
        <div className="loading-screen">
            <Link to="/" className="title-banner">
                <div >
                    <h6>Elix Devs</h6>
                </div>
            </Link>
            <div className="loading-content">
                <img src="./assets/LoadingImage2.gif" alt="Loading" />
                <p>{loadingText}</p>
            </div>
        </div>
    );
};

export default LoadingScreen;
