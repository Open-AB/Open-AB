import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Root extends Component {
  render() {
    return (
      <div>
        <h1>Snippet</h1>
        <h3>search: {location.search}</h3>
        <h3>hash: {location.history}</h3>
        <Link to="/">Continue to dashboard</Link>
      </div>
    );
  }
}
