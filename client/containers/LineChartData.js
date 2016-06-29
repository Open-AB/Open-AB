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
    console.log(data, '<<<<<<< DATA FOR LINE CHART DATA ENDPOINT');
    let display;
    if (data.length === 0) {
      display = 'EMPTYNESS';
    } else if (data.length > 0) {
      display = (
        data.map((dataObj, ind) => <LineChart key={ind} dataset={dataObj} />)
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
