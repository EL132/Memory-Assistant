import './App.css';
import axios from 'axios';
import React, { useState } from 'react';
import {Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

import ScrollToTop from './components/ScrollToTop';
import Home from './components/Home';
import UserInputForm from './components/UserInputForm';

function App() {
  const location = useLocation();
  return (
    <div>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/try-it" element={<div className='input'> <UserInputForm /> </div>} />
        </Routes>
      </AnimatePresence>
    </div>  
  );
}

export default App;