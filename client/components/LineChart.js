import React from 'react';
import { Line as LineGraph } from 'react-chartjs';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      A: [],
      B: [],
      visitsA: [],
      visitsB: [],
      Total: [],
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        bezierCurveTension: 0.1,
        datasetFill: true,
      },
    };
  }

  componentDidMount() {
    fetch('/api/chartData')
      .then(res => res.json())
      .then(res => {
        const A = res.A;
        const B = res.B;
        const Total = res.Total;
        const buckets = res.buckets;
        const visitsA = res.visitsA;
        const visitsB = res.visitsB;

        const data = {
          labels: buckets.map(n => new Date(n).toDateString()),

          datasets: [{
            label: 'Total Visits',
            data: Total,
            fillColor: 'rgba(222, 68, 68, 0.05)',
          }, {
            label: 'A Visits',
            data: visitsA,
            fillColor: 'rgba(68, 222, 68, 0.1)',
          }, {
            label: 'B Visits',
            data: visitsB,
            fillColor: 'rgba(68, 145, 222, 0.1)',
          }, {
            label: 'A Clicks',
            data: A,
            fillColor: 'rgba(68, 222, 68, 0.3)',
          }, {
            label: 'B Clicks',
            data: B,
            fillColor: 'rgba(68, 145, 222, 1)',
          }],
        };

        this.setState({
          data,
          A,
          B,
          Total,
          buckets,
          visitsA,
          visitsB,
        });
      });
  }

  render() {
    return (
      <div>
        <LineGraph data={this.state.data} options={this.state.options} width="600"  height="1000" redraw />
      </div>
    );
  }
}

export default LineChart;
