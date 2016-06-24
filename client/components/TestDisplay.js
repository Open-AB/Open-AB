import React from 'react';

class TestDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tests: [], testName: '' };

    this.updateTestName = this.updateTestName.bind(this);
    this.addTest = this.addTest.bind(this);
  }

  componentDidMount() {
    // load all test data when page loads
    fetch('/api/results')
    .then(res => res.json())
    .then(res => {
      this.setState({ tests: res });

      // classNames - required in code snippet
      const classNames = res.map((test) => `openab- + ${test.id}`);
      this.setState({ classNames });
      console.log(this.state.classNames);
      this.makeSnippet();
    });
  }

  // create the code snippet for a client to use in their webpage
  makeSnippet() {
    const classList = this.state.classNames.join(', ');
    this.setState({ snippet: `<script>
    $(document).ready(function(){
      $(${classList}).on('click', function(e){
        var testId = parseInt(this.className.match(/openab-\d+/)[0].match(/\d+/)[0]);
        $.ajax({
          url: 'http://localhost:3939/listening/clicks',
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({testId: testId})
        });
      });
    });
    </script>` });
  }

  // update test name/description as user types in input
  updateTestName(e) {
    this.setState({ testName: e.target.value });
  }

  addTest() {
    console.log('is it happening?', this);
    fetch('/api/createTest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testName: this.state.testName,
      }),
    })
    .then((res) => {
      console.log(res);
      location.reload();
    });
  }

  render() {
    const snippetStyle = {
      width: '500px',
      height: '200px',
    };
    const jqueryStyle = {
      width: '500px',
    };
    return (
      <div>
        <h1>Dashboard</h1>
        <h3>Current Tests</h3>
        <ul>{this.state.tests.map(test => (
          <li key={test.id}>
            <strong>Test {test.id}: {test.result_a} clicks</strong><br />
            <span>Description: {test.name}</span><br />
            <span>HTML class name: openab-{test.id}</span>
          </li>
          )).sort((a, b) => a.key - b.key)}
        </ul>
        <p>Copy this code snippet into the &lt;head&gt; of your website&#39;s html</p>
        <textarea style={snippetStyle} value={this.state.snippet} readOnly />
        <p>If your website does not already use jQuery, copy this snippet above the previous one</p>
        <textarea style={jqueryStyle} defaultValue='<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>' readOnly />
        <h3>Add additional tests</h3>
        <label>short name/description<input value={this.state.testName} onChange={this.updateTestName} /></label>
        <button onClick={this.addTest}>Add test</button>
      </div>
    );
  }
}

export default TestDisplay;
