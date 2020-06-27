'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
 * Создает метку объявления
 * @param {object} offer - данные для карточки объявления
 * @return {object} - созданный DOM-элемент
 */
  var createNodePin = function (offer) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinElementImg = pinElement.querySelector('img');

    pinElementImg.src = offer.author.avatar;
    pinElementImg.alt = offer.offer.title;

    pinElement.style.left = offer.location.x - Pin.WIDTH / 2 + 'px';
    pinElement.style.top = offer.location.y + Pin.HEIGHT + 'px';

    return pinElement;
  };

  window.pin = {
    create: createNodePin
  };
})();
