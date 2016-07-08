// TODO: pass in hidden form values as props
import React from 'react';
import '../assets/styles/_utils.scss';

const StartTest = () => (
  <div className="card centered-narrow">
    <div className="card-content black-text">
      <span className="card-title">Start an A/B Test</span>
      <form className="sourcePath" action="/selection/addtest" method="post">
        <label>Test Name<input name="name" type="text" /></label><br />
        <label>Version A URL<input name="url" type="text" /><br /></label>
        <input name="ab" type="hidden" value="a" />
        <input name="page_id" type="hidden" value="1" />
        <input name="page_id" type="hidden" value="2" />
        <button className="btn green lighten-0 waves-effect waves-light" type="submit">Submit</button>
      </form>
    </div>
    <div className="card-action">
      <a href="#">Start testing. Enter a URL</a>
    </div>
  </div>
);

export default StartTest;
