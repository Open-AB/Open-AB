import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../actions/api';
import uuid from 'uuid';
import LineChart from '../components/LineChart';
import TestTitle from '../components/TestTitle';
import formatStats from '../formatStats.js';
import StatsForTest from '../components/StatsForTest.js';
import '../assets/styles/_utils.scss';

const statsEndpoint = '/api/dashData';

class TestResults extends Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
  }

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

    let dashData = viewableStatsForAllTests.map((viewableStatsForTest, i) =>
      (<div>
        <div className="oneTwentiethOfPage" />
        <TestTitle key={uuid.v4()} viewableStatsForTest={viewableStatsForTest} />
        <div className="centered-very-narrow">
          <LineChart key={uuid.v4()} dataset={stats[i]} />
        </div>
        <StatsForTest key={uuid.v4()} viewableStatsForTest={viewableStatsForTest} />
      </div>)
      );
    return (
      <div>
       {dashData}
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
