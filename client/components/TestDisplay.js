import React from 'react';

class TestDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {tests:[]};
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/getall')
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      this.setState({tests:res});

      const classNames = res.map((test) => {
        return 'openab-' + test.id;
      })
      this.setState({classNames:classNames});
      console.log(this.state.classNames);
      this.render();
      this.makeSnippet();
    });
  }

  makeSnippet() {
    let classList = this.state.classNames.join(', ');
    this.setState({snippet: `<script>
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
    </script>`});
  }

  addTest() {
    fetch
  }

  render() {
    const snippetStyle = {
      width: '500px',
      height: '200px'
    }
    const jqueryStyle = {
      width: '500px'
    }
    return (
      <div>
        <h1>Dashboard</h1>
        <h3>Current Tests</h3>
        <ul>{this.state.tests.map((test, index)=>{
          return <li key={test.id}>Test {test.id}: {test.result_a} clicks</li>
        }).sort((a,b) => {
          return a.key - b.key;
        })}</ul>
        <p>Copy this code snippet into the &lt;head&gt; of your website's html</p>
        <textarea style = {snippetStyle} value = {this.state.snippet} readonly/>
        <p>If your website does not already use jQuery, copy this snippet above the previous one</p>
        <textarea style = {jqueryStyle} value = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>' readonly/>
        //add test button
      </div>
    );
  }
}

export default TestDisplay;