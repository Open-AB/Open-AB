import React from 'react';
import { Route } from 'react-router';
import Dashboard from './containers/Dashboard';
import Snippet from './containers/Snippet';
import LandingPage from './components/LandingPage';

export default (
  [
    <Route path="/" component={LandingPage} />,
    <Route path="/Dashboard" component={Dashboard} />,
    <Route path="/snippet" component={Snippet} />,
  ]
);
