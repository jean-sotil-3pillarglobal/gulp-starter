define([''], function () {
  /**
   * Global app constants.
   * @exports /utils/constants
   */
  'use strict';

  return /** @alias /utils/constants */{

    /** Sections. */
    sections: {
      /** Dom's elements. */
      id: {
        header: $('#rs-header'),
        main: $('#rs-app'),
        footer: $('#rs-footer')
      },

      /** HTML template links. */
      templates: {
        header: '/public/views/commons/header.html',
        footer: '/public/views/commons/footer.html',
        resources: {
          main: '/public/views/resources/main.html'
        }
      }
    }
  };
});
