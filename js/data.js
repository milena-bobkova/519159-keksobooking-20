'use strict';

(function () {
  var FILTERS_HEIGHT = 46;
  var MAX_RENDERED_PINS = 5;

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
  /*
   var Avatar = {
     NAME: 'img/avatars/user0',
     EXTENSION: '.png'
   };
   */

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

  window.data = {
    MAX_RENDERED_PINS: MAX_RENDERED_PINS,
    roomTypes: roomTypes,
    locationXMax: locationXMax,
    locationXMin: locationPin.X_MIN,
    locationYMax: locationPin.Y_MAX,
    locationYMin: locationPin.Y_MIN,
    menuHeight: FILTERS_HEIGHT,
    pinMainStartCoords: pinMainStartCoords,
    Pin: Pin
  };
})();
