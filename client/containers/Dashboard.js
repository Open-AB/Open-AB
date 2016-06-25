import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded, invalidateApiEndpoint } from '../actions/api';
import TestResults from '../components/TestResults';

const apiEndpoint = '/api/results';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded(apiEndpoint));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiEndpoint !== this.props.apiEndpoint) {
      const { dispatch } = nextProps;
      dispatch(fetchDataIfNeeded(apiEndpoint));
    }
  }

  handleRefreshClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(invalidateApiEndpoint(apiEndpoint));
    dispatch(fetchDataIfNeeded(apiEndpoint));
  }

  render() {
    const { data, isFetching, lastUpdated } = this.props;
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
              onClick={this.handleRefreshClick}
            >
              Refresh
            </a>
          }
        </p>
        {isFetching && data.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && data.length === 0 &&
          <h2>Empty.</h2>
        }
        {data.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <TestResults data={data} />
          </div>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
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
  } = dataByapiEndpoint[apiEndpoint] || {
    isFetching: true,
    items: [],
  };

  return {
    apiEndpoint,
    data,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(Dashboard);
