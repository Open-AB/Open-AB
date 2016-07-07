import React, { PropTypes, Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { cancelAuth } from '../actions/api';
import NavBar from '../components/NavBar';

class NavBarAuth extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut(e) {
    e.preventDefault();
    this.props.dispatch(cancelAuth());
    browserHistory.push('/');
    window.location.reload();
  }

  render() {
    return <NavBar user={this.props.user} signOut={this.signOut} />;
  }
}

NavBarAuth.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps)(NavBarAuth);
