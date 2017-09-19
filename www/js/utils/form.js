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
      /** The function's `$form` property. */
      var $form = $(selector),

        /** The function's `dirty` property. */
        dirty = false;

      $form.find('.has-error').removeClass().promise().done(function () {
        // Validate each '.check' element.
        $form.find('.check').on('change', function () {

          // Check if 'selector' has dirty class.
          if ($form.hasClass('dirty')) {
            validate(selector, null, true);
          }
        }).each(function (i, element) {
          /** The function's `$element` property. */
          var $element = $(element),

            /** The function's `invalid` property. */
            invalid = false;

          // Check if value is ''.
          if ($element.val() === '') {
            dirty = true;
            invalid = true;
          }

          // Check if invalid.
          if (invalid) {
            $element.parent().addClass('has-error');
          }
        })
          .promise()
          .done(function () {

            // Add 'dirty' class.
            $form.addClass('dirty');
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
