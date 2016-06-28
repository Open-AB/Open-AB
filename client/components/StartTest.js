// This component should later be removed
// or completely integrated into dashboard

import React, { Component } from 'react';

class StartTest extends Component {

  render() {
    return (
      <div>
        <h3>Add new test</h3>
        <form className="sourcePath" action="/selection/addtest" method="post">
          <input name="url" type="text" value="http://hackreactor.com" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default StartTest;
