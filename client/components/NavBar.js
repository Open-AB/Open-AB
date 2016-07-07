import React from 'react';
import '../assets/styles/_nav.scss';

const NavBar = ({ user, signOut }) => {
  if (user.loggedIn) {
    return (
      <nav className="tenth mainColor" style={{ visibility: 'hidden' }}>
        <div className="nav-wrapper">
          <img className="left logo" alt="OpenAB" src="../assets/images/logo.png"></img>
          <a href="#" className="center brand-logo">OpenA/B</a>
          <a href="#" className="right" onClick={signOut}>Sign Out</a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="tenth mainColor" style={{ visibility: 'hidden' }}>
      <div className="nav-wrapper">
        <img className="left logo" alt="OpenAB" src="../assets/images/logo.png"></img>
        <a href="#" className="center brand-logo">OpenA/B</a>
        <a href="#" className="right" onClick={() => { $('#modal-signin').openModal(); }}>Sign in</a>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  user: React.PropTypes.object,
  signOut: React.PropTypes.func,
};

export default NavBar;
