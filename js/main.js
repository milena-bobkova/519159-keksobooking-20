'use strict';

var OFFER_NUMBER = 8;
var OFFERS_HEIGHT = 46;

var Pin = {
  WIDTH: 40,
  HEIGHT: 70
};

var pinMainSize = {
  WIDTH: 65,
  HEIGHT: 65,
  POINTER: 22
};

var Avatar = {
  NAME: 'img/avatars/user0',
  EXTENSION: '.png'
};

var TITLES = [
  'Заголовок объявления',
  'Объявление'
];

var Price = {
  MIN: 1,
  MAX: 50000
};

var TYPES = {
  place: 'дворец',
  flat: 'квартира',
  house: 'дом',
  bungalo: 'бунгало'
};

var Rooms = {
  MIN: 1,
  MAX: 4
};
var Guests = {
  MIN: 1,
  MAX: 3
};
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

var locationPin = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 630
};

var DESCRIPTION = [
  'Великолепная квартира-студия в центре Токио.',
  'Подходит как туристам, так и бизнесменам.',
  'Квартира полностью укомплектована и недавно отремонтирована.'
];

var FORM_ACTION = 'https://javascript.pages.academy/keksobooking';

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
 * @param {number} min - первый элемент массива
 * @param {number} max - последний элемент массива
 * @param {number} random - сгенерированный индекс
 * @return {*} - случайный элемент массива
 */
var getRandomElement = function (elements, min, max) {
  var random = getRandomNumber(min, max);
  return elements[random];
};

/**
 * Получение массива случайной длины
 * @param {array} arr - данный массив
 * @param {number} min - первый элемент массива
 * @param {number} max - последний элемент массива
 * @return {array} - новый массив случайной длины
 */

var getRandomArray = function (arr, min, max) {
  return arr.slice(getRandomNumber(min, max));
};

/**
 * Получение случайного значения свойства объекта
 * @param {object} obj  - заданный объект
 * @return {string} - случайное значение ключа объекта
 */

var getRandomProperty = function (obj) {
  var propertyArray = Object.keys(obj);
  var propertyIndex = Math.floor(Math.random() * propertyArray.length);
  var randomKey = propertyArray[propertyIndex];
  var randomValue = obj[randomKey];
  return randomValue;
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

// Создание объявления
var createOffer = function (index) {
  var locationX = getRandomNumber(locationPin.X_MIN + Pin.WIDTH / 2, locationPin.X_MAX - Pin.WIDTH / 2);
  var locationY = getRandomNumber(locationPin.Y_MIN, locationPin.Y_MAX - OFFERS_HEIGHT);

  return {
    author: {
      avatar: Avatar.NAME + (index + 1) + Avatar.EXTENSION
    },
    offer: {
      title: getRandomElement(TITLES, 0, TITLES.length - 1),
      address: locationX + ', ' + locationY,
      price: getRandomNumber(Price.MIN, Price.MAX),
      type: getRandomProperty(TYPES),
      rooms: getRandomNumber(Rooms.MIN, Rooms.MAX),
      guests: getRandomNumber(Guests.MIN, Guests.MAX),
      checkin: getRandomElement(CHECKIN_OUT, 0, CHECKIN_OUT.length - 1),
      checkout: getRandomElement(CHECKIN_OUT, 0, CHECKIN_OUT.length - 1),
      features: getRandomArray(FEATURES, 0, FEATURES.length - 1),
      description: getRandomElement(DESCRIPTION, 0, DESCRIPTION.length - 1),
      photos: getRandomArray(PHOTOS, 0, PHOTOS.length - 1)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

// Создание массива объявлений
var createOffers = function (count) {
  var offers = [];

  for (var i = 0; i < count; i++) {
    offers.push(createOffer(i));
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

// Генерация объявлений
var offers = createOffers(OFFER_NUMBER);

// Отрисовка меток объявлений
var drawPins = function () {
  var fragment = document.createDocumentFragment();

  offers.forEach(function (offer) {
    fragment.appendChild(createNodePin(offer));
  });
  return fragment;
};


// Данные для карточки обявления
/**
 *
 * @param {object} cardElement - DOM-элемент карточки объявления
 * @param {object} cardData - данные объявления
 */
/*
var getCardFeatures = function (cardElement, cardData) {
 var featuresCollection = cardElement.querySelectorAll('.popup__feature');

 featuresCollection.forEach(function (feature) {
   var newFeatureCollection = feature.className.split('--');
   if (cardData.offer.features.indexOf(newFeatureCollection[1]) === -1) {
     feature.classList.add('visually-hidden');
   }
 });
};

var getCardPictures = function (cardElement, cardData) {
 var picturesContainer = cardElement.querySelector('.popup__photos');
 var popupPicture = picturesContainer.querySelector('.popup__photo');
 popupPicture.src = cardData.offer.photos[0];

 for (var i = 1; i < cardData.offer.photos.length; i++) {
   var cardPhoto = popupPicture.cloneNode(true);
   cardPhoto.src = cardData.offer.photos[i];
   picturesContainer.appendChild(cardPhoto);
 }
};

// Карточка объявления
var createNodeCard = function (cardData) {
 var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
 var cardElement = mapCardTemplate.cloneNode(true);
 cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
 cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
 cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
 cardElement.querySelector('.popup__type').textContent = cardData.offer.type;
 cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
 cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
 getCardFeatures(cardElement, cardData);
 getCardPictures(cardElement, cardData);
 cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
 cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
 return cardElement;
};

// Добавление карточки на карту
var mapFilterContainer = document.querySelector('.map__filters-container');
map.insertBefore(createNodeCard(offers[0]), mapFilterContainer);
*/

// Неактивное состояние страницы
var pinMain = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('input, select, fieldset');
var adFormAddress = adForm.querySelector('#address');
var adFormRooms = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');
var adFormSubmit = adForm.querySelector('.ad-form__submit');

adForm.action = FORM_ACTION;

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    mapActive();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    mapActive();
  }
});

var setPinMain = function (isMapActive) {
  var positionX = Math.round(pinMainSize.WIDTH / 2);
  var positionY = Math.round(pinMainSize.HEIGHT / 2);

  if (isMapActive) {
    positionY = Math.round(pinMainSize.HEIGHT + pinMainSize.POINTER);
  }
  return positionX + ', ' + positionY;
};

/** Изменение состояния fieldset
 * @param {array} array - массив fieldset-ов
 * @param {boolean} result - состояние элемента массива
 * @param {*} item - элемент массива
 */
var changeFieldset = function (array, result) {
  array.forEach(function (item) {
    item.disabled = result;
  });
};

var checkRoomsHandler = function () {
  switch (true) {
    case (adFormRooms.value === '100' && adFormCapacity.value !== '0'):
      adFormCapacity.setCustomValidity('Не для гостей');
      break;
    case (adFormRooms.value < adFormCapacity.value):
      adFormCapacity.setCustomValidity('Недостаточно мест');
      break;
    case (adFormRooms.value !== '100' && adFormCapacity.value === '0'):
      adFormCapacity.setCustomValidity('Укажите количество гостей');
      break;
    default:
      adFormCapacity.setCustomValidity('');
  }
};

var onSubmitClick = function () {
  checkRoomsHandler();
};

var addFormValidity = function () {
  adFormSubmit.addEventListener('click', onSubmitClick);
};

var removeFormValidity = function () {
  adFormSubmit.removeEventListener('click', onSubmitClick);
};

var mapActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPins.appendChild(drawPins());
  changeFieldset(adFormFieldsets, false);
  adFormAddress.value = setPinMain(true);
  addFormValidity();
};

var mapInactive = function () {
  changeFieldset(adFormFieldsets, true);
  adFormAddress.value = setPinMain(false);
  removeFormValidity();
};

mapInactive();
