'use strict';

(function () {
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  /**
 * Создает метку объявления
 * @param {object} ad - данные для объявления
 * @return {object} - созданный DOM-элемент
 */
  var createNodePin = function (ad) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinAvatar = pinElement.querySelector('img');

    pinAvatar.src = ad.author.avatar;
    pinAvatar.alt = ad.offer.title;

    pinElement.style.left = ad.location.x - window.data.Pin.WIDTH / 2 + 'px';
    pinElement.style.top = ad.location.y - window.data.Pin.HEIGHT + 'px';

    pinElement.addEventListener('click', function () {
      pinElement.classList.add('map__pin--active');
      map.appendChild(window.card.create(ad));
      document.addEventListener('keydown', window.map.cardKeydownEscCloseHandler);
    });

    return pinElement;
  };

  window.pin = {
    create: createNodePin
  };
})();
