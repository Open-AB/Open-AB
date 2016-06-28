import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../actions/api';
import uuid from 'uuid';

import formatStats from '../formatStats.js';
import StatsForTest from '../components/StatsForTest.js';


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
    const { stats } = this.props;
    const viewableStatsForAllTests = formatStats(stats);

    return (
      <div>
        {viewableStatsForAllTests.map(viewableStatsForTest => <StatsForTest key={uuid.v4()} viewableStatsForTest={viewableStatsForTest} />)}
      </div>
    );
  }
}

TestResults.propTypes = {
  statsEndpoint: PropTypes.string.isRequired,
  stats: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { dataByapiEndpoint } = state;
  const {
    isFetching,
    lastUpdated,
    items: stats,
  } = dataByapiEndpoint[statsEndpoint] || {
    isFetching: true,
    items: [],
  };

  return {
    statsEndpoint,
    stats,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(TestResults);
