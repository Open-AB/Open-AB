import React, { PropTypes } from 'react';
import NavBar from './NavBar';
import LandingPageCenter from './LandingPageCenter';
import Footer from './Footer.js';
import SignInModal from '../components/SignInModal';
import '../assets/styles/_landingPage.scss';
import '../assets/styles/_utils.scss';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      createAccount: this.props.location.query[''] === 'createAccount',
    };
  }

  componentDidMount() {
    if (this.state.createAccount) {
      $('#modal-signin').openModal();
    }
  }

  render() {
    return (
      <div className="center fullPage">
        <NavBar />
        <SignInModal createAccount={this.state.createAccount} />
        <div className="tenth" />
        <LandingPageCenter />
        <div className="tenth" />
        <Footer />
      </div>
    );
  }
}

LandingPage.propTypes = {
  // prop passed in from react router
  location: PropTypes.object.isRequired,
};

export default LandingPage;
