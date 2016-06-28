// This component should later be removed
// or completely integrated into dashboard

// the hidden form values should be passed in as props

import React, { Component } from 'react';

class StartTest extends Component {

  render() {
    return (
      <div>
        <h3>Add new test</h3>
        <form className="sourcePath" action="/selection/addtest" method="post">
          <label>Test Name<input name="name" type="text" /></label><br />
          <label>Page A URL<input name="url" type="text" /><br /></label>
          <input name="ab" type="hidden" value="a" />
          <input name="page_id" type="hidden" value="2" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default StartTest;
