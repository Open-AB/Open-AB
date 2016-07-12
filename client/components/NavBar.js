import React from 'react';
import '../assets/styles/_nav.scss';

const NavBar = ({ user, signOut }) => {
  if (user.loggedIn) {
    return (
      <nav className="tenth mainColor" style={{ visibility: 'hidden' }}>
        <div className="nav-wrapper">
          <a href="/dashboard">
            <img className="left  fourFifths smallMarginLeft smallMarginTop" alt="OpenAB" src="../assets/images/logoTextWhite.png"></img>
          </a>
          <a href="#" className="right smallMarginRight" onClick={signOut}>Sign Out</a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="tenth mainColor" style={{ visibility: 'hidden' }}>
      <div className="nav-wrapper">
        <a href="/dashboard">
          <img className="left  fourFifths smallMarginLeft smallMarginTop" alt="OpenAB" src="../assets/images/logoTextWhite.png"></img>
        </a>
        <a href="#" className="right smallMarginRight" onClick={() => { $('#modal-signin').openModal(); }}>Sign in</a>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  user: React.PropTypes.object,
  signOut: React.PropTypes.func,
};

export default NavBar;
