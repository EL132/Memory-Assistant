import axios from 'axios';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import transition from '../transition';

import WhyCard from './WhyCard';
import Triangles from './Triangles';
import TitleCard from './TitleCard';
import UserInputForm from './UserInputForm';
import LoadingScreen from './LoadingScreen';
import GalleryScreen from './GalleryScreen';
import ResponseScreen from './ResponseScreen'; 
import TechnologiesCard from './TechnologiesCard';
import TryItButton from './TryItButton';



const Home= () => {
  const location = useLocation();
  
    return (
        <>
            <div className="home-container">
                <Triangles />
                <TitleCard />
                <WhyCard />
                <TechnologiesCard />

                <TryItButton />

                {/* {loading && <LoadingScreen loadingText={loadingText} />} */}

                {/* Render response data using the ResponseScreen component */}
                {/* {response && <ResponseScreen response={response} imagesResponse={imagesResponse}/>} */}
            </div>
        </>
    );
};

export default transition(Home);
