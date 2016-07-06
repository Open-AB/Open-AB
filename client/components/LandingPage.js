import React from 'react';
import NavBar from './NavBar';
import LandingPageCenter from './LandingPageCenter';
import Footer from './Footer.js';
import '../assets/styles/_landingPage.scss';
import '../assets/styles/_utils.scss';

function LandingPage() {
  return (
    <div className="center fullPage">
      <NavBar />
      <div className="tenth" />
      <LandingPageCenter />
      <div className="tenth" />
      <Footer />
    </div>
  );
}

export default LandingPage;
