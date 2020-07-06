'use strict';

(function () {
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

    if (ads.length > window.data.MAX_RENDERED_PINS) {
      ads = ads.slice(0, window.data.MAX_RENDERED_PINS);
    }

    ads.forEach(function (ad) {
      var pin = window.pin.create(ad);
      pin.addEventListener('click', function () {
        map.appendChild(window.card.create(ad));
      });
      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
  };


  /**
  * Закрывает карточку
  */
  var closeCard = function () {
    var mapCard = document.querySelector('.map__card');
    mapCard.remove();
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
    removeCards: removeCards
  };
})();
