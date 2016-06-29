import React, { Component } from 'react';

class ClicksMap extends Component {
  componentDidMount() {
    const apiMock = [['Country', 'Clicks'], ['Germany', 1],
        ['United States', 300],
        ['Brazil', 400],
        ['Canada', 500],
        ['CN', 600],
        ['FR', 700]];

    google.charts.load('current', {'packages':['geomap']});
    google.charts.setOnLoadCallback(drawMap);

    function drawMap() {
      const data = google.visualization.arrayToDataTable(apiMock);

      const options = {};
      options['dataMode'] = 'regions';

      const container = document.getElementById('regions_div');
      const geomap = new google.visualization.GeoMap(container);

      geomap.draw(data, options);
    }
  }
  render() {
    return (
      <div id="regions_div"></div>
    );
  }
}

export default ClicksMap;
