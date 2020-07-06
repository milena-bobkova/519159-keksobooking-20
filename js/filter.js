'use strict';

(function () {
  var mapFilter = document.querySelector('.map__filters');
  var housingType = mapFilter.querySelector('#housing-type');

  var filterByType = function (ad) {
    return housingType.value === 'any' ? true : housingType.value === ad.offer.type;
  };

  var filterAds = function (ads) {
    var filteredAdsAmount = ads.filter(filterByType);
    window.map.renderPins(filteredAdsAmount);
  };

  var filterFieldsChangeHandler = function () {
    window.map.removeCards();
    window.map.removePins();
    window.backend.load(filterAds, window.backend.errorHandler);
  };

  housingType.addEventListener('change', filterFieldsChangeHandler);
})();
