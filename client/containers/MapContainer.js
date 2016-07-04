import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataIfNeeded } from '../actions/api';
import '../assets/styles/_utils.scss';

const endpoint = '/api/mapData';

class ClicksMap extends Component {
  constructor(props) {
    super(props);
  }

  map(apiCountData) {
    const apiMock = apiCountData;

    google.charts.load('current', {'packages':['geomap']});
    google.charts.setOnLoadCallback(drawMap);

    function drawMap() {
      const data = google.visualization.arrayToDataTable(apiMock);
      const options = {};
      options.dataMode = 'regions';
      options.width = window.innerWidth;
      options.height = window.innerHeight * 0.60;
      const container = document.getElementById('regions_div');
      const geomap = new google.visualization.GeoMap(container);
      geomap.draw(data, options);

      $(window).resize(() => {
        const responsiveWidth = window.innerWidth;
        const responsiveHeight = window.innerHeight * 0.60;
        options.width = responsiveWidth;
        options.height = responsiveHeight;
        geomap.draw(data, options);
      });
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDataIfNeeded(endpoint));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.endpoint !== this.props.endpoint) {
      const { dispatch } = nextProps;
      dispatch(fetchDataIfNeeded(endpoint));
    }
  }

  render() {
    const { data } = this.props
     if (data.length > 0) {
       const countryNames = [['Country', 'Clicks']].concat(data);
       this.map(countryNames);
     }
    return (
      <div >
        <div className="card">
          <div className="card-content black-text">
            <span className="card-title">Map of Site Visitors by IP Address</span>
            <div  id="regions_div"></div>
          </div>
        </div>
      </div>
    );
  }
}

ClicksMap.propTypes = {
  endpoint: PropTypes.string.isRequired,
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
  } = dataByapiEndpoint[endpoint] || {
    isFetching: true,
    items: [],
  };

  return {
    endpoint,
    data,
    isFetching,
    lastUpdated,
  };
}

export default connect(mapStateToProps)(ClicksMap);
