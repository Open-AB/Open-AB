import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import '../assets/styles/_nav.scss';

class NavBar extends Component {

  render() {
    return (
    <div className="nav-wrapper tenth">
      <nav>
        <div className="nav-wrapper mainColor">
          <img className="left logo" alt="OpenAB" src="../assets/images/logo.png"></img>
          <a href="#" className="center brand-logo">OpenAB</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#">Sign Up</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
  }
}

export default NavBar;
