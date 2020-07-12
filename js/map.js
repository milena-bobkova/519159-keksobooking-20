'use strict';

(function () {
  var MAX_RENDERED_PINS = 5;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  /**
  * Скрытие пинов при неактивной форме
  * @param {array} pins - массив пинов на карте
  */
  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  /**
   * Скрытие карточек объявлений при неактивной форме
   * @param {array} cards - массив карточек на карте
   */
  var removeCards = function () {
    var cards = map.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      card.remove();
    });
  };

  /**
   * Отрисовка меток объявлений и карточки объявления при клике на пин
   * @param {object} ads - объявления
   * @return {object} - сгенерированные метки
   */

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    var pinsNumber = ads.length > MAX_RENDERED_PINS ? MAX_RENDERED_PINS : ads.length;
    ads.slice(0, pinsNumber).forEach(function (ad) {
      fragment.appendChild(window.pin.create(ad));
    });
    mapPins.appendChild(fragment);
  };

  /**
   * Отрисовка пинов в случае успешной загрузки данных
   * @param {object} data  - данные с сервера
   */
  var successLoadHandler = function (data) {
    window.map.offersData = data;
    renderPins(data);
  };

  /**
  * Закрывает карточку
  */
  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');
    var mapPinActive = document.querySelector('.map__pin--active');

    if (mapCard) {
      mapCard.remove();
      mapPinActive.classList.remove('map__pin--active');
    }
    document.removeEventListener('keydown', cardKeydownEscCloseHandler);
  };

  /**
   * Обработчик закрытия карточки при клике мышью
   * @param {*} evt - объект события
   */
  var cardMouseDownCloseHandler = function (evt) {
    if (evt.which === 1) {
      closeCard();
    }
  };

  /**
   * Обработчик закрытия карточки при клике на Esc
   * @param {*} evt - объект события
   */
  var cardKeydownEscCloseHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  window.map = {
    cardMouseDownCloseHandler: cardMouseDownCloseHandler,
    cardKeydownEscCloseHandler: cardKeydownEscCloseHandler,
    renderPins: renderPins,
    removePins: removePins,
    removeCards: removeCards,
    closeCard: closeCard,
    successLoadHandler: successLoadHandler
  };
})();
