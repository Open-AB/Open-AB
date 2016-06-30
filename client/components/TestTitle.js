import React, { PropTypes } from 'react';
import uuid from 'uuid';
import '../assets/styles/_utils.scss';

function TestTitle(props) {
  return (
    <div>
      <ul className="collection green lighten-5">
        <table>
          <tr>
            <td key={uuid.v4()}><h3>{props.viewableStatsForTest.testName}</h3>{props.viewableStatsForTest.viewableAnalysisResults.testResult}</td>
          </tr>
        </table>
      </ul>
    </div>
  );
}

TestTitle.propTypes = {
  viewableStatsForTest: PropTypes.object.isRequired,
};

export default TestTitle;

