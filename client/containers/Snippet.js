import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Root extends Component {
  render() {
    return (
      <div>
        <h1>Snippet</h1>
        <h3>s: {location.search}</h3>
        <h3>h: {location.history}</h3>
        <Link to="/">Continue to dashboard</Link>
      </div>
    );
  }
}
