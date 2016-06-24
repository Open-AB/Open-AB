import React from 'react';
import moment from 'moment';
import { Line as LineGraph } from 'react-chartjs';

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      A: [1, 2, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 7, 8, 9, 10].sort((a,b) => a-b),
      B: [1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 6, 6, 6, 6, 6, 9, 9, 9, 9, 9, 10].sort((a,b) => a-b),
      Total: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 6, 6, 6, 6, 6, 9, 9, 9, 9, 9, 10, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 7, 7, 7, 7, 7, 7, 4, 4, 4, 4, 4, 4, 4, 4].sort((a,b) => a-b),
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'My First dataset',
            // lineTension: 1,
            fillColor: 'rgba(220,220,220,0.2)',
            // strokeColor: 'rgba(220,220,220,1)',
            // pointColor: 'rgba(220,220,220,1)',
            // pointStrokeColor: '#fff',
            // pointHighlightFill: '#fff',
            // pointHighlightStroke: 'rgba(220,220,220,1)',
            // fill: false,
            // backgroundColor: 'rgba(75,192,192,0.4)',
            // borderColor: 'rgba(75,192,192,1)',
            // borderCapStyle: 'butt',
            // borderDash: [],
            // borderDashOffset: 0.0,
            // borderJoinStyle: 'miter',
            // pointBorderColor: 'rgba(75,192,192,1)',
            // pointBackgroundColor: '#fff',
            // pointBorderWidth: 1,
            // pointHoverRadius: 5,
            // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            // pointHoverBorderColor: 'rgba(220,220,220,1)',
            // pointHoverBorderWidth: 2,
            // pointRadius: 1,
            // pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
          },
          {
            label: 'My Second dataset',
            data: [65, 49, 90, 71, 66, 45, 50],
            fillColor: 'rgba(151,187,205,0.2)',
          },
        ],
      },
      options: {
        // scaleShowGridLines: true,
        // scaleGridLineColor: 'rgba(0,0,0,.05)',
        // scaleGridLineWidth: 1,
        // scaleShowHorizontalLines: true,
        // scaleShowVerticalLines: true,
        // bezierCurve: true,
        bezierCurveTension: 0.1,
        // pointDot: true,
        // pointDotRadius: 4,
        // pointDotStrokeWidth: 1,
        // pointHitDetectionRadius: 20,
        // datasetStroke: true,
        // datasetStrokeWidth: 2,
        // // datasetFill: true,
        // legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
      },
    };
  }

  componentDidMount() {
    console.log(moment().format(), '$$$$$$$$$');
    // this.createScatter();
    var buckets = this.createBuckets(5);
    console.log(buckets, '<<<>>><><><><><>< bucket upper limits')
    var bucketCounts = this.countIntoBuckets(buckets, this.state.Total);
    console.log(bucketCounts, '<<<< bucket Counts');
    this.processData();
  }

  createScatter() {
    const rawData = [this.state.A, this.state.B, this.state.Total];
    const scatterData = rawData.map(series =>{
      return series.map((datum, ind) => {
        return {
          x: ind,
          y: datum,
        };
      });
    });
    const tlabels = scatterData[2].map((n, ind) => ind.toString());
    console.log(scatterData, 'scatterData');
    const data =  {
      labels: tlabels,
      datasets: [{
        label: 'Total Visits',
        data: scatterData[2],
        fillColor: 'rgba(222, 68, 68, 0.4)',
      }, {
        label: 'My First dataset',
        data: scatterData[0],
        fillColor: 'rgba(68, 222, 68, 0.5)',
      }, {
        label: 'My Second dataset',
        data: scatterData[1],
        fillColor: 'rgba(68, 145, 222, 0.5)',
      }],
    };

    const options = {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
        }],
      },
    };
    console.log(data, '<<< data');
    this.setState({ data, options });
  }

  processData() {
    const visits = this.processVisits();
    // process A and B data, similarly to processVisits
    // count up all the times, store in object as {time:clickCount}
    // countAB = [{time:clickCount...}, {time:clickCount....}] = [clickCounts for A, clickCounts for B]
    const countAB = [this.state.A, this.state.B].map(data => {
      return this.countOccurences(data);
    });

    // map {time:clickCounts} into array the same length as visitsData
    // this considers times where there are visits but no clicks
    // dataAB = [arrayOfClicks for A, arrayOfClicks for B] = [[],[]]
    const dataAB = countAB.map(count => {
      const clickData = [];
      for (let i = 0; i < visits.visitTimes.length; i++) {
        const timePoint = parseInt(visits.visitTimes[i], 10);
        if (count[timePoint] !== undefined) {
          clickData.push(count[timePoint]);
        } else {
          clickData.push(0);
        }
      }

      return clickData;
    });

    const data =  {
      labels: visits.visitTimes,

      datasets: [{
        label: 'Total Visits',
        data: visits.visitData,
        fillColor: 'rgba(222, 68, 68, 0.4)',
      }, {
        label: 'My First dataset',
        data: dataAB[0],
        fillColor: 'rgba(68, 222, 68, 0.5)',
      }, {
        label: 'My Second dataset',
        data: dataAB[1],
        fillColor: 'rgba(68, 145, 222, 0.5)',
      }],
    };

    this.setState({ data });
  }

  processVisits() {
    // count up all the times, store in object as {time:visitCount}
    const visitCount = this.countOccurences(this.state.Total);
    // store all times in array from oldest to newest ['oldestTime', .... 'newestTime']
    const visitTimes = Object.keys(visitCount).sort((a, b) => a - b);
    // maps {time:visitCount} into array in order of oldest to newest  [oldestCount,...,newestCount]
    const visitData = visitTimes.map(key => visitCount[key]);

    return { visitCount, visitTimes, visitData };
  }

  createBuckets(bucketWidth) {
    const start = this.state.Total[0];
    const end = this.state.Total[ this.state.Total.length - 1];

    let upperLimitOfBuckets = [];
    let ind = bucketWidth;
    while (ind <= end) {
      upperLimitOfBuckets.push(start + ind);
      ind += bucketWidth;
    }
    upperLimitOfBuckets.push(start+ind);
    return upperLimitOfBuckets;
  }

  // arr is sorted
  countOccurences(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr] = acc[curr] ? ++acc[curr] : 1;
      return acc;
    }, {});
  }

  // arr is sorted
  countIntoBuckets(upperLimitOfBuckets, arr) {
    // let bucketCounts = [];
    let bucketInd = 0;
    return arr.reduce((bucketCounts, curr) => {
      if (curr < upperLimitOfBuckets[bucketInd]) {
        bucketCounts[bucketInd] = bucketCounts[bucketInd] === undefined ? 1 : ++bucketCounts[bucketInd] ;
      } else {
        bucketInd++;
        bucketCounts[bucketInd] = bucketCounts[bucketInd] === undefined ? 1 : ++bucketCounts[bucketInd] ;
      }
      return bucketCounts;
    }, []);
  }

  render() {
    return (
      <div>
        <LineGraph data={this.state.data} options={this.state.options} width="600"  height="250" redraw />
      </div>
    );
  }
}

export default LineChart;
