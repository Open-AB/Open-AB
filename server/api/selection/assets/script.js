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

  openabButton: {
    padding: '0px 10px',
    'background-color': 'rgb(0, 230, 0)',
    color: 'white',
    'font-weight': 'normal',
    cursor: 'pointer',
    'border-radius': '2px',
    height: '30px',
    'font-size': '14px',
  },

  openabLargeButton: {
    padding: '20px',
    'background-color': 'rgb(0, 230, 0)',
    color: 'white',
    'font-weight': 'normal',
    cursor: 'pointer',
    display: 'table-cell',
    'border-radius': '2px',
    'font-size': '20px',
    margin: '8px',
  },

  openabLabel: {
    'padding-right': '20px',
  },

  openabInput: {
    border: '1px solid #999999',
    width: '400px',
  },
};

$(document).ready(function(){
  var testElement = null;
  var DOMtext = '';
  var DOMloc = '';

  // set inline styles on overlay elements to overwrite inherited styles
  $('.openab-complete').css(openabStyles.openab);
  $('.openab-complete').css(openabStyles.openabLargeButton);

  $('.openab-continue').css(openabStyles.openab);
  $('.openab-continue').css(openabStyles.openabButton);

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
      $('.openab-contain-centered-a').css({ display: 'flex' });
    } else {
      $('.openab-nav-b').css({ display: 'block' });
      $('.openab-contain-centered-b').css({ display: 'flex' });
    }

    var domTree = [$(this).index()];
    var el = $(this);
    while (el.parent().index() > -1) {
      domTree.push(el.parent().index());
      el = el.parent();
    }
    // console.log(performance.now() - beforeTime);
    DOMtext = 'DOM location to track: ' + domTree.join('-');
    DOMloc = domTree.join('-');
    $('.openab-domTree').text(DOMtext);
    $('.openab-domTree').css('visibility', 'visible');
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
               .val(DOMloc));
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

  $('.openab-complete').on('click', function () {
    console.log('ajax to submit version a');
    var data = {
      testName: openab.name,
      a: {
        url: openab.url_a,
        DOMLocation: openab.dom_a,
      },
      b: {
        url: openab.url,
        DOMLocation: DOMloc,
      },
    };
    console.log(JSON.stringify(data));
    $.ajax({
      url: '/api/createTest',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (res) {
        console.log(res.testId);
        // test created, proceed to snippet
        if (!res.demo && res.testId) {
          location.href = `/snippet/?= ${res.testId}`;
        } else {
        // test not created because DEMO account, redirect to landing to createAccount
          location.href = '/?=createAccount';
        }
      },
      error: function() {
        console.log('did not create test');
      },
    });
  });
});
