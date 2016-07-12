import React from 'react';
import '../assets/styles/_utils.scss';

const Footer = () => (
  <footer className="mainColor tenth">
    <div>
      <div className="right">
        <ul>
          <li><a href="mailto:openab42@gmail.com" className="grey-text text-lighten-4 right">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="threeFifths" />
    <div className="footer-copyright">
      <div className="container">
          © 2016 San Francisco
      </div>
    </div>
  </footer>
);

export default Footer;
