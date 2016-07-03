import React, { PropTypes } from 'react';
import uuid from 'uuid';
import '../assets/styles/_utils.scss';

function StatsForTest(props) {
  return (
    <div className=".mediumSpace">
      <ul className="collection grey lighten-4">
        <table>
          <tr>
            <td key={uuid.v4()}><h4>Version A conversion rate:</h4>{props.viewableStatsForTest.viewableAnalysisResults.aConversionRate}</td>
            <td key={uuid.v4()}><h4>Version B conversion rate:</h4>{props.viewableStatsForTest.viewableAnalysisResults.bConversionRate}</td>
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
