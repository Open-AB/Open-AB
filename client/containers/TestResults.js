import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../actions/api';
import uuid from 'uuid';

const statsEndpoint = '/api/stats';

class TestResults extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded(statsEndpoint));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statsEndpoint !== this.props.statsEndpoint) {
      const { dispatch } = nextProps;
      dispatch(fetchDataIfNeeded(statsEndpoint));
    }
  }

  render() {
    const { data, isFetching, lastUpdated } = this.props;
    return (
      <div>
        {this.props.data.map((data) =>
          <ul>
            <li key={uuid.v4()}>{data.testName}</li>
            <li key={uuid.v4()}>{data.testId}</li>
            <li key={uuid.v4()}>{data.testClicks}</li>
          </ul>
        )}
      </div>
    );
  }
}

TestResults.propTypes = {
  statsEndpoint: PropTypes.string.isRequired,
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
  } = dataByapiEndpoint[statsEndpoint] || {
    isFetching: true,
    items: [],
  };

  return {
    statsEndpoint,
    data,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(TestResults);

