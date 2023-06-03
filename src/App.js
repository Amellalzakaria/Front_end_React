import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Zone from './Zone';
import City from './City'
import Home from './Home';
import Pharmacy from './Pharmacy';
import Search from './Search';

import Map from './Map';


/*zone */

/*zone */





const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cities" element={<City />} />
        <Route path="/zones" element={<Zone />} />
        <Route path="/zones" element={<Zone />} />
        <Route path="/pharmacies" element={<Pharmacy />} />
        <Route path="/search" element={<Search />} />
        <Route path="/map" element={<Map />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
