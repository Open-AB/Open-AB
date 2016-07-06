import React from 'react';
import { Route } from 'react-router';
import Dashboard from './containers/Dashboard';
import Snippet from './containers/Snippet';
import LandingPage from './components/LandingPage';

const checkAuth = (nextState, replace, next) => {
  $.get('/api/verify', data => {
    if (data.loggedIn) {
      next();
    } else {
      replace('/');
      next();
    }
  });
};

export default (
  [
    <Route path="/" component={LandingPage} />,
    <Route path="/snippet" component={Snippet} onEnter={checkAuth} />,
    <Route path="/landing" component={LandingPage} />,
    <Route path="/dashboard" component={Dashboard} onEnter={
      (nextState, replace, next) => {
        console.log('onEnter of /dashboard');
        console.log(replace, '<<<<< replace that is passed into onEnter');
        console.log(nextState, '<<<<< nextState that is passed into onEnter');
        console.log(next, '<<<<< cb that is passed into onEnter');
        next();
      }
    } />,
  ]
);
