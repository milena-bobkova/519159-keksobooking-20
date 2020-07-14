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

  var updatePins = function () {

    var filteredAds = window.map.offersData.filter(function (ad) {

      var housingType = housingTypeField.value === DEFAULT_FILTER_VALUE ? true : housingTypeField.value === ad.offer.type;

      var housingPrice = housingPriceField.value === DEFAULT_FILTER_VALUE ? true : ad.offer.price >= housingPriceValue[housingPriceField.value].min && ad.offer.price <= housingPriceValue[housingPriceField.value].max;

      var housingRooms = housingRoomsField.value === DEFAULT_FILTER_VALUE ? true : parseInt(housingRoomsField.value, 10) === ad.offer.rooms;


      var housingGuests = housingGuestsField.value === DEFAULT_FILTER_VALUE ? true : parseInt(housingGuestsField.value, 10) === ad.offer.guests;

      var changedFeatures = Array.from(mapFilters.querySelectorAll('.map__checkbox:checked')).map(function (feature) {
        return feature.value;
      });

      var housingFeatures = changedFeatures.every(function (feature) {
        return ad.offer.features.includes(feature);
      });

      return housingType && housingPrice && housingRooms && housingGuests && housingFeatures;
    });

    var pinsNumber = filteredAds.length > MAX_RENDERED_PINS ? MAX_RENDERED_PINS : filteredAds.length;
    var filteredByNumberAds = filteredAds.slice(0, pinsNumber);

    window.map.renderPins(filteredByNumberAds);
  };

  var housingFiltersChangeHandler = window.debounce(function () {
    window.map.removePins();
    window.map.removeCards();
    updatePins();
  });

  mapFilters.addEventListener('change', housingFiltersChangeHandler);

  window.filter = {
    updatePins: updatePins
  };

})();
