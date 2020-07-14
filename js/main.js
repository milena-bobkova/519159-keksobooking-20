'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = map.querySelector('.map__pin--main');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFiltersFieldsets = mapFiltersContainer.querySelectorAll('input, select, fieldset');

  var pageActive = function () {
    map.classList.remove('map--faded');

    window.form.active();

    mapFiltersContainer.classList.remove('hidden');
    window.form.enabledFields(mapFiltersFieldsets);

    pinMain.removeEventListener('mousedown', window.coords.pinMainMouseDownHandler);

    window.backend.loadData(window.map.successLoadHandler, window.backend.errorHandler);
  };

  var pageInactive = function () {
    map.classList.add('map--faded');

    adForm.reset();
    window.form.inactive();

    window.map.removePins();
    window.map.removeCards();

    mapFiltersContainer.classList.add('hidden');
    window.form.disabledFields(mapFiltersFieldsets);

    pinMain.addEventListener('mousedown', window.coords.pinMainMouseDownHandler);
    pinMain.style.top = window.data.pinMainStartCoords.TOP;
    pinMain.style.left = window.data.pinMainStartCoords.LEFT;
  };

  pageInactive();

  window.main = {
    pageActive: pageActive,
    pageInactive: pageInactive
  };
})();
