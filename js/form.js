'use strict';

(function () {
  var FORM_ACTION = 'https://javascript.pages.academy/keksobooking';
  var PIN_MAIN_POINTER = 22;

  var RoomMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
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
   * Записывает полученные координаты в поле ввода адреса
   */
  var addressCoords = window.coords.getAddressCoords(pinMain);
  var setAddressCoords = function (isMapActive) {
    var positionX = Math.round(addressCoords.left + pinMain.offsetWidth / 2);
    var positionY = Math.round(addressCoords.top + ((isMapActive) ? (pinMain.offsetHeight + PIN_MAIN_POINTER) : (pinMain.offsetHeight / 2)));
    adFormAddress.value = positionX + ', ' + positionY;
  };

  adFormAddress.setAttribute('readonly', 'readonly');

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
   * Активное состояние страницы
   */
  var pageActive = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapPins.appendChild(window.map.drawPins(window.data.offersData));
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

  window.form = {
    pageActive: pageActive,
    pageInactive: pageInactive
  }
})();
