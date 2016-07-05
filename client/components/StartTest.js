// This component should later be removed
// or completely integrated into dashboard

// the hidden form values should be passed in as props

import React, { Component } from 'react';
import '../assets/styles/_utils.scss';

class StartTest extends Component {

  render() {
    return (
      <div className="row thirdPage">
        <div className="center">
          <div>
            <div className="card">
              <div className="card-content black-text">
                <span className="card-title">Add New Test</span>
                <form className="sourcePath" action="/selection/addtest" method="post">
                  <label>Test Name<input name="name" type="text" /></label><br />
                  <label>Page A URL<input name="url" type="text" /><br /></label>
                  <input name="ab" type="hidden" value="a" />
                  <input name="page_id" type="hidden" value="1" />
                  <button className="btn green lighten-0 waves-effect waves-light" type="submit">Submit</button>
                </form>
              </div>
              <div className="card-action">
                <a href="#">Start testing. Enter a URL</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartTest;
