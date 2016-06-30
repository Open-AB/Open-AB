import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import '../assets/styles/_nav.scss';

class NavBar extends Component {

  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
              <img className="logo" alt="OpenAB" src="../assets/images/logo.png"></img>
            </a>
          </div>
        </div>
      </nav>

    );
  }
}

export default NavBar;
