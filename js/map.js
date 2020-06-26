'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  /**
   * Отрисовка меток объявлений и карточки объявления при клике на пин
   * @param {object} offers - объявления
   * @return {object} - сгенерированные метки
   */
  var drawPins = function (offers) {
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer) {
      var pin = window.pin.createNodePin(offer);
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        mapPins.appendChild(window.card.createNodeCard(offer));
      });
      fragment.appendChild(pin);
    });
    return fragment;
  };

  /**
 * Закрывает карточку
 */
  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.remove();
    document.removeEventListener('keydown', popupKeydownEscCloseHandler);
  };

  /**
   * Обработчик закрытия карточки при клике мышью
   * @param {*} evt - объект события
   */
  var popupMouseDownCloseHandler = function (evt) {
    if (evt.which === 1) {
      closeCard();
    }
  };

  /**
   * Обработчик закрытия карточки при клике на Esc
   * @param {*} evt - объект события
   */
  var popupKeydownEscCloseHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  window.map = {
    drawPins: drawPins,
    popupMouseDownCloseHandler: popupMouseDownCloseHandler,
    popupKeydownEscCloseHandler: popupKeydownEscCloseHandler
  };
})();
