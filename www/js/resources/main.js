define(['../utils/constants',
  '../utils/data',
  '../utils/form',
  'underscore',
  'bootstrap'], function (constants, local, form) {
  /**
   * Resources main handler.
   * @exports /resources/main
   */
  'use strict';

  /**
   * Resources class
   * @class
   * @alias module:/utils/form
   */
  function resources() {

    /**
     * Display data into resources table.
     * @return {void}
     */
    function display() {
      /** The function's `template` property. */
      var template = _.template($('#table-html').html()),
        compiled = template({ data: local.get() });

      $('#container').html(compiled);

      // Display data if exist
      if (local.get().length !== 0) {
        $('table').removeClass('hide');
      } else {
        $('table').addClass('hide');
      }
    }

    /**
     * Get data from resources form to create new 'record'
     * @return {void}
     */
    function create() {
      /** The function's `record` property. */
      var record = {};

      form.validate('.form', function (invalid) {

        if (!invalid) {
          // Gets val() from form.
          record = {
            id: $('#enterprise-id').val(),
            name: $('#enterprise-name').val()
          };

          local.add(record);
          // Reload
          display();
          // Clean
          form.clean('.form');
        }
      });
    }

    /**
     * Remove 'record' by id
     * @param {object} evt - event object.
     * @return {void}
     */
    function remove(evt) {
      local.remove($(evt.currentTarget).data('id'));
      display();
    }

    /**
     * Events attacher.
     * @return {void}
     */
    function attachEvent() {
      // Submit event click - handler.
      $('#btn-submit').off('click').on('click', create);
      // Delete event click - remove record.
      $('#container .btn-delete').off('click').on('click', remove);
      // Re-attach events.
      $('#container').off().on('DOMNodeInserted DOMNodeRemoved', attachEvent);
    }

    /**
     * Module builder.
     * @return {void}
     */
    function build() {

      // Attach events
      attachEvent();
      // Display
      display();
    }

    /**
     * Module init.
     * @return {void}
     */
    function init() {
      // Template loader.
      $(constants.sections.id.main).load(constants.sections.templates.resources.main, build);
    }

    return /** @alias resources */{
      init: init
    };
  }

  /** module:/resources/main */
  return resources();
});

