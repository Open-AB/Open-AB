// ES5 because this gets served directly to client

// We want some styles here rather than in stylesheet
// because inline styles are always most specific
var openabStyles = {
  openab: {
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    'font-size': '16px',
    font: 'inherit',
    'font-weight': 'normal',
    'vertical-align': 'baseline',
    display: 'inline-block',
  },

  // currently not in use here, but may need to assign inline
  openabHeader: {
    'font-family': 'sans-serif',
    'border-radius': '10px',
    'font-size': '30px',
    position: 'fixed',
    padding: '10px',
    top: '50px',
    left: '50px',
    color: 'white',
    'background-color': 'rgba(255,127,255,0.8)',
    'z-index': 9001,
  },

  // currently not in use here, but may need to assign inline
  openabDomTree: {
    top: '100px',
  },

  openabComplete: {
    padding: '10px',
    'background-color': '#660066',
    color: 'white',
    'font-weight': 'normal',
    cursor: 'pointer',
  },

  openabLabel: {
    'padding-right': '20px',
  },

  openabInput: {
    'border': '1px solid #999999',
  },
};

$(document).ready(function(){
  var testElement = null;
  var DOMtext = '';

  // set inline styles on overlay elements to overwrite inherited styles
  $('.openab-complete').css(openabStyles.openab);
  $('.openab-complete').css(openabStyles.openabComplete);

  $('.openab-continue').css(openabStyles.openab);
  $('.openab-continue').css(openabStyles.openabComplete);

  $('.openab-label').css(openabStyles.openab);
  $('.openab-label').css(openabStyles.openabLabel);

  $('.openab-input').css(openabStyles.openab);
  $('.openab-input').css(openabStyles.openabInput);

  // DOM selector logic
  $('a, button').on('click', function (e) {
    if ($(this).hasClass('openab-complete')) {
      console.log('DONE');
    }


    // var beforeTime = performance.now(); //performance logging
    e.preventDefault();
    console.log('a or button has been clicked', $(this));
    $(this).addClass('openab-select');
    if (testElement) {
      if (!$(this).is(testElement)) testElement.removeClass('openab-select');
    }
    testElement = $(this);

    // display the correct modal for the page (a or b)
    if (openab.ab === 'a'){
      $('.openab-nav-a').css({ display: 'block' });
    } else {
      $('.openab-nav-b').css({ display: 'block' });
    }

    var domTree = [$(this).index()];
    var el = $(this);
    while (el.parent().index() > -1) {
      domTree.push(el.parent().index());
      el = el.parent();
    }
    // console.log(performance.now() - beforeTime);
    DOMtext = domTree.join('-');
    $('.openab-domTree').text(DOMtext);
  });

  //
  $('.openab-b-url').submit(function () {
    $('.openab-b-url').append($('<input>')
               .attr('type', 'hidden')
               .attr('name', 'url_a')
               .val(openab.url));
    $('.openab-b-url').append($('<input>')
               .attr('type', 'hidden')
               .attr('name', 'dom_a')
               .val(DOMtext));
    $('.openab-b-url').append($('<input>')
               .attr('type', 'hidden')
               .attr('name', 'page_id')
               .val(openab.page_id));
    $('.openab-b-url').append($('<input>')
               .attr('type', 'hidden')
               .attr('name', 'name')
               .val(openab.name));
    $('.openab-b-url').append($('<input>')
               .attr('type', 'hidden')
               .attr('name', 'ab')
               .val('b'));
    return true;
  });

  //
  $('.openab-complete').on('click', function () {
    console.log('ajax to submit version a');
    var data = {
      testName: openab.name,
      pageId: openab.page_id,
      a: {
        url: openab.url_a,
        DOMLocation: openab.dom_a,
      },
      b: {
        url: openab.url,
        DOMLocation: DOMtext,
      },
    };
    console.log(JSON.stringify(data));
    $.ajax({
      url: 'http://localhost:8080/api/createTest',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (res) {
        console.log(res.testId);
        location.href = `/snippet/?= ${res.testId}`;
      },
      error: function() {
        console.log('did not create test');
      },
    });
  });
});
