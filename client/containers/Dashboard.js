import React from 'react';
import TestResults from './TestResults';
import StartTest from '../components/StartTest';
import ClickMap from '../components/ClicksMap';
import LineChartData from './LineChartData';

function Dashboard() {
  return (
    <div>
      <StartTest />
      <ClickMap />
      <LineChartData />
      <TestResults />
    </div>
  );
}

export default Dashboard;
