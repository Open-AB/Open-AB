// jsdom - an API that makes it easy to manipulate the DOM in node.js
const jsdom = require('jsdom');
const fs = require('fs');
const path = require('path');

// styles for our text overlay and selection highlighting
const htmlFile = fs.readFileSync(path.resolve(__dirname, './assets/modals.html')).toString();
const htmlTag = `<div>${htmlFile}</div>`;

// styles for our text overlay and selection highlighting
const styleFile = fs.readFileSync(path.resolve(__dirname, './assets/styles.css')).toString();
const styleTag = `<style>${styleFile}</style>`;

// this script allows the user to select the element they want to test
const scriptFile = fs.readFileSync(path.resolve(__dirname, './assets/script.js')).toString();
const scriptTag = `<script>${scriptFile}</script>`;

module.exports = (app) => {
  app.post('/selection/addTest', (req, res, next) => {
    // on newTest initiated from dashboard
    jsdom.env(
      req.body.url,
      ['http://code.jquery.com/jquery.js'],
      (err, window) => {
        const $ = window.jQuery;
        $('body').append(htmlTag);
        $('head').append(styleTag);
        // pass information that our POST request will need, through the window object
        // is this okay to do?  are there situations where this would fail?
        $('head').append(`<script>window.openab = {
          ab: '${req.body.ab}',
          name: '${req.body.name}',
          page_id: ${req.body.page_id},
          url: '${req.body.url}'
        } </script>`);
        if (req.body.ab === 'b') {
          $('head').append(`<script>
          window.openab.url_a = '${req.body.url_a}';
          window.openab.dom_a = '${req.body.dom_a}';
          </script>`);
        }
        $('body').append(scriptTag);
        if (err) {
          next(err);
        } else {
          res.send(window.document.documentElement.innerHTML);
        }
      }
    );
  });
};
