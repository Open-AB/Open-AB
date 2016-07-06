import React, { PropTypes } from 'react';
import uuid from 'uuid';
import '../assets/styles/_utils.scss';

function StatsForTest(props) {
  let color = 'grey lighten-4';
  if (props.viewableStatsForTest.viewableAnalysisResults.testResult === 'Version A wins!') {
    color = 'green lighten-5';
  }
  if (props.viewableStatsForTest.viewableAnalysisResults.testResult === 'Version B wins!') {
    color = 'blue lighten-5';
  }
  const ulClassName = `collection ${color}`;

  return (
    <div className=".mediumSpace">
      <ul className={ulClassName}>
        <table>
          <tr>
            <td key={uuid.v4()}><h4>Version A conversion rate: {props.viewableStatsForTest.viewableAnalysisResults.aConversionRate}</h4></td>
            <td key={uuid.v4()}><h4>Version B conversion rate: {props.viewableStatsForTest.viewableAnalysisResults.bConversionRate}</h4></td>
          </tr>
        </table>
      </ul>
    </div >
  );
}

StatsForTest.propTypes = {
  viewableStatsForTest: PropTypes.object.isRequired,
};

export default StatsForTest;
