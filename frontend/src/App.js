import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';

import Home from './components/Home';

function App() {
  const location = useLocation();
  return (
    <div>
      
      <Routes location={location} key={location.pathname}>
        <Route index element={<Home />} />
      </Routes>

    </div>  
  );
}

export default App;