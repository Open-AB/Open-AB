// jsdom - an API that makes it easy to manipulate the DOM in node.js
const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path');

// styles for our text overlay and selection highlighting
const styleFile = fs.readFileSync(path.resolve(__dirname, './assets/styles.css')).toString();
const styleTag = `<style>${styleFile}</style>`;

// this script allows the user to select the element they want to test
const scriptFile = fs.readFileSync(path.resolve(__dirname, './assets/script.js')).toString();
const scriptTag = `<script>${scriptFile}</script>`;

module.exports = (app) => {
  app.post('/selection/addTest', (req, res) => {
    // on newTest initiated from dashboard
    console.log(req.body);
    jsdom.env(
      req.body.url,
      ['http://code.jquery.com/jquery.js'],
      (err, window) => {
        const $ = window.jQuery;
        $('body').append('<h1 class="openab-header">Select links or buttons to test</h1>');
        $('body').append('<h1 class="openab-header openab-domTree"></h1>');
        $('body').append('<div class="openab-modal openab-nav-a openab-select"><form class="openab-b-url" action="/selection/addTest" method="post"><label>URL for Version B<input name="url" type="url"/></label><input type="submit"/></form></div>');
        $('head').append(styleTag);
        // pass information that our POST request will need, through the window object
        // is this okay to do?  are there situations where this would fail?
        $('head').append(`<script>window.openab = {
          ab: '${req.body.ab}',
          test_id: ${req.body.test_id},
          url: '${req.body.url}'
        } </script>`);
        $('body').append(scriptTag);
        res.send(window.document.documentElement.innerHTML);
      }
    );
  });
};
