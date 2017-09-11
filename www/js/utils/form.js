define([''], function () {
  /**
   * Module handler for form behavior.
   * @exports /utils/form
   */
  'use strict';

  /**
   * Form class
   * @class
   * @alias module:/utils/form
   */
  function form() {

    /**
     * Form validatation handler.
     * @param {string} selector - String of $ form selector.
     * @param {function} callback - Executed function.
     * @param {boolean} onchange - Avoid executing callback function.
     * @return {void}
     */
    function validate(selector, callback, onchange) {
      /** The function's `dirty` property. */
      var dirty = false;

      $(selector).find('.has-error').removeClass().promise().done(function () {
        // Validate each '.check' element.
        $(selector).find('.check').on('change', function () {

          // Check if 'selector' has dirty class.
          if ($(selector).hasClass('dirty')) {
            validate(selector, null, true);
          }
        }).each(function (i, element) {

          // Check if value is ''.
          if ($(element).val() === '') {
            dirty = true;
          }

          // Check if invalid.
          if (dirty) {
            $(element).parent().addClass('has-error');
          }
        })
          .promise()
          .done(function () {
            // Add 'dirty' class.
            $(selector).addClass('dirty');
            // Check if can execute callback function.
            if (!onchange) {
              callback(dirty);
            }
          });
      });
    }

    /**
     * Empty all '.check' elements inside selector.
     * @param {string} selector - String of element selector.
     * @return {void}
     */
    function clean(selector) {
      // Empty '.check' element.
      $(selector).find('.check').val('');
    }

    return /** @alias form */ {
      validate: validate,
      clean: clean
    };
  }

  /** module:/utils/form */
  return form();
});
