import React from 'react';
import TestResults from './TestResults';
import LineChart from '../components/LineChart';
import StartTest from '../components/StartTest';

function Dashboard() {
  return (
    <div>
      <StartTest />
      <LineChart />
      <TestResults />
    </div>
  );
}

export default Dashboard;
