'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var MAX_RENDERED_PINS = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingTypeField = mapFilters.querySelector('#housing-type');
  var housingPriceField = mapFilters.querySelector('#housing-price');
  var housingRoomsField = mapFilters.querySelector('#housing-rooms');
  var housingGuestsField = mapFilters.querySelector('#housing-guests');

  var housingPriceValue = {
    low: {
      min: 0,
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };

  /**
   * Фильтрация по типу жилья
   * @param {object} ad - объявление
   * @return {array} - отфильтрованные объявления
   */
  var filterByType = function (ad) {
    return housingTypeField.value === DEFAULT_FILTER_VALUE ? true : housingTypeField.value === ad.offer.type;
  };

  /**
   * Фильтрация по цене
   * @param {object} ad - объявление
   * @return {array} - отфильтрованные объявления
   */
  var filterByPrice = function (ad) {
    var priceOfHouse = housingPriceField.value;

    if (priceOfHouse !== DEFAULT_FILTER_VALUE) {
      return ad.offer.price >= housingPriceValue[priceOfHouse].min && ad.offer.price <= housingPriceValue[priceOfHouse].max;
    }
    return true;
  };

  /**
   * Фильтрация по количеству комнат
   * @param {object} ad - объявление
   * @return {array} - отфильтрованные объявления
   */
  var filterByRooms = function (ad) {
    return housingRoomsField === DEFAULT_FILTER_VALUE ? true : parseInt(housingRoomsField.value, 10) === ad.offer.rooms;
  };

  /**
   * Фильтрация по количеству гостей
   * @param {object} ad - объявление
   * @return {array} - отфильтрованные объявления
   */
  var filterByGuests = function (ad) {
    return housingGuestsField === DEFAULT_FILTER_VALUE ? true : parseInt(housingGuestsField.value, 10) === ad.offer.guests;
  };

  /**
   * Фильтрация по типу удобств
   * @param {object} ad - объявление
   * @return {array} - отфильтрованные объявления
   */
  var filterByFeatures = function (ad) {
    var checkedFeatures = Array.from(mapFilters.querySelectorAll('[type="checkbox"]:checked'));
    return checkedFeatures.every(function (feature) {
      return ad.offer.features.includes(feature.value);
    });
  };

  /**
   *Обновление пинов в соответствии с отфильтрованными объявлениями
   */
  var updatePins = function () {
    var filteredAds = window.map.offersData.filter(filterByType).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);
    console.log(filteredAds);

    window.map.renderPins(filteredAds);
  };


  mapFilters.addEventListener('change', window.debounce(function () {
    window.map.removePins();
    window.map.removeCards();
    updatePins();
  }));

  window.filter = {
    updatePins: updatePins
  };

})();
