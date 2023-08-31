import React from 'react';
import Footer from './Footer';
import WhyCard from './WhyCard';
import Triangles from './Triangles';
import TitleCard from './TitleCard';
import transition from '../transition';
import TryItButton from './TryItButton';
import TechnologiesCard from './TechnologiesCard';



const Home= () => {
    return (
        <>
            <div className="home-container">
                <Triangles />
                <TitleCard />
                <WhyCard />
                <TechnologiesCard />

                <TryItButton />

                <Footer />
            </div>
        </>
    );
};

export default transition(Home);
