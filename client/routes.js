import React from 'react';
import { Route } from 'react-router';
import Dashboard from './containers/Dashboard';
import Snippet from './containers/Snippet';

export default (
  [
    <Route path="/" component={Dashboard} />,
    <Route path="/snippet" component={Snippet} />,
  ]
);
