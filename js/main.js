'use strict';

var OFFER_NUMBER = 8;
var OFFERS_HEIGHT = 46;

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

var FORM_ACTION = 'https://javascript.pages.academy/keksobooking';

var PIN_MAIN_POINTER = 22;

var Pin = {
  WIDTH: 40,
  HEIGHT: 70
};

var Avatar = {
  NAME: 'img/avatars/user0',
  EXTENSION: '.png'
};

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

var locationPin = {
  X_MIN: 0,
  X_MAX: 1200,
  Y_MIN: 130,
  Y_MAX: 630
};

var RoomMinPrice = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

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

/**
 * Создание данных для объявления
 * @param {number} index - порядковый элемент массива
 * @return {object} - данные для объявления
 */
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
      type: getRandomProperty(Types),
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

/**
 * Создает массив объявлений
 * @param {number} count - количество объявлений
 * @return {array} - созданный массив объявлений
 */
var createOffers = function (count) {
  var offers = [];

  for (var i = 0; i < count; i++) {
    offers.push(createOffer(i));
  }
  return offers;
};

/**
 * Создает метку объявления
 * @param {object} pin - данные для метки объявления
 * @return {object} - созданный DOM-элемент
 */
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

/**
 * Генерация объявлений
 */
var offers = createOffers(OFFER_NUMBER);
var fragment = document.createDocumentFragment();

/**
 * Отрисовка меток объявлений и карточки объявления при клике на пин
 * @return {object} - сгенерированные метки
 */
var drawPins = function () {
  offers.forEach(function (offer) {
    var pinElement = createNodePin(offer);
    var mapFilterContainer = document.querySelector('.map__filters-container');
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      map.insertBefore(createNodeCard(offer), mapFilterContainer);
      // Почему-то при добавлении этого обработчика пропадает фокус с клавиатуры на всех интерактивных элементах... Но карточка при этом при нажатии на Esc закрывается
      document.addEventListener('keydown', popupKeydownEscCloseHandler);
    });
    fragment.appendChild(pinElement);
  });
  return fragment;
};

/**
 * Данные для карточки объявления - преимущества
 * @param {object} cardElement - DOM-элемент карточки объявления
 * @param {object} cardData - данные объявления
 */
var getCardFeatures = function (cardElement, cardData) {
  var featuresCollection = cardElement.querySelectorAll('.popup__feature');

  featuresCollection.forEach(function (feature) {
    var newFeatureCollection = feature.className.split('--');
    if (cardData.offer.features.indexOf(newFeatureCollection[1]) === -1) {
      feature.classList.add('visually-hidden');
    }
  });
};

/**
 * Данные для карточки объявления - фото жилья
 * @param {object} cardElement - DOM-элемент карточки объявления
 * @param {object} cardData - данные объявления
 */
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

/**
 * Отображение карточки объявления
 * @param {object} cardData - сгенерированные данные
 * @return {object} - сгенерированная карточка
 */
var createNodeCard = function (cardData) {
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = mapCardTemplate.cloneNode(true);
  var cardCloseButon = cardElement.querySelector('.popup__close');
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
  cardCloseButon.addEventListener('click', popupMouseDownCloseHandler);
  return cardElement;
};

/**
 * Закрывает карточку
 */
var closeCard = function () {
  var mapCard = document.querySelector('.map__card');
  mapCard.remove();
  document.removeEventListener('keydown', popupKeydownEscCloseHandler);
};

/**
 * Обработчик закрытия карточки при клике мышью
 * @param {*} evt - объект события
 */
var popupMouseDownCloseHandler = function (evt) {
  if (evt.which === 1) {
    closeCard();
  }
};

/**
 * Обработчик закрытия карточки при клике на Esc
 * @param {*} evt - объект события
 */
var popupKeydownEscCloseHandler = function (evt) {
  evt.preventDefault();
  if (evt.key === 'Escape') {
    closeCard();
  }
};

// Активное и неактивное состояние страницы
var pinMain = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var adFormAddress = adForm.querySelector('input[name="address"]');
var adFormRooms = adForm.querySelector('select[name="rooms"]');
var adFormCapacity = adForm.querySelector('select[name="capacity"]');
var adFormTitle = adForm.querySelector('input[name="title"]');
var adFormType = adForm.querySelector('select[name="type"]');
var adFormPrice = adForm.querySelector('input[name="price"]');
var adFormTimeIn = adForm.querySelector('select[name="timein"]');
var adFormTimeOut = adForm.querySelector('select[name="timeout"]');

adForm.action = FORM_ACTION;

/**
 * Обработчик клика мышью
 * @param {*} evt - объект события
 */
var pinMainMouseDownHandler = function (evt) {
  if (evt.button === 0) {
    pageActive();
  }
};

/**
 * Обработчик клика на Enter
 * @param {*} evt - объект события
 */
var pinMainKeyDownHandler = function (evt) {
  if (evt.key === 'Enter') {
    pageActive();
  }
};

/**
 * Запуск обработчика при срабатывании события клика на главный пин
 */
pinMain.addEventListener('mousedown', pinMainMouseDownHandler);
pinMain.addEventListener('keydown', pinMainKeyDownHandler);

/**
 * Получает координаты элемента относительно документа
 * @param {object} elem  - данный элемент
 * @return {object} - координаты элемента
 */
function getAddressCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}

/**
 * Записывает полученные координаты в поле ввода адреса
 */
var addressCoords = getAddressCoords(pinMain);
var setAddressCoords = function (isMapActive) {
  var positionX = Math.round(addressCoords.left + pinMain.offsetWidth / 2);
  var positionY = Math.round(addressCoords.top + ((isMapActive) ? (pinMain.offsetHeight + PIN_MAIN_POINTER) : (pinMain.offsetHeight / 2)));
  adFormAddress.value = positionX + ', ' + positionY;
};

adFormAddress.setAttribute('readonly', 'readonly');

/** Изменение состояния fieldset
 * @param {array} fieldsets - массив fieldset-ов
 * @param {boolean} isInabled - состояние элемента массива
 * @param {*} fieldset - элемент массива
 */
var changeFieldset = function (fieldsets, isInabled) {
  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = isInabled;
  });
};

/**
 * Валидация поля комнат и гостей
 */
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

/**
 * Валидация поля заголовка
 */
var checkTitlesHandler = function () {
  switch (true) {
    case (adFormTitle.validity.tooShort):
      adFormTitle.setCustomValidity('Минимальная длина заголовка - 30 символов');
      break;
    case (adFormTitle.validity.tooLong):
      adFormTitle.setCustomValidity('Максимальная длина заголовка - 100 символов');
      break;
    case (adFormTitle.validity.valueMissing):
      adFormTitle.setCustomValidity('Обязательное поле');
      break;
    default:
      adFormTitle.setCustomValidity('');
  }
};

/**
 * Валидация полей времени заезда-выезда
 */
var checkTimeInHandler = function () {
  adFormTimeOut.value = adFormTimeIn.value;
};

var checkTimeOutHandler = function () {
  adFormTimeIn.value = adFormTimeOut.value;
};

/**
 * Минимальная цена жилья
 */
var minPriceHandler = function () {
  adFormPrice.min = RoomMinPrice[(adFormType.value).toUpperCase()];
  adFormPrice.placeholder = RoomMinPrice[(adFormType.value).toUpperCase()];
};

/**
 * Активное состояние страницы
 */
var pageActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapPins.appendChild(drawPins(offers));
  changeFieldset(adFormFieldsets, false);
  setAddressCoords(true);
  adFormRooms.addEventListener('input', checkRoomsHandler);
  adFormCapacity.addEventListener('input', checkRoomsHandler);
  adFormTimeIn.addEventListener('input', checkTimeInHandler);
  adFormTimeOut.addEventListener('input', checkTimeOutHandler);
  adFormTitle.addEventListener('input', checkTitlesHandler);
  adFormType.addEventListener('change', minPriceHandler);
};

/**
 * Неактивное состояние страницы
 */
var pageInactive = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  changeFieldset(adFormFieldsets, true);
  setAddressCoords(false);
};

pageInactive();
