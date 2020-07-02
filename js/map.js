'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');

  /**
   * Отрисовка меток объявлений и карточки объявления при клике на пин
   * @param {object} offers - объявления
   * @return {object} - сгенерированные метки
   */

  var successHandler = function (offers) {
    var fragment = document.createDocumentFragment();
    offers.forEach(function (offer) {
      var pin = window.pin.create(offer);
      pin.addEventListener('click', function (evt) {
        evt.preventDefault();
        mapPins.appendChild(window.card.create(offer));
      });
      fragment.appendChild(pin);
    });
    mapPins.appendChild(fragment);
  };

  /**
   * Функция, срабатывающая при неуспешном выполнении запроса на сервер
   * @param {string} errorMessage - текст ошибки
   */
  var errorHandler = function (errorMessage) {
    var message = errorMessageTemplate.cloneNode(true);
    var errorText = message.querySelector('.error__message');
    errorText.textContent = errorMessage;

    document.querySelector('main').appendChild(message);

    var errorButton = message.querySelector('.error__button');
    errorButton.addEventListener('click', errorButtonClickHandler);
  };

  var errorButtonClickHandler = function () {
    document.querySelector('div.error').remove();
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
    popupMouseDownCloseHandler: popupMouseDownCloseHandler,
    popupKeydownEscCloseHandler: popupKeydownEscCloseHandler,
    successHandler: successHandler,
    errorHandler: errorHandler
  };
})();
