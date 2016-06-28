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
        datasetFill: false,
        scaleShowVerticalLines: false,
        pointDotRadius: 2,
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
          labels: buckets.map(n => new Date(n).toDateString()).map((n, ind) => ind % 4 === 0 ? n : ''),

          datasets: [{
          //   label: 'Total Visits',
          //   data: Total,
          //   fillColor: 'rgba(222, 68, 68, 0.05)',
          // }, {
            label: 'A Visits',
            fill: false,
            strokeColor: 'rgba(20, 178, 99, 0.7)',
            pointColor: 'rgba(20, 178, 99, 0.7)',
            data: visitsA,
          }, {
            label: 'A Clicks',
            fill: false,
            strokeColor: 'rgba(20, 178, 20, 1)',
            pointColor: 'rgba(20, 178, 20, 1)',
            data: A,
          }, {
            label: 'B Visits',
            fill: false,
            strokeColor: 'rgba(10, 107, 203, 0.7)',
            pointColor: 'rgba(10, 107, 203, 0.7)',
            data: visitsB,
          }, {
            label: 'B Clicks',
            fill: false,
            strokeColor: 'rgba(10, 10, 203, 1)',
            pointColor: 'rgba(10, 10, 203, 1)',
            data: B,
          }],
        };

        this.setState({
          data,
          A,
          B,
          // Total,
          buckets,
          visitsA,
          visitsB,
        });
      });
  }

  render() {
    return (
      <div>
        <LineGraph data={this.state.data} options={this.state.options} width="600"  height="600" redraw />
      </div>
    );
  }
}

export default LineChart;
