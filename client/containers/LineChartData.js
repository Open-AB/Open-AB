import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../actions/api';

import LineChart from '../components/LineChart';

const lineChartDataEndPoint = '/api/chartData';

class LineChartData extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded(lineChartDataEndPoint));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lineChartDataEndPoint !== this.props.lineChartDataEndPoint) {
      const { dispatch } = nextProps;
      dispatch(fetchDataIfNeeded(lineChartDataEndPoint));
    }
  }

  render() {
    const { data } = this.props;

    let display;
    // check if there is data from response
    if (data.length === 0) {
      display = 'EMPTYNESS';
    } else if (data.length > 0) {
      display = (
        // conditional rendering of Line Chart
        // if there are not two data points, do not render a Line Chart for dataset
        data.map((dataObj, ind) => dataObj.data.buckets.length > 1 ? <LineChart key={ind} dataset={dataObj} /> : null)
      );
    }

    return (
      <div>
      {display}
      </div>
    );
  }
}


LineChartData.propTypes = {
  lineChartDataEndPoint: PropTypes.string.isRequired,
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
  } = dataByapiEndpoint[lineChartDataEndPoint] || {
    isFetching: true,
    items: [],
  };

  return {
    lineChartDataEndPoint,
    data,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(LineChartData);


// map the LineChartData in the redux-store into the props of LineChart Component
// LineChartData is expected to be an array of objects [{}, {}, ...]
