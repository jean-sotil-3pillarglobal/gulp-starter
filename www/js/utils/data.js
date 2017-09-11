define([''], function () {
  /**
   * Module handler for localStorage data *(simulation).
   * @exports /utils/data
   */
  'use strict';

  /**
   * Data class
   * @class
   * @alias module:/utils/data
   */
  function data() {
    /** The module's `local` property. */
    var local = window.localStorage;

    /**
     * Get data from LocalStorage as 'records'.
     * @return {array} 'records' from localStorage.
     */
    function get() {
      // Check if 'records' exist.
      if (!JSON.parse(local.getItem('records'))) {
        // Creates 'records' under localStorage object.
        local.setItem('records', JSON.stringify([]));
      }
      return JSON.parse(local.getItem('records'));
    }

    /**
     * Set value to 'records' on localStorage object.
     * @param {array} records - json string format.
     * @return {void}
     */
    function set(records) {
      local.setItem('records', JSON.stringify(records));
    }

    /**
     * Add record value to 'records' on localStorage object.
     * @param {object} record - json string format.
     * @return {void}
     */
    function add(record) {
      /** The functions's `records` property. */
      var records = get();

      records.push(record);
      set(records);
    }

    /**
     * Remove record from 'records' on localStorage object by id.
     * @param {number} id - id number of record from 'records'.
     * @return {void}
     */
    function remove(id) {
      /** The functions's `records` property. */
      var records = get();

      records = $.grep(records, function (record) {
        return parseInt(record.id, 10) !== id;
      });
      set(records);
    }

    return /** @alias data */ {
      get: get,
      add: add,
      remove: remove
    };
  }

  /** module:/utils/data */
  return data();
});

