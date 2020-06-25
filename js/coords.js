'use strict';

(function () {
  var PIN_MAIN_POINTER = 22;

  var mapPins = document.querySelector('.map__pins');
  var pinMain = mapPins.querySelector('.map__pin--main');

  /**
   * Обработчик клика мышью на главный пин
   * @param {*} evt - объект события
   */
  var pinMainMouseDownHandler = function (evt) {
    if (evt.which === 1) {
      window.form.pageActive();
    }
    pinMain.removeEventListener('mousedown', pinMainMouseDownHandler);
    pinMain.removeEventListener('keydown', pinMainKeyDownHandler);
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
   * Запуск обработчика при срабатывании события клика на главный пин
   */
  pinMain.addEventListener('mousedown', pinMainMouseDownHandler);
  pinMain.addEventListener('keydown', pinMainKeyDownHandler);

  /**
   * Получает координаты элемента относительно документа
   * @param {object} elem  - данный элемент
   * @return {object} - координаты элемента
   */
  function getAddressCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  };
  window.coords = {
    getAddressCoords: getAddressCoords
  }
})();
