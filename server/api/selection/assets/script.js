// ES5 because this gets served directly
$(document).ready(function(){
  var testElement = null;
  var DOMtext = '';

  $('a, button').on('click', function (e) {
    // var beforeTime = performance.now(); //performance logging
    e.preventDefault();
    console.log('a or button has been clicked', $(this));
    $(this).addClass('openab-select');
    if (testElement) {
      if (!$(this).is(testElement)) testElement.removeClass('openab-select');
    }
    testElement = $(this);

    $('.openab-modal').css({ display: 'block' });

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

  $('.openab-b-url').submit(function (e) {
    console.log('ajax to submit version a');
    $.ajax({
      url: 'http://localhost:3636/versions',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ test_id: window.openab.test_id, ab: window.openab.ab, url: window.openab.url, DOMLocation: DOMtext }),
    });
  });
});