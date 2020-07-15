'use strict';

(function () {
  var FILTERS_HEIGHT = 46;

  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var LocationPin = {
    X_MIN: 0,
    Y_MIN: 130,
    Y_MAX: 630
  };

  var PinMainStartCoords = {
    TOP: '375px',
    LEFT: '570px'
  };

  var PhotoPreviewElement = {
    ALT: 'Изображение жилья',
    WIDTH: '70px',
    HEIGHT: '70px'
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

  var locationXMax = document.querySelector('.map').offsetWidth;

  window.data = {
    PinMainStartCoords: PinMainStartCoords,
    PhotoPreviewElement: PhotoPreviewElement,
    Pin: Pin,
    LocationPin: LocationPin,
    roomTypes: roomTypes,
    locationXMax: locationXMax,
    menuHeight: FILTERS_HEIGHT,
    roomsNoun: roomsNoun,
    guestsNoun: guestsNoun
  };
})();
