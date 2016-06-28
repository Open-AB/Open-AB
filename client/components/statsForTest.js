import React, { PropTypes } from 'react';
import uuid from 'uuid';

function StatsForTest(props) {
  return (
    <div>
      <div>
        <p key={uuid.v4()}>Test name: {props.viewableStatsForTest.testName}</p>
        <p key={uuid.v4()}>Test result: {props.viewableStatsForTest.viewableAnalysisResults.testResult}</p>
        <p key={uuid.v4()}>Version A conversion rate: {props.viewableStatsForTest.viewableAnalysisResults.aConversionRate}</p>
        <p key={uuid.v4()}>Version B conversion rate: {props.viewableStatsForTest.viewableAnalysisResults.bConversionRate}</p>
        <hr />
      </div>
    </div>
  );
}

StatsForTest.propTypes = {
  viewableStatsForTest: PropTypes.object.isRequired,
};

export default StatsForTest;
