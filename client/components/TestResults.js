import React, { PropTypes, Component } from 'react';
import uuid from 'uuid';

class TestResults extends Component {
  render() {
    return (
      <ul>
        {this.props.data.map((data) =>
          <ul>
            <li key={uuid.v4()}>{data.testName}</li>
            <li key={uuid.v4()}>{data.testId}</li>
            <li key={uuid.v4()}>{data.testClicks}</li>
          </ul>
        )}
      </ul>
    );
  }
}

TestResults.propTypes = {
  data: PropTypes.array.isRequired,
};

export default TestResults;
