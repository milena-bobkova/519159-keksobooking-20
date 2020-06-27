'use strict';
(function () {

  var TITLES = [
    'Заголовок объявления',
    'Объявление'
  ];

  var CHECKIN_OUT = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var DESCRIPTION = [
    'Великолепная квартира-студия в центре Токио.',
    'Подходит как туристам, так и бизнесменам.',
    'Квартира полностью укомплектована и недавно отремонтирована.'
  ];

  var Price = {
    MIN: 1,
    MAX: 50000
  };

  var Types = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var Rooms = {
    MIN: 1,
    MAX: 4
  };
  var Guests = {
    MIN: 1,
    MAX: 3
  };

  window.mock = {
    titles: TITLES,
    checkinOut: CHECKIN_OUT,
    features: FEATURES,
    photos: PHOTOS,
    description: DESCRIPTION,
    price: Price,
    types: Types,
    rooms: Rooms,
    guests: Guests
  };
})();
