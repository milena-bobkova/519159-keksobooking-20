'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var MOUSEDOWN_LEFT = 1;

  window.util = {
    isEnterPressed: function (evt) {
      return evt.keyCode === ENTER_KEYCODE;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    },
    isMouseDownLeft: function (evt) {
      return evt.which === MOUSEDOWN_LEFT;
    },
  };
})();
