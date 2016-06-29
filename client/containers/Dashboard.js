import React from 'react';
import TestResults from './TestResults';
import LineChart from '../components/LineChart';

function Dashboard() {
  return (
    <div>
      <LineChart />
      <TestResults />
    </div>
  );
}

export default Dashboard;
