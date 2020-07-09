'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var pinMain = document.querySelector('.map__pin--main');

  var pageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFiltersContainer.style.display = 'block';

    pinMain.removeEventListener('mousedown', window.coords.pinMainMouseDownHandler);

    window.form.active();
  };

  var pageInactive = function () {
    adForm.reset();

    adForm.classList.add('ad-form--disabled');
    window.form.changeFieldsets(adFormFieldsets);
    mapFiltersContainer.style.display = 'none';

    window.map.removePins();
    window.map.removeCards();
    map.classList.add('map--faded');
    pinMain.addEventListener('mousedown', window.coords.pinMainMouseDownHandler);
    pinMain.style.top = window.data.pinMainStartCoords.TOP;
    pinMain.style.left = window.data.pinMainStartCoords.LEFT;
  };

  window.main = {
    pageActive: pageActive,
    pageInactive: pageInactive
  };
})();
