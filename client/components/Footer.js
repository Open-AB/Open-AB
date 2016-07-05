import React, { Component } from 'react';
// import { Link } from 'react-router';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
import '../assets/styles/_utils.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="mainColor tenth">
        <div className="row">
          <div className="right">
            <ul>
              <li><a href="#" className="grey-text text-lighten-4 right">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
              © 2016 San Francisco
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
