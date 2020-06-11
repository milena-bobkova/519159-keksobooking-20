'use strict';

var OFFER_NUMBER = 8;
var OFFERS_HEIGHT = 46;

var Pin = {
  WIDTH: 40,
  HEIGHT: 70
}

var Avatar = {
  NAME: 'img/avatars/user0',
  EXTENSION: '.png'
}

var Offer = {
  TITLES: ['Заголовок объявления'],
  PRICE_MIN: 1,
  PRICE_MAX: 50000,
  TYPES: [
    'place',
    'flat',
    'house',
    'bungalo'
  ],
  ROOMS: [1, 2, 3],
  GUESTS: [1, 2, 3, 4, 5],
  CHECKIN_OUT: [
    '12:00',
    '13:00',
    '14:00'],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
}

var Location = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 630
}

/**
 * Генерация случайного числа из диапазона
 * @param {number} min - минимальное значение
 * @param {number} max - максимальное значение
 * @return {number} - случайное значение
 */
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Генерация случайного элемента массива
 * @param {*} elements  - исходный массив
 * @param {number} random - сгенерированный индекс
 * @return {*} - случайный элемент массива
 */
var getRandomElement = function (elements) {
  var random = elements[Math.floor(Math.random() * elements.length)];
  return elements[random];
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = map.querySelector('.map__pins');

// Создание объявления
var createOffer = function (number) {
  var locationX = getRandomNumber(Location.X_MIN + Pin.WIDTH / 2, Location.X_MAX - Pin.WIDTH / 2);
  var locationY = getRandomNumber(Location.Y_MIN, Location.Y_MAX - OFFERS_HEIGHT);

  return {
    author: {
      avatar: Avatar.NAME + number + Avatar.EXTENSION
    },
    offer: {
      title: getRandomElement(Offer.TITLES),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(Offer.PRICE_MIN, Offer.PRICE_MAX),
      type: getRandomElement(Offer.TYPES),
      rooms: getRandomElement(Offer.ROOMS),
      guests: getRandomElement(Offer.GUESTS),
      checkin: getRandomElement(Offer.CHECKIN_OUT),
      checkout: getRandomElement(Offer.CHECKIN_OUT),
      features: getRandomElement(Offer.FEATURES),
      photos: Offer.PHOTOS.slice(0, getRandomNumber(0, Offer.PHOTOS.length))
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

// Создание массива объявлений
var createOffers = function () {
  var offers = [];

  for (var i = 0; i < OFFER_NUMBER; i++) {
    offers.push(createOffer(i + 1));
  }
  return offers;
};

// Создание метки
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createNodePin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinElementImg = pinElement.querySelector('img');

  pinElementImg.src = pin.author.avatar;
  pinElementImg.alt = pin.offer.title;

  pinElement.style.left = pin.location.x - Pin.WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y + Pin.HEIGHT + 'px';

  return pinElement;
};

// Отрисовка меток объявлений
var offers = createOffers();
var drawPins = function () {
  var fragment = document.createDocumentFragment();

  offers.forEach(function (offers) {
    fragment.appendChild(createNodePin(offers));
  });
  return fragment;
};

mapPins.appendChild(drawPins());
