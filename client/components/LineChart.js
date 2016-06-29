import React from 'react';
import Chart from 'chart.js';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      A: [],
      B: [],
      visitsA: [],
      visitsB: [],
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        responsive: false,
        title: {
          display: true,
          text: 'Open-AB ChartJS Line Graph',
        },
        legend: {
          display: true,
          labels: {
            fontColor: 'rgb(0, 0, 0)',
          },
        },
        tooltips: {
          enabled: true,
          mode: 'label',
          callbacks: {
            // parse ms time into date for tooltip
            title: arr => new Date(parseInt(arr[0].xLabel, 10)).toDateString(),
          },
        },
        hover: {
          mode: 'label',
        },
        elements: {
          // Line graph options
          line: {
            fill: false,
            borderJoinStyle: 'round',
            tension: 0,
          },
          // Data point options
          point: {
            radius: 3,
            hitRadius: 4,
          },
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: true,
              labelString: 'HAMMERTIME',
            },
            type: 'time',
            ticks: {
              displayFormats: {
                quarter: 'MMM YYYY',
              },
            },
          }],
        },
      },
    };
  }

  componentDidMount() {
    fetch('/api/chartData')
      .then(res => res.json())
      .then(res => {
        const A = res.A;
        const B = res.B;
        const buckets = res.buckets;

        const visitsA = res.visitsA;
        const visitsB = res.visitsB;

        const data = {
          labels: buckets,

          datasets: [{
            label: 'A Visits',
            backgroundColor: 'rgba(20, 178, 99, 0.5)',
            borderColor: 'rgba(20, 178, 99, 0.5)',
            data: visitsA,
          }, {
            label: 'A Clicks',
            backgroundColor: 'rgba(20, 178, 20, 1)',
            borderColor: 'rgba(20, 178, 20, 1)',
            data: A,
          }, {
            label: 'B Visits',
            backgroundColor: 'rgba(10, 107, 203, 0.5)',
            borderColor: 'rgba(10, 107, 203, 0.5)',
            data: visitsB,
          }, {
            label: 'B Clicks',
            backgroundColor: 'rgba(10, 10, 203, 1)',
            borderColor: 'rgba(10, 10, 203, 1)',
            data: B,
          }],
        };

        this.setState({
          data,
          A,
          B,
          buckets,
          visitsA,
          visitsB,
        });
      });
  }


  componentDidUpdate() {
    const chartCanvas = this.refs.chart;
    const myChart = new Chart(chartCanvas, {
      type: 'line',
      data: this.state.data,
      options: this.state.options,
    });
    myChart.update();
  }

  render() {
    return (
      <div width="500" height="500">
        <canvas ref={'chart'} width={'500'} height={'500'} ></canvas>
      </div>
    );
  }
}

export default LineChart;
