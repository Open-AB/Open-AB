import React from 'react';
import { Route } from 'react-router';
import Dashboard from './containers/Dashboard';
import Snippet from './containers/Snippet';
import LandingPage from './components/LandingPage';

export default (
  [
    <Route path="/" component={LandingPage} />,
    <Route path="/snippet" component={Snippet} />,
    <Route path="/landing" component={LandingPage} />,
    <Route path="/dashboard" component={Dashboard} />,
  ]
);
