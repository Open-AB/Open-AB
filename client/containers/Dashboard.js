import React from 'react';
import TestResults from './TestResults';
import StartTest from '../components/StartTest';
import ClickMap from '../components/ClicksMap';
import LineChartData from './LineChartData';
import NavBar from '../components/NavBar';

function Dashboard() {
  return (
    <div>
      <NavBar />
      <StartTest />
      <ClickMap />
      <LineChartData />
      <TestResults />
    </div>
  );
}

export default Dashboard;
