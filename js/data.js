'use strict';

(function () {
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
    Y_MIN: 130,
    Y_MAX: 630
  };

  var locationXMax = document.querySelector('.map__overlay').offsetWidth;

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

  /**
 * Создание объявления со случайными данными
 * @param {number} index - порядковый элемент массива
 * @return {object} - данные для объявления
 */
  var createOffer = function (index) {
    var locationX = getRandomNumber(locationPin.X_MIN, locationXMax);
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

  window.data = {
    offersData: createOffers(OFFER_NUMBER)
  };
})();
