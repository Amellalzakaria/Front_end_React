import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FiUser } from 'react-icons/fi';



const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">Accueil</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/cities" className="nav-link zoom-on-hover">villes</Link>
            </li>
            <li className="nav-item">
              <Link to="/zones" className="nav-link zoom-on-hover">Zones</Link>
            </li>
            <li className="nav-item">
              <Link to="/pharmacies" className="nav-link zoom-on-hover">Pharmacies</Link>
            </li>
            <li className="nav-item">
              <Link to="/search" className="nav-link zoom-on-hover">Rechercher</Link>
            </li>
            
            
            
            {/* Add more navigation items as needed */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
