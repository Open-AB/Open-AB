import React from 'react';
import { Link } from 'react-router';
import '../assets/styles/_utils.scss';

function LandingPageHeader() {
  return (
    <div className="nav-wrapper tenth">
      <nav>
        <div className="nav-wrapper mainColor">
          <img className="logo" alt="OpenAB" src="../assets/images/logo.png"></img>
          <a href="#" className="brand-logo">OpenAB</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="#">Sign in</a></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default LandingPageHeader;


