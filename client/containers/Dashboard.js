import React from 'react';
import TestResults from './TestResults';
import StartTest from '../components/StartTest';
import ClickMap from '../components/ClicksMap';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer.js';
import LineChartData from './LineChartData';
import SignIn from '../components/SignIn';

function Dashboard() {
  return (
    <div className="center">
      <NavBar />
      <SignIn />
      <StartTest />
      <ClickMap />
      <TestResults />
      <Footer />
    </div>
  );
}

export default Dashboard;
