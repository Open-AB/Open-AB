import React from 'react';

function statsForTest() {
  return (
    <div>
      {this.props.data}
    </div>
  );
}

TestResults.propTypes = {
  data: PropTypes.array.isRequired,
};


export default statsForTest;
