'use strict';

var OFFER_NUMBER = 8;

var PIN_WIDTH = 40;
var PIN_HEIGHT = 70;
var OFFERS_HEIGHT = 46;

var AVATAR = 'img/avatars/user0';

var OFFER_TITLES = ['Заголовок объявления'];
var OFFER_PRICE_MIN = 1;
var OFFER_PRICE_MAX = 50000;
var OFFER_TYPES = ['place', 'flat', 'house', 'bungalo'];
var OFFER_ROOMS = [1, 2, 3];
var OFFER_GUESTS = [1, 2, 3];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

//Генерация случайных чисел
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Генерация случайного элемента массива
var getRandomElement = function (elements) {
  var random = elements[Math.floor(Math.random() * elements.length)];
  return elements[random];
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = map.querySelector('.map__pins');

//Создание объявления
var createOffer = function (number) {
  var locationX = getRandomNumber(LOCATION_X_MIN + PIN_WIDTH / 2, LOCATION_X_MAX - PIN_WIDTH / 2);
  var locationY = getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX - OFFERS_HEIGHT);

  return {
    author: {
      avatar: AVATAR + number + '.png'
    },
    offer: {
      title: getRandomElement(OFFER_TITLES),
      addres: locationX + ', ' + locationY,
      price: getRandomNumber(OFFER_PRICE_MIN, OFFER_PRICE_MAX),
      type: getRandomElement(OFFER_TYPES),
      rooms: getRandomElement(OFFER_ROOMS),
      guests: getRandomElement(OFFER_GUESTS),
      checkin: getRandomElement(OFFER_CHECKIN),
      checkout: getRandomElement(OFFER_CHECKOUT),
      features: getRandomElement(OFFER_FEATURES),
      description: '',
      photos: getRandomElement(OFFER_PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

//Создание массива объявлений
var createOffers = function () {
  var offers = [];

  for (var i = 1; i <= OFFER_NUMBER; i++) {
    offers.push(createOffer(i));
  }
  return offers;
};

//создание метки
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);

  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  pinElement.style.left = pin.location.x - PIN_WIDTH + 'px';
  pinElement.style.top = pin.location.y + PIN_HEIGHT + 'px';

  return pinElement;
};

//отрисовка меток объявлений
var drawPins = function (offers) {
  var fragment = document.createDocumentFragment();
  var offers = createOffers();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(createPin(offers[i]));
  };
  return fragment;
};

var fragment = drawPins();

mapPins.appendChild(fragment);
