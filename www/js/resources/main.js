define(['jquery'], function () {
  'use strict';

  function main() {

    function init() {
      $('#rs-app').load('/public/views/commons/header.html');
    }

    return {
      init: init
    };
  }

  return main();
});

