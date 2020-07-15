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
    var pin = mapPinTemplate.cloneNode(true);
    var pinAvatar = pin.querySelector('img');

    pinAvatar.src = ad.author.avatar;
    pinAvatar.alt = ad.offer.title;

    pin.style.left = ad.location.x - window.data.Pin.WIDTH / 2 + 'px';
    pin.style.top = ad.location.y - window.data.Pin.HEIGHT + 'px';

    pin.addEventListener('click', function () {
      window.map.closeCard();
      pin.classList.add('map__pin--active');
      map.appendChild(window.card.create(ad));
      document.addEventListener('keydown', window.map.cardKeydownEscCloseHandler);
    });

    return pin;
  };

  window.pin = {
    create: createNodePin
  };
})();
