'use strict';

(function () {

  var OFFER_NUMBER = 8;
  var OFFERS_HEIGHT = 46;

  var Avatar = {
    NAME: 'img/avatars/user0',
    EXTENSION: '.png'
  };

  var locationPin = {
    X_MIN: 0,
    Y_MIN: 130,
    Y_MAX: 630
  };

  var locationXMax = document.querySelector('.map').offsetWidth;

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
        title: getRandomElement(window.mock.titles, 0, window.mock.titles.length - 1),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(window.mock.price.MIN, window.mock.price.MAX),
        type: getRandomProperty(window.mock.types),
        rooms: getRandomNumber(window.mock.rooms.MIN, window.mock.rooms.MAX),
        guests: getRandomNumber(window.mock.guests.MIN, window.mock.guests.MAX),
        checkin: getRandomElement(window.mock.checkinOut, 0, window.mock.checkinOut.length - 1),
        checkout: getRandomElement(window.mock.checkinOut, 0, window.mock.checkinOut.length - 1),
        features: getRandomArray(window.mock.features, 0, window.mock.features.length - 1),
        description: getRandomElement(window.mock.description, 0, window.mock.description.length - 1),
        photos: getRandomArray(window.mock.photos, 0, window.mock.photos.length - 1)
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
    offers: createOffers(OFFER_NUMBER),
    locationXMax: locationXMax,
    locationXMin: locationPin.X_MIN,
    locationYMax: locationPin.Y_MAX,
    locationYMin: locationPin.Y_MIN,
    menuHeight: OFFERS_HEIGHT
  };
})();
