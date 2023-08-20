import './App.css';
import React from 'react';
import Triangles from './components/Triangles'
import TitleCard from './components/TitleCard';
import WhyCard from './components/WhyCard';
import TechnologiesCard from './components/TechnologiesCard';

function App() {
  return (
    <div>
      <Triangles/>
      <TitleCard/>
      <WhyCard/>
      <TechnologiesCard/>
    </div>
  );
}

export default App;