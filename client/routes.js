import React from 'react';
import { Route } from 'react-router';
import Dashboard from './containers/Dashboard';
import Snippet from './containers/Snippet';
import LandingPage from './components/LandingPage';
import { store } from './index.js';
import { storeUser } from './actions/api';

const verifyLogin = (nextState, replace, next) => {
  $.get('/api/verify', data => {
    if (data.loggedIn) {
      store.dispatch(storeUser(data));
    }
    next();
  }).fail(() => {
    store.dispatch(storeUser({ loggedIn: false }));
    if (nextState.routes[0].path === '/snippet') {
      replace('/');
    }
    next();
  });
};

export default (
  [
    <Route path="/" component={LandingPage} />,
    <Route path="/snippet" component={Snippet} onEnter={verifyLogin} onChange={() => { window.location.reload(); }} />,
    <Route path="/landing" component={LandingPage} />,
    <Route path="/dashboard" component={Dashboard} onEnter={verifyLogin} />,
  ]
);
