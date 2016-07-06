import React from 'react';
import TestResults from './TestResults';
import StartTest from '../components/StartTest';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.js';
import SignIn from '../components/SignIn';
import MapContainer from './MapContainer';

function Dashboard() {
  return (
    <div className="center">
      <NavBar />
      <div className="container">
        <SignIn />
        <StartTest />
        <div className="oneTwentiethOfPage" />
        <MapContainer />
        <TestResults />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
