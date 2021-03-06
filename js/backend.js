'use strict';

(function () {
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';

  var REQUEST_GET = 'GET';
  var REQUEST_POST = 'POST';

  var TIMEOUT = 10000;

  var StatusCode = {
    OK: 200
  };

  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  /**
   * Функция инициализации xhr
   * @param {function} onSuccessEvent - коллбэк, срабатывающий при успешном выполнении запроса
   * @param {Function} onErrorEvent - коллбэк, срабатывающий при неуспешном выполнении запроса
   * @param {string} request - тип запроса
   * @param {string} url - адрес
   * @param {*} data - данные
   */
  var load = function (onSuccessEvent, onErrorEvent, request, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccessEvent(xhr.response);
      } else {
        onErrorEvent('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onErrorEvent('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onErrorEvent('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(request, url);
    xhr.send(data);
  };

  /**
 * Функция, срабатывающая при неуспешном выполнении запроса на сервер
 * @param {string} messageError - текст ошибки
 */
  var errorHandler = function (messageError) {
    var message = messageErrorTemplate.cloneNode(true);
    var textError = message.querySelector('.error__message');
    textError.textContent = messageError;

    document.querySelector('main').appendChild(message);

    var errorButton = message.querySelector('.error__button');
    errorButton.addEventListener('click', errorButtonClickHandler);
    document.addEventListener('keydown', errorEscKeyDownHandler);
    document.addEventListener('click', errorWindowClickHandler);
  };

  /**
   * Закрытие окна ошибки нажатием на кнопку
   */
  var errorButtonClickHandler = function () {
    document.querySelector('div.error').remove();
  };

  /**
   * Закрытие окна ошибки нажатием на Esc
   * @param {*} evt - объект события
   */
  var errorEscKeyDownHandler = function (evt) {
    if (window.util.isEscPressed(evt)) {
      evt.preventDefault();
      document.querySelector('div.error').remove();
    }
  };

  /**
   * Закрытие окна ошибки нажатием на произвольную область экрана
   * @param {*} evt - объект события
   */
  var errorWindowClickHandler = function (evt) {
    if (evt.target.matches('div.error')) {
      document.querySelector('div.error').remove();
    }
  };

  var loadData = function (onSuccessEvent, onErrorEvent) {
    load(onSuccessEvent, onErrorEvent, REQUEST_GET, URL_GET);
  };

  var saveData = function (data, onSuccessEvent, onErrorEvent) {
    load(onSuccessEvent, onErrorEvent, REQUEST_POST, URL_POST, data);
  };

  window.backend = {
    loadData: loadData,
    saveData: saveData,
    errorHandler: errorHandler
  };
})();
