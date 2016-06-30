import React from 'react';
import TestResults from './TestResults';
import LineChart from '../components/LineChart';
import StartTest from '../components/StartTest';
import ClickMap from '../components/ClicksMap';

function Dashboard() {
  return (
    <div>
      <StartTest />
      <LineChart />
      <ClickMap />
      <TestResults />
    </div>
  );
}

export default Dashboard;
