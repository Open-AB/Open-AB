import React from 'react';
import TestResults from './TestResults';
import StartTest from '../components/StartTest';
import ClickMap from '../components/ClicksMap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.js';


function Dashboard() {
  return (
    <div className="center">
      <NavBar />
      <StartTest />
      <ClickMap />
      <TestResults />
      <Footer />
    </div>
  );
}

export default Dashboard;
