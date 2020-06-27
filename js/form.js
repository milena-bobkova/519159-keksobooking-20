'use strict';

(function () {
  var FORM_ACTION = 'https://javascript.pages.academy/keksobooking';

  var RoomMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('input, select, fieldset');
  var adFormRooms = adForm.querySelector('select[name="rooms"]');
  var adFormCapacity = adForm.querySelector('select[name="capacity"]');
  var adFormTitle = adForm.querySelector('input[name="title"]');
  var adFormType = adForm.querySelector('select[name="type"]');
  var adFormPrice = adForm.querySelector('input[name="price"]');
  var adFormTimeIn = adForm.querySelector('select[name="timein"]');
  var adFormTimeOut = adForm.querySelector('select[name="timeout"]');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFilters.querySelectorAll('input, select, fieldset');

  adForm.action = FORM_ACTION;

  /** Изменение состояния fieldset
   * @param {array} fieldsets - массив fieldset-ов
   * @param {boolean} isEnabled - состояние элемента массива
   * @param {*} fieldset - элемент массива
   */
  var changeFieldset = function (fieldsets, isEnabled) {
    fieldsets.forEach(function (fieldset) {
      fieldset.disabled = isEnabled;
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
   * Деактивация полей формы
   * @param {array} items - элементы формы
   */
  var disabledFields = function (items) {
    for (var i = 0; i < items.length; i++) {
      items[i].setAttribute('disabled', 'disabled');
    }
  };

  /**
   * Активация полей формы
   * @param {array} items - элементы формы
   */
  var enabledFields = function (items) {
    for (var i = 0; i < items.length; i++) {
      items[i].removeAttribute('disabled');
    }
  };

  /**
   * Активное состояние страницы
   */
  var pageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(window.map.drawPins(window.data.offers));
    changeFieldset(adFormFieldsets, false);
    adFormRooms.addEventListener('input', checkRoomsHandler);
    adFormCapacity.addEventListener('input', checkRoomsHandler);
    adFormTimeIn.addEventListener('input', checkTimeInHandler);
    adFormTimeOut.addEventListener('input', checkTimeOutHandler);
    adFormTitle.addEventListener('input', checkTitlesHandler);
    adFormType.addEventListener('change', minPriceHandler);
    enabledFields(adFormFieldsets);
    enabledFields(mapFiltersFieldsets);
  };

  /**
   * Неактивное состояние страницы
   */
  var pageInactive = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    changeFieldset(adFormFieldsets, true);
    window.coords.setAddress(false);
    disabledFields(adFormFieldsets);
    disabledFields(mapFiltersFieldsets);
  };

  pageInactive();

  window.form = {
    pageActive: pageActive,
    pageInactive: pageInactive
  };
})();
