import React, { PropTypes } from 'react';
import '../assets/styles/_utils.scss';

function TestTitle(props) {
  let color = 'grey lighten-4';
  if (props.viewableStatsForTest.viewableAnalysisResults.testResult === 'Version A wins!') {
    color = 'green lighten-5';
  }
  if (props.viewableStatsForTest.viewableAnalysisResults.testResult === 'Version B wins!') {
    color = 'blue lighten-5';
  }
  const className = `collection ${color} test-title`;

  return (
    <div className={className}>
      <h3>{props.viewableStatsForTest.testName}</h3>
      <h4>{props.viewableStatsForTest.viewableAnalysisResults.testResult}</h4>
      <button
        className="test-snippet btn green lighten-0 waves-effect waves-light"
        onClick={() => {
          window.location.href = `/snippet/?= ${props.viewableStatsForTest.testId}`;
        }}
      >SNIPPET</button>
    </div>
  );
}

TestTitle.propTypes = {
  viewableStatsForTest: PropTypes.object.isRequired,
};

export default TestTitle;

