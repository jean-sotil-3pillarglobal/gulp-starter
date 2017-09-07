define(['jquery'], function () {
  'use strict';

  function main() {

    function init() {
      $('html').css('background', 'red');
    }

    return {
      init: init
    };
  }

  return main();
});

