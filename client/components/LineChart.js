import React, { PropTypes } from 'react';
import Chart from 'chart.js';
import '../assets/styles/_utils.scss';
import jQuery from 'jquery';

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
        responsive: true,
        title: {
          display: true,
          text: this.props.dataset.testName,
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
              display: true,
              drawOnChartArea: false,
              drawTicks: true,
            },
            scaleLabel: {
              display: true,
            },
            type: 'time',
            time: {
              max: Math.max.apply(null, this.props.dataset.data.buckets),
              // unit: 'day',
              displayFormats: {
                quarter: 'MMM YYYY',
              },
            },
            ticks: {
              autoSkip: true,
              // max: Math.max.apply(null, this.props.dataset.data.buckets),
              // displayFormats: {
              //   quarter: 'MMM YYYY',
              // },
            },
          }],
        },
      },
      cumulative: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const A = this.props.dataset.data.aClicks;
    const B = this.props.dataset.data.bClicks;
    const buckets = this.props.dataset.data.buckets;

    const visitsA = this.props.dataset.data.aVisits;
    const visitsB = this.props.dataset.data.bVisits;

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

    const chartCanvas = this.refs.chart;

    const myChart = new Chart(chartCanvas, {
      type: 'line',
      data,
      options: this.state.options,
    });

    this.setState({
      myChart,
      data,
      A,
      B,
      buckets,
      visitsA,
      visitsB,
    });
  }

  makeCumulativeData(arr) {
    return arr.reduce((acc, curr, ind) => {
      if (acc[ind - 1]) {
        acc.push(curr + acc[ind - 1]);
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  }

  makeTimeBucketData(arr) {
    return arr.reduce((acc, curr, ind) => {
      if (acc[ind - 1]) {
        acc.push(curr - acc.reduce((sum, x) => sum + x, 0));
      } else {
        acc.push(curr);
      }
      return acc;
    }, []);
  }

  handleClick(e) {
    e.preventDefault();
    if (!this.state.cumulative) {
      e.target.textContent = 'Show daily data';
    } else {
      e.target.textContent = 'Show cumulative data';
    }
    const newCumulative = !this.state.cumulative;
    let makeCumulativeData;
    if (newCumulative) {
      makeCumulativeData = this.makeCumulativeData.bind(this);
    } else {
      makeCumulativeData = this.makeTimeBucketData.bind(this);
    }

    this.state.myChart.data.datasets.forEach(obj => {
      obj.data = makeCumulativeData(obj.data);
    });
    this.state.myChart.update();

    this.setState({
      cumulative: newCumulative,
    });
  }

  render() {
    return (
      <div>
        <canvas ref={'chart'} width={'500'} height={'500'} ></canvas>
        <button className="waves-effect waves-light btn green darken fixed-width" onClick={this.handleClick}>Show cumulative data</button>
      </div>
    );
  }
}

LineChart.propTypes = {
  dataset: PropTypes.object.isRequired,
};

export default LineChart;
