import React from 'react';
import TestResults from './TestResults';
import StartTest from '../components/StartTest';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.js';
import LineChartData from './LineChartData';
import SignIn from '../components/SignIn';
import MapContainer from './MapContainer';

function Dashboard() {
  return (
    <div className="center">
      <NavBar />
      <SignIn />
      <StartTest />
      <MapContainer />
      <TestResults />
      <Footer />
    </div>
  );
}

export default Dashboard;
