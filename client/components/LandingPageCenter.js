import React from 'react';
import '../assets/styles/_utils.scss';
import { Link } from 'react-router';

function LandingPageCenter() {
  return (
    <div className="mainGradient threeFifths">
      <div className="fifth" />
      <p className="flow-text">Test your website designs to make data-driven decisions</p>
      <Link to="/dashboard" className="btn-large green lighten-0 waves-effect waves-light" style={{visibility: 'hidden'}}>See what OpenA/B can do!</Link>
      <div className="smallSpace">
        <a href="https://github.com/Open-AB/Open-AB" className="btn green lighten-0 waves-effect waves-light" style={{visibility: 'hidden'}}>View our source code</a>
      </div>
    </div>
  );
}

export default LandingPageCenter;
