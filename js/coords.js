'use strict';

(function () {
  var PIN_MAIN_POINTER = 22;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinMain = mapPins.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('input[name="address"]');

  /**
  * Записывает полученные координаты в поле ввода адреса
  * @param {boolean} isMapActive - активное/неактивное состояние карты
  */
  var setAddressCoords = function (isMapActive) {
    var positionX = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2);
    var positionY = Math.round(pinMain.offsetTop + ((isMapActive) ? (pinMain.offsetHeight + PIN_MAIN_POINTER) : (pinMain.offsetHeight / 2)));
    adFormAddress.value = positionX + ', ' + positionY;
  };

  /**
   * Неактивное поле адреса
   */
  var disabledAddress = function () {
    adFormAddress.setAttribute('readonly', 'readonly');
  };


  var pinMainCoordsLimit = {
    left: window.data.locationXMin - pinMain.offsetWidth / 2,
    top: window.data.locationYMin - pinMain.offsetHeight - PIN_MAIN_POINTER,
    right: window.data.locationXMax - pinMain.offsetWidth / 2,
    bottom: window.data.locationYMax - pinMain.offsetHeight - PIN_MAIN_POINTER
  };

  var checkPinMainCoords = function () {
    if (pinMain.offsetLeft <= pinMainCoordsLimit.left) {
      pinMain.style.left = pinMainCoordsLimit.left + 'px';
    }
    if (pinMain.offsetTop <= pinMainCoordsLimit.top) {
      pinMain.style.top = pinMainCoordsLimit.top + 'px';
    }
    if (pinMain.offsetLeft >= pinMainCoordsLimit.right) {
      pinMain.style.left = pinMainCoordsLimit.right + 'px';
    }
    if (pinMain.offsetTop >= pinMainCoordsLimit.bottom) {
      pinMain.style.top = pinMainCoordsLimit.bottom + 'px';
    }
  };

  /**
   * Обработчик клика на Enter на главный пин
   * @param {*} evt - объект события
   */
  var pinMainKeyDownHandler = function (evt) {
    if (evt.key === 'Enter') {
      window.form.pageActive();
    }
    pinMain.removeEventListener('mousedown', pinMainMouseDownHandler);
    pinMain.removeEventListener('keydown', pinMainKeyDownHandler);
  };

  /**
   * Обработчик клика мышью на главный пин
   * @param {*} evt - объект события
   */
  var pinMainMouseDownHandler = function (evt) {
    if (evt.which === 1) {
      window.main.pageActive();
    }
    pinMain.removeEventListener('mousedown', pinMainMouseDownHandler);
    pinMain.removeEventListener('keydown', pinMainKeyDownHandler);
  };

  /**
   * Запуск обработчика при срабатывании события клика на главный пин
   */
  pinMain.addEventListener('mousedown', pinMainMouseDownHandler);
  pinMain.addEventListener('keydown', pinMainKeyDownHandler);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * Смещение главного пина при перемещении мыши
     * @param {*} moveEvt - объект события
     */
    var pinMainMouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };


      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      checkPinMainCoords();
      setAddressCoords(true);

    };

    var pinMainMouseUpHandler = function () {
      document.removeEventListener('mousemove', pinMainMouseMoveHandler);
      document.removeEventListener('mouseup', pinMainMouseUpHandler);
    };

    document.addEventListener('mousemove', pinMainMouseMoveHandler);
    document.addEventListener('mouseup', pinMainMouseUpHandler);
  });

  window.coords = {
    setAddress: setAddressCoords,
    disabledAddress: disabledAddress,
    pinMainMouseDownHandler: pinMainMouseDownHandler
  };
})();
