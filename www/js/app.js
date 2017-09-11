(function () {
  'use strict';

  require(['jquery', './resources/main', './utils/constants'], function (jquery, main, constants) {
    /**
     * Build app, main module.
     */

    // Loading main header
    $(constants.sections.id.header).load(constants.sections.templates.header);
    // Loading main footer
    $(constants.sections.id.footer).load(constants.sections.templates.footer);

    // Init 'resources' module
    main.init();
  });
}());

