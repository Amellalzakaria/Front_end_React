import React, { Fragment } from 'react';
import './App.css';
import Logo from './Logo';
import photo1 from './img/logogif1.gif';
import photo5 from './img/world.png';

const backgroundImageStyle = {
  backgroundImage: `url('./img/world.png')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

function Home() {
  const renderAuthenticatedContent = () => {
    return (
      <div>
        <h1 className="m-0 font-big slide-in-top">Bienvenue,</h1>
        <h1 className="m-0 font-big animate-charcter">Localise pharmacies,</h1>
        <p className="ls-2 mt-2 slide-in-bottom">Made By Zakaria AMELLAL.</p>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="col py-3 d-flex align-items-center" style={backgroundImageStyle}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-end">
              {renderAuthenticatedContent()}
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 d-flex align-items-center justify-content-end">
              <img src={photo5} style={{ width: '600px', height: 'auto' }} alt="Image1" />
            </div>
          </div>
          <Logo />
        </div>
      </div>
    </Fragment>
  );
}

export default Home;
