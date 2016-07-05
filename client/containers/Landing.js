import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.js';
import SignInModal from '../components/SignInModal';

function Landing() {
  return (
    <div className="center">
      <NavBar />
      <SignInModal />
      HELLO WORLD I AM ON THE LANDING PAGE!!!!
      <Footer />
    </div>
  );
}

export default Landing;
