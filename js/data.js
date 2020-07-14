'use strict';

(function () {
  var FILTERS_HEIGHT = 46;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var roomTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var roomsNoun = {
    one: ' комната для ',
    some: ' комнаты для ',
    many: ' комнат для '
  };

  var guestsNoun = {
    one: ' гостя',
    many: ' гостей'
  };

  var locationPin = {
    X_MIN: 0,
    Y_MIN: 130,
    Y_MAX: 630
  };

  var pinMainStartCoords = {
    TOP: '375px',
    LEFT: '570px'
  };

  var locationXMax = document.querySelector('.map').offsetWidth;

  var PhotoPreviewElement = {
    ALT: 'Изображение жилья',
    WIDTH: '70px',
    HEIGHT: '70px'
  };

  window.data = {
    roomTypes: roomTypes,
    locationXMax: locationXMax,
    locationXMin: locationPin.X_MIN,
    locationYMax: locationPin.Y_MAX,
    locationYMin: locationPin.Y_MIN,
    menuHeight: FILTERS_HEIGHT,
    pinMainStartCoords: pinMainStartCoords,
    Pin: Pin,
    PhotoPreviewElement: PhotoPreviewElement,
    roomsNoun: roomsNoun,
    guestsNoun: guestsNoun
  };
})();
