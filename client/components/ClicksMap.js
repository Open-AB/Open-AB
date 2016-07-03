import React, { Component } from 'react';
import '../assets/styles/_utils.scss';

class ClicksMap extends Component {
  componentDidMount() {
    const apiMock = [['Country', 'Clicks'], ['Germany', 1],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['France', 600],
        ['Switzerland', 700]];

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
  render() {
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

export default ClicksMap;
