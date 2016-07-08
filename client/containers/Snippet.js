import React, { Component } from 'react';
import { Link } from 'react-router';
import '../assets/styles/_utils.scss';

export default class Root extends Component {
  constructor() {
    super();
    this.state = { abData: {}, snippet: '', snippetBody:
    `

//check for redirect
var ab = localStorage.openab;
//storageAvailable check function from MDN
function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}
if(storageAvailable('localStorage') && !ab){
  var flip = Math.round(Math.random());
  console.log(flip);
  ab = flip ? 'a' : 'b';
  localStorage.openab = ab;
}

// check if we're on the right page;
// note that if client's server does any redirects here,
// we could get an endless loop of redirects
var url = new URL(abData[ab].url);
console.log(url.pathname, window.location.pathname);
if(url.pathname !== window.location.pathname){
  //if not, get right path
  window.location = url.pathname;
} else {
  //check for jQuery
  if(window.jQuery === undefined){
    var script = document.createElement('script')
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js';
    document.getElementsByTagName('head')[0].appendChild(script);
    script.onload = function() {
      openab();
    }
  } else {
    openab();
  }

  function openab() {
    $(document).ready(function(){
      //log visit
      var visitData = {};
      visitData.versionId = abData[ab].versionId;
      visitData.time = Date.now();
      console.log(visitData);
      $.ajax({
        url: 'http://50.112.70.234/listening/visits',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(visitData)
      });

      //log click
      // DOM selector logic
      $('a, button').on('click', function (e) {
        var domTree = [$(this).index()];
        var el = $(this);
        while (el.parent().index() > -1) {
          domTree.push(el.parent().index());
          el = el.parent();
        }
        var DOMtext = domTree.join('-');
        console.log(DOMtext);
        if(DOMtext !== undefined && DOMtext === abData[ab].DOMLocation) {
          var clickData = {};
          clickData.versionId = abData[ab].versionId;
          clickData.time = Date.now();

          $.ajax({
            url: 'http://50.112.70.234/listening/clicks',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(clickData)
          });
        }
      });
    });
  }
}`  };
    this.copySnippet = this.copySnippet.bind(this);
  }

  componentWillMount() {
    const context = this;
    const testid = location.search.split('=')[1] || 0;
    fetch(`/api/getVersions?testid=${testid}`)
      .then(response => response.json())
      .then(json => { context.setState({ abData: json }); });
  }

  copySnippet() {
    $('textarea').focus();
    $('textarea').select();
    document.execCommand('copy');
    setTimeout(() => {
      $('textarea').blur();
    }, 250);
  }

  render() {
    $('#snippet').openModal({
      dismissible: false, // Modal can be dismissed by clicking outside of the modal
      opacity: 0.5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
    });

    return (
      <div className="bigSpace">
        <div id="snippet" className="modal">
          <div className="modal-content">
            <div className="row centered-big-narrow">
              <div className="card-content black-text">
                <span><h3>Snippet</h3></span>
                <p>Instructions: Click the button to copy the code snippet.</p>
                <p>Paste the snippet inside a script tag on both the A and B versions of the page you are testing.</p>
              </div>
              <div className="center">
                <div className="card-action">
                  <textarea className="textBox" value={`var abData=${JSON.stringify(this.state.abData, 2, 2)}${this.state.snippetBody}`} readOnly></textarea>
                  <div className="miniSpace">
                    <button button className="waves-effect waves-light btn green darken fixed-width copyButton" onClick={this.copySnippet}>Copy to clipboard</button><br />
                  </div>
                  <a href="/dashboard">Continue to dashboard</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
