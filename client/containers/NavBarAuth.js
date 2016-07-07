import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../actions/api';

import NavBar from '../components/NavBar';

const userDataEndPoint = '/api/verify';

class NavBarAuth extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded(userDataEndPoint));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userDataEndPoint !== this.props.userDataEndPoint) {
      const { dispatch } = nextProps;
      dispatch(fetchDataIfNeeded(userDataEndPoint));
    }
  }

  render() {
    return <NavBar user={this.props.data} />;
  }
}


NavBarAuth.propTypes = {
  userDataEndPoint: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};


function mapStateToProps(state) {
  const { dataByapiEndpoint } = state;
  const {
    isFetching,
    lastUpdated,
    items: data,
  } = dataByapiEndpoint[userDataEndPoint] || {
    isFetching: true,
    items: [],
  };

  return {
    userDataEndPoint,
    data,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(NavBarAuth);
