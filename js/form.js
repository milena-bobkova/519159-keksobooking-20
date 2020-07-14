'use strict';

(function () {
  var FORM_ACTION = 'https://javascript.pages.academy/keksobooking';

  var RoomMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adForm = document.querySelector('.ad-form');
  var adFormSubmitButton = adForm.querySelector('.ad-form__submit');
  var adFormFieldsets = adForm.querySelectorAll('input, select, fieldset');
  var adFormFields = adForm.querySelectorAll('input, select');
  var adFormRooms = adForm.querySelector('select[name="rooms"]');
  var adFormCapacity = adForm.querySelector('select[name="capacity"]');
  var adFormTitle = adForm.querySelector('input[name="title"]');
  var adFormType = adForm.querySelector('select[name="type"]');
  var adFormPrice = adForm.querySelector('input[name="price"]');
  var adFormTimeIn = adForm.querySelector('select[name="timein"]');
  var adFormTimeOut = adForm.querySelector('select[name="timeout"]');

  adForm.action = FORM_ACTION;

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

  var validateForm = function (fields) {
    fields.forEach(function (field) {
      field.classList.toggle('form-error', !field.validity.valid);
    });
  };

  var submitButtonClickHandler = function () {
    validateForm(adFormFields);
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
   * Функция выводит сообщение в случае успешной отправки данных формы на сервер
   */
  var successSaveHandler = function () {
    window.main.pageInactive();
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successMessageTemplate.cloneNode(true);
    document.querySelector('main').appendChild(successMessage);

    /**
    * Закрытие окна успешной отправки данных нажатием на Esc
    * @param {*} evt - объект события
    */
    var successEscKeyDownHandler = function (evt) {
      if (evt.key === 'Escape') {
        successMessage.remove();
        document.removeEventListener('keydown', successEscKeyDownHandler);
        document.removeEventListener('click', successWindowClickHandler);
      }
    };

    /**
     * Закрытие окна успешной отправки данных нажатием на произвольную область экрана
     * @param {*} evt - объект события
     */
    var successWindowClickHandler = function () {
      successMessage.remove();
      document.removeEventListener('keydown', successEscKeyDownHandler);
      document.removeEventListener('click', successWindowClickHandler);
    };
    document.addEventListener('keydown', successEscKeyDownHandler);
    document.addEventListener('click', successWindowClickHandler);
  };

  /**
   * Функция обработки события отправки формы
   * @param {*} evt - объект события
   */
  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.saveData(new FormData(adForm), successSaveHandler, window.backend.errorHandler);
    window.main.pageInactive();
  };

  adForm.addEventListener('submit', adFormSubmitHandler);

  /**
   * Функция обработки события при клике на кнопку очистки формы
   * @param {*} evt - кнопка очистки
   */
  var adFormResetButton = document.querySelector('.ad-form__reset');
  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    window.main.pageInactive();
  };

  adFormResetButton.addEventListener('click', resetButtonClickHandler);

  /**
   * Активное состояние страницы
   */
  var formActive = function () {
    adForm.classList.remove('ad-form--disabled');
    window.coords.setAddress(true);
    adFormRooms.addEventListener('input', checkRoomsHandler);
    adFormCapacity.addEventListener('input', checkRoomsHandler);
    adFormTimeIn.addEventListener('input', checkTimeInHandler);
    adFormTimeOut.addEventListener('input', checkTimeOutHandler);
    adFormTitle.addEventListener('input', checkTitlesHandler);
    adFormType.addEventListener('change', minPriceHandler);
    enabledFields(adFormFieldsets);
    window.coords.disabledAddress();
    adFormSubmitButton.addEventListener('click', submitButtonClickHandler);
    window.photo.avatarChooser.addEventListener('change', window.photo.avatarChooseHandler);
    window.photo.photoChooser.addEventListener('change', window.photo.photoChooseHandler);
  };

  /**
   * Неактивное состояние страницы
   */
  var formInactive = function () {
    adForm.classList.add('ad-form--disabled');
    window.coords.setAddress(false);
    window.coords.setAddress(false);
    disabledFields(adFormFieldsets);
    adFormSubmitButton.removeEventListener('click', submitButtonClickHandler);
  };

  window.form = {
    active: formActive,
    inactive: formInactive,
    disabledFields: disabledFields,
    enabledFields: enabledFields
  };
})();
